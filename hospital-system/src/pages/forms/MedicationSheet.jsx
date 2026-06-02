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
          <div className="form-title" style={{textAlign:'center'}}>MEDICATION SHEET</div>
        </div>

        <table style={{ fontSize: 8, marginTop:'10px'}}>
          <thead>
            <tr>
              <th rowSpan={1} style={{ width: "18%", alignContent:'center'}}>
                MEDICATION / DOSAGE / ROUTE / FREQUENCY
              </th>
              <th style={{ width: "6%" }}>
                Shift
              </th>

              {SHIFTS.map((s, i) => (
                <th key={i} style={{ width: "4%" }}>
                  {s}
                </th>
              ))}
            </tr>
                     
          </thead>
          <tbody>
            {[0,1,2,3,4,5,6,7,8,9,10,11].map(med => (
              <>
                <tr key={`${med}-date`}>
                  <td rowSpan={4} style={{ fontSize: 9, verticalAlign: "top", padding: 3 }}>
                    <div style={{ fontSize: 8}}>Date Ordered:</div>
                    <div style={{ minHeight: 30 }}>&nbsp;</div>
                  </td>
                </tr>
                <tr style={{textAlign:'center', fontWeight:'bold'}} key={`${med}-rem`}>
                  <td style={{ fontSize: 8 }}>Date</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
                <tr style={{textAlign:'center', fontWeight:'bold'}} key={`${med}-sig`}>
                  <td style={{ fontSize: 8, height: 45 }}>Sig</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
                <tr style={{textAlign:'center', fontWeight:'bold'}}  key={`${med}-rem`}>
                  <td style={{ fontSize: 8 }}>Remarks</td>
                  {SHIFTS.map((_, i) => <td key={i}>&nbsp;</td>)}
                </tr>
              </>
            ))}
            
          </tbody>
        </table>

        <table style={{marginTop: '10px'}}>
          <tbody>
            <tr>
            <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
            <td colSpan={6} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
            <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
            <td colSpan={6} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
            <td colSpan={2} style={{ fontWeight: "bold", fontSize: 9 }}>Initial Sig</td>
            <td colSpan={6} style={{ fontSize: 9 }}>Printed name and Lic Nr</td>
          </tr>
            {[0,1,2].map(i => (
              <tr key={i}>
                <td colSpan={2} style={{ height: 25 }}>&nbsp;</td>
                <td colSpan={6}>&nbsp;</td>
                <td colSpan={2}>&nbsp;</td>
                <td colSpan={6}>&nbsp;</td>
                <td colSpan={2}>&nbsp;</td>
                <td colSpan={6}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ fontSize: 8, marginTop: 6, lineHeight: 1.5 }}>
          Legend for acceptable remarks: Medical code: DC – Discontinued; NPO – Nothing by mouth; Out – out of ward; Req – Med Requested; NIS – no in stock; OWM – pt out w/ meds; Ref – Refused ; RX – Prescribed; VOM – Vomited; ALL – Allergy Injection site Code: RB – right buttocks; LB – Left buttocks; LD – Left Deltoid; RD – Right Deltoid; RL – Right Leg; LL – Left Leg; RA – Right arm; LA – Left arm A – Abdomen        
        </div>

        <div style={{display:'flex', flexDirection:'row', marginTop: 8, justifyContent:'space-between'}}>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center',marginLeft:'30px'}}>
            <span style={{fontSize:'8px'}}>RECOPIED&nbsp;BY: </span>
            <span className="field-line" style={{ minWidth: 200 }}>&nbsp;</span>
          </div>
          <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginRight:'30px'}}>
            <span style={{fontSize: '8px'}} >DATE&nbsp;RECOPIED: </span>
            <span className="field-line" style={{ minWidth: 200 }}>&nbsp;</span>
          </div>
        </div>
        
        <div className="row" style={{display:'flex', flexDirection:'row', fontSize:'12px', fontWeight:'bold', marginTop:'5px'}}>
          
          <div style={{flex:'2', display:'flex', flexDirection:'row'}}>
            <span>RANK/NAME: </span>
            <span className="field-line" style={{minWidth: 50 }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          </div>
          
          <div style={{flex:'1', display:'flex', flexDirection:'row'}}>
            <span>REG#: </span>
            <span className="field-line" style={{ minWidth: 50 }}>{p?.regno || "\u00A0"}</span>
          </div>
                   
          <span style={{flex:'0.5', display:'flex', flexDirection:'row'}}>WARD: 3A</span>
        </div>
      </PrintLayout>
    </div>
  );
}