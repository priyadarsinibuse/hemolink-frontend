export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
  icon: Icon,
  options,
  as = "input",
}) {
  const shared =
    "h-12 w-full rounded-xl border bg-background text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/15";
  const border = error ? "border-brand" : "border-border focus:border-brand";
  const padding = Icon ? "pl-[44px] pr-4" : "px-4";

  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-brand">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-[15px] top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
        )}
        {as === "select" ? (
          <select
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${shared} ${border} ${padding} appearance-none`}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(name, e.target.value)}
            className={`${shared} ${border} ${padding}`}
            style={Icon ? { paddingLeft: "44px" } : undefined} 
          />
        )}
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-brand">{error}</p>}
    </div>
  );
}
