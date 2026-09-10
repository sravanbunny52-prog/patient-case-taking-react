import { useEffect, useState } from "react";

function Dashboard() {
  const [patients, setPatients] = useState([]);
  const [cases, setCases] = useState([]);

  useEffect(() => {
    setPatients(
      JSON.parse(localStorage.getItem("patients")) || []
    );

    setCases(
      JSON.parse(localStorage.getItem("cases")) || []
    );
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Patient Care System Overview</p>

      <div className="cards">
        <div className="card">
          <h3>Total Patients</h3>
          <h2>{patients.length}</h2>
        </div>

        <div className="card">
          <h3>Total Cases</h3>
          <h2>{cases.length}</h2>
        </div>

        <div className="card">
          <h3>Completed Cases</h3>
          <h2>{cases.length}</h2>
        </div>

        <div className="card">
          <h3>Pending Cases</h3>
          <h2>0</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;