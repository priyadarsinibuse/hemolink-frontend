import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { getMe } from "../../api";

export default function Navbar({ onMenuClick }) {
  const [name, setName] = useState("");

  useEffect(() => {
    getMe()
      .then((data) => setName(data.user.name))
      .catch(() => {});
  }, []);

  const firstName = name ? name.split(" ")[0] : "Donor";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="flex min-h-20 items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors hover:bg-muted lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link to="/dashboard" className="hidden shrink-0 sm:block">
          <Logo className="h-9 sm:h-10" />
        </Link>

        <Link to="/dashboard" className="min-w-0 flex-1 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand sm:text-sm">
            Donor Dashboard
          </p>
          <div className="mt-0.5 flex flex-wrap items-center justify-center gap-x-2">
            <span className="text-base font-bold tracking-tight sm:text-lg">
              Welcome {firstName} 👋
            </span>
            <span className="hidden text-sm italic text-muted-foreground lg:inline">
              “The gift of blood is the gift of life — your kindness can become someone's tomorrow.”
            </span>
          </div>
        </Link>

        <Link
          to="/profile"
          aria-label="My Profile"
          title="My Profile"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
        >
          <User className="h-5 w-5 text-muted-foreground" />
        </Link>
      </div>
    </header>
  );
}