import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SiteManagerBalance.css";

function SiteManagerBalance() {
  const [managers, setManagers] = useState([]);

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

  const managerBalance = managers.length > 0 ? managers[0].balance : null;

  return (
    <div className="site-manager-balance">
      Site Manager balance:{" "}
      {managerBalance !== null ? managerBalance : "Loading..."}
    </div>
  );
}

export default SiteManagerBalance;
