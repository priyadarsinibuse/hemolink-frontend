import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hasCompletedRegistration } from "@/utils/auth";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    if (hasCompletedRegistration()) {
      setStatus("allowed");
    } else {
      setStatus("denied");
      navigate("/", { replace: true });
    }
  }, [navigate]);

  if (status !== "allowed") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-brand border-t-transparent"
          role="status"
          aria-label="Loading"
        />
      </div>
    );
  }

  return children;
}
