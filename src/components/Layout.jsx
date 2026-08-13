import { NavLink, Outlet } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive
      ? "bg-indigo-600 text-white"
      : "text-slate-600 hover:bg-slate-100"
  }`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Program Etkinlik Yönetimi
            </h1>
            <p className="text-xs text-slate-500">
              Mesleki gelişim programı için etkinlik ve katılımcı takibi
            </p>
          </div>
          <nav className="flex gap-2">
            <NavLink to="/" end className={navItemClass}>
              Etkinlikler
            </NavLink>
            <NavLink to="/attendees" className={navItemClass}>
              Katılımcılar
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-6 text-center text-xs text-slate-400">
        Web Geliştirme; Yapay Zeka projesi — React + Vite + Tailwind CSS
      </footer>
    </div>
  );
}