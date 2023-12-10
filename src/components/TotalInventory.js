import React from "react";
import "./TotalInventory.css";

function TotalInventory({ stores, setStores, computers }) {
  const storeIds = new Set(stores.map((store) => store.id));

  const totalInventoryAmount = computers
    .filter((computer) => storeIds.has(computer.store_id))
    .reduce((acc, computer) => acc + computer.price, 0);

  return (
    <div className="total-inventory">
      Total Inventory $$ Amount: {totalInventoryAmount}
    </div>
  );
}

export default TotalInventory;
