import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StatusBadge from "../dashboard/StatusBadge";

export default function DonationHistory({ items }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight">Recent Donation History</h2>
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-opacity hover:opacity-75"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Table: tablet and up */}
      <div className="mt-5 hidden overflow-x-auto sm:block">
        <table className="w-full min-w-[420px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="pb-3 pr-4 font-semibold">Date</th>
              <th className="pb-3 pr-4 font-semibold">Blood Group</th>
              <th className="pb-3 pr-4 font-semibold">Location</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.id} className="border-b border-border/70 last:border-0">
                <td className="py-4 pr-4 text-sm text-foreground">{d.date}</td>
                <td className="py-4 pr-4 text-sm font-bold text-brand">{d.bloodGroup}</td>
                <td className="py-4 pr-4 text-sm text-foreground">{d.location}</td>
                <td className="py-4">
                  <StatusBadge status={d.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards: mobile */}
      <ul className="mt-5 space-y-3 sm:hidden">
        {items.map((d) => (
          <li key={d.id} className="rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{d.date}</span>
              <StatusBadge status={d.status} />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{d.location}</p>
            <p className="mt-1 text-sm font-bold text-brand">{d.bloodGroup}</p>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">No donations match your filters.</p>
      )}
    </section>
  );
}
