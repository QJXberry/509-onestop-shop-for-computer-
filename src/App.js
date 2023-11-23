import "./App.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import TotalInventory from "./components/TotalInventory";
import SiteManagerBalance from "./components/SiteManagerBalance";

function App() {
  const [stores, setStores] = useState([]);
  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await axios.get(
          "https://d2socpeyl6.execute-api.us-east-2.amazonaws.com/iterationOne/fetch"
        );

        let payload_back = JSON.parse(response.data.body);
        setStores(payload_back);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    }
    fetchStores();
  }, []);

  const [computers, setComputers] = useState([]);
  useEffect(() => {
    async function fetchComputers() {
      try {
        const response = await axios.get(
          "https://d2socpeyl6.execute-api.us-east-2.amazonaws.com/iterationOne/fetchcomp"
        );

        let payload_back = JSON.parse(response.data.body);
        setComputers(payload_back);
      } catch (error) {
        console.error("Failed to fetch computers:", error);
      }
    }
    fetchComputers();
  }, []);

  const [managers, setManagers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchManagers() {
      try {
        const response = await axios.get(
          "https://d2socpeyl6.execute-api.us-east-2.amazonaws.com/iterationOne/fetchmanager"
        );
        let payload_back = JSON.parse(response.data.body);
        if (isMounted) {
          setManagers(payload_back);
          console.log("Fetch managers data successfully");
        }
      } catch (error) {
        console.error("Failed to fetch managers:", error);
      }
    }
    fetchManagers();
    return () => {
      isMounted = false;
    };
  }, []);

  const managerUsername = managers.length > 0 ? managers[0].username : null;
  const managerPassword = managers.length > 0 ? managers[0].password : null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      managers.length > 0 &&
      username === managerUsername &&
      password === managerPassword
    ) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-form">
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          {loginError && <p className="error">{loginError}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <SiteManagerBalance />
      <TotalInventory
        stores={stores}
        setStores={setStores}
        computers={computers}
      />
      <Table stores={stores} setStores={setStores} computers={computers} />
    </div>
  );
}

export default App;
