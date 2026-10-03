export default function StatusBadge({ status }) {
  const styles =
    status === "Successful"
      ? "bg-success-soft text-success"
      : status === "Cancelled"
        ? "bg-brand-soft text-brand"
        : "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${styles}`}>
      {status}
    </span>
  );
}
