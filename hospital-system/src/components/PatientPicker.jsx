import { useState, useEffect } from "react";
import { API_URL } from "../App";

export default function PatientPicker({ onSelect }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch(`${API_URL}?action=getRecords`, { redirect: "follow" })
      .then(r => r.json())
      .then(data => {
        if (data.success) setPatients(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Fields order from getRecordsAPI (after skipping cols 15,16):
  // row[0]=sheetRow, [1]=fullname, [2]=rank, [3]=bos, [4]=afpsn, [5]=age,
  // [6]=regno, [7]=dob, [8]=religion, [9]=height, [10]=weight,
  // [11]=unit, [12]=admitted, [13]=transin, [14]=diagnosis,
  // [15]=allergies, [16]=safety, [17]=sex, [18]=address, [19]=civilstatus
  function buildPatient(row) {
    return {
      rowIndex:  row[0],
      fullname:  row[1]  || "",
      rank:      row[2]  || "",
      bos:       row[3]  || "",
      afpsn:     row[4]  || "",
      age:       row[5]  || "",
      regno:     row[6]  || "",
      dob:       row[7]  || "",
      religion:  row[8]  || "",
      height:    row[9]  || "",
      weight:    row[10] || "",
      unit:      row[11] || "",
      admitted:  row[12] || "",
      transin:   row[13] || "",
      diagnosis: row[14] || "",
      allergies: row[15] || "",
      safety:    row[16] || "",
      sex:       row[17] || "",
      address:   row[18] || "",
      civilstatus: row[19] || ""
    };
  }

  function handleChange(e) {
    setSelected(e.target.value);
    if (!e.target.value) { onSelect(null); return; }
    const row = patients.find(r => String(r[0]) === e.target.value);
    if (row) onSelect(buildPatient(row));
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontWeight: 700, fontSize: 13, marginRight: 8 }}>
        Select Patient:
      </label>
      <select
        value={selected}
        onChange={handleChange}
        disabled={loading}
        style={{
          padding: "8px 12px", borderRadius: 7, border: "1px solid #c5d9f0",
          fontSize: 13, minWidth: 280, fontFamily: "inherit",
        }}
      >
        <option value="">{loading ? "Loading patients…" : "— Choose a patient —"}</option>
        {patients.map(row => (
          <option key={row[0]} value={String(row[0])}>
            {row[1]} {row[2] ? `(${row[2]})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}