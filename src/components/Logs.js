import React, { useEffect, useState } from "react";
import "./Logs.css";
import Pagination from "./Pagination";
import axios from "axios";

const Logs = () => {
  const [logData, setLogData] = useState([]);
  const getLogData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      );
      setLogData(response.data.result);
      console.log(response, "response");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, []);
  // console.log(logData);

  return (
    <div className="logs">
      <table className="logs__table">
        <thead className="logs__table__head">
          <tr>
            <th>Log ID</th>
            <th>Application Type</th>
            <th>Application ID</th>
            <th>Action</th>
            <th>Action Details</th>
            <th>Date : Time</th>
          </tr>
        </thead>
        <tbody className="logs__table__body">
          {logData.auditLog &&
            logData.auditLog.map((log) => (
              <tr key={log.logId}>
                <td>{log.logId}</td>
                <td>{log?.applicationType}</td>
                <td>{log?.applicationId}</td>
                <td>{log?.actionType}</td>
                <td>-/+</td>
                <td>{log?.creationTimestamp}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination totalPages={logData.totalPages} />
    </div>
  );
};

export default Logs;
