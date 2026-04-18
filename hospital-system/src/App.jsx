import { useState } from "react";

// Replace YOUR_DEPLOYMENT_ID with your actual deployment ID
const API_URL = "https://script.google.com/macros/s/AKfycbxRz6y0AKfxFBWK--C8u7Ub9MfslJSG5W8iGEVugrUId7Ljqw5vKWolmL893SlRyhb8/exec";

export default function App() {
  const [records, setRecords] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [status, setStatus] = useState("");

  async function loadRecords() {
    setStatus("Loading...");

    try {
      // redirect: "follow" is critical — Apps Script issues a redirect
      // that fetch won't follow by default in cross-origin contexts
      const res = await fetch(`${API_URL}?action=getRecords`, {
        redirect: "follow",
      });

      if (!res.ok) {
        setStatus(`HTTP error: ${res.status}`);
        return;
      }

      const data = await res.json();

      if (!data.success) {
        setStatus(data.error || "Error loading data");
        return;
      }

      setHeaders(data.headers);
      setRecords(data.data);
      setStatus(`Loaded ${data.data.length} records`);
    } catch (err) {
      setStatus("Fetch failed: " + err.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Hospital Records</h1>

      <button onClick={loadRecords}>Load Patients</button>

      {status && <p>{status}</p>}

      {headers.length > 0 && (
        <table style={{ borderCollapse: "collapse", marginTop: 16, width: "100%" }}>
          <thead>
            <tr>
              <th style={thStyle}>#</th>
              {headers.map((h, i) => (
                <th key={i} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row, i) => (
              <tr key={i}>
                <td style={tdStyle}>{i + 1}</td>
                {row.map((cell, j) => (
                  <td key={j} style={tdStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px 12px",
  background: "#f0f0f0",
  textAlign: "left",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px 12px",
};