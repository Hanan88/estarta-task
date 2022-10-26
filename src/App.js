import React from "react";
import Breadcrumb from "./components/Breadcrumb";
import Filters from "./components/Filters";
import Logs from "./components/Logs";
const App = () => {
  return (
    <div className="container">
      <Breadcrumb />
      <Filters />
      <Logs />
    </div>
  );
};

export default App;
