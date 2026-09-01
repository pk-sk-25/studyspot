import { NOISE_STYLE } from "../data.js";

export default function SpotCard({ spot, onEdit, onDelete, highlighted }) {
  const style = NOISE_STYLE[spot.noise];

  return (
    <div className={"ss-card" + (highlighted ? " ss-card-picked" : "")}>
      <div className="ss-card-tab" style={{ background: style.dot }}>
        {style.label}
      </div>
      <div className="ss-card-body">
        <h3>{spot.name}</h3>
        <p className="ss-card-location">{spot.location}</p>
        {spot.notes && <p className="ss-card-notes">{spot.notes}</p>}
        <div className="ss-card-meta">
          <span className={"ss-outlet-pill" + (spot.outlets ? " on" : "")}>
            {spot.outlets ? "Outlets available" : "No outlets"}
          </span>
        </div>
      </div>
      <div className="ss-card-actions">
        <button className="ss-icon-btn" onClick={() => onEdit(spot)}>
          Edit
        </button>
        <button className="ss-icon-btn ss-icon-btn-danger" onClick={() => onDelete(spot.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
