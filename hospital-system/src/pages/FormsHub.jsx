import { useState } from "react";

// Individual form imports
import ConsentHospitalization from "./forms/ConsentHospitalization";
import ConsentProcedure       from "./forms/ConsentProcedure";
import ConsentBT              from "./forms/ConsentBT";
import PreOpChecklist         from "./forms/PreOpChecklist";
import Kardex                 from "./forms/Kardex";
import MedicationSheet        from "./forms/MedicationSheet";
import NursingHistory         from "./forms/NursingHistory";
import { NursesNotes, PhysicianOrder, MedicationCard } from "./forms/SimpleSheets";
import { ECGForm, XrayRequest, ReferralSlip, MonitoredAntimicrobial } from "./forms/RequestForms";

// ── Form registry ─────────────────────────────────────────────────────────────
const FORMS = {
  consent_hosp:   { label: "Consent for Hospitalization",       component: ConsentHospitalization },
  consent_proc:   { label: "Consent for Procedure",             component: ConsentProcedure },
  consent_bt:     { label: "Consent for Blood Transfusion",     component: ConsentBT },
  preop:          { label: "Pre-Operative Checklist",           component: PreOpChecklist },
  kardex:         { label: "Kardex",                            component: Kardex },
  med_sheet:      { label: "Medication Sheet",                  component: MedicationSheet },
  nursing_history:{ label: "Nursing History Sheet",             component: NursingHistory },
  nurses_notes:   { label: "Nurses Progress Notes",            component: NursesNotes },
  physician_order:{ label: "Physician Order Sheet",             component: PhysicianOrder },
  med_card:       { label: "Medication Card",                   component: MedicationCard },
  ecg:            { label: "ECG Form",                          component: ECGForm },
  xray:           { label: "X-Ray / US / CT Scan Request",      component: XrayRequest },
  referral:       { label: "Referral Slip",                     component: ReferralSlip },
  antimicrobial:  { label: "Monitored Antimicrobials Request",  component: MonitoredAntimicrobial },
};

// ── Groups ────────────────────────────────────────────────────────────────────
const GROUPS = [
  {
    id: "admission",
    label: "Admission Bundle",
    icon: "🏥",
    description: "Kardex · Medication Sheet · Nursing History · Nurses Notes · Physician Order",
    note: "Print fronts first (Kardex, Med Sheet, Nursing History, Nurses Notes, Physician Order), then backs.",
    forms: ["kardex", "med_sheet", "nursing_history", "nurses_notes", "physician_order"],
  },
  {
    id: "surgery",
    label: "Surgery Bundle",
    icon: "🔬",
    description: "Consent for BT · Consent for Procedure · Pre-Op Checklist",
    note: "Print front of all three sheets first, then backs.",
    forms: ["consent_bt", "consent_proc", "preop"],
  },
];

const s = {
  card: {
    background:"#fff", border:"1px solid #e2e8f0", borderRadius:10,
    padding:"14px 16px", marginBottom:10, cursor:"pointer",
    boxShadow:"0 2px 6px rgba(0,0,0,0.06)", transition:"box-shadow 0.15s",
  },
  groupCard: {
    background:"#fff", border:"2px solid #4a90d9", borderRadius:12,
    padding:"16px", marginBottom:12, cursor:"pointer",
  },
  tag: {
    background:"#eef3fb", color:"#3578c0", borderRadius:4,
    padding:"2px 7px", fontSize:11, fontWeight:600, marginRight:4,
  },
  note: {
    fontSize:10, color:"#e67e22", background:"#fef9f0",
    border:"1px solid #f0c080", borderRadius:5, padding:"4px 8px", marginTop:6,
  },
};

export default function FormsHub({ onBack }) {
  const [activeForm, setActiveForm] = useState(null);
  const [tab, setTab] = useState("individual"); // "individual" | "groups"

  // Render a specific form
  if (activeForm) {
    const FormComp = FORMS[activeForm]?.component;
    if (FormComp) return <FormComp onBack={() => setActiveForm(null)} />;
  }

  return (
    <div style={{ padding:16, maxWidth:900, margin:"0 auto" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ padding:"7px 14px", borderRadius:7, border:"none", background:"#1a1a2e", color:"#fff", fontWeight:700, cursor:"pointer" }}>← Records</button>
        <h2 style={{ margin:0, fontSize:18 }}>📋 Medical Forms</h2>
      </div>

      {/* Tab toggle */}
      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["individual","groups"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding:"8px 18px", borderRadius:8, border:"none", fontWeight:700,
            fontSize:13, cursor:"pointer",
            background: tab === t ? "#1a1a2e" : "#e2e8f0",
            color: tab === t ? "#fff" : "#555",
          }}>
            {t === "individual" ? "📄 Individual Forms" : "📦 Bundled Groups"}
          </button>
        ))}
      </div>

      {/* Individual forms */}
      {tab === "individual" && (
        <div>
          <p style={{ color:"#7a8499", fontSize:12, marginBottom:12 }}>Click any form to open, pick a patient, and print.</p>

          {[
            { section:"Consent Forms", keys:["consent_hosp","consent_proc","consent_bt"] },
            { section:"Surgical", keys:["preop"] },
            { section:"Admission / Nursing", keys:["kardex","med_sheet","nursing_history","nurses_notes","physician_order","med_card"] },
            { section:"Request / Diagnostic", keys:["ecg","xray","referral","antimicrobial"] },
          ].map(({ section, keys }) => (
            <div key={section}>
              <div style={{ fontSize:11, fontWeight:700, color:"#7a8499", textTransform:"uppercase", letterSpacing:"0.5px", marginBottom:6, marginTop:14 }}>{section}</div>
              {keys.map(key => (
                <div key={key} style={s.card} onClick={() => setActiveForm(key)}
                  onMouseEnter={e => e.currentTarget.style.boxShadow="0 4px 12px rgba(74,144,217,0.18)"}
                  onMouseLeave={e => e.currentTarget.style.boxShadow="0 2px 6px rgba(0,0,0,0.06)"}>
                  <span style={{ fontWeight:600, fontSize:14 }}>{FORMS[key].label}</span>
                  <span style={{ float:"right", color:"#4a90d9", fontSize:13 }}>Open →</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Grouped / bundled */}
      {tab === "groups" && (
        <div>
          <p style={{ color:"#7a8499", fontSize:12, marginBottom:12 }}>Open all forms in a bundle. Each form opens individually — print fronts of all sheets first, then backs.</p>
          {GROUPS.map(group => (
            <div key={group.id} style={s.groupCard}>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{group.icon} {group.label}</div>
              <div style={{ fontSize:12, color:"#555", marginBottom:6 }}>{group.description}</div>
              {group.note && <div style={s.note}>⚠ {group.note}</div>}
              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:12 }}>
                {group.forms.map(key => (
                  <button key={key} onClick={() => setActiveForm(key)} style={{
                    padding:"8px 14px", borderRadius:8, border:"1px solid #4a90d9",
                    background:"#f0f7ff", color:"#3578c0", fontWeight:600,
                    fontSize:12, cursor:"pointer",
                  }}>
                    {FORMS[key].label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}