import React, { useEffect, useState } from "react";
import "./Logs.css";
import "./Pagination.css";
import ReactPaginate from "react-paginate";
import axios from "axios";

const Logs = () => {
  const [logData, setLogData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(logData?.auditLog?.length / itemsPerPage);

  const changePages = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayLogs = logData?.auditLog
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

  const getLogData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      );
      setLogData(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, []);

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
