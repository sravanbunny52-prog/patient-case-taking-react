import { useEffect, useState } from "react";

function Records() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const savedPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    setPatients(savedPatients);
  }, []);

  return (
    <div>
      <h1>Patient Records</h1>
      <p>Registered patients are shown below.</p>

      <div className="form-card">
        {patients.length === 0 ? (
          <p>No patients registered yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
              </tr>
            </thead>

            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Records;