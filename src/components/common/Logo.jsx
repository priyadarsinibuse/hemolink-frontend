import logo from "@/assets/hemolink-logo-transparent.png";

export default function Logo({ className = "" }) {
  return (
    <img
      src={logo}
      alt="HEMOLINK — Connect, Donate, Save Lives"
      className={`w-full max-w-full object-contain object-left ${className}`}
    />
  );
}
