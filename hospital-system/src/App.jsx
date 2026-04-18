import { useState, useEffect } from "react";
import PatientTable from "./PatientTable";
import AddPatientForm from "./AddPatientForm";

export const API_URL =
  "https://script.google.com/macros/s/AKfycbxRz6y0AKfxFBWK--C8u7Ub9MfslJSG5W8iGEVugrUId7Ljqw5vKWolmL893SlRyhb8/exec";

export default function App() {
  const [records, setRecords] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [status, setStatus]   = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView]       = useState("list");

  async function loadRecords() {
    setLoading(true);
    setStatus("Loading...");
    try {
      const res  = await fetch(`${API_URL}?action=getRecords`, { redirect: "follow" });
      const data = await res.json();
      if (!data.success) { setStatus(data.error || "Error"); return; }
      setHeaders(data.headers);
      setRecords(data.data);
      setStatus("");
    } catch (err) {
      setStatus("Fetch failed: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  // Auto-load on mount
  useEffect(() => { loadRecords(); }, []);

  function goToList() {
    setView("list");
    loadRecords(); // refresh after returning from add form
  }

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      {view === "list" ? (
        <>
          <h1 style={{ marginBottom: 12 }}>🏥 Hospital Records</h1>
          <PatientTable
            records={records}
            headers={headers}
            status={status}
            loading={loading}
            onRecordsChange={setRecords}
            onAddPatient={() => setView("add")}
          />
        </>
      ) : (
        <AddPatientForm onBack={goToList} />
      )}
    </div>
  );
}