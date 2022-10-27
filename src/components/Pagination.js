import React, { useState } from "react";
import "./Pagination.css";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPages, logData, displayLogss }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(logData?.length / itemsPerPage);
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

//   displayLogss(displayLogs);

  return (
    <div className="pagination">
        {displayLogs}
      <ReactPaginate
        previousLabel="<"
        nextLabel=">"
        // breakLabel="..."
        pageRangeDisplayed={5}
        pageCount={pageCount}
        onPageChange={changePages}
        containerClassName={"pagination"}
      />
    </div>
  );
};

export default Pagination;
