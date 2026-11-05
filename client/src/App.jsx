
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [serverStatus, setServerStatus] = useState("Checking...");
  const [serverMessage, setServerMessage] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/health`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Backend health check failed");
        }

        setServerStatus("Connected");
        setServerMessage(data.message);
      } catch (error) {
        setServerStatus("Disconnected");
        setServerMessage(error.message);
      }
    };

    checkBackend();
  }, []);

  return (
    <div className="app">
      <h1>ReleaseGuard</h1>

      <p>API Reliability & Incident Management Platform</p>

      <div className="status-card">
        <h2>Backend Connection</h2>

        <h3>{serverStatus}</h3>

        <p>{serverMessage}</p>
      </div>
    </div>
  );
}

export default App;
