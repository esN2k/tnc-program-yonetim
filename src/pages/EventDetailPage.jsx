import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { eventsService, attendeesService, registrationsService } from "../services/eventsService";
import { EVENT_STATUS_LABELS, ATTENDANCE_STATUS, ATTENDANCE_STATUS_LABELS } from "../interfaces/constants";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";

const fmt = (iso) =>
  new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event] = useState(() => eventsService.get(eventId));
  const [registrations, setRegistrations] = useState(() => registrationsService.listByEvent(eventId));
  const [attendees] = useState(() => attendeesService.list());
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedAttendeeId, setSelectedAttendeeId] = useState("");

  const refresh = () => setRegistrations(registrationsService.listByEvent(eventId));

  const attendeeById = useMemo(
    () => Object.fromEntries(attendees.map((a) => [a.id, a])),
    [attendees]
  );

  const registeredIds = useMemo(() => new Set(registrations.map((r) => r.attendeeId)), [registrations]);
  const availableAttendees = attendees.filter((a) => !registeredIds.has(a.id));

  const stats = useMemo(() => {
    const total = registrations.length;
    const attended = registrations.filter((r) => r.attendanceStatus === ATTENDANCE_STATUS.ATTENDED).length;
    const noShow = registrations.filter((r) => r.attendanceStatus === ATTENDANCE_STATUS.NO_SHOW).length;
    return { total, attended, noShow };
  }, [registrations]);

  if (!event) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
        Etkinlik bulunamadı.{" "}
        <Link to="/" className="text-indigo-600 hover:underline">Etkinlik listesine dön</Link>
      </div>
    );
  }

  const handleAddRegistration = () => {
    if (!selectedAttendeeId) return;
    registrationsService.create({
      eventId,
      attendeeId: selectedAttendeeId,
      registrationDate: new Date().toISOString(),
      attendanceStatus: ATTENDANCE_STATUS.REGISTERED,
    });
    refresh();
    setAddModalOpen(false);
    setSelectedAttendeeId("");
  };

  const handleStatusChange = (registrationId, attendanceStatus) => {
    registrationsService.update(registrationId, { attendanceStatus });
    refresh();
  };

  const handleRemoveRegistration = (registrationId) => {
    registrationsService.remove(registrationId);
    refresh();
  };

  return (
    <div>
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm text-slate-500 hover:text-slate-700"
      >
        ← Etkinlik listesine dön
      </button>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-center gap-2">
          <h2 className="text-xl font-semibold text-slate-900">{event.title}</h2>
          <StatusBadge status={event.status} label={EVENT_STATUS_LABELS[event.status]} />
        </div>
        <p className="mb-3 text-sm text-slate-600">{event.description || "Açıklama girilmemiş."}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-500 sm:grid-cols-4">
          <div><span className="block text-xs uppercase text-slate-400">Kategori</span>{event.category}</div>
          <div><span className="block text-xs uppercase text-slate-400">Konum</span>{event.location || "—"}</div>
          <div><span className="block text-xs uppercase text-slate-400">Başlangıç</span>{fmt(event.startDateTime)}</div>
          <div><span className="block text-xs uppercase text-slate-400">Bitiş</span>{fmt(event.endDateTime)}</div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold text-slate-900">{stats.total}/{event.capacity}</p>
          <p className="text-xs text-slate-500">Kayıtlı / Kapasite</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold text-emerald-600">{stats.attended}</p>
          <p className="text-xs text-slate-500">Katıldı</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm">
          <p className="text-2xl font-semibold text-amber-600">{stats.noShow}</p>
          <p className="text-xs text-slate-500">Gelmedi</p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Katılımcı Listesi</h3>
        <Button onClick={() => setAddModalOpen(true)} disabled={availableAttendees.length === 0}>
          + Katılımcı Ekle
        </Button>
      </div>

      {registrations.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          Bu etkinliğe henüz kimse kayıt edilmedi.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Ad Soyad</th>
                <th className="px-4 py-3">Kayıt Tarihi</th>
                <th className="px-4 py-3">Katılım Durumu</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {registrations.map((r) => {
                const attendee = attendeeById[r.attendeeId];
                return (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {attendee?.fullName ?? "Silinmiş katılımcı"}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{fmt(r.registrationDate)}</td>
                    <td className="px-4 py-3">
                      <select
                        className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        value={r.attendanceStatus}
                        onChange={(e) => handleStatusChange(r.id, e.target.value)}
                      >
                        {Object.entries(ATTENDANCE_STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="danger" onClick={() => handleRemoveRegistration(r.id)}>
                        Çıkar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {addModalOpen && (
        <Modal title="Etkinliğe Katılımcı Ekle" onClose={() => setAddModalOpen(false)}>
          {availableAttendees.length === 0 ? (
            <p className="text-sm text-slate-500">Eklenebilecek başka katılımcı yok.</p>
          ) : (
            <div className="space-y-4">
              <select
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                value={selectedAttendeeId}
                onChange={(e) => setSelectedAttendeeId(e.target.value)}
              >
                <option value="">Katılımcı seçin...</option>
                {availableAttendees.map((a) => (
                  <option key={a.id} value={a.id}>{a.fullName}</option>
                ))}
              </select>
              <div className="flex justify-end gap-2">
                <Button variant="secondary" onClick={() => setAddModalOpen(false)}>İptal</Button>
                <Button onClick={handleAddRegistration} disabled={!selectedAttendeeId}>Ekle</Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}