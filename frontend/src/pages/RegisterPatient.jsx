import { useState } from "react";

function RegisterPatient() {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
  });

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...patient,
          age: Number(patient.age),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register patient");
      }

      const data = await response.json();

      console.log("Patient saved:", data);
      alert("Patient registered successfully!");

      setPatient({
        name: "",
        age: "",
        gender: "",
        phone: "",
      });
    } catch (error) {
      console.error(error);
      alert("Backend connection failed. Make sure FastAPI is running.");
    }
  };

  return (
    <div>
      <h1>Register New Patient</h1>
      <p>Enter patient details below.</p>

      <form className="form-card" onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input
          name="name"
          value={patient.name}
          onChange={handleChange}
          placeholder="Enter patient name"
          required
        />

        <label>Age</label>
        <input
          name="age"
          type="number"
          value={patient.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
        />

        <label>Gender</label>
        <select
          name="gender"
          value={patient.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Phone Number</label>
        <input
          name="phone"
          type="tel"
          value={patient.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
          required
        />

        <button type="submit">
          Register Patient
        </button>
      </form>
    </div>
  );
}

export default RegisterPatient;