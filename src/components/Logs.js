import React, { useEffect, useState } from "react";
import "./Logs.css";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Filters from "./Filters";

const Logs = () => {
  // const [logResponse, setLogResponse] = useState([]);
  const [logData, setLogData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(logData?.length / itemsPerPage);
  const [order, setOrder] = useState("ASC");

  const getLogData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      );
      // setLogResponse(response.data.result);
      setLogData(response.data.result.auditLog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, []);

  const changePages = ({ selected }) => {
    setPageNumber(selected);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...logData].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setLogData(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...logData].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setLogData(sorted);
      setOrder("ASC");
    }
  };

  const displayLogs = logData
    ?.slice(pagesVisited, pagesVisited + itemsPerPage)
    .map((log) => {
      return (
        <tr key={log.logId}>
          <td>{log.logId}</td>
          <td>{log?.applicationType}</td>
          <td>{log?.applicationId}</td>
          <td>{log?.actionType}</td>
          <td>-/+</td>
          <td>{log?.creationTimestamp}</td>
        </tr>
      );
    });

  return (
    <div className="logs">
      <table className="logs__table">
        <thead className="logs__table__head">
          <tr>
            <th>
              Log ID
              <button className="sort_btn" onClick={() => sorting("logId")}>
                &uarr;
              </button>
            </th>
            <th>
              Application Type
              <button
                className="sort_btn"
                onClick={() => sorting("applicationType")}
              >
                &uarr;
              </button>
            </th>
            <th>
              Application ID
              <button
                className="sort_btn"
                onClick={() => sorting("applicationId")}
              >
                &uarr;
              </button>
            </th>
            <th>
              Action
              <button
                className="sort_btn"
                onClick={() => sorting("actionType")}
              >
                &uarr;
              </button>
            </th>
            <th>Action Details</th>
            <th>
              Date : Time
              <button
                className="sort_btn"
                onClick={() => sorting("creationTimestamp")}
              >
                &uarr;
              </button>
            </th>
          </tr>
        </thead>
        <tbody className="logs__table__body">{displayLogs}</tbody>
      </table>
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageRangeDisplayed={2}
        pageCount={pageCount}
        onPageChange={changePages}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__previous"}
        nextLinkClassName={"pagination__next"}
        pageClassName={"pagination__page"}
        disabledClassName={"pagination__disabled"}
        activeClassName={"pagination__active"}
      />
    </div>
  );
};

export default Logs;
