import { useState } from "react";
import { analyzePatient } from "./aiService";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [patients, setPatients] = useState([]);
  const [analysis, setAnalysis] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const registerPatient = () => {
    if (!form.name || !form.age || !form.symptoms) {
      alert("Please enter Name, Age and Symptoms");
      return;
    }

    setPatients([...patients, form]);

    setForm({
      name: "",
      age: "",
      phone: "",
      symptoms: "",
    });

    setShowForm(false);
  };

  const analyzeSymptoms = async (patient) => {
    setAnalysis({
      patient: patient.name,
      symptoms: patient.symptoms,
      result: "🤖 AI is analyzing...",
    });

    const result = await analyzePatient(patient.symptoms);

    setAnalysis({
      patient: patient.name,
      symptoms: patient.symptoms,
      result,
    });
  };

  return (
    <div style={styles.app}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>🤖 AI Patient Care</div>

        <div>
          <button style={styles.navButton}>Dashboard</button>

          <button
            style={styles.navButton}
            onClick={() => setShowForm(true)}
          >
            Register Patient
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div>
          <h1 style={styles.title}>
            Smart Healthcare
            <br />
            Powered by AI
          </h1>

          <p style={styles.subtitle}>
            Manage patient information and use AI-assisted
            symptom analysis in one simple platform.
          </p>

          <button
            style={styles.mainButton}
            onClick={() => setShowForm(true)}
          >
            + Register New Patient
          </button>
        </div>

        <div style={styles.aiBox}>
          <div style={styles.aiIcon}>🤖</div>
          <h2>AI Assistant</h2>
          <p>Ready to analyze patient symptoms</p>

          <span style={styles.status}>
            ● System Online
          </span>
        </div>
      </section>

      {/* DASHBOARD CARDS */}
      <section style={styles.cards}>
        <div style={styles.card}>
          <h3>👥 Patients</h3>
          <div style={styles.number}>{patients.length}</div>
          <p>Registered patients</p>
        </div>

        <div style={styles.card}>
          <h3>🤖 AI Analysis</h3>
          <div style={styles.number}>
            {analysis ? "1" : "0"}
          </div>
          <p>Latest analysis</p>
        </div>

        <div style={styles.card}>
          <h3>⚡ Status</h3>
          <div style={styles.online}>ONLINE</div>
          <p>Application status</p>
        </div>
      </section>

      {/* REGISTER FORM */}
      {showForm && (
        <section style={styles.formCard}>
          <h2>Register Patient</h2>

          <input
            style={styles.input}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Patient Name"
          />

          <input
            style={styles.input}
            name="age"
            value={form.age}
            onChange={handleChange}
            placeholder="Age"
            type="number"
          />

          <input
            style={styles.input}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />

          <textarea
            style={styles.textarea}
            name="symptoms"
            value={form.symptoms}
            onChange={handleChange}
            placeholder="Enter patient symptoms"
          />

          <button
            style={styles.mainButton}
            onClick={registerPatient}
          >
            Save Patient
          </button>

          <button
            style={styles.cancelButton}
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </section>
      )}

      {/* PATIENT LIST */}
      <section style={styles.section}>
        <h2>Registered Patients</h2>

        {patients.length === 0 ? (
          <div style={styles.empty}>
            No patients registered yet.
          </div>
        ) : (
          patients.map((patient, index) => (
            <div style={styles.patient} key={index}>
              <div>
                <h3>{patient.name}</h3>
                <p>Age: {patient.age}</p>
                <p>Symptoms: {patient.symptoms}</p>
              </div>

              <button
                style={styles.aiButton}
                onClick={() => analyzeSymptoms(patient)}
              >
                🤖 Analyze
              </button>
            </div>
          ))
        )}
      </section>

      {/* AI RESULT */}
      {analysis && (
        <section style={styles.result}>
          <h2>🤖 AI Analysis</h2>

          <p>
            <strong>Patient:</strong> {analysis.patient}
          </p>

          <p>
            <strong>Symptoms:</strong> {analysis.symptoms}
          </p>

          <div style={styles.resultBox}>
            {analysis.result}
          </div>

          <p style={styles.warning}>
            ⚠️ This software is a demonstration and does not
            provide a medical diagnosis.
          </p>
        </section>
      )}
    </div>
  );
}

const styles = {
  app: {
    minHeight: "100vh",
    background: "#f4f7fb",
    fontFamily: "Arial, sans-serif",
    color: "#172033",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 40px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
  },

  logo: {
    fontSize: "22px",
    fontWeight: "bold",
  },

  navButton: {
    border: "none",
    background: "transparent",
    padding: "10px 14px",
    cursor: "pointer",
    fontSize: "15px",
  },

  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    padding: "60px 8%",
    flexWrap: "wrap",
  },

  title: {
    fontSize: "46px",
    margin: "0 0 20px",
  },

  subtitle: {
    maxWidth: "600px",
    fontSize: "18px",
    lineHeight: "1.6",
  },

  mainButton: {
    padding: "13px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontSize: "15px",
  },

  aiBox: {
    background: "#ffffff",
    padding: "35px",
    borderRadius: "18px",
    width: "280px",
    textAlign: "center",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
  },

  aiIcon: {
    fontSize: "50px",
  },

  status: {
    fontSize: "14px",
  },

  cards: {
    display: "flex",
    gap: "20px",
    padding: "0 8% 40px",
    flexWrap: "wrap",
  },

  card: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "14px",
    flex: "1",
    minWidth: "220px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)",
  },

  number: {
    fontSize: "32px",
    fontWeight: "bold",
  },

  online: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  formCard: {
    margin: "0 8% 40px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  input: {
    display: "block",
    width: "100%",
    maxWidth: "500px",
    padding: "13px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  textarea: {
    display: "block",
    width: "100%",
    maxWidth: "500px",
    height: "110px",
    padding: "13px",
    marginBottom: "15px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    boxSizing: "border-box",
  },

  cancelButton: {
    padding: "13px 20px",
    marginLeft: "10px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  section: {
    padding: "0 8% 40px",
  },

  empty: {
    background: "#ffffff",
    padding: "25px",
    borderRadius: "12px",
  },

  patient: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    background: "#ffffff",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "12px",
  },

  aiButton: {
    padding: "11px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  result: {
    margin: "0 8% 50px",
    padding: "30px",
    background: "#ffffff",
    borderRadius: "14px",
  },

  resultBox: {
    padding: "20px",
    background: "#eef6ff",
    borderRadius: "10px",
    lineHeight: "1.6",
  },

  warning: {
    fontSize: "13px",
  },
};

export default App;