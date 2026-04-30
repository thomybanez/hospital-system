import { useRef, useState } from "react";
import { API_URL } from "./App";

const EMPTY = {
  fullname:"", rank:"", bos:"", afpsn:"", age:"",
  regno:"", dob:"", religion:"", height:"", weight:"",
  unit:"", admitted_date:"", admitted_time:"", transin:"",
  diagnosis:"", surgery:"", surgerydate:"",
  allergies:"", safety:"", sex:"", address:"", civilstatus:""
};

const BOS_OPTIONS = [
  { value:"PA",    label:"PA — Philippine Army" },
  { value:"PN",    label:"PN — Philippine Navy" },
  { value:"PAF",   label:"PAF — Philippine Air Force" },
  { value:"PN(M)", label:"PN(M) — Philippine Marines" },
];

const RELIGION_OPTIONS = [
  { value:"RC",   label:"RC — Roman Catholic" },
  { value:"INC",  label:"INC — Iglesia ni Cristo" },
  { value:"BAC",  label:"BAC — Born Again Christian" },
  { value:"ISL",  label:"ISL — Islam" },
  { value:"SDA",  label:"SDA — Seventh-day Adventist" },
  { value:"LDS",  label:"LDS — Latter-day Saints (Mormon)" },
  { value:"JW",   label:"JW — Jehovah's Witness" },
  { value:"UCCP", label:"UCCP — United Church of Christ" },
  { value:"EPH",  label:"EPH — Episcopalian" },
  { value:"LUT",  label:"LUT — Lutheran" },
  { value:"BDHM", label:"BDHM — Buddhism" },
  { value:"OTH",  label:"OTH — Other" },
];

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
  inputAutofilled: {
    padding:"9px 10px", border:"1px solid #27ae60", borderRadius:6,
    fontSize:13, width:"100%", fontFamily:"inherit", background:"#f0fff4"
  },
  btnRow:   { display:"flex", gap:8, marginTop:8 },
  btnBack:  { flex:1, padding:11, border:"none", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:"#e0e0e0", color:"#333" },
  btnSubmit:{ flex:2, padding:11, border:"none", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", background:"#27ae60", color:"#fff" },

  scanArea: {
    background:"#fff", border:"2px dashed #4a90d9", borderRadius:12,
    padding:20, textAlign:"center", marginBottom:16, cursor:"pointer",
  },
  scanIcon:  { fontSize:36, marginBottom:6 },
  scanLabel: { fontSize:13, color:"#4a90d9", fontWeight:"bold" },
  scanSub:   { fontSize:11, color:"#999", marginTop:4 },

  previewImg: {
    width:"100%", maxHeight:180, objectFit:"cover",
    borderRadius:8, marginBottom:12, border:"1px solid #ddd", display:"block"
  },

  progressWrap: { height:4, background:"#e0e0e0", borderRadius:4, marginBottom:12, overflow:"hidden" },
  progressFill: (pct) => ({ height:"100%", width:`${pct}%`, background:"#27ae60", borderRadius:4, transition:"width 0.4s ease" }),

  scanStatus: (type) => ({
    fontSize:12, marginBottom:10, minHeight:18, textAlign:"center", fontWeight: type ? 700 : 400,
    color: type === "success" ? "#27ae60" : type === "error" ? "#e74c3c" : type === "loading" ? "#4a90d9" : "#555"
  }),
};

function formatMilitary(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return "";
  const day    = String(d.getDate()).padStart(2, "0");
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  return `${day} ${months[d.getMonth()]} ${String(d.getFullYear()).slice(-2)}`;
}

function parseToISODate(val) {
  if (!val) return "";
  val = val.trim();

  // Already ISO: YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) return val;

  // MM/DD/YYYY
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(val)) {
    const [m, d, y] = val.split("/");
    return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
  }

  // YYYY/MM/DD
  if (/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(val)) {
    const [y, m, d] = val.split("/");
    return `${y}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
  }

  // DD-MM-YY or DD-MM-YYYY (most common in PH docs)
  if (/^\d{1,2}-\d{1,2}-\d{2,4}$/.test(val)) {
    const parts = val.split("-");
    const [d, m, y] = parts;
    const year = y.length === 2 ? "20" + y : y;
    return `${year}-${m.padStart(2,"0")}-${d.padStart(2,"0")}`;
  }

  // DD MMM YYYY or DD MMM YY (e.g. 05 JAN 2000 or 05 JAN 00)
  const months = { JAN:1,FEB:2,MAR:3,APR:4,MAY:5,JUN:6,JUL:7,AUG:8,SEP:9,OCT:10,NOV:11,DEC:12 };
  const mmmMatch = val.match(/^(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{2,4})$/);
  if (mmmMatch) {
    const d = mmmMatch[1].padStart(2,"0");
    const monthKey = mmmMatch[2].toUpperCase().slice(0,3);
    const m = String(months[monthKey] || 1).padStart(2,"0");
    const y = mmmMatch[3].length === 2 ? "20" + mmmMatch[3] : mmmMatch[3];
    return `${y}-${m}-${d}`;
  }

  // MMM DD, YYYY (e.g. January 5, 2000)
  const mmmDDMatch = val.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (mmmDDMatch) {
    const monthKey = mmmDDMatch[1].toUpperCase().slice(0,3);
    const m = String(months[monthKey] || 1).padStart(2,"0");
    const d = mmmDDMatch[2].padStart(2,"0");
    return `${mmmDDMatch[3]}-${m}-${d}`;
  }

  return "";
}

function safeParse(jsonStr) {
  try { return JSON.parse(jsonStr); }
  catch {
    try { return JSON.parse(jsonStr.replace(/,\s*}/g,"}").replace(/,\s*]/g,"]")); }
    catch { return null; }
  }
}

export default function AddPatientForm({ onBack }) {
  const fileInputRef = useRef(null);

  const [form,         setForm]         = useState(EMPTY);
  const [autofilled,   setAutofilled]   = useState(new Set());
  const [saving,       setSaving]       = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [preview,      setPreview]      = useState(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatus,   setScanStatus]   = useState({ msg:"", type:"" });
  const [showProgress, setShowProgress] = useState(false);

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }));
  }

  function txt(field, extra = {}) {
    return {
      value: form[field],
      onChange: e => set(field, e.target.value.toUpperCase()),
      style: autofilled.has(field) ? s.inputAutofilled : s.input,
      ...extra,
    };
  }

  function num(field, allowDecimal = false) {
    return {
      value: form[field],
      onChange: e => set(field, e.target.value.replace(allowDecimal ? /[^\d.]/g : /\D/g, "")),
      style: autofilled.has(field) ? s.inputAutofilled : s.input,
      inputMode: allowDecimal ? "decimal" : "numeric",
    };
  }

  // ── SCAN / UPLOAD ──────────────────────────────────────
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setShowProgress(true);
    setScanStatus({ msg:"Reading image...", type:"loading" });
    setScanProgress(20);

    const reader = new FileReader();

    reader.onload = async (ev) => {
      const base64 = ev.target.result.split(",")[1];

      setScanProgress(40);
      setScanStatus({ msg:"Scanning document...", type:"loading" });

      try {
        const res = await fetch(API_URL, {
          method:   "POST",
          redirect: "follow",
          headers:  { "Content-Type": "text/plain" },
          body:     JSON.stringify({
            action:      "extractPatientData",
            base64Image: base64,
            mediaType:   file.type,
          }),
        });

        setScanProgress(80);
        const jsonStr = await res.text();
        const result  = safeParse(jsonStr);

        if (!result || result.status === "error" || result.success === false) {
          const errMsg =
            result?.error?.message ||
            result?.error ||
            "Server returned an error. Make sure extractPatientData is added to your Apps Script and redeployed.";
          setScanStatus({ msg:"❌ " + errMsg, type:"error" });
          setScanProgress(100);
          return;
        }

        const data = result.data || {};

        const hasData = Object.values(data).some(v => v && v.trim && v.trim() !== "");
        if (!hasData) {
          setScanStatus({ msg:"❌ AI returned no data. Try a clearer image.", type:"error" });
          setScanProgress(100);
          return;
        }

        const newAutofilled = new Set();

        setForm(prev => {
          const updated = { ...prev };
          Object.keys(data).forEach(k => {
            if (updated[k] !== undefined && data[k]) {
              if (["dob","admitted_date","surgerydate"].includes(k)) {
                const iso = parseToISODate(data[k]);
                if (iso) { updated[k] = iso; newAutofilled.add(k); }

              } else if (k === "sex") {
                const val = data[k].trim().toUpperCase();
                if (["MALE","FEMALE"].includes(val)) {
                  updated[k] = val;
                  newAutofilled.add(k);
                }

              } else if (k === "civilstatus") {
                const val = data[k].trim().toUpperCase();
                if (["SINGLE","MARRIED","WIDOW"].includes(val)) {
                  updated[k] = val;
                  newAutofilled.add(k);
                }

              } else if (k === "bos") {
                const val = data[k].trim().toUpperCase();
                // Keyword map — catches abbreviations AND full/partial names Gemini might return
                const bosKeywords = {
                  "PA":    ["PA","PHILIPPINE ARMY","ARMY","PHIL ARMY"],
                  "PN":    ["PN","PHILIPPINE NAVY","NAVY","PHIL NAVY"],
                  "PAF":   ["PAF","PHILIPPINE AIR FORCE","AIR FORCE","PHIL AIR FORCE"],
                  "PN(M)": ["PN(M)","PHILIPPINE MARINES","MARINES","MARINE","PHIL MARINES"],
                };
                let matched = null;
                for (const [code, keywords] of Object.entries(bosKeywords)) {
                  if (keywords.some(kw => val === kw || val.includes(kw) || kw.includes(val))) {
                    matched = code;
                    break;
                  }
                }
                if (matched) { updated[k] = matched; newAutofilled.add(k); }

              } else if (k === "religion") {
                const val = data[k].trim().toUpperCase();
                // Match by abbreviation or by full name keyword
                const match = RELIGION_OPTIONS.find(
                  o => o.value === val || o.label.toUpperCase().includes(val)
                );
                if (match) { updated[k] = match.value; newAutofilled.add(k); }

              } else {
                updated[k] = typeof data[k] === "string" ? data[k].toUpperCase() : data[k];
                newAutofilled.add(k);
              }
            }
          });
          return updated;
        });

        setAutofilled(newAutofilled);
        setScanProgress(100);
        setScanStatus({ msg:"✅ Form auto-filled! Please review and submit.", type:"success" });
        setTimeout(() => setShowProgress(false), 800);

      } catch (err) {
        setScanProgress(100);
        setScanStatus({ msg:"❌ " + err.message, type:"error" });
      }
    };

    reader.onerror = () => {
      setScanStatus({ msg:"❌ Failed to read image file.", type:"error" });
      setScanProgress(100);
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  }

  // ── SUBMIT ─────────────────────────────────────────────
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
        civilstatus: form.civilstatus,
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
        setAutofilled(new Set());
        setPreview(null);
        setScanStatus({ msg:"", type:"" });
      } else {
        setSubmitStatus({ ok:false, msg:"❌ " + (data.error || "Save failed.") });
      }
    } catch (err) {
      setSubmitStatus({ ok:false, msg:"❌ " + err.message });
    } finally {
      setSaving(false);
    }
  }

  // ── RENDER ─────────────────────────────────────────────
  return (
    <div>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
        <button onClick={onBack} style={{ ...s.btnBack, flex:"none", padding:"9px 14px" }}>
          ← Back
        </button>
        <h2 style={{ margin:0, fontSize:18 }}>🏥 Add Patient</h2>
      </div>

      {/* Scan Area */}
      <div style={s.scanArea} onClick={() => fileInputRef.current.click()}>
        <div style={s.scanIcon}>📷</div>
        <div style={s.scanLabel}>Tap to Scan / Upload Document</div>
        <div style={s.scanSub}>Camera or photo library — auto-fills the form</div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display:"none" }}
        onChange={handleFileChange}
      />

      {preview && (
        <img src={preview} alt="Scanned document preview" style={s.previewImg} />
      )}

      {showProgress && (
        <div style={s.progressWrap}>
          <div style={s.progressFill(scanProgress)} />
        </div>
      )}

      {scanStatus.msg && (
        <div style={s.scanStatus(scanStatus.type)}>{scanStatus.msg}</div>
      )}

      {/* Form Fields */}
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
          <select
            value={form.bos}
            onChange={e => set("bos", e.target.value)}
            style={autofilled.has("bos") ? s.inputAutofilled : s.input}
          >
            <option value="">— Select —</option>
            {BOS_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
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
            style={autofilled.has("dob") ? s.inputAutofilled : s.input}
          />
        </div>

        <div style={s.group}>
          <label style={s.label}>Sex</label>
          <select
            value={form.sex}
            onChange={e => set("sex", e.target.value)}
            style={autofilled.has("sex") ? s.inputAutofilled : s.input}
          >
            <option value="">— Select —</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div style={s.group}>
          <label style={s.label}>Religion</label>
          <select
            value={form.religion}
            onChange={e => set("religion", e.target.value)}
            style={autofilled.has("religion") ? s.inputAutofilled : s.input}
          >
            <option value="">— Select —</option>
            {RELIGION_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
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
            style={autofilled.has("admitted_date") ? s.inputAutofilled : s.input}
          />
        </div>

        <div style={s.group}>
          <label style={s.label}>Admission Time (HHMM)</label>
          <input
            value={form.admitted_time}
            onChange={e => set("admitted_time", e.target.value.replace(/\D/g, ""))}
            style={autofilled.has("admitted_time") ? s.inputAutofilled : s.input}
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
            style={autofilled.has("surgerydate") ? s.inputAutofilled : s.input}
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

        <div style={s.group}>
          <label style={s.label}>Civil Status</label>
          <select
            value={form.civilstatus}
            onChange={e => set("civilstatus", e.target.value)}
            style={autofilled.has("civilstatus") ? s.inputAutofilled : s.input}
          >
            <option value="">— Select —</option>
            <option value="SINGLE">SINGLE</option>
            <option value="MARRIED">MARRIED</option>
            <option value="WIDOW">WIDOW</option>
          </select>
        </div>

      </div>

      {/* Buttons */}
      <div style={s.btnRow}>
        <button onClick={onBack} style={s.btnBack}>← Back to Records</button>
        <button
          onClick={handleSubmit}
          disabled={saving}
          style={{ ...s.btnSubmit, opacity: saving ? 0.7 : 1 }}
        >
          {saving ? "Saving…" : "✔ Submit"}
        </button>
      </div>

      {submitStatus && (
        <div style={{
          textAlign:"center", fontSize:13, marginTop:12, fontWeight:600,
          color: submitStatus.ok ? "#27ae60" : "#e74c3c"
        }}>
          {submitStatus.msg}
        </div>
      )}
    </div>
  );
}