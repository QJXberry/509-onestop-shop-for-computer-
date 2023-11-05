import React, { useState } from "react";
import "./Table.css";

function Table() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const handleRemove = () => {
    setData((prevData) =>
      prevData.filter((item) => !selected.includes(item.storeId))
    );
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Store Id</th>
            <th>Store name</th>
            <th>Inventory</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.storeId}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(row.storeId)}
                  onChange={() => {
                    setSelected((prev) => {
                      if (prev.includes(row.storeId)) {
                        return prev.filter((id) => id !== row.storeId);
                      } else {
                        return [...prev, row.storeId];
                      }
                    });
                  }}
                />
              </td>
              <td>{row.storeId}</td>
              <td>{row.storeName}</td>
              <td>{row.inventory}</td>
              <td>{row.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Table;
