import { useEffect, useState } from "react";
import { Pencil, Check, Droplet, ShieldCheck, Droplets } from "lucide-react";
import { getInitials } from "@/utils/auth";
import { getMe, saveDonorProfile } from "../api";

const emptyDonor = {
  fullName: "",
  bloodGroup: "",
  phone: "",
  email: "",
  dob: "",
  gender: "",
  weight: "",
  house: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  lastDonationDate: "",
  totalDonations: 0,
};

function fromUser(user) {
  const d = user.donor || {};
  return {
    fullName: user.name || "",
    email: user.email || "",
    bloodGroup: d.bloodGroup || "",
    phone: d.phone || "",
    dob: d.dob ? String(d.dob).slice(0, 10) : "",
    gender: d.gender || "",
    weight: d.weight || "",
    house: d.house || "",
    street: d.street || "",
    city: d.city || "",
    state: d.state || "",
    pincode: d.pincode || "",
    lastDonationDate: d.lastDonationDate ? String(d.lastDonationDate).slice(0, 10) : "",
    totalDonations: 0,
  };
}

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15";

export default function Profile() {
  const [donor, setDonor] = useState(emptyDonor);
  const [draft, setDraft] = useState(emptyDonor);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMe()
      .then((data) => {
        const loaded = fromUser(data.user);
        setDonor(loaded);
        setDraft(loaded);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function save() {
    setError("");
    setSaving(true);
    try {
      const data = await saveDonorProfile(draft);
      const updated = fromUser(data.user);
      setDonor(updated);
      setDraft(updated);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const address = [donor.house, donor.street, donor.city, donor.state, donor.pincode]
    .filter(Boolean)
    .join(", ");

  const fields = [
    { label: "Full Name", key: "fullName" },
    { label: "Blood Group", key: "bloodGroup" },
    { label: "Phone", key: "phone" },
    { label: "Email", key: "email", readOnly: true },
    { label: "Date of Birth", key: "dob" },
    { label: "Gender", key: "gender" },
    { label: "Weight (kg)", key: "weight" },
    { label: "City", key: "city" },
    { label: "Last Donation Date", key: "lastDonationDate" },
  ];

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading your profile...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        {editing ? (
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
          >
            <Check className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
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

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

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
          <MiniStat icon={Droplet} label="Blood Group" value={donor.bloodGroup || "—"} tone="brand" />
          <MiniStat icon={Droplets} label="Total Donations" value={donor.totalDonations} tone="info" />
          <MiniStat icon={ShieldCheck} label="Eligibility" value="Eligible" tone="success" />
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="text-lg font-bold tracking-tight">Donor Details</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">
          {fields.map(({ label, key, readOnly }) => (
            <div key={key}>
              <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {label}
              </dt>
              {editing && !readOnly ? (
                <input
                  value={draft[key] || ""}
                  onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                  className={inputClass}
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
      <span className={"flex h-11 w-11 items-center justify-center rounded-full " + tones[tone]}>
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}