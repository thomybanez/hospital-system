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
  "Pre-op med administered and charted, specify: ________________________________________________________________________",
  "Medications(s)/Article(s) sent with the patient, specify:__________________________________________________________________",
  "Latest vital signs: BP= ____ CR= ___ RR= ___ Temp= ____ Weight= ____ O2= ____",
  "Standard precaution indicated? If YES, specify: _______________",
  "Culture and sensitivity, specify: _______________",
];

const G = ({value, min = 120}) =>{
    return (
      <span style={{
        display:"inline-block",
        minWidth: min,
        borderBottom: '1px solid black',
        textAlign: 'center',
        fontWeight: 'bold',
        verticalAlign: 'baseline',
        whiteSpace: 'normal',
        lineHeight: '1',
        padding: '0 0',
        margin: '0 0',
        boxSizing: 'border-box',
        textIndent: '0px'
      }}>
        {value || '\u00A0'}
      </span>
    )
  }

export default function PreOpChecklist({ onBack }) {
  const [p, setP] = useState(null);
  const [checks, setChecks] = useState(Array(ITEMS.length).fill(""));
  const [extra, setExtra] = useState({ date: "", anesthesia: "", procedure: "", remarks: "", pacuNurse: "" });

  const toggle = (i, val) => {
    const next = [...checks];
    next[i] = next[i] === val ? "" : val;
    setChecks(next);
  };

  const Box = ({ checked, blocked }) => (
    <span style={{
      display: "inline-block", width: 12, height: 12,
      border: "1px solid #000", marginRight: 2, verticalAlign: "middle",
      background: blocked ? "#000" : (checked ? "#000" : "#fff"),
      fontSize: 9, textAlign: "center", lineHeight: "12px", color: "#fff",
    }}>{(checked && !blocked) ? "✓" : ""}</span>
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

      
      <PrintLayout title="Pre-Operative Checklist" >
          <div className="form-header">
          <div className="org" style={{fontSize:"12px"}}>H E A D Q U A R T E R S</div>
          <div className="org" style={{fontSize:"12px"}}>ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org" style={{fontSize:"12px"}}>VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org" style={{fontSize:"12px"}}>Camp Col Victoriano K Luna, V. Luna Ave, Quezon City</div>
          <br></br>
          <div className="org" style={{textAlign:'center', textDecoration:'underline', fontSize:"12px"
          }}>PRE-OPERATIVE CHECKLIST</div>
        </div>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', textAlign:'center'}}>
          <span className="label" style={{fontSize:"12px"}}>Ward: 
            <span className="field-line" style={{flex:'1', minWidth: 80, width:'30%' }}>3A</span>
          </span>
          <span className="label" style={{fontSize:"12px"}}>Date: 
            <span className="field-line" style={{flex:'1', minWidth: 120, width:'30%' }}>{extra.date || "\u00A0"}</span>
          </span>
        </div>

        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', textAlign:'center'}}>
          <span className="label" style={{fontSize:"12px"}}>Rank/Name: 
              <span className="field-line" style={{flex:'1', minWidth: 400, width:'90%' }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          </span>          
          <span className="label" style={{fontSize:"12px"}} >Reg#: 
              <span className="field-line" style={{flex:'1', minWidth: 115, width:'30%' }}>{p?.regno || "\u00A0"}</span>
          </span>          
        </div>
      

        <div style={{ fontSize: "12px", fontFamily: "Arial", marginTop:'5px' }}>
          Pre-op Diagnosis:&nbsp;
          {p?.diagnosis ? (
            <>
              <span className="field-line">
                {p?.diagnosis}
              </span>              
            </>
          ) : (
            <>
              <span className="field-line" style={{ minWidth: 200 }}></span>
              <span className="field-line" style={{ minWidth: 200 }}></span>             
            </>
          )}
        </div>
          
           
        <div style={{ fontSize: "12px", fontFamily: "Arial", marginTop: '5px'}}>
          Proposed Surgical Procedure:&nbsp;
          {extra.procedure ? (
            <>
              <span className="field-line">
                {extra.procedure}
              </span>              
            </>
          ) : (
            <>
              <span className="field-line" style={{ minWidth: 200 }}></span>
              <span className="field-line" style={{ minWidth: 200 }}></span>
            </>
          )}
        </div>

        <div style={{ fontSize: "12px", fontFamily: "Arial", marginTop: '5px'}}>
          <span>Type of Anesthesia: </span>
          <span className="field-line" style={{minWidth: 200, maxWidth:'550px' }}>
            {extra.anesthesia || "\u00A0"}
          </span>
        </div>

        <p style={{ fontSize: 12, margin: "8px 0 4px" }}>
          <strong>Place initial signature in appropriate box: YES or NO, NA</strong> (not applicable or was not ordered). <strong style={{textDecoration:'underline'}}>Each item must have an entry.</strong> <strong>Remarks</strong> shall be written on the space after the item.
        </p>

        <table style={{boxSizing:'border-box', height:'100%', width:'100%', fontSize: '12px', marginBottom: 8 }}>
          <thead>
            <tr>
              <th style={{ width: 36 }}>YES</th>
              <th style={{ width: 36 }}>NO</th>
              <th style={{ width: 36 }}>N/A</th>
              <th></th>
            </tr>
          </thead >
          <tbody>
            {ITEMS.map((item, i) => {
              const isBlocked = item.includes("Standard precaution indicated") || item.includes("Culture and sensitivity") || item.includes("Latest vital") || item.includes("NPO since");
              return (
                <tr key={i}>
                  <td style={{ height:'auto', textAlign: "center" }}></td>
                  <td style={{ height:'auto',textAlign: "center", padding:'0' }}>                    
                    {isBlocked && <div style={{padding:'0', backgroundColor:'black', width: '100%', height: '100%'}} />}
                  </td>
                  <td style={{ height:'auto', textAlign: "center" }}></td>
                  <td style={{ height:'auto' }}>{item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{fontSize:'10px'}}>
          <span className="label" style={{fontSize:'12px'}}>Remarks: </span>
          <span className="field-line xl" style={{width:'90%'}}>&nbsp;</span>
        </div>

        <div style={{fontSize:'10px', marginTop: 12 }}>
          <span className="label" style={{fontSize:'12px'}}>PACU Nurse Full Name &amp; Signature: </span>
          <span className="field-line" style={{ width: "400px" }}>&nbsp;</span>
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
                <td style={{ height: 1 }}>&nbsp;</td>
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