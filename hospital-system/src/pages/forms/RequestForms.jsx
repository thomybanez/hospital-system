import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

// ── ECG Form ──────────────────────────────────────────────────────────────────
export function ECGForm({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ bp:"", medication:"", date:"" });

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input type="date" value={extra.date} onChange={e=>setExtra(x=>({...x,date:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12 }} />
        <input placeholder="Blood Pressure" value={extra.bp} onChange={e=>setExtra(x=>({...x,bp:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:120 }} />
        <input placeholder="Medication" value={extra.medication} onChange={e=>setExtra(x=>({...x,medication:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:180 }} />
      </div>
      <PrintLayout title="ECG Form">
        <div className="form-header">
          <div className="org">HEART STATION — CARDIOVASCULAR SERVICE</div>
          <div className="org">DEPARTMENT OF MEDICINE, VLGH</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">V. Luna Avenue, Quezon City</div>
          <div className="form-title">ELECTROCARDIOGRAPHY REPORT</div>
        </div>
        <table style={{ fontSize:9 }}>
          <tbody>
            <tr>
              <td colSpan={6} style={{ padding:3 }}>
                AUTHORITY: &nbsp;&nbsp; ( ) PAID UNDER: &nbsp; DATE REQUESTED:
                <span className="field-line" style={{ minWidth:100 }}>{extra.date || "\u00A0"}</span>
                &nbsp; FEE: ( ) P35 &nbsp; ( ) P15.00 &nbsp; OR NO
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding:3 }}>
                PATIENT LAST NAME &nbsp; FIRST NAME &nbsp; MI:<br/>
                <span className="field-line" style={{ minWidth:220 }}>{p?.fullname || "\u00A0"}</span>
              </td>
              <td style={{ padding:3 }}>RANK<br/><span className="field-line" style={{ minWidth:60 }}>{p?.rank || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>REG NO.<br/><span className="field-line" style={{ minWidth:80 }}>{p?.regno || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>WARD<br/><span className="field-line" style={{ minWidth:50 }}>3A</span></td>
            </tr>
            <tr>
              <td style={{ padding:3 }}>AGE<br/><span className="field-line" style={{ minWidth:40 }}>{p?.age || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>SEX<br/><span className="field-line" style={{ minWidth:50 }}>{p?.sex || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>RACE<br/><span className="field-line" style={{ minWidth:60 }}>&nbsp;</span></td>
              <td style={{ padding:3 }}>HEIGHT<br/><span className="field-line" style={{ minWidth:50 }}>{p?.height || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>WEIGHT<br/><span className="field-line" style={{ minWidth:50 }}>{p?.weight || "\u00A0"}</span></td>
              <td style={{ padding:3 }}>BLOOD PRESSURE<br/><span className="field-line" style={{ minWidth:70 }}>{extra.bp || "\u00A0"}</span></td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding:3 }}>
                CLINICAL DATE: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span>
                &nbsp; PREVIOUS ECG: ( ) YES &nbsp; ( ) NO
                &nbsp; ( ) BED PATIENT &nbsp; ( ) AMBULATORY
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding:3 }}>
                MEDICATION: <span className="field-line" style={{ minWidth:300 }}>{extra.medication || "\u00A0"}</span>
              </td>
            </tr>
            <tr>
              <td colSpan={6} style={{ padding:3, minHeight:40 }}>
                BRIEF HISTORY: <span className="field-line" style={{ minWidth:350 }}>&nbsp;</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display:"flex", gap:40, marginTop:12 }}>
          <div>
            {["RHYTHM:","RATE:","AXIS:","PR:","QRS:","QT:"].map(l => (
              <div key={l} style={{ display:"flex", alignItems:"baseline", gap:8, marginBottom:5 }}>
                <span style={{ fontSize:11, minWidth:60 }}>{l}</span>
                <span className="field-line" style={{ minWidth:80 }}>&nbsp;</span>
              </div>
            ))}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ textAlign:"right", marginBottom:8 }}>
              <span className="field-line" style={{ minWidth:200 }}>&nbsp;</span><br/>
              <span style={{ fontSize:9 }}>Signature of Requesting Officer</span>
            </div>
            <div style={{ marginTop:20 }}>INTERPRETATION:</div>
            <div style={{ minHeight:30 }}>&nbsp;</div>
            <div style={{ borderTop:"1px solid #000", paddingTop:4, fontSize:9 }}>SIGNATURE OF TECHNICIAN</div>
            <div style={{ marginTop:24, borderTop:"1px solid #000", paddingTop:4, fontSize:9 }}>SIGNATURE OF CARDIOLOGIST</div>
          </div>
        </div>
      </PrintLayout>
    </div>
  );
}

// ── X-Ray / US / CT Scan Request ──────────────────────────────────────────────
export function XrayRequest({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ exam:"", date:"", physician:"" });

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input placeholder="Examination Requested" value={extra.exam} onChange={e=>setExtra(x=>({...x,exam:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:200 }} />
        <input type="date" value={extra.date} onChange={e=>setExtra(x=>({...x,date:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12 }} />
        <input placeholder="Requesting Physician" value={extra.physician} onChange={e=>setExtra(x=>({...x,physician:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:180 }} />
      </div>
      <PrintLayout title="X-Ray / US / CT Scan Request">
        <div className="form-header">
          <div className="org">ARMED FORCES OF THE PHILIPPINES MEDICAL CENTER</div>
          <div className="org">VICTORIANO LUNA GENERAL HOSPITAL</div>
          <div className="org">DEPARTMENT OF RADIOLOGICAL SCIENCES AND IMAGING</div>
          <div className="org">Camp Col Victoriano K Luna, V Luna Ave, Quezon City</div>
          <div className="form-title">REQUEST FORM — X-RAY / ULTRASOUND / CT SCAN</div>
        </div>
        <div style={{ fontSize:9, marginBottom:4 }}>AFPMC-7701 &nbsp; ( ) New &nbsp; ( ) Old</div>
        <table style={{ fontSize:9 }}>
          <tbody>
            <tr>
              <td style={{ padding:3 }}>
                Name of Patient:<br/>
                <span style={{ fontSize:8 }}>Rank &nbsp; Last Name &nbsp; First Name &nbsp; Middle Name &nbsp; AFPSN/ID No. &nbsp; BrSvc</span><br/>
                <span className="field-line" style={{ minWidth:350 }}>{p ? `${p.rank} ${p.fullname} / ${p.afpsn}` : "\u00A0"}</span>
              </td>
            </tr>
            <tr>
              <td style={{ padding:3 }}>
                <div style={{ display:"flex", gap:20 }}>
                  <span>Age: <span className="field-line" style={{ minWidth:40 }}>{p?.age || "\u00A0"}</span></span>
                  <span>Sex: <span className="field-line" style={{ minWidth:50 }}>{p?.sex || "\u00A0"}</span></span>
                  <span>Unit/Address: <span className="field-line" style={{ minWidth:160 }}>{p?.unit || "\u00A0"}</span></span>
                  <span>Date of Birth: <span className="field-line" style={{ minWidth:80 }}>{p?.dob || "\u00A0"}</span></span>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding:3 }}>
                <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                  <span>X-RAY/US/CT Scan No: <span className="field-line" style={{ minWidth:80 }}>&nbsp;</span></span>
                  <span>Admission No: <span className="field-line" style={{ minWidth:60 }}>{p?.regno || "\u00A0"}</span></span>
                  <span>Ward: <span className="field-line" style={{ minWidth:40 }}>3A</span></span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Examination Requested:</span>
                  <span className="field-line" style={{ minWidth:240 }}>{extra.exam || "\u00A0"}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Date of Request:</span>
                  <span className="field-line" style={{ minWidth:100 }}>{extra.date || "\u00A0"}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Date/Time of Exam:</span>
                  <span className="field-line" style={{ minWidth:120 }}>&nbsp;</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Requesting Physician:</span>
                  <span className="field-line" style={{ minWidth:180 }}>{extra.physician || "\u00A0"}</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Brief History and Pertinent P.E. findings:</span>
                  <span className="field-line" style={{ minWidth:180 }}>&nbsp;</span>
                </div>
                <div style={{ display:"flex", alignItems:"baseline", gap:8, marginTop:4 }}>
                  <span>Clinical Impression:</span>
                  <span className="field-line" style={{ minWidth:220 }}>{p?.diagnosis || "\u00A0"}</span>
                </div>
              </td>
            </tr>
            <tr>
              <td style={{ padding:3 }}>
                Noted by:<br/>
                <span className="field-line" style={{ minWidth:200 }}>&nbsp;</span><br/>
                <span style={{ fontSize:8 }}>Duty Radiologist / Radiologic Tech &nbsp;&nbsp; Lt Colonel MC &nbsp;&nbsp; Head Dept of Radiology</span>
              </td>
            </tr>
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}

// ── Referral Slip ─────────────────────────────────────────────────────────────
export function ReferralSlip({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ to:"", date:"", reason:"" });

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input placeholder="Refer to (dept)" value={extra.to} onChange={e=>setExtra(x=>({...x,to:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:160 }} />
        <input type="date" value={extra.date} onChange={e=>setExtra(x=>({...x,date:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12 }} />
        <input placeholder="Reason for referral" value={extra.reason} onChange={e=>setExtra(x=>({...x,reason:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:220 }} />
      </div>
      <PrintLayout title="Referral Slip">
        <div className="form-header">
          <div className="org">HEADQUARTERS</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES MEDICAL CENTER</div>
          <div className="org">VICTORIANO LUNA GENERAL HOSPITAL</div>
          <div className="org">V. Luna Avenue, Quezon City</div>
          <div className="form-title">REFERRAL SLIP</div>
        </div>
        <div style={{ display:"flex", alignItems:"baseline", gap:12, marginBottom:8 }}>
          <span style={{ fontSize:11 }}>FROM: <span className="field-line" style={{ minWidth:60 }}>3A</span></span>
          <span style={{ fontSize:11 }}>TO: <span className="field-line" style={{ minWidth:100 }}>{extra.to || "\u00A0"}</span></span>
          <span style={{ flex:1 }} />
          <span style={{ fontSize:11 }}>DATE: <span className="field-line" style={{ minWidth:100 }}>{extra.date || "\u00A0"}</span></span>
        </div>
        <div style={{ display:"flex", gap:8, marginBottom:2 }}>
          <span className="field-line" style={{ minWidth:100 }}>{p?.fullname?.split(" ").slice(-1)[0] || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:120 }}>{p?.fullname?.split(" ").slice(0,-1).join(" ") || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:80 }}>&nbsp;</span>
        </div>
        <div style={{ display:"flex", gap:4, fontSize:8, marginBottom:8 }}>
          <span style={{ minWidth:100 }}>LAST NAME</span>
          <span style={{ minWidth:120 }}>FIRST NAME</span>
          <span>MIDDLE NAME</span>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:2, fontSize:11 }}>
          <span className="field-line" style={{ minWidth:55 }}>{p?.rank || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:70 }}>{p?.regno || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:70 }}>{p?.afpsn || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:55 }}>{p?.bos || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:70 }}>{p?.unit || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:35 }}>{p?.age || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:45 }}>{p?.height || "\u00A0"}</span>
          <span className="field-line" style={{ minWidth:45 }}>{p?.weight || "\u00A0"}</span>
        </div>
        <div style={{ display:"flex", gap:4, fontSize:8, marginBottom:10 }}>
          <span style={{ minWidth:55 }}>Rank</span>
          <span style={{ minWidth:70 }}>Reg#</span>
          <span style={{ minWidth:70 }}>AFPSN</span>
          <span style={{ minWidth:55 }}>Br of Svc</span>
          <span style={{ minWidth:70 }}>Unit</span>
          <span style={{ minWidth:35 }}>Age</span>
          <span style={{ minWidth:45 }}>Height</span>
          <span style={{ minWidth:45 }}>Weight</span>
        </div>
        <div style={{ marginBottom:8, fontSize:11 }}>
          Respectfully referring our patient to your service for
          <span className="field-line" style={{ minWidth:240, marginLeft:4 }}>{extra.reason || "\u00A0"}</span>
        </div>
        <div style={{ marginBottom:4, fontSize:11 }}><strong>Diagnosis:</strong></div>
        <div className="field-line" style={{ width:"100%", display:"block", marginBottom:4 }}>{p?.diagnosis || "\u00A0"}</div>
        <div className="field-line" style={{ width:"100%", display:"block", marginBottom:16 }}>&nbsp;</div>
        <div style={{ textAlign:"right", marginTop:20 }}>
          <span className="field-line" style={{ minWidth:200 }}>&nbsp;</span><br/>
          <span style={{ fontSize:9 }}>Requesting Officer</span>
        </div>
        <div style={{ marginTop:16, fontSize:11 }}><strong>Suggestions:</strong></div>
        {[0,1,2,3].map(i => (
          <div key={i} className="field-line" style={{ width:"100%", display:"block", marginTop:6 }}>&nbsp;</div>
        ))}
      </PrintLayout>
    </div>
  );
}

// ── Monitored Antimicrobial Request ──────────────────────────────────────────
export function MonitoredAntimicrobial({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ dept:"", date:"", physician:"" });

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input placeholder="Department" value={extra.dept} onChange={e=>setExtra(x=>({...x,dept:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:140 }} />
        <input type="date" value={extra.date} onChange={e=>setExtra(x=>({...x,date:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12 }} />
        <input placeholder="Requesting MD" value={extra.physician} onChange={e=>setExtra(x=>({...x,physician:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:180 }} />
      </div>
      <PrintLayout title="Monitored Antimicrobials Request">
        <div className="form-header">
          <div className="org">HEADQUARTERS</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER — Antibiogram Committee</div>
          <div className="org">Camp Colonel, Victoriano K. Luna, V. Luna Avenue, Quezon City</div>
          <div className="form-title">MONITORED ANTIMICROBIALS REQUEST FORM</div>
          <div style={{ fontSize:8, marginTop:4 }}>
            TO THE PHYSICIAN INVOLVED IN PATIENT CARE: PLEASE ACCOMPLISH THIS FORM AS APPLICABLE. ENTER INFORMATION AS OBTAINED. INDICATE WITH ✓ MARK ON THE TICK BOXES IF ITEM APPLIES
          </div>
        </div>
        <table style={{ fontSize:9, marginTop:6 }}>
          <tbody>
            <tr>
              <td style={{ width:"30%", padding:3 }}>Patient's Name:<br/><strong>{p?.fullname || "\u00A0"}</strong></td>
              <td style={{ width:"20%", padding:3 }}>Registration Number:<br/><strong>{p?.regno || "\u00A0"}</strong></td>
              <td style={{ width:"20%", padding:3 }}>Department:<br/>{extra.dept || "\u00A0"}</td>
              <td style={{ width:"15%", padding:3 }}>Birthday:<br/>{p?.dob || "\u00A0"}</td>
              <td style={{ width:"15%", padding:3 }}>Ward:<br/>3A</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ padding:3 }}>Date and Time Accomplished:<br/>{extra.date || "\u00A0"}</td>
              <td colSpan={2} style={{ padding:3 }}>Accomplished by (print name and sign):<br/>&nbsp;</td>
              <td style={{ padding:3 }}>Serum Creatinine (mg/dL): _____<br/>Weight (Kg): <strong>{p?.weight || "____"}</strong></td>
            </tr>
            <tr>
              <td colSpan={5} style={{ padding:4 }}>
                <strong>Indication for Requested Antimicrobial:</strong><br/>
                Treatment based on biomarker data (PCT, CRP, WBC)? ☐ Yes ☐ No &nbsp; If yes, indicate results: ___________
              </td>
            </tr>
            <tr>
              <td colSpan={5} style={{ padding:4 }}>
                <strong>Rationale:</strong> ☐ Prophylactic &nbsp; ☐ Empiric — Suspected Infection Site: ________________<br/>
                ☐ Definitive/Culture-guided — Pathogen: __________ &nbsp; ☐ Empirical escalation &nbsp; ☐ De-escalation
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding:4 }}>
                Infection present at admission? ☐ Yes ☐ No<br/>
                Recent hospitalization past 3 months? ☐ Yes ☐ No
              </td>
              <td colSpan={2} style={{ padding:4 }}>
                History of Allergy to Antibiotics: ☐ Yes ☐ No<br/>
                If yes, specify: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span>
              </td>
            </tr>
            <tr>
              <td colSpan={3} style={{ padding:3 }}>Requesting MD: <strong>{extra.physician || "\u00A0"}</strong></td>
              <td style={{ padding:3 }}>Dept: {extra.dept || "\u00A0"}</td>
              <td style={{ padding:3 }}>Date: {extra.date || "\u00A0"}</td>
            </tr>
          </tbody>
        </table>
        <table style={{ fontSize:8, marginTop:6 }}>
          <thead>
            <tr>
              <th style={{ width:"18%" }}>DRUG</th><th style={{ width:"10%" }}>ADULT DOSE</th><th style={{ width:"7%" }}>PEDIA</th><th style={{ width:"7%" }}>FREQ</th>
              <th style={{ width:"18%" }}>DRUG</th><th style={{ width:"10%" }}>ADULT DOSE</th><th style={{ width:"7%" }}>PEDIA</th><th style={{ width:"7%" }}>FREQ</th>
              <th style={{ width:"10%" }}>DRUG</th><th style={{ width:"8%" }}>ADULT</th><th style={{ width:"7%" }}>PEDIA</th><th style={{ width:"7%" }}>FREQ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Aminoglycosides</td>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Cephalosporins</td>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Fluoroquinolones</td>
            </tr>
            {[
              ["Amikacin","☐100mg ☐250mg ☐500mg","","","Cefuroxime ☐IV ☐PO","☐250mg ☐500mg ☐750mg ☐1.5gm","","","Levofloxacin ☐IV ☐PO","","",""],
              ["Gentamicin","☐80mg ☐240mg","","","Cefixime","☐100mg ☐200mg ☐400mg","","","Moxifloxacin ☐IV ☐PO","","",""],
              ["Kanamycin","☐500mg ☐1gm","","","Ceftriaxone","☐250mg ☐500mg ☐1gm ☐2gm","","","Norfloxacin","","",""],
              ["Streptomycin","☐250mg ☐500mg ☐1gm","","","Cefazolin","☐1gm ☐2gm","","","Ofloxacin ☐IV ☐PO","","",""],
            ].map((row,i) => (
              <tr key={i}>{row.map((cell,j) => <td key={j} style={{ padding:"1px 3px" }}>{cell}</td>)}</tr>
            ))}
            <tr>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Beta-Lactamase/BLIC</td>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Macrolides</td>
              <td colSpan={4} style={{ fontWeight:"bold", background:"#f0f0f0" }}>Lincosamide / Anti-Fungal</td>
            </tr>
            {[
              ["Pip-Tazobactam","☐2.25gm ☐4.5gm","","","Azithromycin ☐IV ☐PO","☐500mg","","","Clindamycin ☐IV ☐PO","☐150mg ☐300mg ☐600mg","",""],
              ["Ticarcillin-Clav.","☐1.6gm ☐3.2gm","","","Clarithromycin","☐250mg ☐500mg","","","Fluconazole ☐IV ☐PO","☐50mg ☐200mg ☐400mg","",""],
            ].map((row,i) => (
              <tr key={i}>{row.map((cell,j) => <td key={j} style={{ padding:"1px 3px" }}>{cell}</td>)}</tr>
            ))}
            <tr>
              <td colSpan={4} style={{ padding:3 }}>Start Date: <span className="field-line" style={{ minWidth:70 }}>&nbsp;</span></td>
              <td colSpan={4} style={{ padding:3 }}>End Date: <span className="field-line" style={{ minWidth:70 }}>&nbsp;</span></td>
              <td colSpan={4} style={{ padding:3 }}>Duration: <span className="field-line" style={{ minWidth:60 }}>&nbsp;</span></td>
            </tr>
          </tbody>
        </table>
        <table style={{ marginTop:6, fontSize:8 }}>
          <thead><tr><th colSpan={3}>RECOMMENDATIONS</th></tr></thead>
          <tbody>
            <tr>
              <td>☐ Continue antimicrobial<br/>☐ Escalate based on culture results</td>
              <td>☐ Discontinue antimicrobial<br/>☐ De-escalate based on culture results</td>
              <td>Recommendation Accepted by Prescriber?<br/>☐ Yes &nbsp; ☐ No</td>
            </tr>
          </tbody>
        </table>
      </PrintLayout>
    </div>
  );
}