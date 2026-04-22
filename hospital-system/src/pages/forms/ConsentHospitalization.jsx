import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

const DEPT = "ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND\nVICTORIANO LUNA MEDICAL CENTER\nCamp Victoriano K Luna Avenue, Quezon City";

export default function ConsentHospitalization({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ dept: "", ward: "", date: "", time: "" });

  const F = ({ label, value, width = 120 }) => (
    <span>
      {label && <span className="label">{label} </span>}
      <span className="field-line" style={{ minWidth: width, display: "inline-block" }}>
        {value || "\u00A0"}
      </span>
    </span>
  );

  return (
    <div>
      <div className="no-print" style={{ display: "flex", gap: 10, padding: "10px 16px", background: "#f4f6f9", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: "#1a1a2e", color: "#fff", fontWeight: 700, cursor: "pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input placeholder="Department" value={extra.dept} onChange={e => setExtra(x => ({ ...x, dept: e.target.value }))} style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #ccc", fontSize: 13 }} />
        <input placeholder="Ward" value={extra.ward} onChange={e => setExtra(x => ({ ...x, ward: e.target.value }))} style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #ccc", width: 80, fontSize: 13 }} />
        <input type="date" value={extra.date} onChange={e => setExtra(x => ({ ...x, date: e.target.value }))} style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #ccc", fontSize: 13 }} />
        <input placeholder="Time" value={extra.time} onChange={e => setExtra(x => ({ ...x, time: e.target.value }))} style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid #ccc", width: 80, fontSize: 13 }} />
      </div>

      <PrintLayout title="Consent for Hospital Management">
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Victoriano K Luna Avenue, Quezon City</div>
        </div>

        <div style={{ textAlign: "right", marginBottom: 8 }}>
          <F label="" value={extra.date || extra.time ? `${extra.date} ${extra.time}` : ""} width={140} />
          <span className="label"> Date/Time</span>
        </div>

        <div className="form-title" style={{ textAlign: "center" }}>CONSENT FOR HOSPITAL MANAGEMENT</div>

        <div className="row" style={{ marginTop: 10 }}>
          <F label="" value={p?.fullname} width={200} />
          <F label="" value={p?.rank} width={80} />
          <F label="" value={p?.regno} width={80} />
          <F label="" value={p?.age} width={40} />
          <F label="" value={p?.sex} width={60} />
          <F label="" value={""} width={80} />
        </div>
        <div style={{ fontSize: 9, display: "flex", gap: 40, marginBottom: 4 }}>
          <span>Name/ Rank</span><span>AFPSN</span><span>Age</span><span>Sex</span><span>Civil Status</span>
        </div>

        <div className="row">
          <F label="" value={p?.unit} width={200} />
          <F label="" value={p?.address} width={220} />
        </div>
        <div style={{ fontSize: 9, display: "flex", gap: 120, marginBottom: 8 }}>
          <span>Unit/ Assignment</span><span>Address</span>
        </div>

        <p style={{ marginBottom: 8 }}>
          I, <span className="field-line" style={{ minWidth: 160 }}>{p?.fullname || "\u00A0"}</span> Authorized the department of <span className="field-line" style={{ minWidth: 120 }}>{extra.dept || "\u00A0"}</span> Ward <span className="field-line" style={{ minWidth: 60 }}>{extra.ward || "\u00A0"}</span>, VLMC, AFPHSC in the performance of evaluation, admission, readmission, management and treatment. If any unforeseen condition arises in the course, I further request and authorized them to do whatever they deem advisable.
        </p>
        <p style={{ marginBottom: 8 }}>
          The standard and operating procedures of this department have fully explained to me. I acknowledge that no guarantees or assurance has been made as to the result that may be obtained.
        </p>
        <p style={{ marginBottom: 16 }}>
          I CERTIFY that I have read and fully understood the above consent that the explanations therein referred to were made and that all blanks or statements requiring insertion or completion were filed.
        </p>

        <div className="sig-block" style={{ marginTop: 24 }}>
          <div className="sig-line">
            <div className="line" style={{ borderTop: "1px solid #000", marginBottom: 3 }}>&nbsp;</div>
            <div>Signature over printed name or thumb mark</div>
            <div>of patient's wife or relative</div>
          </div>
          <div className="sig-line">
            <div className="line" style={{ borderTop: "1px solid #000", marginBottom: 3 }}>&nbsp;</div>
            <div>Signature over printed name or thumb mark</div>
            <div>of patient</div>
          </div>
        </div>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <div className="field-line" style={{ minWidth: 240 }}>&nbsp;</div>
          <div style={{ fontSize: 10 }}>Signature over printed name of person authorized to consent for the patient</div>
        </div>

        <p style={{ marginTop: 16, fontSize: 10 }}>
          The foregoing consent was read, discussed and signed in my presence and in opinion, the person so signing did so freely with full knowledge and understanding:
        </p>

        <div className="row">
          <span className="label">Witness:</span>
          <span className="field-line lg">&nbsp;</span>
          <span className="field-line lg">&nbsp;</span>
        </div>
        <div className="row">
          <span className="label">Address:</span>
          <span className="field-line lg">&nbsp;</span>
          <span className="field-line lg">&nbsp;</span>
        </div>
      </PrintLayout>
    </div>
  );
}