import React, { useState } from "react";
import "./Filters.css";

const Filters = ({
  actionsType,
  applicationsType,
  onLogFilter,
  onAppIdFilter,
  onActionTypeFilter,
  onApplicationTypeFilter,
  onDateFilter,
}) => {
  const [filters, setFilters] = useState({
    logId: "",
    actionType: "",
    applicationType: "",
    applicationId: "",
  });

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleInput = (field) => (event) => {
    const { value } = event.target;

    setFilters({
      ...filters,
      [field]: value,
    });

    switch (field) {
      case "logId":
        onLogFilter(value);
        break;
      case "applicationId":
        onAppIdFilter(value);
        break;
      case "actionType":
        onActionTypeFilter(value);
        break;
      case "applicationType":
        onApplicationTypeFilter(value);
        break;
      case "fromDate":
        setFromDate(value);
        onDateFilter(fromDate, toDate);
        break;
      case "toDate":
        setToDate(value);
        onDateFilter(fromDate, toDate);
        break;
      default:
        break;
    }
  };
  
  return (
    <div className="filters__controls">
      <div className="filters__control">
        <label>Log ID</label>
        <input
          type="text"
          placeholder="e.g Admin.User"
          value={filters.logId}
          onChange={handleInput("logId")}
        />
      </div>

      <div className="filters__control">
        <label>Action Type</label>
        <select onChange={handleInput("actionType")}>
          <option value="">select action Type</option>
          {actionsType.map((type) => {
            return (
              <option value={type} key={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filters__control">
        <label>Application Type</label>
        <select onChange={handleInput("applicationType")}>
          <option value="">select application type</option>
          {applicationsType.map((type) => {
            return (
              <option value={type} key={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>

      <div className="filters__control">
        <label>From Date</label>
        <input
          type="date"
          value={fromDate}
          onChange={handleInput("fromDate")}
        />
      </div>

      <div className="filters__control">
        <label>To Date</label>
        <input
          type="date"
          value={toDate}
          min={fromDate}
          onChange={handleInput("toDate")}
        />
      </div>

      <div className="filters__control">
        <label>Application ID</label>
        <input
          type="text"
          value={filters.applicationId}
          onChange={handleInput("applicationId")}
        />
      </div>
      <button>Search Logger</button>
    </div>
  );
};

export default Filters;
