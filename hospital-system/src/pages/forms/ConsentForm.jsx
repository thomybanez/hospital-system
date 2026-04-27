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

  const G = ({ value, min = 120}) => {
    return (
      <span
        style={{
          display:'inline-block',
          minWidth: min,
          borderBottom: '1px solid black',
          textAlign: 'center',
          fontWeight: 'bold',
          verticalAlign: 'baseline',
          whiteSpace: 'normal',
          lineHeight:'1',
          padding:'0 20px',
          textIndent: '0px'
        }}
        >
          { value || '\u00A0'}
        </span>
      )
    }

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
          <div style={{ marginBottom: '10px' }}></div>

          <div className="form-title" style={{ marginLeft: '30px' }}>___________________</div>
          <div style={{ display:'flex', justifyContent: "space-between" }}>
            <div className="form-title" style={{ marginLeft: '80px' }}>CONSENT</div>
            <div className="form-title" style={{ marginRight: '150px' }}>Ward 3A</div>
          </div>

          <div style={{ marginBottom: '16px' }}></div>          
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '2.5'}}>
            <span className="label">RANK/NAME</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p ? `${p.rank} ${p.fullname}` : "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">AFPSN</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.afpsn || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '0.5'}}>
            <span className="label">AGE</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.age || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '0.7'}}>
            <span className="label">TIME</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>&nbsp;</span>
          </div>
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '3'}}>
            <span className="label">Unit / Assignment</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.unit || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">Civil Status</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.civilstatus || "\u00A0"}</span>
          </div>
          <div style={{display: 'flex', flex: '1'}}>
            <span className="label">Sex</span>
            <span className="field-line" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.sex || "\u00A0"}</span>
          </div>
        </div>

        <div className="row">
          <div style={{display: 'flex', flex: '3'}}>
            <span className="label">Address</span>
            <span className="field-line xl" style={{textAlign:'center',alignItems:'baseline', fontSize:'13px', width: '100%' }}>{p?.address || "\u00A0"}</span>
          </div>          
        </div>

        <div style={{marginBottom: '20px'}}></div>
        <p style={{marginLeft:'60px',fontSize:'14px' }}>PLACE: VLMC, AFP HEALTH SERVICE COMMAND</p>

        <div style={{ fontSize: '14px', marginLeft: '0px', lineHeight: '1.5' }}>
          <p style={{alignItems:'center', margin: 0, textIndent:'60px'}}>
            <span style={{ marginRight: '50px' }}>
              I.
            </span>
            <span>
              I, hereby authorize the performance upon              
              <span style={{fontSize:'14px', display: 'inline-flex', flexDirection: 'column', alignItems:'center', textAlign:'center', alignContent:'center', width:'250px', height:'100%'}}>                
                <G value={p?.fullname} min={250} />               
                <span style={{lineHeight:'1', fontSize: '10px', textIndent:'0'}}>
                  (State name of patient or "myself")
                </span>
              </span>
              to the following operation or diagnostic procedure.
              <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems:'center', textAlign:'center', alignContent:'center', width:'auto', height:'100%', maxWidth:'100%', textIndent:'0px'}}>            
                <span style={{textTransform:'uppercase', fontFamily:'Calibri', fontSize:'16px', width:'100%'}}>
                   <G value={extra.procedure} min={300}/>
                </span>               
                <span style={{lineHeight:'1', fontSize: '10px', textIndent:'0'}}>
                  (State name of procedure or procedure to be performed)             
                </span>
              </span>
              under the direction of 
              <span style={{textTransform:'uppercase'}}> Dr. <G value={extra.doctor} min={200}/></span>
              and whenever he may designate at his assistance; and any unforeseen condition arises in the conduct of operation which if his judgment calls for procedures in addition to or different from those now contemplated; I further request and authorize him to whatever he seems advisable. 
            </span>
          </p>
        </div>

        <div style={{fontSize:'16px', lineHeight:'1.5'}}>
          
        </div>
        
        <div style={{fontSize:'14px', lineHeight:'1.5', marginTop:'20px'}}>
          <span style={{marginLeft:'60px'}}>II.</span>
          <span style={{marginLeft:'40px'}}>The nature and purpose of the operation, possible methods of treatment, the risks involved, and the possibilities of complication have been fully explained to me. I acknowledge that no guaranteed or assurance has been made as to the needs that may be obtained.
          </span>
        </div>

        <div style={{fontSize:'14px', marginTop:'10px', lineHeight:'1.5'}}>
          <span style={{marginLeft:'60px'}}>III.</span>
          <span style={{marginLeft:'40px'}}>I consent to the administration of anesthesia to be applied by or order the direction of Dr.</span>
          <span style={{textTransform:'uppercase'}}><G value={extra.anesthesiologist} min={100}/></span>
          <span>and to the use of such anesthesia as he may deem advisable,</span>          
            <span style={{alignContent:'baseline'}}>
              <span>with the exertion of</span>
              <span style={{display:'inline-flex', flexDirection:'column'}}>
                <span style={{padding:'0 0px' , textTransform:'uppercase', margin:'0 auto',  textAlign:'center', }}><G value={extra.anesthesiaType} min={150}/></span>
                <span style={{lineHeight:'1', fontSize:'10px',textAlign:'center', textIndent:'0'}}>(State name "Spinal" "Anesthesia" etc.)</span>
              </span>              
            </span>
          
          
        </div>

        {procedureDefault === "BLOOD TRANSFUSION" && (
          <p>
            - I consent to the disposal by proper authorities of the VLMC, AFP HEALTH SERVICE CMD tissues or parts whichever may be removed.
          </p>
        )}

        <div style={{fontSize:'14px', marginLeft:'60px', marginTop:'20px',lineHeight:'1.5'}}>
          <span>IV.</span>
          <span style={{marginLeft:'40px'}}>For the purpose of advancing medical science and education, I consent to the taking </span>          
        </div>
        <span style={{fontSize:'14px', marginTop:'20px',lineHeight:'1.5'}}>
          and publications of any photographs in the course of this operation, including appropriate portions my body provided my identity is not revealed by the pictures or descriptive texts accompanying them.
        </span>

        <p style={{ fontStyle: "italic", marginLeft:'120px', fontSize:'14px', marginTop:'20px'}}>
          (CROSS OUT ANY PARAGRAPH ABOVE WHICH DOES NOT APPLY)
        </p>

        <p style={{fontSize:'14px', marginTop:'20px', lineHeight:'1'}}>
          <span style={{marginLeft:'120px'}}>I CERTIFY THAT I HAVE READ AND FULLY UNDERSTAND THE </span>
          <span>ABOVE CONSENT TO OPERATION THAT THE EXPLANATIONS THEREIN REFERRED TO WERE MADE AND</span> THAT ALL BLANKS OR STATEMENTS REQUIRING INSERTION OR COMPLETION WERE FILLED. INAPPLICABLE IF ANY? WERE STRICKEN BEFORE IS SIGNED.
        </p>

      <div style={{display: 'flex', flexDirection:'row-reverse', justifyContent:'space-between', marginTop:'30px'}}>
        <div style={{alignItems:'center',flex:'1', display: "flex", flexDirection:'row-reverse', margin:'0', padding:'0'}}>
            <G value={p?.fullname} min={250}/>
            <div style={{flex:'1', fontSize: '12px'}}>Signature of the Patient</div>
        </div>
        <div style={{flex:'1', display: "flex", flexDirection:'row-reverse', margin:'0', padding:'0', height:'100%'}}>
            <div className="field-line" style={{flex:'1'}}>&nbsp;</div>
            <div style={{flex:'1', fontSize: '12px' }}>Signature of patient's <br/> Husband or Wife</div>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection:'row-reverse', justifyContent:'space-between', marginTop:'30px'}}>
        <div style={{flex:'1', display: "flex", flexDirection:'row-reverse', margin:'0', padding:'0', height:'100%'}}>
            <div className="field-line" style={{flex:'1'}}>&nbsp;</div>
            <div style={{flex:'1', fontSize: '12px'}}>Signature of person authorized to consent for the patient</div>
        </div>
        <div style={{flex:'1', display: "flex", flexDirection:'row-reverse', margin:'0', padding:'0', height:'100%'}}>
            <div className="field-line" style={{flex:'1'}}>&nbsp;</div>
            <div style={{flex:'1', fontSize: '12px'}}>When the patient is a minor or incompetent To give consent; <br/>Relationship to Patient</div>
        </div>
      </div>

       <div style={{marginTop:'20px', fontSize:'14px'}}>
        <p style={{marginLeft:'70px'}}>
        The foregoing consent was used, discussed and signed in my presence and in my opinion</p>
        <p>the person so signing did so freely with full knowledge and understanding.</p>
       </div>
        

        <div style={{fontFamily:'Arial',fontSize:'14px',display:'flex', marginTop:'20px', justifyContent:'space-around'}}>
            <span className="label" style={{flex:'0.3'}}>WITNESS:</span>
            <span className="field-line lg" style={{flex:'1', marginRight:'30px'}}>(1)</span>
            <span className="field-line lg" style={{flex:'1', marginRight:'30px'}}>(2)</span>
        </div>
        <div style={{fontFamily:'Arial',fontSize:'14px',display:'flex',justifyContent:'space-around'}}>
            <span className="label" style={{flex:'0.3'}}>ADDRESS:</span>
            <span className="field-line lg" style={{flex:'1', marginRight:'30px'}}></span>
            <span className="field-line lg" style={{flex:'1', marginRight:'30px'}}></span>
        </div>
          
          


      </PrintLayout>
    </div>
  );
}