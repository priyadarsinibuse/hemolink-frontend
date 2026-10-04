import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../dashboard.css";
import {
  ArrowRight,
  ArrowLeft,
  User,
  Calendar,
  Weight,
  Phone,
  Mail,
  Home,
  MapPin,
  Building2,
  Map,
  Lock,
  Droplet,
  ShieldPlus,
} from "lucide-react";
import Logo from "@/components/common/Logo";

import FormInput from "@/components/registration/FormInput";
import RegistrationStepper from "@/components/registration/RegistrationStepper";
import { bloodGroups } from "@/data/requests";
import { saveDonor } from "@/utils/storage";
import { saveDonorProfile } from "../api";

const initialForm = {
  fullName: "",
  dob: "",
  bloodGroup: "",
  gender: "",
  weight: "",
  phone: "",
  email: "",
  house: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  lastDonationDate: "",
  firstTime: "",
  chronicIllness: "",
  medication: "",
  tattooRecent: "",
};

const highlights = [
  { icon: Droplet, title: "Donate Blood", body: "Your donation can save up to 3 lives." },
  { icon: MapPin, title: "Help Nearby", body: "Respond to emergency requests in your area." },
  { icon: ShieldPlus, title: "Be a Hero", body: "Every drop counts. Be the reason someone lives." },
];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(() => {
    try {
      const u = JSON.parse(localStorage.getItem("user") || "null");
      return { ...initialForm, fullName: u?.name || "", email: u?.email || "" };
    } catch {
      return initialForm;
    }
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function setField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }
  function handleNext() {
    setStep((s) => Math.min(3, s + 1));
  }

  // Called only by an explicit click on the final Next button.
  async function handleCompleteRegistration() {
    if (step !== 3 || saving) return;
    setError("");

    if (!form.bloodGroup || !form.phone.trim() || !form.city.trim()) {
      return setError("Please fill blood group, phone number and city");
    }

    try {
      setSaving(true);
      const data = await saveDonorProfile(form);
      localStorage.setItem("user", JSON.stringify(data.user));
      saveDonor({
        ...form,
        totalDonations: form.firstTime === "Yes" ? 0 : 7,
        registeredAt: new Date().toISOString(),
      });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-[380px_1fr]">
      {/* Left brand panel */}
      <aside className="flex flex-col border-b border-border bg-brand-tint px-6 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:py-12">
        <div className="w-full">
          <Logo className="max-h-64 lg:max-h-72" />
        </div>

        <h2 className="mt-10 text-4xl font-bold leading-tight tracking-tight lg:text-5xl">
          Save Lives,
          <br />
          <span className="text-brand">Be a Hero</span>
        </h2>

        <div className="mt-8 space-y-5">
          {highlights.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft">
                <Icon className="h-5 w-5 text-brand" />
              </span>
              <div>
                <h3 className="text-base font-bold tracking-tight">{title}</h3>
                <p className="mt-1 text-sm leading-5 text-muted-foreground">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Form */}
      <main className="px-5 py-8 sm:px-10 sm:py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Donor Registration</h1>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Move through each section and complete registration when you are ready
              </p>
            </div>
          </div>

          <div className="mt-8 sm:mt-10">
            <RegistrationStepper current={step} />
          </div>

          <div className="mt-10">
            {step === 1 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Full Name"
                  name="fullName"
                  icon={User}
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={setField}
                />
                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  icon={Calendar}
                  value={form.dob}
                  onChange={setField}
                />
                <FormInput
                  label="Blood Group"
                  name="bloodGroup"
                  as="select"
                  options={bloodGroups}
                  placeholder="Select your blood group"
                  value={form.bloodGroup}
                  onChange={setField}
                />
                <FormInput
                  label="Gender"
                  name="gender"
                  as="select"
                  options={["Male", "Female", "Other"]}
                  placeholder="Select gender"
                  value={form.gender}
                  onChange={setField}
                />
                <FormInput
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  icon={Weight}
                  placeholder="Enter your weight"
                  value={form.weight}
                  onChange={setField}
                />
                <FormInput
                  label="Phone Number"
                  name="phone"
                  icon={Phone}
                  placeholder="Enter your phone number"
                  value={form.phone}
                  onChange={setField}
                />
                <div className="sm:col-span-2">
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="Enter your email address"
                    value={form.email}
                    onChange={setField}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="House / Building / Flat No."
                  name="house"
                  icon={Home}
                  placeholder="Enter house / building / flat no."
                  value={form.house}
                  onChange={setField}
                />
                <FormInput
                  label="Street / Area / Locality"
                  name="street"
                  icon={MapPin}
                  placeholder="Enter street / area / locality"
                  value={form.street}
                  onChange={setField}
                />
                <FormInput
                  label="City / Town"
                  name="city"
                  icon={Building2}
                  placeholder="Enter city / town"
                  value={form.city}
                  onChange={setField}
                />
                <FormInput
                  label="State"
                  name="state"
                  icon={Map}
                  placeholder="Enter state"
                  value={form.state}
                  onChange={setField}
                />
                <FormInput
                  label="PIN / Postal Code"
                  name="pincode"
                  icon={Mail}
                  placeholder="Enter PIN / postal code"
                  value={form.pincode}
                  onChange={setField}
                />
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 sm:grid-cols-2">
                <FormInput
                  label="Last Donate Date"
                  name="lastDonationDate"
                  type="date"
                  icon={Calendar}
                  value={form.lastDonationDate}
                  onChange={setField}
                />
                <RadioField
                  label="Are you a first-time donor?"
                  name="firstTime"
                  value={form.firstTime}
                  onChange={setField}
                />
                <RadioField
                  label="Do you have any chronic illness?"
                  name="chronicIllness"
                  value={form.chronicIllness}
                  onChange={setField}
                />
                <RadioField
                  label="Are you currently on medication?"
                  name="medication"
                  value={form.medication}
                  onChange={setField}
                />
                <RadioField
                  label="Tattoo or piercing in the last 6 months?"
                  name="tattooRecent"
                  value={form.tattooRecent}
                  onChange={setField}
                />
              </div>
            )}

            {error && (
              <p className="mt-6 text-sm font-medium text-red-600">{error}</p>
            )}

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-4 w-4" />
                You can move between sections now; details can be completed later.
              </p>

              <div className="flex items-center gap-3">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
                  >
                    Next <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleCompleteRegistration}
                    disabled={saving}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
                  >
                    {saving ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-foreground border-t-transparent" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Next <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function RadioField({ label, name, value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-foreground">
        {label}
      </legend>
      <div className="flex h-12 items-center gap-6">
        {["Yes", "No"].map((opt) => (
          <label key={opt} className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={() => onChange(name, opt)}
              className="h-4 w-4 accent-[var(--brand)]"
            />
            {opt}
          </label>
        ))}
      </div>
    </fieldset>
  );
}