import { useState } from "react";

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-4 last:border-0">
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <button type="button" role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-brand" : "bg-border"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-all ${checked ? "left-[1.375rem]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function Section({ title, children }) {
  return <section className="rounded-2xl border border-border bg-card p-6 shadow-card"><h2 className="text-lg font-bold tracking-tight">{title}</h2><div className="mt-3">{children}</div></section>;
}

export default function Settings() {
  const [prefs, setPrefs] = useState({ notifications: true, showProfile: true });
  const set = (key) => (value) => setPrefs((current) => ({ ...current, [key]: value }));

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">Manage only the preferences needed for your donor experience.</p>
      </div>
      <Section title="Notifications">
        <Toggle label="Request notifications" description="Receive important updates about nearby and relevant blood requests."
          checked={prefs.notifications} onChange={set("notifications")} />
      </Section>
      <Section title="Privacy">
        <Toggle label="Profile visibility" description="Allow requesters to see the information needed to contact you after a request is accepted."
          checked={prefs.showProfile} onChange={set("showProfile")} />
      </Section>
    </div>
  );
}
