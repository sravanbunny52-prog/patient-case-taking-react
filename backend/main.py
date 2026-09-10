from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="AI Patient Care API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

patients = []
cases = []


class Patient(BaseModel):
    name: str
    age: int
    gender: str
    phone: str


class PatientCase(BaseModel):
    patientName: str
    complaint: str
    symptoms: str
    history: str = ""


@app.get("/")
def root():
    return {"message": "Patient Care API is running"}


@app.get("/patients")
def get_patients():
    return patients


@app.post("/patients")
def add_patient(patient: Patient):
    item = patient.model_dump()
    item["id"] = len(patients) + 1
    patients.append(item)
    return item


@app.get("/cases")
def get_cases():
    return cases


@app.post("/cases")
def add_case(case: PatientCase):
    item = case.model_dump()
    item["id"] = len(cases) + 1
    cases.append(item)
    return item