import { useState } from "react";
import Button from "./Button";
import { EVENT_CATEGORIES, EVENT_STATUS, EVENT_STATUS_LABELS } from "../interfaces/constants";

const EMPTY = {
  title: "",
  description: "",
  location: "",
  category: EVENT_CATEGORIES[0],
  startDateTime: "",
  endDateTime: "",
  capacity: 20,
  status: EVENT_STATUS.SCHEDULED,
};

export default function EventForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValue ?? EMPTY);

  const update = (field) => (e) => {
    const value = field === "capacity" ? Number(e.target.value) : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.startDateTime || !form.endDateTime) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Başlık *</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={form.title}
          onChange={update("title")}
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Açıklama</label>
        <textarea
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          rows={2}
          value={form.description}
          onChange={update("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Kategori</label>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.category}
            onChange={update("category")}
          >
            {EVENT_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Konum</label>
          <input
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.location}
            onChange={update("location")}
            placeholder="Google Meet, Ataşehir Ofis vb."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Başlangıç *</label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.startDateTime}
            onChange={update("startDateTime")}
            required
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Bitiş *</label>
          <input
            type="datetime-local"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.endDateTime}
            onChange={update("endDateTime")}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Kapasite</label>
          <input
            type="number"
            min={1}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.capacity}
            onChange={update("capacity")}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Durum</label>
          <select
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={form.status}
            onChange={update("status")}
          >
            {Object.entries(EVENT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>İptal</Button>
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}