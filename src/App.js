import "./App.css";
import React, { useState, useMemo } from "react";
import Table from "./components/Table";
import TotalInventory from "./components/TotalInventory";
import SiteManagerBalance from "./components/SiteManagerBalance";

function App() {
  const [data, setData] = useState([
    {
      storeId: "001",
      storeName: "Store A",
      inventory: 15000,
      balance: 30000,
    },
    {
      storeId: "002",
      storeName: "Store B",
      inventory: 20000,
      balance: 45000,
    },
  ]);

  //const [data, setData] = useState([]);

  const siteManagerBalance = useMemo(() => {
    const totalBalance = data.reduce((acc, store) => acc + store.balance, 0);
    return (totalBalance / 0.95) * 0.05;
  }, [data]);

  return (
    <div className="App">
      <SiteManagerBalance data={siteManagerBalance} />
      <TotalInventory data={data} />
      <Table data={data} setData={setData} />
    </div>
  );
}

export default App;
