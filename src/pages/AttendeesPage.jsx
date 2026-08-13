import { useState } from "react";
import { attendeesService } from "../services/eventsService";
import Button from "../components/Button";
import Modal from "../components/Modal";
import AttendeeForm from "../components/AttendeeForm";

export default function AttendeesPage() {
  const [attendees, setAttendees] = useState(() => attendeesService.list());
  const [modalMode, setModalMode] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const refresh = () => setAttendees(attendeesService.list());

  const handleCreate = (data) => {
    attendeesService.create(data);
    refresh();
    setModalMode(null);
  };

  const handleUpdate = (data) => {
    attendeesService.update(modalMode.id, data);
    refresh();
    setModalMode(null);
  };

  const handleDelete = (id) => {
    attendeesService.remove(id);
    refresh();
    setConfirmDeleteId(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Katılımcılar</h2>
          <p className="text-sm text-slate-500">{attendees.length} kayıtlı katılımcı</p>
        </div>
        <Button onClick={() => setModalMode("create")}>+ Yeni Katılımcı</Button>
      </div>

      {attendees.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          Henüz katılımcı eklenmedi.
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs font-medium uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Ad Soyad</th>
                <th className="px-4 py-3">E-posta</th>
                <th className="px-4 py-3">Telefon</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendees.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-medium text-slate-900">{a.fullName}</td>
                  <td className="px-4 py-3 text-slate-600">{a.email || "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{a.phone || "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button variant="secondary" onClick={() => setModalMode(a)}>Düzenle</Button>
                      <Button variant="danger" onClick={() => setConfirmDeleteId(a.id)}>Sil</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalMode && (
        <Modal title={modalMode === "create" ? "Yeni Katılımcı" : "Katılımcıyı Düzenle"} onClose={() => setModalMode(null)}>
          <AttendeeForm
            initialValue={modalMode === "create" ? undefined : modalMode}
            onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
            onCancel={() => setModalMode(null)}
          />
        </Modal>
      )}

      {confirmDeleteId && (
        <Modal title="Katılımcıyı sil?" onClose={() => setConfirmDeleteId(null)}>
          <p className="mb-4 text-sm text-slate-600">
            Bu katılımcı ve tüm etkinlik kayıtları kalıcı olarak silinecek.
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