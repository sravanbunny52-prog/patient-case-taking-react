function Sidebar({ setPage }) {
  return (
    <aside className="sidebar">
      <h2>Patient Care</h2>

      <button onClick={() => setPage("dashboard")}>
        🏠 Dashboard
      </button>

      <button onClick={() => setPage("register")}>
        👤 Register Patient
      </button>

      <button onClick={() => setPage("case")}>
        📋 Take Case
      </button>

      <button onClick={() => setPage("records")}>
        📁 Patient Records
      </button>

      <button onClick={() => setPage("reports")}>
        📊 Reports
      </button>

      <button onClick={() => setPage("ai")}>
       🤖 AI Assistant
      </button>
    </aside>
  );
}

export default Sidebar;