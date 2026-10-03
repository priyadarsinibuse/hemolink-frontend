const steps = ["Personal Details", "Contact & Address", "Health Information"];

export default function RegistrationStepper({ current }) {
  return (
    <ol className="flex items-start">
      {steps.map((label, i) => {
        const n = i + 1;
        const active = n <= current;
        return (
          <li key={label} className="flex flex-1 items-start last:flex-none">
            <div className="flex w-24 flex-col items-center sm:w-32">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  active ? "bg-brand text-brand-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {n}
              </span>
              <span
                className={`mt-2 text-center text-xs font-semibold sm:text-sm ${
                  n === current ? "text-brand" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`mt-4 h-0.5 flex-1 rounded-full ${n < current ? "bg-brand" : "bg-border"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
