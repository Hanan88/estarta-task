import React, { useState } from "react";
import "./Logs.css";
import "./Pagination.css";
import ReactPaginate from "react-paginate";

const Logs = ({ setFilteredData, filteredData }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const pagesVisited = pageNumber * itemsPerPage;
  const pageCount = Math.ceil(filteredData?.length / itemsPerPage);
  const [order, setOrder] = useState("ASC");

  const changePages = ({ selected }) => {
    setPageNumber(selected);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...filteredData].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setFilteredData(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...filteredData].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setFilteredData(sorted);
      setOrder("ASC");
    }
  };
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
        <tbody className="logs__table__body">
          {filteredData.length > 0
            ? filteredData
                ?.slice(pagesVisited, pagesVisited + itemsPerPage)
                .map((log, index) => {
                  return (
                    <tr key={index}>
                      <td>{log.logId}</td>
                      <td>{log?.applicationType}</td>
                      <td>{log?.applicationId}</td>
                      <td>{log?.actionType}</td>
                      <td>-/+</td>
                      <td>{log?.creationTimestamp}</td>
                    </tr>
                  );
                })
            : null}
        </tbody>
      </table>
      {filteredData.length > 0 ? (
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
      ) : null}
    </div>
  );
};

export default Logs;
