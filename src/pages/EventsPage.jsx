import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { eventsService } from "../services/eventsService";
import { EVENT_STATUS_LABELS, EVENT_CATEGORIES } from "../interfaces/constants";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/Button";
import Modal from "../components/Modal";
import EventForm from "../components/EventForm";

const fmt = (iso) =>
  new Date(iso).toLocaleString("tr-TR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });

export default function EventsPage() {
  const [events, setEvents] = useState(() => eventsService.list());
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalMode, setModalMode] = useState(null); // "create" | event object
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const refresh = () => setEvents(eventsService.list());

  const filtered = useMemo(
    () =>
      events.filter(
        (e) =>
          (statusFilter === "all" || e.status === statusFilter) &&
          (categoryFilter === "all" || e.category === categoryFilter)
      ),
    [events, statusFilter, categoryFilter]
  );

  const handleCreate = (data) => {
    eventsService.create(data);
    refresh();
    setModalMode(null);
  };

  const handleUpdate = (data) => {
    eventsService.update(modalMode.id, data);
    refresh();
    setModalMode(null);
  };

  const handleDelete = (id) => {
    eventsService.remove(id);
    refresh();
    setConfirmDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Etkinlikler</h2>
          <p className="text-sm text-slate-500">{filtered.length} etkinlik listeleniyor</p>
        </div>
        <Button onClick={() => setModalMode("create")}>+ Yeni Etkinlik</Button>
      </div>

      <div className="mb-4 flex flex-wrap gap-3">
        <select
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tüm durumlar</option>
          {Object.entries(EVENT_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        <select
          className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Tüm kategoriler</option>
          {EVENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Kriterlere uyan etkinlik yok.
        </div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center gap-2">
                  <Link to={`/events/${event.id}`} className="truncate font-medium text-slate-900 hover:text-indigo-600">
                    {event.title}
                  </Link>
                  <StatusBadge status={event.status} label={EVENT_STATUS_LABELS[event.status]} />
                </div>
                <p className="text-xs text-slate-500">
                  {event.category} · {event.location || "Konum belirtilmemiş"} · {fmt(event.startDateTime)} — {fmt(event.endDateTime)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button variant="secondary" onClick={() => setModalMode(event)}>Düzenle</Button>
                <Button variant="danger" onClick={() => setConfirmDeleteId(event.id)}>Sil</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modalMode && (
        <Modal title={modalMode === "create" ? "Yeni Etkinlik" : "Etkinliği Düzenle"} onClose={() => setModalMode(null)}>
          <EventForm
            initialValue={modalMode === "create" ? undefined : modalMode}
            onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
            onCancel={() => setModalMode(null)}
          />
        </Modal>
      )}

      {confirmDeleteId && (
        <Modal title="Etkinliği sil?" onClose={() => setConfirmDeleteId(null)}>
          <p className="mb-4 text-sm text-slate-600">
            Bu etkinlik ve ona bağlı tüm katılım kayıtları kalıcı olarak silinecek.
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setConfirmDeleteId(null)}>Vazgeç</Button>
            <Button variant="danger" onClick={() => handleDelete(confirmDeleteId)}>Sil</Button>
          </div>
        </Modal>
      )}
    </div>
  );
}