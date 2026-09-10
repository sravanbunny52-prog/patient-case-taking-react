import { useState } from "react";
export default function AIAssistant() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState("");

  const analyzeCase = (e) => {
    e.preventDefault();

    if (!symptoms.trim()) {
      setResult("Please enter the patient's symptoms.");
      return;
    }

    setResult(
      "AI analysis demo: The entered symptoms have been recorded for clinical review. This prototype does not provide a medical diagnosis."
    );
  };

  return (
    <div>
      <h1>AI Assistant</h1>
      <p>Assist healthcare professionals with case review.</p>

      <form className="form-card" onSubmit={analyzeCase}>
        <label>Patient Symptoms</label>

        <textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Enter symptoms for analysis..."
          rows="6"
        />

        <button type="submit">
          Analyze Case
        </button>

        {result && (
          <div className="ai-result">
            <h3>AI Assistant Result</h3>
            <p>{result}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default AIAssistant;