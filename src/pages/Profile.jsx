import { useEffect, useState } from "react";
import { Pencil, Check, Droplet, ShieldCheck, Droplets } from "lucide-react";
import { getCurrentDonor, getInitials } from "@/utils/auth";
import { saveDonor } from "@/utils/storage";

const fallback = {
  fullName: "Rahul Verma",
  bloodGroup: "O+",
  phone: "9876543210",
  email: "rahul.verma@example.com",
  dob: "1995-04-12",
  gender: "Male",
  weight: "72",
  house: "B-204",
  street: "Sector 12, Dwarka",
  city: "New Delhi",
  state: "Delhi",
  pincode: "110078",
  lastDonationDate: "2024-05-12",
  totalDonations: 7,
};

export default function Profile() {
  const [donor, setDonor] = useState(fallback);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(fallback);

  useEffect(() => {
    const stored = getCurrentDonor();
    if (stored) {
      const merged = { ...fallback, ...stored };
      setDonor(merged);
      setDraft(merged);
    }
  }, []);

  function save() {
    setDonor(draft);
    saveDonor(draft);
    setEditing(false);
  }

  const address = [donor.house, donor.street, donor.city, donor.state, donor.pincode]
    .filter(Boolean)
    .join(", ");

  const fields = [
    { label: "Full Name", key: "fullName" },
    { label: "Blood Group", key: "bloodGroup" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email" },
    { label: "Date of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Weight (kg)", key: "weight" },
    { label: "Last Donation Date", key: "lastDonationDate" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        {editing ? (
          <button
            type="button"
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Check className="h-4 w-4" /> Save Changes
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-brand px-5 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
          >
            <Pencil className="h-4 w-4" /> Edit Profile
          </button>
        )}
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-soft text-2xl font-bold text-brand">
            {getInitials(donor.fullName)}
          </span>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{donor.fullName}</h2>
            <p className="text-sm text-muted-foreground">{address}</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <MiniStat icon={Droplet} label="Blood Group" value={donor.bloodGroup} tone="brand" />
          <MiniStat
            icon={Droplets}
            label="Total Donations"
            value={donor.totalDonations ?? 7}
            tone="info"
          />
          <MiniStat icon={ShieldCheck} label="Eligibility" value="Eligible" tone="success" />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold tracking-tight">Donor Details</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {fields.map(({ label, key }) => (
            <div key={key}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </dt>
              {editing ? (
                <input
                  value={draft[key] || ""}
                  onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                  className="mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15"
                />
              ) : (
                <dd className="mt-1 text-sm font-semibold">{donor[key] || "—"}</dd>
              )}
            </div>
          ))}
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Address
            </dt>
            <dd className="mt-1 text-sm font-semibold">{address || "—"}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, tone }) {
  const tones = {
    brand: "bg-brand-soft text-brand",
    info: "bg-info-soft text-info",
    success: "bg-success-soft text-success",
  };
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border p-4">
      <span className={`flex h-11 w-11 items-center justify-center rounded-full ${tones[tone]}`}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
