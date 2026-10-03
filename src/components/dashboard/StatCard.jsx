const accents = {
  brand: { wrap: "bg-brand-soft", icon: "text-brand", card: "border-brand/15 bg-brand-tint" },
  info: { wrap: "bg-info-soft", icon: "text-info", card: "border-border bg-card" },
  success: {
    wrap: "bg-success-soft",
    icon: "text-success",
    card: "border-success/20 bg-success-soft/40",
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "brand",
  valueClass = "",
  action,
}) {
  const a = accents[accent];
  return (
    <div className={`rounded-2xl border p-5 shadow-card sm:p-6 ${a.card}`}>
      <div className="flex items-start gap-4">
        <span
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${a.wrap}`}
        >
          <Icon className={`h-7 w-7 ${a.icon}`} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            {action}
          </div>
          <p className={`mt-1 text-3xl font-bold tracking-tight ${valueClass}`}>{value}</p>
          {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
