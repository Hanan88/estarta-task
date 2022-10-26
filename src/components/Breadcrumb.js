import React from "react";
import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="breadcrumb">
      <ul className="breadcrumb-list">
        <li className="breadcrumb-list__item">
          <a href="#">Home</a>
        </li>
        <li className="breadcrumb-list__item">
          <a href="#">Administration</a>
        </li>
        <li className="breadcrumb-list__item">Logger Search</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
