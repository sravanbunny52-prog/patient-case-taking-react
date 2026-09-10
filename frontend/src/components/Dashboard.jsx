function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to Patient Care System</p>

      <div className="cards">
        <div className="card">
          <h3>Total Patients</h3>
          <h2>120</h2>
        </div>

        <div className="card">
          <h3>Today's Patients</h3>
          <h2>15</h2>
        </div>

        <div className="card">
          <h3>Cases Completed</h3>
          <h2>98</h2>
        </div>

        <div className="card">
          <h3>Pending Cases</h3>
          <h2>22</h2>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
