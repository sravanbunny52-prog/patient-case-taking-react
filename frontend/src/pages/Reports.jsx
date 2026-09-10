import { useEffect, useState } from "react";

function Reports() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const savedCases =
      JSON.parse(localStorage.getItem("cases")) || [];

    setCases(savedCases);
  }, []);

  return (
    <div>
      <h1>Medical Case Reports</h1>
      <p>Saved patient cases are shown below.</p>

      {cases.length === 0 ? (
        <div className="form-card">
          <h3>No cases available</h3>
          <p>Save a patient case from the Take Case page.</p>
        </div>
      ) : (
        cases.map((item) => (
          <div className="form-card" key={item.id}>
            <h2>{item.patientName}</h2>
            <p><b>Date:</b> {item.date}</p>
            <p><b>Chief Complaint:</b> {item.complaint}</p>
            <p><b>Symptoms:</b> {item.symptoms}</p>
            <p><b>Medical History:</b> {item.history || "Not provided"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Reports;