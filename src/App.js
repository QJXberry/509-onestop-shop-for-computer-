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
        console.log("Fetch computer data successfully");
      } catch (error) {
        console.error("Failed to fetch computers:", error);
      }
    }
    fetchComputers();
  }, []);

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
