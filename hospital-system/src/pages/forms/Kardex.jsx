import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

export default function Kardex({ onBack }) {
  const [p, setP] = useState(null);

  const F = ({ value, width = 100 }) => (
    <span className="field-line" style={{ minWidth: width, display: "inline-block" }}>
      {value || "\u00A0"}
    </span>
  );

  return (
    <div>
      <div className="no-print" style={{ display: "flex", gap: 8, padding: "10px 16px", background: "#f4f6f9", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: "#1a1a2e", color: "#fff", fontWeight: 700, cursor: "pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
      </div>

      <PrintLayout title="Kardex">
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Colonel Victoriano K-Luna, V. Luna Avenue, Quezon City</div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <span style={{ fontWeight: "bold", fontSize: 14 }}>KARDEX</span>
            <span><strong>Blood Type: </strong><span className="field-line" style={{ minWidth: 60 }}>&nbsp;</span></span>
          </div>
        </div>

        <div className="row" style={{ marginTop: 6 }}>
          <span className="label">Rank/Name/BOS:</span>
          <F value={p ? `${p.rank} ${p.fullname} / ${p.bos}` : ""} width={220} />
          <span className="label">AFPSN:</span>
          <F value={p?.afpsn} width={90} />
          <span className="label">Age:</span>
          <F value={p?.age} width={40} />
        </div>
        <div className="row">
          <span className="label">Reg No.</span>
          <F value={p?.regno} width={80} />
          <span className="label">DOB:</span>
          <F value={p?.dob} width={90} />
          <span className="label">Religion:</span>
          <F value={p?.religion} width={100} />
          <span className="label">Height</span>
          <F value={p?.height} width={60} />
          <span className="label">Weight:</span>
          <F value={p?.weight} width={60} />
        </div>
        <div className="row">
          <span className="label">Unit Assignment:</span>
          <F value={p?.unit} width={150} />
          <span className="label">Date/Time Admitted:</span>
          <F value={p?.admitted} width={120} />
          <span className="label">Trans-in:</span>
          <F value={p?.transin} width={80} />
        </div>
        <div className="row">
          <span className="label">Impression/Diagnosis:</span>
          <span className="field-line" style={{ minWidth: 420, display: "inline-block" }}>{p?.diagnosis || "\u00A0"}</span>
        </div>
        <div className="row">
          <span className="label">Surgery Done:</span>
          <span className="field-line" style={{ minWidth: 340 }}>&nbsp;</span>
        </div>
        <div className="row">
          <span className="label">Date of Surgery:</span>
          <F value={""} width={100} />
          <span className="label">Allergy/ies:</span>
          <F value={p?.allergies} width={180} />
        </div>
        <div className="row">
          <span className="label">Patient Safety Issue/s:</span>
          <F value={p?.safety} width={300} />
        </div>

        {/* Status grid */}
        <table style={{ marginTop: 8, fontSize: 9 }}>
          <tbody>
            <tr>
              <td style={{ width: "14%", verticalAlign: "top", padding: 4 }}>
                <strong>Mental Status</strong><br />
                ___ Conscious<br />___ Drowsy<br />___ Stuporous<br />___ Unconscious<br />___ Comatose<br />
                <strong>Level of Care</strong><br />___ I &nbsp;&nbsp; ___II<br />___ III &nbsp;___IV
              </td>
              <td style={{ width: "14%", verticalAlign: "top", padding: 4 }}>
                <strong>Motor Status:</strong><br />
                ___ Normal<br />___ Slurred Speech<br />___ Hemiplegia<br />___ Paraplegia<br />___ Paresis<br />Others:<br />___________
              </td>
              <td style={{ width: "14%", verticalAlign: "top", padding: 4 }}>
                <strong>Activities</strong><br />
                ___ Ambulant<br />___ Dangle and Sit up<br />___ Bedrest w/ BRP<br />___ CBR w/o BRP<br />Others:<br />___________
              </td>
              <td style={{ width: "22%", verticalAlign: "top", padding: 4 }}>
                <strong>Medical Equipment/Devices</strong><br />
                ( ) None<br />( ) Oxygen Delivery System ______<br />
                ( ) Endotracheal/Tracheostomy Tube<br />
                Mode: ( )AC ( ) SIMV<br />
                VT_____ BUR_____<br />FiO2____ PEEP ____<br />cmH2O_______<br />PSV__________
              </td>
              <td style={{ width: "10%", verticalAlign: "top", padding: 4 }}>
                __ NGT<br />__ IJ Cath<br />__ CVP Line<br />__ CTT<br />__ IFC<br />Others:<br />______<br />______
              </td>
              <td style={{ width: "12%", verticalAlign: "top", padding: 4 }}>
                <strong>Diet:</strong><br />
                ___ NPO<br />___ DAT<br />___ Soft<br />___ Clear Liq<br />___ Gen Liq<br />___ Low Salt<br />___ Low Cholesterol<br />___ Uremic<br />___ Diabetic<br />Others: _______
              </td>
              <td style={{ width: "14%", verticalAlign: "top", padding: 4 }}>
                <strong>Special Info:</strong><br />
                Neuro VS q ____<br />VS q ______<br />BP ________<br />CVP reading q __<br />Weigh _______<br />Abd girth q ____<br />I &amp; O __________<br />Radiation ______
              </td>
            </tr>
          </tbody>
        </table>

        {/* Labs / IV Fluids */}
        <table style={{ marginTop: 6, fontSize: 9 }}>
          <tbody>
            <tr>
              <th style={{ width: "10%" }}>Date Ordered</th>
              <th style={{ width: "30%" }}>Laboratory Diagnostics Procedures</th>
              <th style={{ width: "20%" }}>Latest Labs</th>
              <th style={{ width: "10%" }}>Date Ordered</th>
              <th style={{ width: "30%" }}>IV Fluids</th>
            </tr>
            {["Hgb:","Hct:","WBC:","PC:","","Crea:","BUN:","K+","Na+:","Mg+:","Ca+:","Alb:","APTT:"].map((lab, i) => (
              <tr key={i}><td>&nbsp;</td><td>&nbsp;</td><td>{lab}</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            ))}
            <tr>
              <th>Date Ordered</th><th>Referrals</th><th>Other Labs</th><td colSpan={2}><strong>Blood Products</strong></td>
            </tr>
            {[0,1,2,3,4,5].map(i => (
              <tr key={i}><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td colSpan={2}><span style={{ display:"flex", gap:4 }}><span style={{flex:1}}>Type</span><span style={{flex:1}}>Req</span><span style={{flex:1}}>Avail</span><span style={{flex:1}}>Transfused</span></span></td></tr>
            ))}
            <tr>
              <th colSpan={2}>Date Ordered</th><th colSpan={3}>Medications (Date Ordered / Medications)</th>
            </tr>
            {[0,1,2,3,4,5,6].map(i => (
              <tr key={i}><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td style={{borderTop:"none"}}>&nbsp;</td></tr>
            ))}
          </tbody>
        </table>

        {/* Nursing Care Plan */}
        <div style={{ fontWeight: "bold", marginTop: 10, marginBottom: 4, fontSize: 11 }}>NURSING CARE PLAN</div>
        <table style={{ fontSize: 9 }}>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>Date/Time</th>
              <th style={{ width: "28%" }}>Nursing Diagnosis</th>
              <th style={{ width: "28%" }}>Nursing Goals</th>
              <th style={{ width: "29%" }}>Nursing Intervention</th>
            </tr>
          </thead>
          <tbody>
            {Array(12).fill(0).map((_, i) => (
              <tr key={i}><td style={{ height: 18 }}>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
            ))}
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}