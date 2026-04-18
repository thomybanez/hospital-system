import { useState } from "react";
import { API_URL } from "./App";

const EMPTY = {
  fullname:"", rank:"", bos:"", afpsn:"", age:"",
  regno:"", dob:"", religion:"", height:"", weight:"",
  unit:"", admitted_date:"", admitted_time:"", transin:"",
  diagnosis:"", surgery:"", surgerydate:"",
  allergies:"", safety:"", sex:"", address:"",
};

const s = {
  grid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:16 },
  group: { display:"flex", flexDirection:"column" },
  full:  { gridColumn:"1 / -1" },
  label: {
    fontSize:11, fontWeight:700, color:"#555", marginBottom:3,
    textTransform:"uppercase", letterSpacing:"0.3px"
  },
  input: {
    padding:"9px 10px", border:"1px solid #ccc", borderRadius:6,
    fontSize:13, width:"100%", fontFamily:"inherit", background:"#fff"
  },
  btnRow:   { display:"flex", gap:8, marginTop:8 },
  btnBack:  { flex:1, padding:11, border:"none", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:"#e0e0e0", color:"#333" },
  btnSubmit:{ flex:2, padding:11, border:"none", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:"#27ae60", color:"#fff" },
};

function formatMilitary(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  const day    = String(d.getDate()).padStart(2, "0");
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${day} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
}

export default function AddPatientForm({ onBack }) {
  const [form,   setForm]   = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  function set(field, value) { setForm(f => ({ ...f, [field]: value })); }

  // Text input — auto uppercase
  function txt(field, extra = {}) {
    return {
      value: form[field],
      onChange: e => set(field, e.target.value.toUpperCase()),
      style: s.input,
      ...extra,
    };
  }

  // Numeric input — digits only
  function num(field, allowDecimal = false) {
    return {
      value: form[field],
      onChange: e => set(field, e.target.value.replace(allowDecimal ? /[^\d.]/g : /\D/g, "")),
      style: s.input,
      inputMode: allowDecimal ? "decimal" : "numeric",
    };
  }

  async function handleSubmit() {
    if (!form.fullname.trim()) {
      setSubmitStatus({ ok:false, msg:"Full name is required." });
      return;
    }
    setSaving(true);
    setSubmitStatus(null);

    const admitted = form.admitted_date
      ? `${formatMilitary(form.admitted_date)} ${form.admitted_time || "0000"}`
      : "";

    const payload = {
      action: "submitData",
      data: {
        fullname:    form.fullname,
        rank:        form.rank,
        bos:         form.bos,
        afpsn:       form.afpsn,
        age:         form.age,
        regno:       form.regno,
        dob:         formatMilitary(form.dob),
        religion:    form.religion,
        height:      form.height,
        weight:      form.weight,
        unit:        form.unit,
        admitted,
        transin:     form.transin,
        diagnosis:   form.diagnosis,
        surgery:     form.surgery,
        surgerydate: form.surgerydate,
        allergies:   form.allergies,
        safety:      form.safety,
        sex:         form.sex,
        address:     form.address,
      },
    };

    try {
      const res  = await fetch(API_URL, {
        method:   "POST",
        redirect: "follow",
        headers:  { "Content-Type": "text/plain" },
        body:     JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus({ ok:true, msg:"✅ Record saved successfully!" });
        setForm(EMPTY);
      } else {
        setSubmitStatus({ ok:false, msg:"❌ " + (data.error || "Save failed.") });
      }
    } catch (err) {
      setSubmitStatus({ ok:false, msg:"❌ " + err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ ...s.btnBack, flex:"none", padding:"9px 14px" }}>
          ← Back
        </button>
        <h2 style={{ margin:0, fontSize:18 }}>🏥 Add Patient</h2>
      </div>

      <div style={s.grid}>

        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Full Name *</label>
          <input {...txt("fullname")} placeholder="E.G. JUAN DELA CRUZ" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Rank</label>
          <input {...txt("rank")} placeholder="E.G. PFC" />
        </div>

        <div style={s.group}>
          <label style={s.label}>BOS</label>
          <input {...txt("bos")} placeholder="BOS" />
        </div>

        <div style={s.group}>
          <label style={s.label}>AFPSN</label>
          <input {...txt("afpsn")} placeholder="AFPSN" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Age</label>
          <input {...num("age")} placeholder="Age" maxLength={3} />
        </div>

        <div style={s.group}>
          <label style={s.label}>Reg No</label>
          <input {...num("regno")} placeholder="Reg No" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={e => set("dob", e.target.value)}
            style={s.input}
          />
        </div>

        <div style={s.group}>
          <label style={s.label}>Sex</label>
          <select value={form.sex} onChange={e => set("sex", e.target.value)} style={s.input}>
            <option value="">— Select —</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div style={s.group}>
          <label style={s.label}>Religion</label>
          <input {...txt("religion")} placeholder="RELIGION" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Height (cm)</label>
          <input {...num("height", true)} placeholder="E.G. 170" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Weight (kg)</label>
          <input {...num("weight", true)} placeholder="E.G. 65" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Unit</label>
          <input {...txt("unit")} placeholder="UNIT" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Admission Date</label>
          <input
            type="date"
            value={form.admitted_date}
            onChange={e => set("admitted_date", e.target.value)}
            style={s.input}
          />
        </div>

        <div style={s.group}>
          <label style={s.label}>Admission Time (HHMM)</label>
          <input
            value={form.admitted_time}
            onChange={e => set("admitted_time", e.target.value.replace(/\D/g, ""))}
            style={s.input}
            placeholder="E.G. 0830"
            inputMode="numeric"
            maxLength={4}
          />
        </div>

        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Trans-In</label>
          <input {...txt("transin")} placeholder="TRANS-IN" />
        </div>

        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Diagnosis</label>
          <input {...txt("diagnosis")} placeholder="DIAGNOSIS" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Surgery</label>
          <input {...txt("surgery")} placeholder="SURGERY (IF ANY)" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Surgery Date</label>
          <input
            type="date"
            value={form.surgerydate}
            onChange={e => set("surgerydate", e.target.value)}
            style={s.input}
          />
        </div>

        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Allergies</label>
          <input {...txt("allergies")} placeholder="ALLERGIES" />
        </div>

        <div style={s.group}>
          <label style={s.label}>Safety</label>
          <input {...txt("safety")} placeholder="SAFETY" />
        </div>

        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Address</label>
          <input {...txt("address")} placeholder="ADDRESS" />
        </div>

      </div>

      {/* Buttons */}
      <div style={s.btnRow}>
        <button onClick={onBack} style={s.btnBack}>← Back to Records</button>
        <button onClick={handleSubmit} disabled={saving}
          style={{ ...s.btnSubmit, opacity: saving ? 0.7 : 1 }}>
          {saving ? "Saving…" : "✔ Submit"}
        </button>
      </div>

      {/* Status */}
      {submitStatus && (
        <div style={{ textAlign:"center", fontSize:13, marginTop:12, fontWeight:600,
          color: submitStatus.ok ? "#27ae60" : "#e74c3c" }}>
          {submitStatus.msg}
        </div>
      )}
    </div>
  );
}