import { useState, useMemo } from "react";
import { API_URL } from "./App";

const FIELDS = [
  "fullname","rank","bos","afpsn","age","regno","dob","religion",
  "height","weight","unit","admitted","transin","diagnosis",
  "allergies","safety","sex","address"
];

const LABELS = {
  fullname:"Full Name", rank:"Rank", bos:"BOS", afpsn:"AFPSN",
  age:"Age", regno:"Reg No", dob:"Date of Birth", religion:"Religion",
  height:"Height (cm)", weight:"Weight (kg)", unit:"Unit",
  admitted:"Admitted", transin:"Trans-In", diagnosis:"Diagnosis",
  allergies:"Allergies", safety:"Safety", sex:"Sex", address:"Address"
};

const FULL_WIDTH = new Set(["diagnosis","address","transin","admitted","allergies"]);
const HEADER_TAGS = ["rank","bos","afpsn"];

async function apiPost(action, payload) {
  const res = await fetch(API_URL, {
    method: "POST",
    redirect: "follow",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({ action, ...payload }),
  });
  return res.json();
}

const s = {
  card: {
    background:"#fff", border:"1px solid #e2e8f0", borderRadius:10,
    boxShadow:"0 2px 8px rgba(0,0,0,0.07)", marginBottom:10, overflow:"hidden"
  },
  cardExpanded: { borderColor:"#c5d9f0", boxShadow:"0 4px 16px rgba(74,144,217,0.13)" },
  cardHeader: { display:"flex", alignItems:"center", padding:"12px 14px", gap:10 },
  tag: {
    background:"#eef3fb", color:"#3578c0", borderRadius:4, padding:"2px 6px",
    fontSize:11, fontWeight:600, fontFamily:"monospace", whiteSpace:"nowrap"
  },
  btn: (color) => ({
    background: color, color:"#fff", border:"none", borderRadius:7,
    padding:"7px 11px", fontSize:14, cursor:"pointer"
  }),
  detailGrid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 },
  input: {
    padding:"7px 9px", border:"1px solid #c5d9f0", borderRadius:6,
    fontSize:13, width:"100%", fontFamily:"inherit"
  },
  label: {
    fontSize:10, fontWeight:700, color:"#7a8499", textTransform:"uppercase",
    letterSpacing:"0.5px", marginBottom:3
  },
};

export default function PatientTable({ records, status, loading, onLoad, onRecordsChange, onAddPatient }) {
  const [search, setSearch]        = useState("");
  const [sortField, setSortField]  = useState(0);
  const [sortDir, setSortDir]      = useState(1);
  const [expandedIdx, setExpanded] = useState(null);
  const [editIdx, setEditIdx]      = useState(null);
  const [draft, setDraft]          = useState({});
  const [opStatus, setOpStatus]    = useState("");

  const filtered = useMemo(() => {
    let rows = [...records];
    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(r => r.some(c => String(c ?? "").toLowerCase().includes(q)));
    }
    if (sortField > 0) {
      rows.sort((a, b) => {
        const av = String(a[sortField] ?? "").toLowerCase();
        const bv = String(b[sortField] ?? "").toLowerCase();
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      });
    }
    return rows;
  }, [records, search, sortField, sortDir]);

  function rowToObj(row) {
    const obj = { rowIndex: row[0] };
    FIELDS.forEach((f, i) => { obj[f] = row[i + 1] ?? ""; });
    return obj;
  }

  function toggleExpand(i) {
    if (expandedIdx === i) { setExpanded(null); cancelEdit(); }
    else { setExpanded(i); cancelEdit(); }
  }

  function startEdit(row) {
    setDraft(rowToObj(row));
    setEditIdx(row[0]);
  }

  function cancelEdit() { setEditIdx(null); setDraft({}); }

  async function saveEdit(row) {
    setOpStatus("Saving...");
    try {
      const result = await apiPost("updateRecord", { data: draft });
      if (!result.success) { setOpStatus("❌ " + (result.error || "Save failed")); return; }
      onRecordsChange(prev => prev.map(r =>
        r[0] === row[0] ? [row[0], ...FIELDS.map(f => draft[f] ?? "")] : r
      ));
      cancelEdit();
      setOpStatus("✅ Saved!");
      setTimeout(() => setOpStatus(""), 2500);
    } catch (e) { setOpStatus("❌ " + e.message); }
  }

  async function deleteRow(row, i) {
    if (!confirm("Delete this patient record?")) return;
    setOpStatus("Deleting...");
    try {
      const result = await apiPost("deleteRecord", { rowIndex: row[0] });
      if (!result.success) { setOpStatus("❌ " + (result.error || "Delete failed")); return; }
      onRecordsChange(prev => prev.filter(r => r[0] !== row[0]));
      if (expandedIdx === i) setExpanded(null);
      setOpStatus("✅ Deleted.");
      setTimeout(() => setOpStatus(""), 2500);
    } catch (e) { setOpStatus("❌ " + e.message); }
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
        <button onClick={onLoad} disabled={loading}
          style={{ ...s.btn("#1a1a2e"), opacity: loading ? 0.6 : 1, padding:"9px 16px" }}>
          {loading ? "Loading…" : "⟳ Load Records"}
        </button>
        {status   && <span style={{ color:"#e74c3c", alignSelf:"center" }}>{status}</span>}
        {opStatus && (
          <span style={{ color: opStatus.startsWith("✅") ? "#27ae60" : "#e74c3c", alignSelf:"center" }}>
            {opStatus}
          </span>
        )}
      </div>

      {/* Search + sort */}
      {records.length > 0 && (
        <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
          <input
            placeholder="🔍 Search name, rank, diagnosis…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...s.input, flex:2, minWidth:180 }}
          />
          <select value={sortField} onChange={e => setSortField(+e.target.value)}
            style={{ ...s.input, flex:1, minWidth:120 }}>
            <option value={0}>Sort: None</option>
            <option value={1}>Full Name</option>
            <option value={2}>Rank</option>
            <option value={3}>BOS</option>
            <option value={5}>Age</option>
            <option value={12}>Admitted</option>
            <option value={14}>Diagnosis</option>
          </select>
          <button onClick={() => setSortDir(d => d * -1)}
            style={{ ...s.btn("#6c757d"), padding:"7px 12px" }}>
            {sortDir === 1 ? "↑" : "↓"}
          </button>
        </div>
      )}

      {/* Record count */}
      {filtered.length > 0 && (
        <p style={{ color:"#7a8499", fontSize:12, marginBottom:10 }}>
          {filtered.length} record{filtered.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Empty state */}
      {records.length === 0 && !loading && (
        <div style={{ textAlign:"center", padding:"40px 20px", color:"#7a8499" }}>
          <div style={{ fontSize:36, marginBottom:8 }}>📋</div>
          Press "Load Records" to fetch patients.
        </div>
      )}

      {/* Cards */}
      {filtered.map((row, i) => {
        const isOpen    = expandedIdx === i;
        const isEditing = editIdx === row[0];

        return (
          <div key={row[0]} style={{ ...s.card, ...(isOpen ? s.cardExpanded : {}) }}>

            {/* Card header */}
            <div style={s.cardHeader}>
              <span style={{ fontFamily:"monospace", fontSize:11, color:"#7a8499", minWidth:22, textAlign:"center" }}>
                {i + 1}
              </span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontWeight:700, fontSize:14, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {row[1] || "—"}
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:4 }}>
                  {HEADER_TAGS.map(f => {
                    const val = row[FIELDS.indexOf(f) + 1];
                    return val ? <span key={f} style={s.tag}>{val}</span> : null;
                  })}
                </div>
              </div>
              <div style={{ display:"flex", gap:6 }}>
                <button onClick={() => toggleExpand(i)}
                  style={{ ...s.btn(isOpen ? "#3578c0" : "#4a90d9"),
                    transform: isOpen ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>
                  ▼
                </button>
                <button onClick={() => deleteRow(row, i)} style={s.btn("#e74c3c")}>🗑</button>
              </div>
            </div>

            {/* Expanded detail */}
            {isOpen && (
              <div style={{ background:"#f8faff", borderTop:"1px solid #e2e8f0", padding:14 }}>
                <div style={s.detailGrid}>
                  {FIELDS.map(f => {
                    const val  = row[FIELDS.indexOf(f) + 1] ?? "";
                    const full = FULL_WIDTH.has(f) ? { gridColumn:"1 / -1" } : {};
                    return (
                      <div key={f} style={{ display:"flex", flexDirection:"column", ...full }}>
                        <div style={s.label}>{LABELS[f]}</div>
                        {isEditing ? (
                          f === "sex" ? (
                            <select style={s.input} value={draft[f] || ""}
                              onChange={e => setDraft(d => ({ ...d, [f]: e.target.value }))}>
                              <option value="">— Select —</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
                          ) : (
                            <input style={s.input} value={draft[f] || ""}
                              onChange={e => setDraft(d => ({ ...d, [f]: e.target.value }))} />
                          )
                        ) : (
                          <div style={{ fontSize:13, fontWeight:500, wordBreak:"break-word" }}>
                            {val || "—"}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Action buttons */}
                <div style={{ display:"flex", gap:8 }}>
                  {isEditing ? (
                    <>
                      <button onClick={() => saveEdit(row)}
                        style={{ ...s.btn("#27ae60"), flex:1, padding:10, fontWeight:700 }}>
                        ✔ Save
                      </button>
                      <button onClick={cancelEdit}
                        style={{ ...s.btn("#aaa"), flex:1, padding:10, fontWeight:700 }}>
                        ✕ Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => startEdit(row)}
                      style={{ ...s.btn("#4a90d9"), flex:1, padding:10, fontWeight:700 }}>
                      ✏️ Edit
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Add Patient button */}
      <button
        onClick={onAddPatient}
        style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          gap:8, width:"100%", padding:14,
          background:"#1a1a2e", color:"#fff",
          border:"none", borderRadius:10,
          fontSize:15, fontWeight:700, cursor:"pointer",
          marginTop:14,
        }}
      >
        ＋ Add Patient
      </button>
    </div>
  );
}