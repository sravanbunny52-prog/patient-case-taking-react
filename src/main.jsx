import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity, Bell, Brain, CalendarDays, CheckCircle2, ChevronRight,
  ClipboardList, Cloud, FileText, Home, LogIn, LogOut, Menu, Mic,
  Plus, Search, Settings, ShieldCheck, Stethoscope, UserPlus, Users,
  X, Download, Printer, ArrowLeft, Link2, Database, Smartphone
} from "lucide-react";
import "./styles.css";

const initialPatients = [
  { id:"P-001", name:"Priya Reddy", age:32, gender:"Female", visit:"09 Sep 2025", status:"Completed", complaint:"Fever, Cough", diagnosis:"Viral Fever", doctor:"Dr. Priya Sharma" },
  { id:"P-002", name:"Ramesh Kumar", age:45, gender:"Male", visit:"09 Sep 2025", status:"In Progress", complaint:"Headache", diagnosis:"—", doctor:"Dr. Priya Sharma" },
  { id:"P-003", name:"S. Lakshmi", age:28, gender:"Female", visit:"08 Sep 2025", status:"Completed", complaint:"Cold", diagnosis:"Viral Infection", doctor:"Dr. Priya Sharma" },
  { id:"P-004", name:"Mohammed Ali", age:52, gender:"Male", visit:"08 Sep 2025", status:"Follow Up", complaint:"Body pain", diagnosis:"—", doctor:"Dr. Priya Sharma" }
];

function App(){
  const [loggedIn,setLoggedIn] = useState(false);
  const [page,setPage] = useState("dashboard");
  const [patients,setPatients] = useState(initialPatients);
  const [selected,setSelected] = useState(initialPatients[0]);
  const [toast,setToast] = useState("");

  const navigate = (p) => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  const notify = (msg) => { setToast(msg); setTimeout(()=>setToast(""),2200); };

  if(!loggedIn) return <Login onLogin={()=>setLoggedIn(true)} />;

  return (
    <div className="app-shell">
      <Sidebar page={page} navigate={navigate} logout={()=>setLoggedIn(false)} />
      <main className="main">
        <Topbar />
        {page==="dashboard" && <Dashboard patients={patients} navigate={navigate} onSelect={p=>{setSelected(p);navigate("case")}} />}
        {page==="register" && <Register onAdd={(p)=>{setPatients(x=>[p,...x]);setSelected(p);notify("Patient registered successfully");navigate("case")}} />}
        {page==="case" && <CaseTaking patient={selected} onDone={()=>notify("Case saved successfully")} />}
        {page==="records" && <Records patients={patients} onSelect={(p)=>{setSelected(p);navigate("case")}} />}
        {page==="reports" && <Reports patient={selected} />}
        {page==="assistant" && <AIAssistant patient={selected} />}
        {page==="settings" && <SettingsPage />}
        {toast && <div className="toast"><CheckCircle2 size={18}/>{toast}</div>}
      </main>
    </div>
  );
}

function Login({onLogin}){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const submit=(e)=>{e.preventDefault();onLogin()};
  return <div className="login-page">
    <div className="login-brand">
      <div className="brand-mark large"><Stethoscope size={42}/></div>
      <h1>Patient Case-Taking<br/>Software</h1>
      <p className="tagline">Better Conversations. Better Care.</p>
      <p>A smart and simple way for doctors to capture patient details, manage history and get AI-powered insights.</p>
      <div className="doctor-art"><div className="art-circle"></div><Stethoscope size={110}/></div>
    </div>
    <form className="login-card" onSubmit={submit}>
      <h2>Login</h2><p className="muted">Access your account to continue</p>
      <label>Email / Username</label><input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter email or username"/>
      <label>Password</label><input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password"/>
      <div className="row-between small"><label className="check"><input type="checkbox"/> Remember me</label><button type="button" className="link">Forgot password?</button></div>
      <button className="primary full"><LogIn size={17}/> Login</button>
      <p className="center muted">Don't have an account? <button type="button" className="link">Register here</button></p>
    </form>
  </div>
}

function Sidebar({page,navigate,logout}){
 const items=[
  ["dashboard","Dashboard",Home],["register","Register Patient",UserPlus],["case","Take Case",ClipboardList],
  ["records","Patient Records",Users],["reports","Reports",FileText],["assistant","AI Assistant",Brain]
 ];
 return <aside className="sidebar">
   <div className="sidebar-brand"><div className="brand-mark"><Stethoscope size={22}/></div><span>Patient Case-Taking</span></div>
   <nav>{items.map(([id,label,Icon])=><button key={id} className={page===id?"nav active":"nav"} onClick={()=>navigate(id)}><Icon size={17}/>{label}</button>)}</nav>
   <div className="side-bottom">
     <button className="nav" onClick={()=>navigate("settings")}><Settings size={17}/>Settings</button>
     <button className="nav" onClick={logout}><LogOut size={17}/>Logout</button>
   </div>
 </aside>
}

function Topbar(){return <header className="topbar"><div className="mobile-menu"><Menu/></div><div className="search"><Search size={17}/><input placeholder="Search patients, records..."/></div><div className="top-actions"><Bell size={19}/><div className="doctor"><div className="avatar">PS</div><div><b>Dr. Priya Sharma</b><span>General Physician</span></div></div></div></header>}

function PageTitle({title,sub,action}){return <div className="page-title"><div><h1>{title}</h1><p>{sub}</p></div>{action}</div>}

function Dashboard({patients,navigate,onSelect}){
 return <section>
   <PageTitle title="Welcome, Dr. Priya Sharma" sub="Here's what's happening today" action={<button className="primary" onClick={()=>navigate("register")}><Plus size={17}/> Register Patient</button>}/>
   <div className="stats">
    <Stat icon={Users} label="Total Patients" value="24" trend="12% since last week"/>
    <Stat icon={UserPlus} label="New Registrations" value="6" trend="20% since last week"/>
    <Stat icon={ClipboardList} label="Case Taken" value="18" trend="15% since last week"/>
    <Stat icon={CalendarDays} label="Follow Ups" value="5" trend="8% since last week"/>
   </div>
   <div className="grid-2">
    <div className="card"><div className="card-head"><h3>Recent Patients</h3><button className="link" onClick={()=>navigate("records")}>View All</button></div>
      <PatientTable patients={patients} onSelect={onSelect}/>
    </div>
    <div className="card quick-card"><h3>Quick Actions</h3>
      <Quick label="Register a new patient" icon={UserPlus} onClick={()=>navigate("register")}/>
      <Quick label="Take patient case" icon={ClipboardList} onClick={()=>navigate("case")}/>
      <Quick label="View AI assistant" icon={Brain} onClick={()=>navigate("assistant")}/>
      <Quick label="Generate case report" icon={FileText} onClick={()=>navigate("reports")}/>
    </div>
   </div>
 </section>
}
function Stat({icon:Icon,label,value,trend}){return <div className="stat"><div className="stat-icon"><Icon size={19}/></div><div><span>{label}</span><strong>{value}</strong><small>↑ {trend}</small></div></div>}
function Quick({label,icon:Icon,onClick}){return <button className="quick" onClick={onClick}><span><Icon size={18}/></span>{label}<ChevronRight size={17}/></button>}

function PatientTable({patients,onSelect}){
 return <div className="table-wrap"><table><thead><tr><th>ID</th><th>Name</th><th>Age / Gender</th><th>Visit Date</th><th>Status</th><th>Action</th></tr></thead>
 <tbody>{patients.map(p=><tr key={p.id}><td>{p.id}</td><td><b>{p.name}</b></td><td>{p.age} / {p.gender[0]}</td><td>{p.visit}</td><td><span className={"badge "+p.status.toLowerCase().replaceAll(" ","-")}>{p.status}</span></td><td><button className="outline sm" onClick={()=>onSelect(p)}>View</button></td></tr>)}</tbody></table></div>
}

function Register({onAdd}){
 const [form,setForm]=useState({name:"",age:"",gender:"Female",phone:"",address:""});
 const update=(k,v)=>setForm({...form,[k]:v});
 const submit=e=>{e.preventDefault(); if(!form.name||!form.age){alert("Please enter patient name and age.");return;} onAdd({...form,id:"P-"+String(Math.floor(Math.random()*900)+100),visit:"09 Sep 2026",status:"In Progress",complaint:"—",diagnosis:"—",doctor:"Dr. Priya Sharma",age:Number(form.age)})};
 return <section><PageTitle title="Register New Patient" sub="Enter the patient's basic details"/>
 <form className="card form-card" onSubmit={submit}><div className="form-grid">
  <Field label="Full Name *" value={form.name} onChange={v=>update("name",v)} placeholder="Enter patient name"/>
  <Field label="Age *" type="number" value={form.age} onChange={v=>update("age",v)} placeholder="Enter age"/>
  <div><label>Gender *</label><select value={form.gender} onChange={e=>update("gender",e.target.value)}><option>Female</option><option>Male</option><option>Other</option></select></div>
  <Field label="Phone Number *" value={form.phone} onChange={v=>update("phone",v)} placeholder="Enter phone number"/>
  <Field wide label="Address" value={form.address} onChange={v=>update("address",v)} placeholder="Enter address"/>
  <div className="id-preview"><span>Patient ID (Auto generated)</span><b>Will be generated on save</b></div>
 </div><div className="form-actions"><button type="button" className="outline">Cancel</button><button className="primary"><UserPlus size={17}/> Register Patient</button></div></form></section>
}
function Field({label,value,onChange,placeholder,type="text",wide}){return <div className={wide?"wide":""}><label>{label}</label><input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></div>}

function CaseTaking({patient,onDone}){
 const [step,setStep]=useState(1); const [complaint,setComplaint]=useState("");
 return <section><PageTitle title="Take Patient Case" sub="Record patient's medical history and current complaints"/>
 <div className="patient-banner"><div className="avatar">PR</div><div><b>{patient.name}</b><span>{patient.id} · {patient.age} years · {patient.gender}</span></div><button className="outline sm">Change Patient</button></div>
 <div className="steps">{["Chief Complaint","History","Examination","Notes"].map((s,i)=><button key={s} className={step===i+1?"step active":"step"} onClick={()=>setStep(i+1)}>{i+1}. {s}</button>)}</div>
 <div className="card case-card">{step===1?<div className="case-grid">
   <div><label>Chief Complaint</label><textarea value={complaint} onChange={e=>setComplaint(e.target.value)} placeholder="Describe the main complaint..."/>
    <label>Duration</label><select><option>Select duration</option><option>1–3 days</option><option>4–7 days</option><option>More than a week</option></select>
    <label>Severity</label><div className="radio-row"><label><input type="radio" name="sev"/> Mild</label><label><input type="radio" name="sev"/> Moderate</label><label><input type="radio" name="sev"/> Severe</label></div>
   </div>
   <div className="symptoms"><label>Symptoms (select all that apply)</label>{["Fever","Cough","Cold","Headache","Body Pain","Vomiting","Others"].map(x=><label key={x} className="check"><input type="checkbox"/>{x}</label>)}<input placeholder="Other symptoms"/></div>
 </div>:<div className="empty-step"><Brain size={38}/><h3>{["","Patient History","Examination","Clinical Notes"][step]}</h3><p>This section is ready for your case-taking fields.</p><textarea placeholder="Enter details..."/></div>}
 <div className="form-actions"><button className="outline" disabled={step===1} onClick={()=>setStep(s=>s-1)}><ArrowLeft size={16}/> Back</button>{step<4?<button className="primary" onClick={()=>setStep(s=>s+1)}>Next <ChevronRight size={16}/></button>:<button className="primary" onClick={onDone}><CheckCircle2 size={16}/> Save Case</button>}</div>
 </div></section>
}

function Records({patients,onSelect}){
 const [q,setQ]=useState("");
 const filtered=patients.filter(p=>p.name.toLowerCase().includes(q.toLowerCase())||p.id.toLowerCase().includes(q.toLowerCase()));
 return <section><PageTitle title="Patient Records" sub="View and manage patient history"/>
 <div className="card"><div className="card-head"><h3>All Patients</h3><div className="mini-search"><Search size={16}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search"/></div></div><PatientTable patients={filtered} onSelect={onSelect}/></div></section>
}

function AIAssistant({patient}){
 const [input,setInput]=useState(""); const [messages,setMessages]=useState([{from:"ai",text:"Hello! I can help summarize the selected case and organize information. This prototype does not provide medical diagnosis."}]);
 const send=()=>{if(!input.trim())return; const q=input; setMessages(m=>[...m,{from:"you",text:q},{from:"ai",text:"Demo response: I would summarize the documented symptoms, history and examination findings here for clinician review."}]);setInput("")};
 return <section><PageTitle title="AI-Powered Case Summary" sub="Get instant insights and suggestions based on patient data"/>
 <div className="ai-layout"><div className="card chat">{messages.map((m,i)=><div key={i} className={"msg "+m.from}><div className="msg-icon">{m.from==="ai"?<Brain size={16}/>:<Users size={16}/>}</div><p>{m.text}</p></div>)}<div className="chat-input"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask about the case..."/><button className="primary" onClick={send}>Send</button></div></div>
 <div className="card"><h3>Selected Patient</h3><div className="patient-mini"><div className="avatar">PR</div><b>{patient.name}</b><span>{patient.id} · {patient.age} years</span></div><div className="ai-note"><ShieldCheck size={18}/><p>AI output should be reviewed by a qualified clinician before use.</p></div></div></div>
 </section>
}

function Reports({patient}){
 return <section><PageTitle title="Case Report" sub="Generate and print a patient case report" action={<div className="row"><button className="outline"><Download size={16}/> Download PDF</button><button className="primary"><Printer size={16}/> Print</button></div>}/>
 <div className="card report"><div className="report-head"><div className="avatar">PR</div><div><h2>{patient.name}</h2><span>{patient.id} · {patient.age} years · {patient.gender}</span></div><div className="report-meta">Visit Date: 09 Sep 2026<br/>Doctor: Dr. Priya Sharma</div></div>
 <div className="report-grid"><Info title="Chief Complaint" text={patient.complaint==="—"?"Fever for 3 days, cough, body pain":patient.complaint}/><Info title="Examination" text="Vitals: BP 110/70 mmHg · Temp 100.4°F · HR 90 bpm · RR 18/min"/><Info title="Diagnosis & Plan" text={patient.diagnosis==="—"?"Possible viral fever. Symptomatic treatment and follow-up as required.":patient.diagnosis}/><Info title="History" text="No significant past medical history. No known allergies."/></div>
 <div className="disclaimer">Prototype report for demonstration only. Replace with your validated clinical workflow before real-world use.</div></div></section>
}
function Info({title,text}){return <div className="info"><h4>{title}</h4><p>{text}</p></div>}

function SettingsPage(){return <section><PageTitle title="Settings" sub="Configure your prototype workspace"/><div className="card settings-list"><Setting icon={Cloud} title="Cloud sync" text="Demo setting for AWS / Google Cloud integration"/><Setting icon={Database} title="Database" text="PostgreSQL for clinical records; Firebase for session state"/><Setting icon={Mic} title="Voice input" text="Ready for Whisper / ASR integration"/><Setting icon={Link2} title="Hospital integration" text="ABHA and HL7 FHIR integration placeholder"/></div></section>}
function Setting({icon:Icon,title,text}){return <div className="setting"><span><Icon size={20}/></span><div><b>{title}</b><p>{text}</p></div><label className="switch"><input type="checkbox"/><i></i></label></div>}

createRoot(document.getElementById("root")).render(<App />);
