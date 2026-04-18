import { useState } from "react";

export default function PatientForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    rank: "",
    bos: "",
    afpsn: "",
    age: "",
    regNo: "",
    dob: "",
    religion: "",
    height: "",
    weight: "",
    unit: "",
    diagnosis: "",
    surgery: "",
    surgeryDate: "",
    allergies: "",
    safety: "",
    sex: "",
    address: "",
    time: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);

    setForm({
      name: "",
      rank: "",
      bos: "",
      afpsn: "",
      age: "",
      regNo: "",
      dob: "",
      religion: "",
      height: "",
      weight: "",
      unit: "",
      diagnosis: "",
      surgery: "",
      surgeryDate: "",
      allergies: "",
      safety: "",
      sex: "",
      address: "",
      time: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Add Patient</h3>

      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <input name="rank" placeholder="Rank" value={form.rank} onChange={handleChange} />
      <input name="age" placeholder="Age" value={form.age} onChange={handleChange} />
      <input name="regNo" placeholder="Reg No" value={form.regNo} onChange={handleChange} />
      <input name="diagnosis" placeholder="Diagnosis" value={form.diagnosis} onChange={handleChange} />

      <button type="submit">Add Patient</button>
    </form>
  );
}