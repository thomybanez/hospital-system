import { useState } from "react";
import { API_URL } from "./App";

const EMPTY = {
  fullname: "", rank: "", bos: "", afpsn: "", age: "",
  regno: "", dob: "", religion: "", height: "", weight: "",
  unit: "", admitted_date: "", admitted_time: "", transin: "",
  diagnosis: "", surgery: "", surgerydate: "",
  allergies: "", safety: "", sex: "", address: "",
};

const s = {
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 16,
  },
  group: { display: "flex", flexDirection: "column" },
  full:  { gridColumn: "1 / -1" },
  label: {
    fontSize: 11, fontWeight: 700, color: "#555",
    marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.3px",
  },
  input: {
    padding: "9px 10px", border: "1px solid #ccc", borderRadius: 6,
    fontSize: 13, width: "100%", fontFamily: "inherit", background: "#fff",
  },
  btnRow: { display: "flex", gap: 8, marginTop: 8 },
  btnBack: {
    flex: 1, padding: 11, border: "none", borderRadius: 8,
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    background: "#e0e0e0", color: "#333",
  },
  btnSubmit: {
    flex: 2, padding: 11, border: "none", borderRadius: 8,
    fontSize: 14, fontWeight: 700, cursor: "pointer",
    background: "#27ae60", color: "#fff",
  },
  statusBox: (ok) => ({
    textAlign: "center", fontSize: 13, marginTop: 12, fontWeight: 600,
    color: ok ? "#27ae60" : "#e74c3c",
    minHeight: 20,
  }),
};

function formatMilitary(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const months = ["JAN","FEB","MAR","APR","MAY","JUN",
                  "JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${day} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
}

export default function AddPatientForm({ onBack }) {
  const [form, setForm]       = useState(EMPTY);
  const [saving, setSaving]   = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | {ok, msg}

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function inp(field, extra = {}) {
  return {
    value: form[field],
    onChange: e => set(field, e.target.value.toUpperCase()),
    style: s.input,
    ...extra,
  };
}

  async function handleSubmit() {
    if (!form.fullname.trim()) {
      setSubmitStatus({ ok: false, msg: "Full name is required." });
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
        setSubmitStatus({ ok: true, msg: "✅ Record saved successfully!" });
        setForm(EMPTY); // clear for next entry if they want
      } else {
        setSubmitStatus({ ok: false, msg: "❌ " + (data.error || "Save failed.") });
      }
    } catch (err) {
      setSubmitStatus({ ok: false, msg: "❌ " + err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <button onClick={onBack} style={{ ...s.btnBack, flex: "none", padding: "9px 14px" }}>
          ← Back
        </button>
        <h2 style={{ margin: 0, fontSize: 18 }}>🏥 Add Patient</h2>
      </div>

      <div style={s.grid}>

        {/* Full Name */}
        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Full Name *</label>
          <input {...inp("fullname")} placeholder="e.g. Juan dela Cruz" />
        </div>

        {/* Rank */}
        <div style={s.group}>
          <label style={s.label}>Rank</label>
          <input {...inp("rank")} placeholder="e.g. PFC" />
        </div>

        {/* BOS */}
        <div style={s.group}>
          <label style={s.label}>BOS</label>
          <input {...inp("bos")} placeholder="BOS" />
        </div>

        {/* AFPSN */}
        <div style={s.group}>
          <label style={s.label}>AFPSN</label>
          <input {...inp("afpsn")} placeholder="AFPSN" />
        </div>

      {/* Age */}
      <div style={s.group}>
        <label style={s.label}>Age</label>
        <input
          value={form.age}
          onChange={e => set("age", e.target.value.replace(/\D/g, ""))}
          style={s.input}
          placeholder="Age"
          inputMode="numeric"
          maxLength={3}
        />
      </div>

         {/* Reg No */}
        <div style={s.group}>
          <label style={s.label}>Reg No</label>
          <input
            value={form.regno}
            onChange={e => set("regno", e.target.value.replace(/\D/g, ""))}
            style={s.input}
            placeholder="Reg No"
            inputMode="numeric"
          />
        </div>

        {/* DOB */}
        <div style={s.group}>
          <label style={s.label}>Date of Birth</label>
          <input {...inp("dob")} type="date" />
        </div>

        {/* Sex */}
        <div style={s.group}>
          <label style={s.label}>Sex</label>
          <select value={form.sex} onChange={e => set("sex", e.target.value)} style={s.input}>
            <option value="">— Select —</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Religion */}
        <div style={s.group}>
          <label style={s.label}>Religion</label>
          <input {...inp("religion")} placeholder="Religion" />
        </div>

        {/* Height */}
        <div style={s.group}>
          <label style={s.label}>Height (cm)</label>
          <input
            value={form.height}
            onChange={e => set("height", e.target.value.replace(/[^\d.]/g, ""))}
            style={s.input}
            placeholder="e.g. 170"
            inputMode="decimal"
          />
        </div>

        {/* Weight */}
        <div style={s.group}>
          <label style={s.label}>Weight (kg)</label>
          <input
            value={form.weight}
            onChange={e => set("weight", e.target.value.replace(/[^\d.]/g, ""))}
            style={s.input}
            placeholder="e.g. 65"
            inputMode="decimal"
          />
        </div>

        {/* Unit */}
        <div style={s.group}>
          <label style={s.label}>Unit</label>
          <input {...inp("unit")} placeholder="Unit" />
        </div>

        {/* Admission Date */}
        <div style={s.group}>
          <label style={s.label}>Admission Date</label>
          <input {...inp("admitted_date")} type="date" />
        </div>

        {/* Admission Time */}
        <div style={s.group}>
          <label style={s.label}>Admission Time (HHMM)</label>
          <input {...inp("admitted_time")} placeholder="e.g. 0830" inputMode="numeric" maxLength={4} />
        </div>

        {/* Trans-in */}
        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Trans-In</label>
          <input {...inp("transin")} placeholder="Trans-in" />
        </div>

        {/* Diagnosis */}
        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Diagnosis</label>
          <input {...inp("diagnosis")} placeholder="Diagnosis" />
        </div>

        {/* Surgery */}
        <div style={s.group}>
          <label style={s.label}>Surgery</label>
          <input {...inp("surgery")} placeholder="Surgery (if any)" />
        </div>

        {/* Surgery Date */}
        <div style={s.group}>
          <label style={s.label}>Surgery Date</label>
          <input {...inp("surgerydate")} type="date" />
        </div>

        {/* Allergies */}
        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Allergies</label>
          <input {...inp("allergies")} placeholder="Allergies" />
        </div>

        {/* Safety */}
        <div style={s.group}>
          <label style={s.label}>Safety</label>
          <input {...inp("safety")} placeholder="Safety" />
        </div>

        {/* Address */}
        <div style={{ ...s.group, ...s.full }}>
          <label style={s.label}>Address</label>
          <input {...inp("address")} placeholder="Address" />
        </div>

      </div>

      {/* Buttons */}
      <div style={s.btnRow}>
        <button onClick={onBack} style={s.btnBack}>← Back to Records</button>
        <button onClick={handleSubmit} disabled={saving} style={{ ...s.btnSubmit, opacity: saving ? 0.7 : 1 }}>
          {saving ? "Saving…" : "✔ Submit"}
        </button>
      </div>

      {/* Status */}
      {submitStatus && (
        <div style={s.statusBox(submitStatus.ok)}>
          {submitStatus.msg}
        </div>
      )}
    </div>
  );
}

