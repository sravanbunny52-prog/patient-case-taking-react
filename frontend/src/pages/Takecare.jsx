import { useState } from "react";

function TakeCase() {
  const [caseData, setCaseData] = useState({
    patientName: "",
    complaint: "",
    symptoms: "",
    history: "",
  });

  const handleChange = (e) => {
    setCaseData({
      ...caseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cases =
      JSON.parse(localStorage.getItem("cases")) || [];

    cases.push({
      ...caseData,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("cases", JSON.stringify(cases));

    alert("Patient case saved successfully!");

    setCaseData({
      patientName: "",
      complaint: "",
      symptoms: "",
      history: "",
    });
  };

  return (
    <div>
      <h1>Take Patient Case</h1>
      <p>Enter the patient's case details.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input
          name="patientName"
          value={caseData.patientName}
          onChange={handleChange}
          placeholder="Enter patient name"
          required
        />

        <label>Chief Complaint</label>
        <textarea
          name="complaint"
          value={caseData.complaint}
          onChange={handleChange}
          placeholder="Describe the main complaint"
          rows="4"
          required
        />

        <label>Symptoms</label>
        <textarea
          name="symptoms"
          value={caseData.symptoms}
          onChange={handleChange}
          placeholder="Enter symptoms"
          rows="4"
          required
        />

        <label>Medical History</label>
        <textarea
          name="history"
          value={caseData.history}
          onChange={handleChange}
          placeholder="Enter medical history"
          rows="4"
        />

        <button type="submit">
          Save Patient Case
        </button>
      </form>
    </div>
  );
}

export default TakeCase;