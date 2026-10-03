const DONOR_KEY = "hemolink.donor";
const FLAG_KEY = "hemolink.registrationCompleted";

export function isBrowser() {
  return typeof window !== "undefined";
}

export function saveDonor(donor) {
  if (!isBrowser()) return;
  window.localStorage.setItem(DONOR_KEY, JSON.stringify(donor));
  window.localStorage.setItem(FLAG_KEY, "true");
}

export function getDonor() {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(DONOR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isRegistered() {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(FLAG_KEY) === "true";
}

export function clearDonor() {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DONOR_KEY);
  window.localStorage.removeItem(FLAG_KEY);
}
