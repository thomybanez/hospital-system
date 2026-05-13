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
        <div style={{fontSize:'14px', textAlign:'center'}}>
          <div>H E A D Q U A R T E R S</div>
          <div>ARMED FORCES OF THE PHILIPPINES HEALTH SERVICE COMMAND</div>
          <div>VICTORIANO LUNA MEDICAL CENTER</div>
          <div>Camp Colonel Victoriano K-Luna, V. Luna Avenue, Quezon City</div>

          <div style={{display: "flex", marginTop:'20px'}}>
            <span style={{flex:'1'}}></span>

            <span style={{flex:'1', display:'flex', justifyContent:'center', alignItems:'center',fontSize:'20px', height:'50px', fontWeight:'500', textDecoration:'underline'}}>KARDEX</span>

            <div style={{flex:'1', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
              <span style={{display:'flex', flexDirection:'column', border: '3px solid black', height:'50px', width:'40%', textAlign:'left', justifyContent:'center'}}>
                <span style={{fontSize:'14px', fontWeight:'bold', marginLeft:'5%', width:'80%'}}>Blood</span>
                <span style={{fontSize:'14px', fontWeight:'bold', marginLeft:'5%', width:'80%'}}>Type:</span>                              
              </span>
            </div>
          </div>
        </div>

        <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginTop:'10px', fontSize:'12px', lineHeight:'1.3'}}>
          <div style={{flex:'4', display:'flex', textAlign:"center"}}>
            Rank/Name/BOS:
            <F value={p ? `${p.rank} ${p.fullname} ${p.bos}` : ""} />
          </div>

          <div style={{flex:'1', display:'flex', textAlign:"center"}}>
            AFPSN:
            <F value={p?.afpsn}/>
          </div>

          <div style={{flex:'1', display:'flex', textAlign:"center"}}>
            Age:
            <F value={p?.age != null ? `${p.age} y/o` : ""}/>
          </div>          
        </div>
        
        <div style={{display:'flex', fontSize:'12px', alignItems:"center", textAlign:"center", lineHeight:'1.3'}}>
          <div style={{flex:'1', display:'flex'}}>
            Reg&nbsp;No:
            <F value={p?.regno} />
          </div>
          
          <div style={{flex:'1', display:'flex'}}>
            DOB:
            <F value={p?.dob} />
          </div>

          <div style={{flex:'1', display:'flex'}}>
            Religion:
            <F value={p?.religion}/>
          </div>

          <div style={{flex:'1' , display:'flex'}}>
            Height:
            <F value={
              p?.height != null &&
              p?.height != undefined &&
              p?.height != ""
                ? `${p.weight} ft`
                : ""
            }/>
          </div>

          <div style={{flex:'0.5', display:'flex'}}>
            Weight:
            <F value={
            p?.weight !== null &&
            p?.weight !== undefined &&
            p?.weight !== ""
              ? `${p.weight} kg`
              : ""
            }
            width={70}/>
          </div>
        </div>

        <div style={{display:'flex', fontSize:'12px', alignItems:"center", textAlign:"center", lineHeight:'1.5'}}>

          <div style={{flex:'2', display:'flex', flexDirection:'row'}}>
            Unit&nbsp;Assignment:
            <F value={p?.unit}/>
          </div>
          
          <div style={{flex:'2', display:'flex'}}>
            Date/Time&nbsp;Admitted:
            <F value={p?.admitted}/>
          </div>
          
          <div style={{flex:'1', display:'flex'}} >
            Trans&nbsp;in:
            <F value={p?.transin}/>
          </div>         
        </div>

        <div style={{display:'flex', fontSize:'12px', lineHeight:'1.3', textAlign:'justify'}}>
          Impression/Diagnosis:
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

        <div style={{fontSize:'12px', lineHeight:'1.3'}}>
          <span style={{display:'flex', flexDirection:'row'}}>Surgery&nbsp;Done:
          <span className="field-line" style={{ minWidth: 100 }}></span>
          </span>
        </div>

        <div style={{display:'flex', flexDirection:'row', fontSize:'12px', lineHeight:'1.3'}}>
          <span style={{flex:'1', display:'flex'}}>
            Date&nbsp;of&nbsp;Surgery:
            <F value={""} width={100}/>
          </span>
            
          <span style={{flex:'1', display:'flex'}}>
            Allergy/ies:
            <F value={p?.allergies} width={180} />
          </span>            
        </div>

        <div style={{fontSize:'12px', lineHeight:'1.3'}}>
          <span style={{display:'flex'}}>Patient&nbsp;Safety&nbsp;Issue/s:
            <F value={p?.safety} width={300} />
          </span>
        </div>

        {/* Status grid */}
        <table style={{ marginTop: 8, fontSize: 10 }}>
          <tbody>
            <tr>
              <td style={{ width: "20%", verticalAlign: "top", padding: 4 }}>
                <strong>Mental Status</strong><br />
                __________<br />
                <br/>
                <br/>
                ___ Conscious<br />
                ___ Drowsy<br />
                ___ Stuporous<br />
                ___ Un-conscious<br />
                ___ Comatose<br />

                <strong>Level of Care</strong><br />
                ___ I &nbsp;&nbsp; 
                ___ II<br />
                ___ III &nbsp;
                ___ IV
              </td>

              <td style={{ width: "20%", verticalAlign: "top", padding: 4 }}>
                <strong>Motor Status:</strong><br />
                ___ Normal<br />
                ___ Slurred Speech<br />
                ___ Hemiplegia<br />
                ___ Paraplegia<br />
                ___ Paresis<br />
                Others:<br />
                ________________<br/>
                ________________<br/>
                <br/>


                <strong >Motor/Sensory</strong>
                <div style={{marginLeft:'15px', marginTop:'5px', position:'relative', width:'80px', height:'50px' }}>                  
                  {/* vertical line */}
                  <div
                    style={{
                      position:'absolute',
                      left:'50%',
                      top:0,
                      bottom:0,
                      borderLeft:'1px solid black'
                    }}
                  />

                  {/* horizontal line */}
                  <div
                    style={{
                      position:'absolute',
                      top:'50%',
                      left:0,
                      right:0,
                      borderTop:'1px solid black'
                    }}
                  />
                  </div>


              </td>

              <td style={{width: "15%", verticalAlign: "top", padding: 4 }}>
                <strong>Activities</strong><br />
                ___ Ambulant<br />
                ___ Dangle and Sit up<br />
                ___ Bedrest w/ BRP<br />
                ___ CBR w/o BRP<br />
                <br/>
                Others:<br />
                ________________<br/>
                ________________<br/>
              </td>

              <td style={{ width: "10%", verticalAlign: "top", padding: 4 }}>
                <strong>Medical Equipment/Devices</strong><br />
                ( ) None<br />
                ( )Oxygen Delivery System ______<br />
                ( ) Endotracheal/Tracheostomy Tube to Mechanical Ventilator/ T-Piece Settings:<br />
                Mode: ( )AC ( ) SIMV<br />
                <br/>
                VT______ BUR______<br />
                FiO2______ PEEP ______<br />
                cmH2O____________<br />
                PSV_____________
              </td>
              <td style={{ width: "20%", verticalAlign: "top", padding: 4 }}>
                __ NGT _____<br />
                __ IJ Cath _____<br />
                __ CVP Line _____<br />
                __ CTT _____<br />
                __ IFC _____<br />
                Others:<br />
                ___________<br />
                ___________<br />
                ___________<br />
                ___________<br />
                ___________<br />
                ___________<br />
              </td>
              <td style={{ width: "20%", verticalAlign: "top", padding: 4 }}>
                <strong>Diet:</strong><br />
                ___ NPO<br />
                ___ DAT<br />
                ___ Soft<br />
                ___ Clear Liq<br />
                ___ Gen Liq<br />
                ___ Low Salt<br />
                ___ Low Cholesterol<br />
                ___ Uremic<br />
                ___ Diabetic<br />
                Others: ____________
              </td>
              <td style={{ width: "20%", verticalAlign: "top", padding: 4 }}>
                <strong>Special Info:</strong><br />
                Neuro VS q ____<br />
                VS q ______<br />
                BP ________<br />
                CVP reading q __<br />
                Weigh _______<br />
                Abd girth q ____<br />
                I &amp; O __________<br />
                Radiation ______
              </td>
            </tr>
          </tbody>
        </table>

        {/* Labs / IV Fluids */}
        <table style={{ marginTop: 6, fontSize: 9, width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <th style={{ width: '10%', border: '1px solid black' }}>Date Ordered</th>
              <th style={{ width: '30%', border: '1px solid black' }}>Laboratory Diagnostics Procedures</th>
              <th style={{ width: '20%', border: '1px solid black' }}>Latest Labs</th>
              <th style={{ width: '10%', border: '1px solid black' }}>Date Ordered</th>
              <th style={{ width: '30%', border: '1px solid black' }}>IV Fluids</th>
            </tr>
            {['Hgb:','Hct:','WBC:','PC:','','Crea:','BUN:','K+','Na+:','Mg+:','Ca+:','Alb:','APTT:'].map((lab, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>{lab}</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
              </tr>
            ))}
            <tr>
              <th style={{ border: '1px solid black' }}>Date Ordered</th>
              <th style={{ border: '1px solid black' }}>Referrals</th>
              <th style={{ border: '1px solid black' }}>Other Labs</th>
              <th colSpan={2} style={{ border: '1px solid black', textAlign: 'center' }}>Blood Products</th>
            </tr>
            <tr>
              <td style={{ border: '1px solid black' }}>&nbsp;</td>
              <td style={{ border: '1px solid black' }}>&nbsp;</td>
              <td style={{ border: '1px solid black' }}>&nbsp;</td>
              <td colSpan={2} style={{ border: '1px solid black', padding: 0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%' }}>
                  <div style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px', textAlign: 'center' }}>Type</div>
                  <div style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px', textAlign: 'center' }}>Req</div>
                  <div style={{ borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px', textAlign: 'center' }}>Available</div>
                  <div style={{ borderBottom: '1px solid black', padding: '2px', textAlign: 'center' }}>Transfused</div>
                </div>
              </td>
            </tr>
            {Array(6).fill(0).map((_, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td colSpan={2} style={{ border: '1px solid black', padding: 0 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', width: '100%' }}>
                    <div style={{ borderRight: '1px solid black', borderBottom: i === 5 ? 'none' : '1px solid black', minHeight: 16 }}>&nbsp;</div>
                    <div style={{ borderRight: '1px solid black', borderBottom: i === 5 ? 'none' : '1px solid black', minHeight: 16 }}>&nbsp;</div>
                    <div style={{ borderRight: '1px solid black', borderBottom: i === 5 ? 'none' : '1px solid black', minHeight: 16 }}>&nbsp;</div>
                    <div style={{ borderBottom: i === 5 ? 'none' : '1px solid black', minHeight: 16 }}>&nbsp;</div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <th colSpan={2} style={{ border: '1px solid black' }}>Date Ordered</th>
              <th colSpan={3} style={{ border: '1px solid black' }}>Medications (Date Ordered / Medications)</th>
            </tr>
            {Array(7).fill(0).map((_, i) => (
              <tr key={i}>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
                <td style={{ border: '1px solid black' }}>&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </PrintLayout>
    </div>
  );
}