import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Droplet, Droplets, ShieldCheck, Info, ArrowRight, ClipboardCheck, Eye, HeartHandshake } from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import EmergencyRequestCard from "@/components/dashboard/EmergencyRequestCard";
import QuickActionCard from "@/components/dashboard/QuickActionCard";
import { emergencyRequests } from "@/data/requests";
import { getCurrentDonor } from "@/utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [donor, setDonor] = useState(null);
  useEffect(() => { setDonor(getCurrentDonor()); }, []);

  const bloodGroup = donor?.bloodGroup || "O+";
  const total = donor?.totalDonations ?? 7;

  return (
    <div className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Blood Group" value={bloodGroup} icon={Droplet} accent="brand" valueClass="text-brand" />
        <StatCard title="Donations" value={total} subtitle="Total Donations" icon={Droplets} accent="info" valueClass="text-info" />
        <StatCard title="Status" value="Eligible" subtitle="You can donate blood" icon={ShieldCheck} accent="success" valueClass="text-success"
          action={<Info className="h-4 w-4 text-success" aria-hidden="true" />} />
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Emergency Requests Near You</h2>
            <p className="mt-1 text-sm text-muted-foreground">Review nearby requests and choose how you can help.</p>
          </div>
          <Link to="/requests" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand transition-opacity hover:opacity-75">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 space-y-3">
          {emergencyRequests.slice(0, 3).map((r) => (
            <EmergencyRequestCard key={r.id} request={r} onView={() => navigate("/requests")} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card sm:p-6">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Quick Actions</h2>
          <p className="mt-1 text-sm text-muted-foreground">The simple steps you can perform from your donor dashboard.</p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <QuickActionCard title="Review Requests" description="Check nearby blood requests that match your ability to help." icon={ClipboardCheck} accent="brand" onClick={() => navigate("/requests")} />
          <QuickActionCard title="View Details" description="Open a request to review the blood group, hospital and urgency." icon={Eye} accent="info" onClick={() => navigate("/requests")} />
          <QuickActionCard title="Accept & Connect" description="Accept a suitable request and continue with the donation process." icon={HeartHandshake} accent="camp" onClick={() => navigate("/requests")} />
        </div>
      </section>
    </div>
  );
}
