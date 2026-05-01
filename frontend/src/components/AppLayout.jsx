import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { clearCurrentUser, getCurrentUser } from "../services/auth";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/matches", label: "Matches", icon: "sports_soccer" },
  { to: "/teams", label: "Teams", icon: "groups" },
  { to: "/profile", label: "Profile", icon: "account_circle" },
];

function initials(user) {
  const first = user?.firstName?.[0] || "S";
  const last = user?.lastName?.[0] || "M";
  return `${first}${last}`.toUpperCase();
}

export default function AppLayout({ title, subtitle, badge, actions, children }) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const logout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen">
      <aside className="h-screen w-64 fixed left-0 top-0 bg-stone-100 flex flex-col p-6 gap-8 z-50">
        <div className="flex flex-col gap-1">
          <h1 className="font-headline font-extrabold text-2xl text-indigo-950">SportMate</h1>
          <p className="font-label text-xs text-stone-500 uppercase tracking-widest">Management Suite</p>
        </div>

        <nav className="flex flex-col gap-2 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-headline font-semibold text-base transition-all duration-200 ${
                  isActive
                    ? "bg-white text-indigo-900 shadow-sm translate-x-1 font-bold"
                    : "text-stone-600 hover:bg-stone-200 hover:translate-x-1"
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-200 rounded-lg font-headline font-semibold">
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </aside>

      <main className="ml-64 flex-grow min-h-screen relative">
        <header className="sticky top-0 z-40 flex justify-between items-center px-12 w-full h-16 bg-stone-50/70 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <span className="font-headline font-bold text-xl tracking-tight text-indigo-950">{title}</span>
            {badge && <span className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{badge}</span>}
          </div>

          <div className="flex items-center gap-4">
            {actions}
            <Link to="/profile" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs ring-2 ring-stone-200 overflow-hidden">
                {user?.profileImage ? <img alt="Profile" src={user.profileImage} className="w-full h-full object-cover" /> : initials(user)}
              </div>
            </Link>
          </div>
        </header>

        <div className="p-12 max-w-7xl mx-auto space-y-8">
          <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-3">
              <h1 className="font-headline text-5xl leading-none text-primary">{title}</h1>
              {subtitle && <p className="font-body text-on-surface-variant leading-relaxed text-lg max-w-3xl">{subtitle}</p>}
            </div>
          </section>
          {children}
        </div>
      </main>
    </div>
  );
}
