import { useState, useEffect } from "react";
import PatientTable from "./PatientTable";
import AddPatientForm from "./AddPatientForm";
import FormsHub from "./pages/FormsHub.jsx";
import Login from "./Login";

export const API_URL =
  "https://script.google.com/macros/s/AKfycbxRz6y0AKfxFBWK--C8u7Ub9MfslJSG5W8iGEVugrUId7Ljqw5vKWolmL893SlRyhb8/exec";

export default function App() {
  const [records, setRecords] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [status, setStatus]   = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView]       = useState("list"); // "list" | "add" | "forms"
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("hospital_auth") === "true"
  );

  async function loadRecords() {
    if (!isAuthenticated) return;
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

  async function handleLogin(username, password, mode = "login") {
    // Hardcoded admin fallback for offline support
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      localStorage.setItem("hospital_auth", "true");
      setStatus("");
      return;
    }

    setLoading(true);
    setStatus("");
    try {
      // The user mentioned "save the user and password at my appscript back end"
      // We use the mode ('login' or 'register') as the action
      const res = await fetch(API_URL, {
        method: "POST",
        redirect: "follow",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ action: mode, username, password }),
      });
      const data = await res.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("hospital_auth", "true");
        // records will be loaded via useEffect
      } else {
        setStatus(data.error || `Failed to ${mode}. Please try again.`);
      }
    } catch (err) {
      setStatus(`${mode === "login" ? "Login" : "Registration"} failed: ` + err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setIsAuthenticated(false);
    localStorage.removeItem("hospital_auth");
    setRecords([]);
  }

  useEffect(() => { 
    if (isAuthenticated) {
      loadRecords(); 
    }
  }, [isAuthenticated]);

  function goToList() {
    setView("list");
    loadRecords();
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} loading={loading} error={status} />;
  }

  return (
    <div style={{ padding: 16, maxWidth: 900, margin: "0 auto" }}>
      <div className="no-print" style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button 
          onClick={handleLogout}
          style={{ 
            background: "#e74c3c", border: "none", color: "white", cursor: "pointer", fontSize: 13, fontWeight: 600, borderRadius:'4px', padding:'10px 14px'
          }}
        >
          Logout ⏻
        </button>
      </div>

      {view === "list" && (
        <>
          <h1 style={{ marginBottom: 12 }}>🏥 Hospital Records</h1>
          <PatientTable
            records={records}
            headers={headers}
            status={status}
            loading={loading}
            onRecordsChange={setRecords}
            onAddPatient={() => setView("add")}
            onOpenForms={() => setView("forms")}
          />
        </>
      )}

      {view === "add" && (
        <AddPatientForm onBack={goToList} />
      )}

      {view === "forms" && (
        <FormsHub onBack={() => setView("list")} />
      )}
    </div>
  );
}