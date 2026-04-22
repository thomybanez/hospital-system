import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

const ITEMS = [
  "Informed consent complete and in chart",
  "Presence of allergies. If YES, specify: ___________________________",
  "Protocol for pre-operative and medical evaluation",
  "Pre-operative pulmonary risk evaluation",
  "Pediatric risk evaluation",
  "Pre-operative teaching completed and documented",
  "Ordered diagnostic/laboratory results on chart",
  "Chest x-ray result in chart",
  "ECG result in chart",
  "Bathed and wearing proper attire",
  "Oral hygiene done",
  "Identification band on patient and data written legibly",
  "Nail polish, make-up and hair pins removed",
  "Jewelry removed. Specify item(s) removed and c/o: _______________",
  "Prosthesis, hearing aid, dentures, eyeglasses, contact lenses removed. Others (specify): ___________",
  "Anti-embolism stockings on",
  "NPO since: _______________",
  "Skin preparation completed",
  "First bowel preparation/enema done",
  "Second bowel preparation/enema done",
  "Voided/Catheterized (encircle) Time: _______________",
  "Pre-op meds skin test done",
  "Pre-op med administered and charted, specify: _______________",
  "Medications(s)/Article(s) sent with the patient, specify: _______________",
  "Latest vital signs: BP= _____ CR= _____ RR= _____ Temp= _____ Weight= _____",
  "Standard precaution indicated? If YES, specify: _______________",
  "Culture and sensitivity, specify: _______________",
];

export default function PreOpChecklist({ onBack }) {
  const [p, setP] = useState(null);
  const [checks, setChecks] = useState(Array(ITEMS.length).fill(""));
  const [extra, setExtra] = useState({ date: "", anesthesia: "", procedure: "", remarks: "", pacuNurse: "" });

  const toggle = (i, val) => {
    const next = [...checks];
    next[i] = next[i] === val ? "" : val;
    setChecks(next);
  };

  const Box = ({ checked }) => (
    <span style={{
      display: "inline-block", width: 12, height: 12,
      border: "1px solid #000", marginRight: 2, verticalAlign: "middle",
      background: checked ? "#000" : "#fff",
      fontSize: 9, textAlign: "center", lineHeight: "12px", color: "#fff",
    }}>{checked ? "✓" : ""}</span>
  );

  return (
    <div>
      <div className="no-print" style={{ display: "flex", gap: 8, padding: "10px 16px", background: "#f4f6f9", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: "#1a1a2e", color: "#fff", fontWeight: 700, cursor: "pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input type="date" value={extra.date} onChange={e => setExtra(x => ({ ...x, date: e.target.value }))} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12 }} />
        <input placeholder="Procedure" value={extra.procedure} onChange={e => setExtra(x => ({ ...x, procedure: e.target.value }))} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12, width: 200 }} />
        <input placeholder="Anesthesia type" value={extra.anesthesia} onChange={e => setExtra(x => ({ ...x, anesthesia: e.target.value }))} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12, width: 160 }} />
      </div>

      <PrintLayout title="Pre-Operative Checklist">
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Col Victoriano K Luna, V. Luna Ave, Quezon City</div>
          <div className="form-title">PRE-OPERATIVE CHECKLIST</div>
        </div>

        <div className="row">
          <span className="label">Ward: </span><span className="field-line" style={{ minWidth: 80 }}>3A</span>
          <span style={{ flex: 1 }} />
          <span className="label">Date: </span><span className="field-line" style={{ minWidth: 120 }}>{extra.date || "\u00A0"}</span>
        </div>
        <div className="row">
          <span className="label">Rank/Name: </span>
          <span className="field-line" style={{ minWidth: 220 }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          <span className="label">Reg#: </span>
          <span className="field-line" style={{ minWidth: 100 }}>{p?.regno || "\u00A0"}</span>
        </div>
        <div className="row">
          <span className="label">Pre-op Diagnosis: </span>
          <span className="field-line xl">{p?.diagnosis || "\u00A0"}</span>
        </div>
        <div className="row">
          <span className="label">Proposed Surgical Procedure: </span>
          <span className="field-line xl">{extra.procedure || p?.diagnosis || "\u00A0"}</span>
        </div>
        <div className="row">
          <span className="label">Type of Anesthesia: </span>
          <span className="field-line" style={{ minWidth: 200 }}>{extra.anesthesia || "\u00A0"}</span>
        </div>

        <p style={{ fontSize: 10, margin: "8px 0 4px" }}>
          <strong>Place initial signature in appropriate box: YES or NO, NA</strong> (not applicable or was not ordered). <strong>Each item must have an entry.</strong> <strong>Remarks</strong> shall be written on the space after the item.
        </p>

        <table style={{ fontSize: 10, marginBottom: 8 }}>
          <thead>
            <tr>
              <th style={{ width: 36 }}>YES</th>
              <th style={{ width: 36 }}>NO</th>
              <th style={{ width: 36 }}>N/A</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ITEMS.map((item, i) => (
              <tr key={i} className="no-print-interact">
                {["YES","NO","N/A"].map(val => (
                  <td key={val} style={{ textAlign: "center", cursor: "pointer" }} onClick={() => toggle(i, val)} className="no-print">
                    <Box checked={checks[i] === val} />
                  </td>
                ))}
                {/* Print version shows static boxes */}
                <td style={{ padding: "2px 6px" }}>{item}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="row">
          <span className="label">Remarks: </span>
          <span className="field-line xl">&nbsp;</span>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className="label">PACU Nurse Full Name &amp; Signature: </span>
          <span className="field-line" style={{ minWidth: 200 }}>&nbsp;</span>
        </div>

        <table style={{ marginTop: 12, fontSize: 10 }}>
          <thead>
            <tr>
              <th>Initials</th>
              <th>Full Name of RN/Signature</th>
              <th>Initials</th>
              <th>Full Name of RN/Signature</th>
            </tr>
          </thead>
          <tbody>
            {[0,1,2].map(i => (
              <tr key={i}>
                <td style={{ height: 20 }}>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}