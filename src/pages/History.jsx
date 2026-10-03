import { useMemo, useState } from "react";
import { Droplets, CalendarClock, MapPin } from "lucide-react";
import DonationHistory from "@/components/dashboard/DonationHistory";
import { donations, donationLocations, donationStatuses } from "@/data/donations";

export default function History() {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const filtered = useMemo(
    () =>
      donations.filter(
        (d) =>
          (!date || d.date.toLowerCase().includes(date.toLowerCase())) &&
          (!location || d.location === location) &&
          (!status || d.status === status),
      ),
    [date, location, status],
  );

  const successful = donations.filter((d) => d.status === "Successful");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donation History</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          A complete record of your contributions.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Summary icon={Droplets} label="Total Donations" value={successful.length} tone="info" />
        <Summary
          icon={CalendarClock}
          label="Last Donation"
          value={donations[0].date}
          tone="brand"
        />
        <Summary icon={MapPin} label="Locations" value={donationLocations.length} tone="camp" />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Filters</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Search by date (e.g. 2024)"
            aria-label="Filter by date"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
          />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
          >
            <option value="">All locations</option>
            {donationLocations.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
            className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
          >
            <option value="">All statuses</option>
            {donationStatuses.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </section>

      <DonationHistory items={filtered} />
    </div>
  );
}

function Summary({ icon: Icon, label, value, tone }) {
  const tones = {
    brand: "bg-brand-soft text-brand",
    info: "bg-info-soft text-info",
    camp: "bg-camp-soft text-camp",
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${tones[tone]}`}>
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
}
