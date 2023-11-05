import "./App.css";
import React from "react";
import Table from "./components/Table";
import TotalInventory from "./components/TotalInventory";
import SiteManagerBalance from "./components/SiteManagerBalance";

function App() {
  return (
    <div className="App">
      <SiteManagerBalance />
      <TotalInventory />
      <Table />
    </div>
  );
}

export default App;
