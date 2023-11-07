import React from "react";
import "./TotalInventory.css";

function TotalInventory({ data }) {
  const totalInventory = data.reduce((sum, store) => sum + store.inventory, 0);

  return (
    <div className="total-inventory">
      Total Inventory Amount: {totalInventory}
    </div>
  );
}

export default TotalInventory;
