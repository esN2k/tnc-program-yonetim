import { useState } from "react";
import Button from "./Button";

const EMPTY = { fullName: "", email: "", phone: "" };

export default function AttendeeForm({ initialValue, onSubmit, onCancel }) {
  const [form, setForm] = useState(initialValue ?? EMPTY);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName.trim()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Ad Soyad *</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={form.fullName}
          onChange={update("fullName")}
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">E-posta</label>
        <input
          type="email"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={form.email}
          onChange={update("email")}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Telefon</label>
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="secondary" onClick={onCancel}>İptal</Button>
        <Button type="submit">Kaydet</Button>
      </div>
    </form>
  );
}