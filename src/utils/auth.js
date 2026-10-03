import { getDonor, isRegistered, clearDonor } from "./storage";

export function getInitials(name) {
  if (!name) return "RV";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export function getFirstName(name) {
  if (!name) return "Donor";
  return name.trim().split(/\s+/)[0];
}

export function getCurrentDonor() {
  return getDonor();
}

export function hasCompletedRegistration() {
  return isRegistered();
}

export function logout() {
  clearDonor();
}
