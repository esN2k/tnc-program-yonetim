const STYLES = {
  scheduled: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
  registered: "bg-slate-100 text-slate-700",
  attended: "bg-emerald-100 text-emerald-700",
  no_show: "bg-amber-100 text-amber-700",
};

export default function StatusBadge({ status, label }) {
  const style = STYLES[status] ?? "bg-slate-100 text-slate-700";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${style}`}>
      {label}
    </span>
  );
}