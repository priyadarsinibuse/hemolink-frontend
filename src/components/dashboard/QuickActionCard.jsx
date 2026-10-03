import { ArrowRight } from "lucide-react";

const accents = {
  brand: { wrap: "bg-brand-soft", icon: "text-brand", arrow: "text-brand" },
  info: { wrap: "bg-info-soft", icon: "text-info", arrow: "text-info" },
  camp: { wrap: "bg-camp-soft", icon: "text-camp", arrow: "text-camp" },
  warn: { wrap: "bg-warn-soft", icon: "text-warn", arrow: "text-warn" },
};

export default function QuickActionCard({ title, description, icon: Icon, accent, onClick }) {
  const a = accents[accent];
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-full w-full flex-col rounded-2xl border border-border bg-card p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-brand/25 hover:shadow-lift focus:outline-none focus:ring-2 focus:ring-brand/25"
    >
      <span className={`flex h-12 w-12 items-center justify-center rounded-full ${a.wrap}`}>
        <Icon className={`h-6 w-6 ${a.icon}`} />
      </span>
      <span className="mt-4 text-base font-bold tracking-tight">{title}</span>
      <span className="mt-1 flex-1 text-sm text-muted-foreground">{description}</span>
      <ArrowRight
        className={`mt-4 h-5 w-5 self-end transition-transform group-hover:translate-x-1 ${a.arrow}`}
      />
    </button>
  );
}
