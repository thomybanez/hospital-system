import { useState } from "react";

export default function PatientTable() {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "John Doe",
      rank: "N/A",
      bos: "",
      afpsn: "",
      age: 32,
      regNo: "R-001",
      dob: "01-01-92",
      religion: "Catholic",
      height: "170",
      weight: "70",
      unit: "Unit A",
      admitted: "2026-04-18 10:00",
      diagnosis: "Flu",
      surgery: "",
      allergies: "None",
      sex: "M",
      address: "Manila",
      time: "10:00"
    }
  ]);

  const [expandedId, setExpandedId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [draft, setDraft] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const startEdit = (patient) => {
    setEditId(patient.id);
    setDraft({ ...patient });
  };

  const cancelEdit = () => {
    setEditId(null);
    setDraft(null);
  };

  const saveEdit = () => {
    setPatients(patients.map(p => p.id === editId ? draft : p));
    setEditId(null);
    setDraft(null);
  };

  const deletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const updateField = (field, value) => {
    setDraft({ ...draft, [field]: value });
  };

  return (
    <div>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rank</th>
            <th>BOS</th>
            <th>AFPSN</th>
            <th>Age</th>
            <th>Reg No.</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {patients.map(p => (
            <>
              {/* MAIN ROW */}
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.rank}</td>
                <td>{p.bos}</td>
                <td>{p.afpsn}</td>
                <td>{p.age}</td>
                <td>{p.regNo}</td>

                <td>
                  <button onClick={() => toggleExpand(p.id)}>
                    {expandedId === p.id ? "Hide" : "Show"}
                  </button>

                  <button onClick={() => startEdit(p)}>
                    Edit
                  </button>

                  <button onClick={() => deletePatient(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>

              {/* EXPANDED / EDIT SECTION */}
              {expandedId === p.id && (
                <tr>
                  <td colSpan="7">
                    {editId === p.id ? (
                      <div>
                        {/* EDIT MODE */}
                        {Object.keys(draft).map((key) => (
                          key !== "id" && (
                            <div key={key}>
                              <label>{key}: </label>
                              <input
                                value={draft[key]}
                                onChange={(e) => updateField(key, e.target.value)}
                              />
                            </div>
                          )
                        ))}

                        <button onClick={saveEdit}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        {/* VIEW MODE (DETAILS) */}
                        <p>DOB: {p.dob}</p>
                        <p>Religion: {p.religion}</p>
                        <p>Height: {p.height}</p>
                        <p>Weight: {p.weight}</p>
                        <p>Unit: {p.unit}</p>
                        <p>Admitted: {p.admitted}</p>
                        <p>Diagnosis: {p.diagnosis}</p>
                        <p>Surgery: {p.surgery}</p>
                        <p>Allergies: {p.allergies}</p>
                        <p>Sex: {p.sex}</p>
                        <p>Address: {p.address}</p>
                        <p>Time: {p.time}</p>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}