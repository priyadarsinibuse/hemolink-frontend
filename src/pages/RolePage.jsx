import { useState } from "react";
import { Droplet, HandHeart, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png.jpeg";
import "./RolePage.css";

import { setRole } from "../api";

export default function App() {
  const [selected, setSelected] = useState("donor");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const choose = async (role, path) => {
    if (saving) return;
    setError("");
    setSelected(role);
    try {
      setSaving(true);
      const data = await setRole(role);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate(path);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="role-page min-h-screen bg-background">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-4 py-4 sm:px-8">
        <span className="text-lg font-bold tracking-tight text-foreground">
          Hemo<span className="text-primary">Link</span>
        </span>

        <Link
          to="/Home"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-bold uppercase tracking-wide text-primary-foreground shadow-sm transition-transform hover:scale-105 hover:bg-primary/90"
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex items-center justify-center px-4 pb-4 pt-4">
        {/* WHITE ROLE BOX */}
        <div className="role-card rounded-3xl border border-border bg-card p-8 shadow-[0_20px_60px_-30px_oklch(0.52_0.21_25/0.35)]">
          {/* LOGO */}
          <div className="flex flex-col items-center">
            <img
              src={logo}
              alt="HemoLink — Connect, Donate, Save Lives"
              width={1254}
              height={1254}
              className="h-40 w-40 object-contain sm:h-48 sm:w-48"
            />
          </div>

          {/* TITLE */}
          <div className="mt-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Select Your Role
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Choose how you would like to continue
            </p>
          </div>

          {/* DONOR + RECIPIENT CARDS */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 role-options">
            {/* DONOR */}
            <RoleCard
              active={selected === "donor"}
              onSelect={() => choose("donor", "/register")}
              icon={
                <Droplet
                  className="h-8 w-8 fill-primary text-primary"
                  strokeWidth={0}
                />
              }
              title="Donor"
              description="I want to donate blood and help save lives."
            />

            {/* RECIPIENT */}
            <RoleCard
              active={selected === "recipient"}
              onSelect={() => choose("recipient", "/receiver-register")}
              icon={<HandHeart className="h-8 w-8 text-primary" />}
              title="Recipient"
              description="I need blood donation support."
            />

            {error && (
              <p className="col-span-full text-center text-sm text-red-600">
                {error}
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ROLE CARD COMPONENT */

function RoleCard({ active, onSelect, icon, title, description }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`
        group
        flex
        min-h-[250px]
        cursor-pointer
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        p-6
        text-center
        outline-none
        transition-all

        focus-visible:ring-2
        focus-visible:ring-ring

        ${
          active
            ? "border-primary bg-accent/40 shadow-sm"
            : "border-border bg-card hover:border-primary/40 hover:bg-accent/20"
        }
      `}
    >
      {/* ICON */}
      <span
        className={`
          flex
          h-20
          w-20
          shrink-0
          items-center
          justify-center
          rounded-full
          transition-colors

          ${active ? "bg-accent" : "bg-muted"}
        `}
      >
        {icon}
      </span>

      {/* TITLE */}
      <h2 className="mt-5 text-lg font-semibold text-foreground">{title}</h2>

      {/* DESCRIPTION */}
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}