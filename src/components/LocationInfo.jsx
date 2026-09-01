import { useState } from "react";

/*
  Wikipedia REST API — free, no key required, CORS-enabled.
  Docs: https://en.wikipedia.org/api/rest_v1/
  Given a page title (we use the study spot's "location" field, e.g.
  "Van Pelt Library"), this returns a short summary extract if a matching
  article exists.
*/
function summaryUrl(title) {
  return `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
}

export default function LocationInfo({ location }) {
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "ready" | "notfound" | "error"
  const [summary, setSummary] = useState(null);

  async function fetchInfo() {
    setStatus("loading");
    try {
      const res = await fetch(summaryUrl(location));
      if (res.status === 404) {
        setStatus("notfound");
        return;
      }
      if (!res.ok) throw new Error("Request failed");
      const json = await res.json();
      setSummary(json.extract);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }

  if (status === "idle") {
    return (
      <button className="ss-info-toggle" onClick={fetchInfo}>
        About this place ↗
      </button>
    );
  }

  return (
    <div className="ss-info-panel">
      {status === "loading" && <span className="ss-info-loading">Looking it up…</span>}
      {status === "ready" && <p>{summary}</p>}
      {status === "notfound" && (
        <p className="ss-info-muted">No Wikipedia article found for "{location}".</p>
      )}
      {status === "error" && (
        <p className="ss-info-muted">Couldn't reach Wikipedia right now.</p>
      )}
      <button className="ss-info-toggle" onClick={() => setStatus("idle")}>
        Hide
      </button>
    </div>
  );
}
