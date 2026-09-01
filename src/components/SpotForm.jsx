import { useEffect, useRef, useState } from "react";
import { NOISE_LEVELS, uid } from "../data.js";

export default function SpotForm({ initial, onCancel, onSave }) {
  const [form, setForm] = useState(
    initial || { name: "", location: "", noise: "Quiet", outlets: false, notes: "" }
  );
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) return;
    onSave({ ...form, id: form.id || uid() });
  }

  return (
    <div
      className="ss-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <form className="ss-modal" onSubmit={submit}>
        <h2>{initial ? "Edit study spot" : "Add a study spot"}</h2>

        <label className="ss-field">
          <span>Name</span>
          <input
            ref={nameRef}
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="e.g. Van Pelt 6th Floor"
            required
          />
        </label>

        <label className="ss-field">
          <span>Location</span>
          <input
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            placeholder="e.g. Van Pelt Library"
            required
          />
        </label>

        <div className="ss-row">
          <label className="ss-field">
            <span>Noise level</span>
            <select value={form.noise} onChange={(e) => update("noise", e.target.value)}>
              {NOISE_LEVELS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="ss-field ss-checkbox">
            <input
              type="checkbox"
              checked={form.outlets}
              onChange={(e) => update("outlets", e.target.checked)}
            />
            <span>Has outlets</span>
          </label>
        </div>

        <label className="ss-field">
          <span>Notes (optional)</span>
          <textarea
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            placeholder="Anything worth remembering about this spot"
            rows={2}
          />
        </label>

        <div className="ss-modal-actions">
          <button type="button" className="ss-btn ss-btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="ss-btn ss-btn-primary">
            {initial ? "Save changes" : "Add spot"}
          </button>
        </div>
      </form>
    </div>
  );
}
