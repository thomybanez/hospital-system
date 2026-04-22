import { useState } from "react";
import PrintLayout from "../../components/PrintLayout";
import PatientPicker from "../../components/PatientPicker";

export default function ConsentForm({ title, procedureDefault = "", onBack }) {
  const [p, setP]       = useState(null);
  const [extra, setExtra] = useState({
    procedure: procedureDefault,
    doctor: "", anesthesiologist: "", anesthesiaType: "", date: "",
  });

  const inp = (field, ph, w = 140) => (
    <input
      className="no-print"
      placeholder={ph}
      value={extra[field]}
      onChange={e => setExtra(x => ({ ...x, [field]: e.target.value }))}
      style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12, width: w }}
    />
  );

  return (
    <div>
      <div className="no-print" style={{ display: "flex", gap: 8, padding: "10px 16px", background: "#f4f6f9", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={onBack} style={{ padding: "7px 14px", borderRadius: 7, border: "none", background: "#1a1a2e", color: "#fff", fontWeight: 700, cursor: "pointer" }}>← Back</button>
        <PatientPicker onSelect={setP} />
        {!procedureDefault && inp("procedure", "Procedure name", 200)}
        {inp("doctor", "Surgeon / Doctor", 180)}
        {inp("anesthesiologist", "Anesthesiologist", 180)}
        {inp("anesthesiaType", "Anesthesia type", 140)}
        <input type="date" value={extra.date} onChange={e => setExtra(x => ({ ...x, date: e.target.value }))} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12 }} />
      </div>

{/*Consent for Procedure*/}
      <PrintLayout title={title}>
        <div className="form-header">
          <div className="org">H E A D Q U A R T E R S</div>
          <div className="org">ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div className="org">VICTORIANO LUNA MEDICAL CENTER</div>
          <div className="org">Camp Colonel Victoriano K-Luna, V. Luna Avenue, Quezon City</div>
          <div style={{ marginBottom: '36px' }}></div>

          <div className="form-title" style={{ marginLeft: '30px' }}>___________________</div>
          <div style={{ display:'flex', justifyContent: "space-between" }}>
            <div className="form-title" style={{ marginLeft: '80px' }}>CONSENT</div>
            <div className="form-title" style={{ marginRight: '150px' }}>Ward 3A</div>
          </div>

          <div style={{ marginBottom: '36px' }}></div>          
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '2.5'}}>
            <span className="label">RANK/NAME</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">AFPSN</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p?.afpsn || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '0.5'}}>
            <span className="label">AGE</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p?.age || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '0.7'}}>
            <span className="label">TIME</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>&nbsp;</span>
          </div>
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '3'}}>
            <span className="label">Unit / Assignment</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p?.unit || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">Civil Status</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>&nbsp;</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">Sex</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p?.sex || "\u00A0"}</span>
          </div>
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '3'}}>
            <span className="label">Address</span>
            <span className="field-line xl" style={{textAlign:'center',alignItems:'baseline', fontSize:'1cqw', width: '100%' }}>{p?.address || "\u00A0"}</span>
          </div>          
        </div>

        <div style={{marginBottom: '36px'}}></div>
        <p style={{marginLeft:'60px',fontSize:'16px' }}>PLACE: VLMC, AFP HEALTH SERVICE COMMAND</p>

        <div style={{fontSize:'16px', marginLeft:'60px'}}>
            <div style={{display:'inline-block', width:'100%'}}>
              <span style={{display:'flex', flexDirection:'row', width:'100%', marginTop:'20px'}}>I.

              <span style={{display:'flex',flexDirection:'colummn', width:'100%'}}>
                <span style={{flex:'1', marginLeft:'40px'}}>I, hereby authorize the performance upon</span>
                  <div style={{flex:'1',width:'100%', display:'flex', flexDirection:'column'}}>
                    <span className="field-line" style={{fontSize:'1cqw',width:'100%', textAlign:'center',textTransform: 'uppercase'}}>{p?.fullname || "\u00A0"}</span>
                    <span style={{width:'100%', fontSize:'10px', justifyContent:'center',alignItems:'center',textAlign:'center'}}>(State name of patient or "myself")</span>
                  </div>
              </span>

              </span>
            </div>
        </div>
                
        <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
          <div style={{width:'100%'}}>
            <span style={{fontSize:'16px',display:'inline', wordBreak:'normal', overflowWrap:'break-word', width:'100%'}}>
                to the following operation or diagnostic procedure                  
                <div className="field-line" style={{fontSize:'1cqw',textAlign:'center', width:'100%',textTransform: 'uppercase'}}>{extra.procedure || "\u00A0"}</div>                
            </span>                        
          </div>
          <span style={{fontSize:'10px', textAlign:'center', width:'100%'}}>(State name of procedure or procedure to be performed) </span>
        </div>

        <div style={{fontSize:'16px', display:'flex', flexDirection:'row', alignItems:'center', marginTop:'10px'}}>
            <span style={{flex:'1'}}>under the direction of Dr.</span>
            <span className="field-line" style={{flex:'1.5', textAlign:'center', fontSize:'1cqw',textTransform: 'uppercase'}}>{extra.doctor || "\u00A0"}</span> 
            <span style={{flex:'1', lineHeight:'1.5'}}>and whenever he may</span>
        </div>
        
        <div style={{fontSize:'16px', lineHeight:'1.5'}}>
          designate at his assistance; and any unforeseen condition arises in the conduct of operation which if his judgment calls for procedures in addition to or different from those now contemplated; I further request and authorize him to whatever he seems advisable.
        </div>
        
        <div style={{fontSize:'16px', lineHeight:'1.5', marginTop:'20px'}}>
          <span style={{marginLeft:'60px'}}>II.</span>
          <span style={{marginLeft:'40px'}}>The nature and purpose of the operation, possible methods of treatment, the risks involved, and the possibilities of complication have been fully explained to me. I acknowledge that no guaranteed or assurance has been made as to the needs that may be obtained.
          </span>
        </div>

        <div style={{fontSize:'16px', marginTop:'20px', lineHeight:'1.5'}}>
          <span style={{marginLeft:'60px'}}>III.</span>
          <span style={{marginLeft:'40px'}}>I consent to the administration of anesthesia to be applied by or order the direction of Dr.</span>
          <span className="field-line" style={{fontSize:'1cqw',width:'30%', textAlign:'center',textTransform: 'uppercase'}}>{extra.anesthesiologist || "\u00A0"}</span>
          <span>and to the use of such anesthesia as he may deem advisable,</span>          
            <div style={{display:'flex', flexDirection:'row'}}>
              <span style={{flex:'0.90', width:'60%'}}>with the exertion of</span>
              <div style={{flex:'1.5',display:'flex', flexDirection:'column'}}>
                <span className="field-line" style={{width:'100%', textAlign:'center', textTransform: 'uppercase'}}>{extra.anesthesiaType || "\u00A0"}</span> 
                <span style={{fontSize:'10px',textAlign:'center'}}>(State name "Spinal" "Anesthesia" etc.)</span>
              </div>
              <div style={{flex:'2'}}>
              </div>
            </div>
          
          
        </div>

        {procedureDefault === "BLOOD TRANSFUSION" && (
          <p>
            - I consent to the disposal by proper authorities of the VLMC, AFP HEALTH SERVICE CMD tissues or parts whichever may be removed.
          </p>
        )}

        <div style={{fontSize:'16px', marginLeft:'60px', marginTop:'20px',lineHeight:'1.5'}}>
          <span>IV.</span>
          <span style={{marginLeft:'40px'}}>For the purpose of advancing medical science and education, I consent to the taking </span>          
        </div>
        <span style={{fontSize:'16px', marginTop:'20px',lineHeight:'1.5'}}>
          and publications of any photographs in the course of this operation, including appropriate portions my body provided my identity is not revealed by the pictures or descriptive texts accompanying them.
        </span>

        <p style={{ fontStyle: "italic", marginLeft:'120px', fontSize:'16px', marginTop:'20px'}}>
          (CROSS OUT ANY PARAGRAPH ABOVE WHICH DOES NOT APPLY)
        </p>

        <p style={{fontSize:'16px', marginTop:'20px', lineHeight:'1'}}>
          <span style={{marginLeft:'120px'}}>I CERTIFY THAT I HAVE READ AND FULLY UNDERSTAND THE </span>
          <span>ABOVE CONSENT TO OPERATION THAT THE EXPLANATIONS THEREIN REFERRED TO WERE MADE AND</span> THAT ALL BLANKS OR STATEMENTS REQUIRING INSERTION OR COMPLETION WERE FILLED. INAPPLICABLE IF ANY? WERE STRICKEN BEFORE IS SIGNED.
        </p>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <div>
            <div className="field-line" style={{ minWidth: 200 }}>&nbsp;</div>
            <div style={{ fontSize: 10 }}>Signature of Patient</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
          <div>
            <div className="field-line" style={{ minWidth: 200 }}>&nbsp;</div>
            <div style={{ fontSize: 10 }}>Signature of patient's Husband or Wife</div>
          </div>
          <div>
            <div className="field-line" style={{ minWidth: 200 }}>&nbsp;</div>
            <div style={{ fontSize: 10 }}>Signature of person authorized to consent for the patient</div>
          </div>
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <span className="label">Relationship to Patient</span>
          <span className="field-line" style={{ minWidth: 180 }}>&nbsp;</span>
        </div>

        <p style={{ marginTop: 12, fontSize: 10 }}>
          The foregoing consent was used, discussed and signed in my presence and in my opinion the person so signing did so freely with full knowledge and understanding.
        </p>

        <div className="row">
          <span className="label">WITNESS: (1)</span>
          <span className="field-line lg">&nbsp;</span>
          <span className="label">(2)</span>
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