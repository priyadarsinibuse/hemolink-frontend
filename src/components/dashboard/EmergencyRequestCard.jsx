import { MapPin } from "lucide-react";

const urgencyStyles = {
  Critical: "bg-brand-soft text-brand",
  High: "bg-warn-soft text-warn",
  Moderate: "bg-info-soft text-info",
};

export default function EmergencyRequestCard({ request, showUrgency = false, onView }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-brand/15 bg-brand-tint p-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-sm font-bold text-brand-foreground">
        {request.bloodGroup}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-bold text-brand">
            Needed: {request.units} {request.units === 1 ? "Unit" : "Units"}
          </p>
          {showUrgency && (
            <span
              className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${urgencyStyles[request.urgency]}`}
            >
              {request.urgency}
            </span>
          )}
        </div>
        <p className="truncate text-sm text-foreground">{request.hospital}</p>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {request.distance} km away
        </p>
      </div>

      <button
        type="button"
        onClick={onView}
        className="shrink-0 rounded-lg border border-brand bg-background px-4 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand-soft"
      >
        View
      </button>
    </div>
  );
}
