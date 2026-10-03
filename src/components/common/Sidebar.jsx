import { NavLink } from "react-router-dom";
import { Home, User, Clock, HeartHandshake, Settings, LogOut,  Droplet } from "lucide-react";

const items = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/profile", label: "My Profile", icon: User },
  { to: "/history", label: "History", icon: Clock },
  { to: "/requests", label: "Requests", icon: HeartHandshake },
  { to: "/receiver-register", label: "Need Blood?", icon: Droplet },
  { to: "/settings", label: "Settings", icon: Settings },
];

const base = "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200";

export default function Sidebar({ onNavigate, onLogout }) {
  return (
    <nav className="flex h-full flex-col gap-1 p-4" aria-label="Main navigation">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink key={to} to={to} onClick={onNavigate}
          className={({ isActive }) => `${base} ${isActive ? "bg-brand-soft text-brand shadow-sm" : "text-foreground hover:bg-muted hover:translate-x-0.5"}`}>
          {({ isActive }) => <><Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-brand" : "text-muted-foreground"}`} />{label}</>}
        </NavLink>
      ))}
      <div className="my-3 border-t border-border" />
      <button type="button" onClick={onLogout} className={`${base} text-brand hover:bg-brand-soft`}>
        <LogOut className="h-5 w-5" />Logout
      </button>
    </nav>
  );
}
