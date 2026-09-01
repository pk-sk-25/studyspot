export const NOISE_LEVELS = ["Silent", "Quiet", "Moderate", "Lively"];

export const NOISE_STYLE = {
  Silent: { dot: "#3B5B45", label: "Silent" },
  Quiet: { dot: "#6E8F63", label: "Quiet" },
  Moderate: { dot: "#D98E4A", label: "Moderate" },
  Lively: { dot: "#C1502E", label: "Lively" },
};

export const SEED_SPOTS = [
  { id: "1", name: "Van Pelt 6th Floor", location: "Van Pelt Library", noise: "Silent", outlets: true, notes: "Reservable rooms, best after 9pm." },
  { id: "2", name: "Fisher Fine Arts Reading Room", location: "Fisher Fine Arts Library", noise: "Quiet", outlets: false, notes: "Beautiful but limited seating." },
  { id: "3", name: "Houston Hall Atrium", location: "Houston Hall", noise: "Moderate", outlets: true, notes: "Good for group work, coffee nearby." },
  { id: "4", name: "Huntsman 2nd Floor Cafe", location: "Huntsman Hall", noise: "Lively", outlets: true, notes: "Great for casual study sessions." },
  { id: "5", name: "Biotech Commons", location: "Levine Hall", noise: "Quiet", outlets: true, notes: "24/7 access with PennCard." },
  { id: "6", name: "Kelly Writers House Porch", location: "Kelly Writers House", noise: "Moderate", outlets: false, notes: "Seasonal, lovely in fall." },
];

const STORAGE_KEY = "studyspot.spots";

export function loadSpots() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return SEED_SPOTS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_SPOTS;
  } catch {
    return SEED_SPOTS;
  }
}

export function saveSpots(spots) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(spots));
  } catch {
    // localStorage can fail in private browsing / storage-full cases;
    // the app still works for the current session, it just won't persist.
  }
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}
