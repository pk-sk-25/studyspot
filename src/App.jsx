import { useEffect, useMemo, useState } from "react";
import SpotCard from "./components/SpotCard.jsx";
import SpotForm from "./components/SpotForm.jsx";
import { NOISE_LEVELS, loadSpots, saveSpots } from "./data.js";

export default function App() {
  const [spots, setSpots] = useState(() => loadSpots());
  const [query, setQuery] = useState("");
  const [noiseFilter, setNoiseFilter] = useState("All");
  const [outletsOnly, setOutletsOnly] = useState(false);
  const [editing, setEditing] = useState(null); // null = closed, {} = new, spot = editing
  const [pickedId, setPickedId] = useState(null);

  useEffect(() => {
    saveSpots(spots);
  }, [spots]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return spots.filter((s) => {
      const matchesQuery =
        !q || s.name.toLowerCase().includes(q) || s.location.toLowerCase().includes(q);
      const matchesNoise = noiseFilter === "All" || s.noise === noiseFilter;
      const matchesOutlets = !outletsOnly || s.outlets;
      return matchesQuery && matchesNoise && matchesOutlets;
    });
  }, [spots, query, noiseFilter, outletsOnly]);

  function handleSave(spot) {
    setSpots((prev) => {
      const exists = prev.some((s) => s.id === spot.id);
      return exists ? prev.map((s) => (s.id === spot.id ? spot : s)) : [spot, ...prev];
    });
    setEditing(null);
  }

  function handleDelete(id) {
    setSpots((prev) => prev.filter((s) => s.id !== id));
    if (pickedId === id) setPickedId(null);
  }

  function pickForMe() {
    if (filtered.length === 0) {
      setPickedId(null);
      return;
    }
    const choice = filtered[Math.floor(Math.random() * filtered.length)];
    setPickedId(choice.id);
    document
      .getElementById(`ss-card-${choice.id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className="ss-app">
      <div className="ss-header">
        <h1>StudySpot</h1>
        <p>Campus study spots, tracked by the people who actually study in them.</p>
      </div>

      <div className="ss-toolbar">
        <input
          className="ss-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or location"
        />
        <select
          className="ss-select"
          value={noiseFilter}
          onChange={(e) => setNoiseFilter(e.target.value)}
        >
          <option value="All">Any noise level</option>
          {NOISE_LEVELS.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
        <label className="ss-toggle">
          <input
            type="checkbox"
            checked={outletsOnly}
            onChange={(e) => setOutletsOnly(e.target.checked)}
          />
          Outlets only
        </label>
        <button className="ss-btn ss-btn-amber" onClick={pickForMe}>
          Pick for me
        </button>
        <button className="ss-btn ss-btn-primary" onClick={() => setEditing({})}>
          Add a spot
        </button>
      </div>

      <div className="ss-count">
        {filtered.length} spot{filtered.length === 1 ? "" : "s"} shown
      </div>

      {filtered.length === 0 ? (
        <div className="ss-empty">
          No spots match your filters yet. Try widening your search, or add a new one.
        </div>
      ) : (
        <div className="ss-grid">
          {filtered.map((spot) => (
            <div id={`ss-card-${spot.id}`} key={spot.id}>
              <SpotCard
                spot={spot}
                onEdit={setEditing}
                onDelete={handleDelete}
                highlighted={pickedId === spot.id}
              />
            </div>
          ))}
        </div>
      )}

      {editing !== null && (
        <SpotForm
          initial={editing.id ? editing : null}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
