import { useMemo, useState } from "react";
import { Check, Clock, MapPin, Phone, Mail, X } from "lucide-react";
import { emergencyRequests, bloodGroups, urgencyLevels } from "@/data/requests";

const urgencyStyles = {
  Critical: "bg-brand-soft text-brand",
  High: "bg-warn-soft text-warn",
  Moderate: "bg-info-soft text-info",
};

export default function Requests() {
  const [group, setGroup] = useState("");
  const [urgency, setUrgency] = useState("");
  const [selected, setSelected] = useState(null);
  const [requestStatus, setRequestStatus] = useState({});

  const filtered = useMemo(
    () =>
      emergencyRequests.filter(
        (r) =>
          (!group || r.bloodGroup === group) &&
          (!urgency || r.urgency === urgency),
      ),
    [group, urgency],
  );

  const status = selected ? requestStatus[selected.id] : null;

  function handleDecision(decision) {
    if (!selected) return;
    setRequestStatus((current) => ({ ...current, [selected.id]: decision }));
  }

  function closeDialog() {
    setSelected(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Requests</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Review blood requests submitted by receivers. Contact details are shared only after you accept a request.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Filters</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <select value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Filter by blood group" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15">
            <option value="">All blood groups</option>
            {bloodGroups.map((b) => <option key={b}>{b}</option>)}
          </select>
          <select value={urgency} onChange={(e) => setUrgency(e.target.value)} aria-label="Filter by urgency" className="h-11 rounded-xl border border-border bg-background px-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15">
            <option value="">All urgency levels</option>
            {urgencyLevels.map((u) => <option key={u}>{u}</option>)}
          </select>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((r) => {
          const cardStatus = requestStatus[r.id];
          return (
            <article key={r.id} className="rounded-2xl border border-brand/15 bg-brand-tint p-5 shadow-card">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-brand-foreground">{r.bloodGroup}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-brand">Needed: {r.units} {r.units === 1 ? "Unit" : "Units"}</h2>
                    <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${urgencyStyles[r.urgency]}`}>{r.urgency}</span>
                    {cardStatus === "accepted" && <span className="rounded-md bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">Accepted</span>}
                    {cardStatus === "rejected" && <span className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">Rejected</span>}
                  </div>
                  <p className="text-sm">{r.hospital}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.distance} km away</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {r.postedAgo}</span>
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setSelected(r)} className="mt-4 w-full rounded-lg border border-brand bg-background px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft">
                {cardStatus === "accepted" ? "View Shared Details" : "View Request"}
              </button>
            </article>
          );
        })}
        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No requests match your filters.</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/40" onClick={closeDialog} aria-hidden="true" />
          <div role="dialog" aria-modal="true" aria-label="Request details" className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-card">
            <button type="button" aria-label="Close" onClick={closeDialog} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"><X className="h-5 w-5" /></button>
            <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand text-lg font-bold text-brand-foreground">{selected.bloodGroup}</span>
            <h2 className="mt-4 text-xl font-bold tracking-tight">Blood Request</h2>
            <p className="mt-1 text-sm text-muted-foreground">Requested for {selected.hospital}</p>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Blood group" value={selected.bloodGroup} />
              <Row label="Units needed" value={selected.units} />
              <Row label="Urgency" value={selected.urgency} />
              <Row label="Distance" value={`${selected.distance} km away`} />
              <Row label="Posted" value={selected.postedAgo} />
            </dl>
            <div className="mt-4 rounded-xl bg-muted/50 p-3 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Message: </span>{selected.message}
            </div>

            {!status && (
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button type="button" onClick={() => handleDecision("reject")} className="rounded-xl border border-border px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted">Reject</button>
                <button type="button" onClick={() => handleDecision("accepted")} className="rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90">Accept Request</button>
              </div>
            )}

            {status === "accepted" && (
              <div className="mt-6 rounded-xl border border-success/30 bg-success-soft p-4">
                <div className="flex items-center gap-2 text-sm font-bold text-success"><Check className="h-4 w-4" /> Request accepted</div>
                <p className="mt-1 text-xs text-muted-foreground">Receiver contact details are now available to you.</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p><span className="font-semibold">Receiver:</span> {selected.receiverName}</p>
                  <p className="flex items-center gap-2"><Phone className="h-4 w-4" /> {selected.receiverPhone}</p>
                  <p className="flex items-center gap-2 break-all"><Mail className="h-4 w-4 shrink-0" /> {selected.receiverEmail}</p>
                </div>
              </div>
            )}

            {status === "reject" && (
              <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4 text-sm">
                <p className="font-semibold">Request rejected</p>
                <p className="mt-1 text-muted-foreground">Receiver contact details have not been shared.</p>
              </div>
            )}

            {status && <button type="button" onClick={closeDialog} className="mt-4 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90">Close</button>}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  return <div className="flex justify-between gap-4 border-b border-border pb-2 last:border-0"><dt className="text-muted-foreground">{label}</dt><dd className="text-right font-semibold">{value}</dd></div>;
}
