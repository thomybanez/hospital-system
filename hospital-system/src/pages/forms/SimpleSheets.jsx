import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

// ── Nurses Notes ──────────────────────────────────────────────────────────────
export function NursesNotes({ onBack }) {
  const [p, setP] = useState(null);
  const rows = Array(28).fill(0);

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
      </div>
      <PrintLayout title="Nurses Progress Notes">
        <div className="form-header">
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Colonel Victoriano K Luna, V Luna Avenue, Quezon City</div>
          <div className="form-title">NURSES PROGRESS NOTES</div>
        </div>
        <table style={{ fontSize:9 }}>
          <thead>
            <tr>
              <th style={{ width:"10%" }}>Date/Time</th>
              <th style={{ width:"12%" }}>FOCUS</th>
              <th style={{ width:"28%" }}>D=Data  A=Action  R=Response</th>
              <th style={{ width:"10%" }}>Date/Time</th>
              <th style={{ width:"12%" }}>FOCUS</th>
              <th style={{ width:"28%" }}>D=Data  A=Action  R=Response</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <tr key={i}>
                <td style={{ height:20 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row" style={{ marginTop:8 }}>
          <span className="label">RANK/NAME </span>
          <span className="field-line" style={{ minWidth:220 }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          <span className="label"> REG NO. </span>
          <span className="field-line" style={{ minWidth:100 }}>{p?.regno || "\u00A0"}</span>
          <span className="label"> WARD: 3A</span>
        </div>
      </PrintLayout>
    </div>
  );
}

// ── Physician Order Sheet ─────────────────────────────────────────────────────
export function PhysicianOrder({ onBack }) {
  const [p, setP] = useState(null);
  const rows = Array(35).fill(0);

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
      </div>
      <PrintLayout title="Physician Order Sheet">
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Colonel Victoriano K. Luna, V. Luna Avenue, Quezon City</div>
          <div className="form-title">PHYSICIAN ORDER SHEET</div>
        </div>
        <table style={{ fontSize:9 }}>
          <thead>
            <tr>
              <th style={{ width:"15%" }}>DATE/TIME</th>
              <th>PROGRESS NOTES</th>
              <th style={{ width:"15%" }}>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <tr key={i}>
                <td style={{ height:20 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="row" style={{ marginTop:8 }}>
          <span className="label">NAME/RANK </span>
          <span className="field-line" style={{ minWidth:200 }}>{p ? `${p.fullname} / ${p.rank}` : "\u00A0"}</span>
          <span className="label"> WARD: 3A </span>
          <span className="label" style={{ marginLeft:16 }}>REG: </span>
          <span className="field-line" style={{ minWidth:100 }}>{p?.regno || "\u00A0"}</span>
        </div>
      </PrintLayout>
    </div>
  );
}

// ── Medication Card ───────────────────────────────────────────────────────────
export function MedicationCard({ onBack }) {
  const [p, setP] = useState(null);

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
      </div>
      <PrintLayout title="Medication Card">
        <div className="form-title" style={{ textAlign:"center", marginBottom:8 }}>MEDICATION CARD</div>
        <table style={{ fontSize:9 }}>
          <tbody>
            {Array(9).fill(0).map((_, row) => (
              <tr key={row}>
                {[0,1].map(col => (
                  <td key={col} style={{ width:"50%", padding:4, verticalAlign:"top" }}>
                    <div style={{ display:"flex", gap:8, marginBottom:3 }}>
                      <span>Ward: <span className="field-line" style={{ minWidth:40 }}>3A</span></span>
                      <span>Time: <span className="field-line" style={{ minWidth:50 }}>&nbsp;</span></span>
                    </div>
                    <div style={{ marginBottom:3 }}>
                      Date: <span className="field-line" style={{ minWidth:70 }}>&nbsp;</span>
                      &nbsp;&nbsp;Rank/Name: <span className="field-line" style={{ minWidth:100 }}>
                        {p ? `${p.rank} ${p.fullname}` : "\u00A0"}
                      </span>
                    </div>
                    <div style={{ marginTop:20, borderTop:"1px solid #000", paddingTop:2, fontSize:8 }}>
                      Nurse On-Duty
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}