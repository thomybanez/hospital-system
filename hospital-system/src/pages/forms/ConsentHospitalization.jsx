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

        
        <div style={{display:'grid', gridTemplateColumns:'3fr 1fr',gap:'10px', marginTop:'40px'}}>
          <div style={{height:'40px'}}>            
          </div>
          <div style={{display:'flex',flexDirection:'column',height:'40px', alignItems:'center', justifyContent:'center'}}>
            <div style={{fontFamily:'Arial', fontSize:'16px', textAlign:'center', fontWeight:'bold'}}><F label="" value={extra.date || extra.time ? `${extra.date} ${extra.time}` : ""} width={140} /></div>
            <span className="label" style={{fontSize:'16px'}}> Date/Time</span>
          </div>
        </div>

        
        <div className="form-title" style={{ textAlign: "center", fontSize:'16px', fontWeight:'bold' }}>CONSENT FOR HOSPITAL MANAGEMENT</div>

        {/* ---------------------FROM NAME RANK TO CIVIL STATUS----------------------- */}
        <div style={{fontSize:'16px', fontFamily:'Calibri', display:'grid', gridTemplateColumns:'3fr 2fr 1fr 1fr 1fr', marginTop:'20px '}}>
            
            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <div style={{ display: "flex", alignItems: "center", height:'auto', alignItems:'baseline'}}>
                <F label="" value={p?.rank} width={30}/>
                <F label="" value={p?.fullname} width={150} />
              </div>
              <span style={{fontSize:'16px'}}>Name/ Rank</span>
            </div>
            
            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.regno} width={80} />
              <span style={{fontSize:'16px'}}>AFPSN</span>
            </div>

            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.age} width={40} />
              <span style={{fontSize:'16px'}}>Age</span>
            </div>
            
            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.sex} width={60} />
              <span style={{fontSize:'16px'}}>Sex</span>
            </div>

            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.civilstatus} width={80} />
              <span style={{fontSize:'16px'}}>Civil Status</span>
            </div>            
        </div>
        {/* ----------------------------------------------------------------------------- */}


        {/* ----------------------- UNIT ASSIGNMENT TO ADDRESS -------------------------- */}
        <div style={{fontSize:'16px', fontFamily:'Calibri', display:'grid', gridTemplateColumns:'0.5fr 1fr', marginTop:'20px'}}>
            
            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.unit} width={'100%'} />
              <span style={{fontSize:'16px'}}>Unit / Assignment</span>
            </div>

            <div style={{height:'40px', alignContent:'center', textAlign:'center', justifyItems:'center', padding:'10px'}}>
              <F label="" value={p?.address} width={'100%'} />
              <span style={{fontSize:'16px'}}>Address</span>
            </div>
        
        </div>     
        {/* ----------------------------------------------------------------------------- */}
        


        {/* ----------------------------CONTRACT TEXT PARAGRAPH------------------------------ */}
      <div style={{textIndent:'70px', fontSize:'16px', fontFamily:'Arial'}}>
        <p style={{marginTop:'40px', lineHeight:'1.8'}}>
          I, <G value={p?.fullname} min={250}/> Authorized the department of <G value={extra.dept} min={150}/> Ward <G value={extra.ward} min={100}/>. VLMC, AFPHSC in the performance of evaluation, admission, re-admission, management and treatment. If any unforeseen condition arises in the course, I further request and authorized them to do what they seem advisable.
        </p>

        <p style={{marginTop:'40px', lineHeight:'1.8'}}>
          The standard and operating procedures of this department have fully explained to me. I acknowledge that no guarantees or assurance has been made as to the result that may be obtained. I CERTIFY that I have read and fully understood the above consent that the explanations therein referred to were made and that all blanks or statements requiring insertion or completion were filed.
        </p>
      </div>
        {/* ----------------------------------------------------------------------------- */}




        {/* ---------------------------  SIGNATURES  ------------------------------------ */}
        <div style={{fontSize:'14px', fontFamily:'Calibri', marginTop: '40px', display: 'grid', gridTemplateColumns:'1fr 1fr'}}>
          
          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div className="field-line" style={{width:'80%'}}>&nbsp;</div>
            <div style={{textAlign:'center', width:'80%'}}>Signature over printed name or thumb mark of patient's wife/husband or relative</div>
          </div>

          <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <div style={{fontFamily:'Arial', fontSize:'16px'}}><G value={p?.fullname} min={300}/></div>
            <div style={{textAlign:'center', width:'70%'}}>Signature over printed name or thumb mark of patient</div>
          </div>  
        </div>


        <div style={{fontSize:'14px', fontFamily:'Calibri', display:'flex', flexDirection:'column', marginTop: '40px', textAlign: "center", alignItems:'center' }}>
          <div className="field-line" style={{width:'40%'}}>&nbsp;</div>
          <div style={{ textAlign:'center', width:'38%'}}>Signature over printed name of person authorized to consent for the patient</div>
        </div>
        {/*------------------------------------------------------------------------------------------*/}



        <p style={{ marginTop: 40, fontSize: 16, textIndent: 70 }}>
          The foregoing consent was read, discussed and signed in my presence and in opinion, the person so signing did so freely with full knowledge and understanding:
        </p>


      <div style={{display:'flex' , flexDirection: 'column', height:'80px', marginTop:'40px'}}>
        <div style={{display:'flex', flexDirection:'row'}}>
          <span className="label">Witness:</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          <span className="label">Address:</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
        </div>
        <div style={{display:'flex', flexDirection:'row'}}>
          <span className="label" style={{marginLeft: '57px'}}>&nbsp;</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
          <span className="field-line lg" style={{margin:'0px 20px'}}>&nbsp;</span>
        </div>        
      </div>
      </PrintLayout>
    </div>
  );
}