const API_URL = "http://127.0.0.1:8000";

export async function addPatient(patient) {
  const response = await fetch(`${API_URL}/patients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patient),
  });

  if (!response.ok) {
    throw new Error("Failed to register patient");
  }

  return await response.json();
}

export async function getPatients() {
  const response = await fetch(`${API_URL}/patients`);

  if (!response.ok) {
    throw new Error("Failed to load patients");
  }

  return await response.json();
}

export async function analyzePatient(symptoms) {
  return `AI analysis request received for: ${symptoms}

This is a demonstration only and is not a medical diagnosis.`;
}