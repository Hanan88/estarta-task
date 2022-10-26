import React from "react";
import "./Filters.css";

const Filters = () => {
  return (
    <div className="filters__controls">
      <div className="filters__control">
        <label>Employee Name</label>
        <input type="text" placeholder="e.g Admin.User"/>
      </div>
      <div className="filters__control">
        <label>Action Type</label>
        <input type="text" />
      </div>
      <div className="filters__control">
        <label>Application Type</label>
        <input type="text" />
      </div>
      <div className="filters__control">
        <label>From Date</label>
        <input type="date" />
      </div>
      <div className="filters__control">
        <label>To Date</label>
        <input type="date" />
      </div>
      <div className="filters__control">
        <label>Application ID</label>
        <input type="text" />
      </div>
      <button>Search Logger</button>
    </div>
  );
};

export default Filters;
