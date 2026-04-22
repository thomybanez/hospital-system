import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

const CB = ({ label }) => (
  <span style={{ marginRight: 6 }}>
    <span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000", marginRight:2, verticalAlign:"middle" }} />
    {label}
  </span>
);

export default function NursingHistory({ onBack }) {
  const [p, setP] = useState(null);
  const [extra, setExtra] = useState({ date:"", admTime:"", accompaniedBy:"" });

  return (
    <div>
      <div className="no-print" style={{ display:"flex", gap:8, padding:"10px 16px", background:"#f4f6f9", alignItems:"center", flexWrap:"wrap" }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        <input type="date" value={extra.date} onChange={e=>setExtra(x=>({...x,date:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12 }} />
        <input placeholder="Admission Time" value={extra.admTime} onChange={e=>setExtra(x=>({...x,admTime:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:120 }} />
        <input placeholder="Accompanied by" value={extra.accompaniedBy} onChange={e=>setExtra(x=>({...x,accompaniedBy:e.target.value}))} style={{ padding:"6px 8px", borderRadius:6, border:"1px solid #ccc", fontSize:12, width:180 }} />
      </div>

      <PrintLayout title="Nursing History Sheet">
        {/* ── PAGE 1 (FRONT) — Sections I–VII ── */}
        <div className="form-page">
          <div className="form-header">
            <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
            <div className="org" style={{ fontWeight:"bold" }}>VICTORIANO LUNA MEDICAL CENTER</div>
            <div className="org">Camp Colonel Victoriano K Luna, V Luna Avenue, Quezon City</div>
            <div className="form-title">NURSING HISTORY GUIDE I</div>
          </div>

          <p style={{ fontSize:9, margin:"4px 0 8px" }}>INSTRUCTION: Enter information/finding as elicited from patient. Indicate with a (✓) mark on the tick boxes if it applies. Write "NA" if item does not apply.</p>

          <div className="row">
            <span className="label">Date:</span>
            <span className="field-line" style={{ minWidth:100 }}>{extra.date || "\u00A0"}</span>
            <span className="label">Admission Time:</span>
            <span className="field-line" style={{ minWidth:80 }}>{extra.admTime || "\u00A0"}</span>
            <span className="label">Accompanied by:</span>
            <span className="field-line" style={{ minWidth:140 }}>{extra.accompaniedBy || "\u00A0"}</span>
            <span className="label">h</span>
          </div>

          <table style={{ marginTop:6, fontSize:9 }}>
            {/* Section I */}
            <tbody>
              <tr><td colSpan={2} style={{ fontWeight:"bold", background:"#f0f0f0" }}>I. PERSONAL INFORMATION</td></tr>
              <tr>
                <td colSpan={2}>
                  <div className="row">
                    <span className="label">Rank/Name:</span>
                    <span className="field-line" style={{ minWidth:180 }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
                    <span className="label">AFPSN:</span>
                    <span className="field-line" style={{ minWidth:90 }}>{p?.afpsn || "\u00A0"}</span>
                    <span className="label">BOS:</span>
                    <span className="field-line" style={{ minWidth:80 }}>{p?.bos || "\u00A0"}</span>
                  </div>
                  <div className="row">
                    <span className="label">Age:</span>
                    <span className="field-line" style={{ minWidth:40 }}>{p?.age || "\u00A0"}</span>
                    <span className="label">Sex:</span>
                    <span className="field-line" style={{ minWidth:60 }}>{p?.sex || "\u00A0"}</span>
                    <span className="label">Religion:</span>
                    <span className="field-line" style={{ minWidth:90 }}>{p?.religion || "\u00A0"}</span>
                    <span className="label">Civil Status:</span>
                    <span className="field-line" style={{ minWidth:70 }}>&nbsp;</span>
                    <span className="label">Unit:</span>
                    <span className="field-line" style={{ minWidth:80 }}>{p?.unit || "\u00A0"}</span>
                  </div>
                  <div className="row">
                    <span className="label">Home Address:</span>
                    <span className="field-line xl">{p?.address || "\u00A0"}</span>
                  </div>
                  <div className="row">
                    <span className="label">Blood Type:</span>
                    <span className="field-line" style={{ minWidth:60 }}>&nbsp;</span>
                    <span className="label">Educational Attainment:</span>
                    <span className="field-line" style={{ minWidth:120 }}>&nbsp;</span>
                  </div>
                  <div className="row">
                    <span className="label">Occupation:</span>
                    <span className="field-line" style={{ minWidth:140 }}>&nbsp;</span>
                    <span className="label">Language/Dialect Spoken:</span>
                    <span className="field-line" style={{ minWidth:120 }}>&nbsp;</span>
                  </div>
                  <div className="row">
                    <span className="label">Next of Kin:</span>
                    <span className="field-line xl">&nbsp;</span>
                  </div>
                </td>
              </tr>

              {/* Section II */}
              <tr><td colSpan={2} style={{ fontWeight:"bold", background:"#f0f0f0" }}>II. VITAL INFORMATION</td></tr>
              <tr>
                <td colSpan={2}>
                  <div style={{ marginBottom:4 }}><strong>A. Manner of Admission:</strong></div>
                  <div style={{ display:"flex", gap:20, marginLeft:16, marginBottom:6 }}>
                    <CB label="Ambulatory" /><CB label="Per Stretcher" /><CB label="Per Wheelchair" /><CB label="Others ________" />
                  </div>
                  <div className="row"><span className="label">B. Type of Admission:</span><span className="field-line" style={{ minWidth:200 }}>&nbsp;</span></div>
                  <div className="row"><span className="label">C. Reason of admission*:</span><span className="field-line xl">{p?.diagnosis || "\u00A0"}</span></div>
                  <div style={{ fontSize:9, marginTop:4 }}>
                    *Source of information: <CB label="patient" /><CB label="significant other" />
                    <span className="label">With Allergies, please specify: </span>
                    <span className="field-line" style={{ minWidth:120 }}>{p?.allergies || "\u00A0"}</span>
                  </div>
                </td>
              </tr>

              {/* Section III */}
              <tr><td colSpan={2} style={{ fontWeight:"bold", background:"#f0f0f0" }}>III. ALLERGIES</td></tr>
              <tr>
                <td colSpan={2}>
                  <CB label="No Known Allergy" />
                  <CB label="With Allergies, please specify:" />
                  <span className="field-line" style={{ minWidth:180 }}>{p?.allergies || "\u00A0"}</span>
                </td>
              </tr>

              {/* Section IV */}
              <tr><td colSpan={2} style={{ fontWeight:"bold", background:"#f0f0f0" }}>IV. MEDICAL AND SURGICAL HISTORY</td></tr>
              <tr>
                <td style={{ width:"50%", verticalAlign:"top", padding:4 }}>
                  <div><strong>Pertinent Medical History:</strong></div>
                  <div className="row">Heart Disease, Specify: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div className="row">Infectious Disease, Specify: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div className="row">Injuries, Specify: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div className="row">Lung Disease, Specify: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div style={{ marginTop:6 }}><strong>Pertinent Family Medical History:</strong></div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:3 }}>
                    <CB label="Diabetes" /><CB label="TB" /><CB label="Cancer" /><CB label="Asthma" /><CB label="Hypertension" />
                  </div>
                  <div className="row">Others (Specify): <span className="field-line" style={{ minWidth:120 }}>&nbsp;</span></div>
                </td>
                <td style={{ verticalAlign:"top", padding:4 }}>
                  <div><strong>Hospitalizations within the past 3 years:</strong></div>
                  <div style={{ minHeight:30, borderBottom:"1px solid #ccc" }}>&nbsp;</div>
                  <div style={{ marginTop:8 }}><strong>Pertinent Surgical History: Previous Operation</strong></div>
                  <div style={{ display:"flex", gap:16, margin:"4px 0" }}><CB label="YES" /><CB label="NO" /></div>
                  <div>If Yes, list down all surgical operations done:</div>
                  <div style={{ minHeight:30, borderBottom:"1px solid #ccc" }}>&nbsp;</div>
                </td>
              </tr>

              {/* Sections V & VI */}
              <tr>
                <td style={{ verticalAlign:"top", padding:4 }}>
                  <div style={{ fontWeight:"bold" }}>V. HISTORY OF BLOOD TRANSFUSION</div>
                  <div style={{ display:"flex", gap:16, margin:"4px 0" }}><CB label="YES" /><CB label="NO" /></div>
                  <div className="row">If YES, specify date/s: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div className="row">Blood Type transfused: <span className="field-line" style={{ minWidth:80 }}>&nbsp;</span></div>
                  <div style={{ display:"flex", gap:8, alignItems:"baseline" }}>
                    Transfusion reaction: <CB label="YES" /><CB label="NO" />
                  </div>
                  <div className="row">If YES, specify: <span className="field-line xl">&nbsp;</span></div>
                </td>
                <td style={{ verticalAlign:"top", padding:4 }}>
                  <div style={{ fontWeight:"bold" }}>VI. SOCIO-ECONOMIC HISTORY</div>
                  <div style={{ fontSize:9, marginTop:4 }}>Living arrangements:</div>
                  <CB label="Private home/apartment" /><br />
                  <CB label="Shelter home" /><CB label="No stable arrangement" /><br />
                  <CB label="Independent" /><CB label="With family/friends/relatives" /><br />
                  <div className="row" style={{ marginTop:4 }}>
                    <CB label="Tobacco/Cigarette smoker:" />
                    <span className="field-line" style={{ minWidth:40 }}>&nbsp;</span> packs/day for
                    <span className="field-line" style={{ minWidth:40 }}>&nbsp;</span> years
                  </div>
                  <div className="row"><CB label="Alcohol, last use" /><span className="field-line" style={{ minWidth:80 }}>&nbsp;</span></div>
                </td>
              </tr>

              {/* Section VII */}
              <tr><td colSpan={2} style={{ fontWeight:"bold", background:"#f0f0f0" }}>VII. History of Abuse/Neglect</td></tr>
              <tr>
                <td colSpan={2}>
                  <div style={{ fontSize:9 }}>Does the patient show signs of suspect abuse/neglect or mistreatment? <CB label="YES" /><CB label="NO" /></div>
                  <div className="row">If yes, specify the signs observed from the patient: <span className="field-line xl">&nbsp;</span></div>
                  <div style={{ fontStyle:"italic", fontSize:9, marginTop:4 }}><strong>Please inform the attending physician for management/referral under SOP Nr 021-10 HAFPMC</strong></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── PAGE BREAK ── */}
        <div className="page-break" />

        {/* ── PAGE 2 (BACK) — Sections VIII–XI ── */}
        <div className="form-page" style={{ marginTop: 16 }}>
          <div className="form-header">
            <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
            <div className="org" style={{ fontWeight:"bold" }}>VICTORIANO LUNA MEDICAL CENTER</div>
            <div className="org">Camp Colonel Victoriano K Luna, V Luna Avenue, Quezon City</div>
          </div>

          <table style={{ marginTop:8, fontSize:9 }}>
            <tbody>
              {/* Section VIII - Nutrition */}
              <tr><td colSpan={3} style={{ fontWeight:"bold", background:"#f0f0f0", padding:3 }}>VIII. NUTRITION SCREENING</td><td style={{ fontWeight:"bold", background:"#f0f0f0", textAlign:"center" }}>YES</td><td style={{ fontWeight:"bold", background:"#f0f0f0", textAlign:"center" }}>NO</td></tr>
              {[
                "Has the patient involuntary loss of 10 lbs or (10% of usual weight) over 6 mos?",
                "Does the patient have open wounds, pressure ulcers or gangrene?",
                "Is the patient on Dialysis or with End Stage Renal Disease?",
                "Does the patient have any feeding difficulties (chewing, swallowing or unable to feed self)?",
                "Is the patient receiving Parenteral or Enteral Nutrition?",
                "Is the patient a newly diagnosed Diabetic?",
                "Would you like further education on your special diet by a dietician?",
                "Does the patient have a food allergy or special dietary needs, or food preferences?\nIf Yes, please specify: ___________",
              ].map((q, i) => (
                <tr key={i}>
                  <td colSpan={3} style={{ padding:"2px 4px" }}>{i+1}. {q}</td>
                  <td style={{ width:30, textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                  <td style={{ width:30, textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                </tr>
              ))}
              <tr><td colSpan={5} style={{ fontSize:8, fontStyle:"italic", padding:3 }}>Please refer to Clinical Dietician if Therapeutic Diet is ordered or if any of the above is checked YES</td></tr>

              {/* Aspiration Risk */}
              <tr><td colSpan={3} style={{ fontWeight:"bold", background:"#f0f0f0", padding:3 }}>Aspiration Risk Assessment</td><td style={{ fontWeight:"bold", background:"#f0f0f0", textAlign:"center" }}>YES</td><td style={{ fontWeight:"bold", background:"#f0f0f0", textAlign:"center" }}>NO</td></tr>
              {[
                "Does the patient have history of stroke?",
                "Does the patient cough when eating or drinking?",
                "Does the patient receive tube feedings?",
                "Does the patient experience difficulty in swallowing or chewing?",
              ].map((q, i) => (
                <tr key={i}>
                  <td colSpan={3} style={{ padding:"2px 4px" }}>{i+1}. {q}</td>
                  <td style={{ textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                  <td style={{ textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                </tr>
              ))}
              <tr><td colSpan={5} style={{ fontSize:8, fontStyle:"italic", padding:3 }}>Place the patient on Aspiration Precaution Monitoring if any of the above is checked YES</td></tr>

              {/* Section IX - Functional */}
              <tr><td colSpan={5} style={{ fontWeight:"bold", background:"#f0f0f0", padding:3 }}>IX. FUNCTIONAL SCREENING</td></tr>
              <tr>
                <td colSpan={5} style={{ padding:3 }}>
                  <div style={{ fontSize:9, marginBottom:4 }}>Prior to admission, how did the patient perform the following activities? (place a check mark on appropriate spaces)</div>
                  <table style={{ width:"100%", fontSize:9 }}>
                    <thead>
                      <tr>
                        <th style={{ width:"40%" }}>Activities</th>
                        <th style={{ width:"20%" }}>Independently</th>
                        <th style={{ width:"20%" }}>With partial assistance</th>
                        <th style={{ width:"20%" }}>With total assistance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Bathing/Showering: ( ) AM  ( ) PM  ( ) Night; Indicate time: ___",
                        "Oral Hygiene",
                        "Walking",
                        "Eating",
                        "Dressing = Upper garment",
                        "Dressing = Lower garment",
                        "Moving to and from Bed/Chair",
                        "Toileting  Bowel time: ( ) AM  ( ) PM  ( ) Night\n  Voiding frequency:",
                      ].map((act, i) => (
                        <tr key={i}>
                          <td style={{ padding:"2px 4px" }}>{act}</td>
                          <td style={{ textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                          <td style={{ textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                          <td style={{ textAlign:"center" }}><span style={{ display:"inline-block", width:10, height:10, border:"1px solid #000" }} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ marginTop:4 }}>Does the patient use any devices: ( ) Cane  ( ) Walker  ( ) Wheelchair  ( ) Prosthesis, Location: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                  <div>Sleeping Patterns: Number of Sleeping Hours = <span className="field-line" style={{ minWidth:60 }}>&nbsp;</span></div>
                  <div>( ) AM  ( ) PM  ( ) Night; specify usual time of sleep: <span className="field-line" style={{ minWidth:100 }}>&nbsp;</span></div>
                </td>
              </tr>

              {/* Section X */}
              <tr>
                <td colSpan={5} style={{ padding:3 }}>
                  <div style={{ fontWeight:"bold" }}>X. PRESSURE SORE RISK ASSESSMENT (BRADEN SCALE)</div>
                  <div style={{ display:"flex", gap:16, marginTop:4 }}>
                    <CB label="No risk identified" />
                    <span>With risk*, if identified indicate Grand total score: <span className="field-line" style={{ minWidth:60 }}>&nbsp;</span></span>
                  </div>
                  <div style={{ fontSize:8, fontStyle:"italic", marginTop:3 }}>*Please use the AFPMC Pressure Risk Ulcer Risk Assessment Form for further management</div>
                  <div style={{ fontSize:8, fontStyle:"italic" }}>* Patients with a score of &lt; 16 are at risk for skin breakdown, initiate Pressure Ulcer Management</div>
                </td>
              </tr>

              {/* Section XI */}
              <tr>
                <td colSpan={5} style={{ padding:3 }}>
                  <div style={{ fontWeight:"bold" }}>XI. FALL RISK ASSESSMENT (Schmidt Scale)</div>
                  <div style={{ display:"flex", gap:16, marginTop:4 }}>
                    <CB label="No risk identified" />
                    <span>With risk*, if identifies indicate Grand total score: <span className="field-line" style={{ minWidth:60 }}>&nbsp;</span></span>
                  </div>
                  <div style={{ fontSize:8, fontStyle:"italic", marginTop:3 }}>* Initiate AFPMC Fall Prevention and Management Program under SOP Nr 026-10 HAFPMC</div>
                </td>
              </tr>

              {/* Signature */}
              <tr>
                <td style={{ fontWeight:"bold", padding:4, width:"50%" }}>Name and Signature of Accomplishing RN</td>
                <td colSpan={4} style={{ fontWeight:"bold", padding:4 }}>Date Accomplished</td>
              </tr>
              <tr>
                <td style={{ height:50, padding:4 }}>&nbsp;</td>
                <td colSpan={4} style={{ padding:4 }}>&nbsp;</td>
              </tr>
            </tbody>
          </table>
        </div>
      </PrintLayout>
    </div>
  );
}