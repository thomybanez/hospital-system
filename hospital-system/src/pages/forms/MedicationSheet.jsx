import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

const SHIFTS = ["7-3","3-11","11-7","7-3","3-11","11-7","7-3","3-11","11-7","7-3","3-11","11-7","7-3","3-11","11-7","7-3","3-11","11-7"];

export default function MedicationSheet({ onBack }) {
  const [p, setP] = useState(null);

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
      </div>

      <PrintLayout title="Medication Sheet">
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Colonel Victoriano K-Luna, V. Luna Avenue, Quezon City</div>
          <div className="form-title">MEDICATION SHEET</div>
        </div>

        <table style={{ fontSize: 8 }}>
          <thead>
            <tr>
              <th rowSpan={2} style={{ width: "18%" }}>MEDICATION / DOSAGE / ROUTE / FREQUENCY</th>
              <th rowSpan={2} style={{ width: "6%" }}>Shift</th>
              {SHIFTS.map((s, i) => <th key={i} style={{ width: "4%" }}>{s}</th>)}
            </tr>
            <tr>
              <th colSpan={SHIFTS.length} style={{ fontSize: 7, textAlign: "left", padding: "1px 2px" }}>Date →</th>
            </tr>
          </thead>
          <tbody>
            {[0,1,2,3,4,5,6,7].map(med => (
              <>
                <tr key={`${med}-date`}>
                  <td rowSpan={3} style={{ fontSize: 9, verticalAlign: "top", padding: 3 }}>
                    <div style={{ fontSize: 8, color: "#666" }}>Date Ordered:</div>
                    <div style={{ minHeight: 28 }}>&nbsp;</div>
                  </td>
                  <td style={{ fontSize: 8 }}>Date</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
                <tr key={`${med}-sig`}>
                  <td style={{ fontSize: 8 }}>Sig</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
                <tr key={`${med}-rem`}>
                  <td style={{ fontSize: 8 }}>Remarks</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
              </>
            ))}
            <tr>
              <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
              <td colSpan={6} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
              <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
              <td colSpan={6} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
              <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
              <td colSpan={2} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
            </tr>
            {[0,1,2].map(i => (
              <tr key={i}>
                <td colSpan={2} style={{ height: 18 }}>&nbsp;</td>
                <td colSpan={6}>&nbsp;</td>
                <td colSpan={2}>&nbsp;</td>
                <td colSpan={6}>&nbsp;</td>
                <td colSpan={2}>&nbsp;</td>
                <td colSpan={2}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ fontSize: 8, marginTop: 6, lineHeight: 1.5 }}>
          <strong>Legend:</strong> DC – Discontinued; NPO – Nothing by mouth; Out – out of ward; Req – Med Requested; NIS – not in stock; OWM – pt out w/ meds; Ref – Refused; RX – Prescribed; VOM – Vomited; ALL – Allergy<br />
          <strong>Injection site:</strong> RB – right buttocks; LB – Left buttocks; LD – Left Deltoid; RD – Right Deltoid; RL – Right Leg; LL – Left Leg; RA – Right arm; LA – Left arm; A – Abdomen
        </div>

        <div className="row" style={{ marginTop: 8 }}>
          <span className="label">RECOPIED BY: </span>
          <span className="field-line" style={{ minWidth: 200 }}>&nbsp;</span>
          <span className="label">DATE RECOPIED: </span>
          <span className="field-line" style={{ minWidth: 120 }}>&nbsp;</span>
        </div>
        <div className="row">
          <span className="label">RANK/NAME: </span>
          <span className="field-line" style={{ minWidth: 200 }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          <span className="label">REG#: </span>
          <span className="field-line" style={{ minWidth: 100 }}>{p?.regno || "\u00A0"}</span>
          <span className="label">WARD: 3A</span>
        </div>
      </PrintLayout>
    </div>
  );
}