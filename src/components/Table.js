import React, { useState } from "react";
import axios from "axios";
import "./Table.css";

function Table({ stores, setStores, computers }) {
  const [selected, setSelected] = useState([]);

  const handleRemove = async () => {
    const storesToDelete = stores.filter((item) => selected.includes(item.id));

    const deletePromises = storesToDelete.map(async (store) => {
      let body = { storeId: store.id };
      let payload = { body: JSON.stringify(body) };
      await axios.post(
        "https://d2socpeyl6.execute-api.us-east-2.amazonaws.com/iterationOne/remove",
        payload
      );
    });
    try {
      await Promise.all(deletePromises);

      setStores((prevStores) =>
        prevStores.filter((store) => !selected.includes(store.id))
      );
      setSelected([]);
    } catch (error) {
      console.error("Failed to delete store(s):", error);
    }
  };

  const sortStoresByInventoryValue = (order) => {
    setStores((prevStores) => {
      const sortedStores = [...prevStores];
      sortedStores.sort((a, b) => {
        const inventoryA = calculateInventoryAmount(a.id);
        const inventoryB = calculateInventoryAmount(b.id);

        if (order === "ASC") {
          return inventoryA - inventoryB;
        } else if (order === "DESC") {
          return inventoryB - inventoryA;
        }
        return 0;
      });
      return sortedStores;
    });
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
      <div className="sorting-controls">
        <button onClick={() => sortStoresByInventoryValue("ASC")}>ASC</button>
        <button onClick={() => sortStoresByInventoryValue("DESC")}>DESC</button>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Store Id</th>
            <th>Store Name</th>
            <th>Inventory $$ Amount</th>
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
              <td>{store.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Table;
