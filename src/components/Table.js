import React, { useState } from "react";
import axios from "axios";
import "./Table.css";

function Table({ stores, setStores, computers }) {
  const [selected, setSelected] = useState([]);

  const handleRemove = async () => {
    const storesToDelete = stores.filter((item) => selected.includes(item.id));
    try {
      for (const store of storesToDelete) {
        let body = { storeId: store.id };
        let payload = { body: JSON.stringify(body) };
        const response = await axios.post(
          "https://d2socpeyl6.execute-api.us-east-2.amazonaws.com/iterationOne/remove",
          payload
        );
        let payload_back = JSON.parse(response.data.body);
        if (payload_back.message) {
          console.log("Store removed successfully!");
        } else {
          console.log("Store removed was not successful.");
        }
      }
      setStores((prevData) =>
        prevData.filter((item) => !selected.includes(item.storeId))
      );
      setSelected([]);
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  const calculateInventoryAmount = (storeId) => {
    const storeComputers = computers.filter(
      (computer) => computer.store_id === storeId
    );
    const inventoryAmount = storeComputers.reduce(
      (total, computer) => total + computer.price,
      0
    );
    return inventoryAmount;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Store Id</th>
            <th>Store Name</th>
            <th>Inventory Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((store) => (
            <tr key={store.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(store.id)}
                  onChange={() => {
                    setSelected((prev) => {
                      if (prev.includes(store.id)) {
                        return prev.filter((id) => id !== store.id);
                      } else {
                        return [...prev, store.id];
                      }
                    });
                  }}
                />
              </td>
              <td>{store.id}</td>
              <td>{store.name}</td>
              <td>{calculateInventoryAmount(store.id)}</td>
              <td>{0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Table;
