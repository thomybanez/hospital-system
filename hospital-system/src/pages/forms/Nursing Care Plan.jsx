

export default function NursingCarePlan() {
  return (
    <>
      {/* Nursing Care Plan */}
      <div style={{ fontWeight: "bold", marginTop: 10, marginBottom: 4, fontSize: 11 }}>NURSING CARE PLAN</div>
      <table style={{ fontSize: 9, width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ width: "15%", border: "1px solid black", padding: "4px" }}>Date/Time</th>
            <th style={{ width: "28%", border: "1px solid black", padding: "4px" }}>Nursing Diagnosis</th>
            <th style={{ width: "28%", border: "1px solid black", padding: "4px" }}>Nursing Goals</th>
            <th style={{ width: "29%", border: "1px solid black", padding: "4px" }}>Nursing Intervention</th>
          </tr>
        </thead>
        <tbody>
          {Array(12).fill(0).map((_, i) => (
            <tr key={i}>
              <td style={{ border: "1px solid black", height: 18, padding: "4px" }}>&nbsp;</td>
              <td style={{ border: "1px solid black", padding: "4px" }}>&nbsp;</td>
              <td style={{ border: "1px solid black", padding: "4px" }}>&nbsp;</td>
              <td style={{ border: "1px solid black", padding: "4px" }}>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

