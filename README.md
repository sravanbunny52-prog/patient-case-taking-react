# Patient Case-Taking Software — React Prototype

This project recreates the supplied Patient Case-Taking dashboard style as a responsive React web app.

## Included screens
- Login
- Dashboard
- Register New Patient
- Take Patient Case (4-step UI)
- Patient Records + search
- AI Assistant demo
- Case Report
- Settings / integration placeholders

## Run locally

1. Install Node.js (LTS).
2. Open a terminal in this folder.
3. Run:

```bash
npm install
npm run dev
```

4. Open the local URL printed by Vite (normally `http://localhost:5173`).

## Important
This is a UI/demo prototype. The AI assistant is mocked, and no real medical diagnosis is produced. For a real healthcare system, add authentication, authorization, encrypted storage, audit logs, consent/privacy controls, validated clinical workflows, and appropriate regulatory/compliance review.

## Suggested production architecture
Frontend: React / Next.js
Backend: Python FastAPI or Django
Database: PostgreSQL
Session/cache: Redis or Firebase where appropriate
AI: Whisper/ASR + a validated LLM service with clinician review
Cloud: AWS or Google Cloud
Healthcare integration: HL7 FHIR and ABHA/ABDM APIs where officially supported
