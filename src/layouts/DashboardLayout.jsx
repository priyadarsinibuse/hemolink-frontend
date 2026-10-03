import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import Navbar from "@/components/common/Navbar";
import "../dashboard.css";
import Sidebar from "@/components/common/Sidebar";
import Logo from "@/components/common/Logo";
import ProtectedRoute from "@/components/common/ProtectedRoute";
import { getCurrentDonor, logout } from "@/utils/auth";

export default function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [donor, setDonor] = useState(null);

  useEffect(() => {
    setDonor(getCurrentDonor());
  }, []);

  function handleLogout() {
    logout();
    navigate("/Login", { replace: true });
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navbar
          onMenuClick={() => setOpen(true)}

        />

        <div className="flex">
          <aside className="sticky top-20 hidden h-[calc(100vh-5rem)] w-64 shrink-0 border-r border-border bg-card md:block">
            <Sidebar onLogout={handleLogout} />
          </aside>

          {open && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div
                className="absolute inset-0 bg-foreground/40"
                onClick={() => setOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute left-0 top-0 h-full w-72 bg-card shadow-card">
                <div className="flex items-center justify-between border-b border-border px-4 py-4">
                  <Logo className="h-8" />
                  <button
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={() => setOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <Sidebar onNavigate={() => setOpen(false)} onLogout={handleLogout} />
              </div>
            </div>
          )}

          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 page-enter">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
