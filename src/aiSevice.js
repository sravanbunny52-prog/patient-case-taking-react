export async function analyzePatient(symptoms) {
  // Temporary AI service
  // We will connect the real AI API here next.

  if (!symptoms || symptoms.trim() === "") {
    return "Please enter the patient's symptoms.";
  }

  return `AI analysis request received for: ${symptoms}

This demo does not provide a medical diagnosis.
A healthcare professional should evaluate the patient's condition.`;
}