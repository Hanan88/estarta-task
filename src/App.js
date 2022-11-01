import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "./components/Breadcrumb";
import Filters from "./components/Filters";
import Logs from "./components/Logs";
import dayjs from "dayjs";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const App = () => {
  const [logData, setLogData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const actionTypeData = () => {
    return [...new Set(logData.map((item) => item.actionType))];
  };
  const applicationTypeData = () => {
    return [...new Set(logData.map((item) => item.applicationType))];
  };

  const getLogData = async () => {
    try {
      const response = await axios.get(
        "https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f"
      );
      setLogData(response.data.result.auditLog);
      setFilteredData(response.data.result.auditLog);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, []);

  const handleLogFilter = (logId) => {
    const filterData = logData.filter((item) => {
      if (item.logId.toString().toLowerCase().includes(logId.toLowerCase())) {
        return item;
      }
    });
    setFilteredData(filterData);
  };

  const handleAppIdFilter = (appId) => {
    const filteredData = logData.filter((item) => {
      if (
        item?.applicationId
          ?.toString()
          .toLowerCase()
          .includes(appId.toLowerCase())
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const handleActionTypeFilter = (actionType) => {
    const filteredData = logData.filter((item) => {
      if (item?.actionType === actionType) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const handleApplicationTypeFilter = (applicationType) => {
    const filteredData = logData.filter((item) => {
      if (item?.applicationType === applicationType) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };

  const handleDateFilter = (fromDate, toDate) => {
    console.log("=====");
    const filteredData = logData.filter((item) => {
      if (
        fromDate &&
        toDate &&
        dayjs(item.creationTimestamp).isBetween(
          dayjs(fromDate),
          dayjs(toDate),
          "year"
        )
      ) {
        console.log("eee");
        return item;
      } else if (
        fromDate &&
        dayjs(item.creationTimestamp).isSameOrAfter(dayjs(fromDate))
      ) {
        return item;
      } else if (
        toDate &&
        dayjs(item.creationTimestamp).isSameOrBefore(dayjs(toDate))
      ) {
        return item;
      }
    });
    setFilteredData(filteredData);
  };
  return (
    <div className="container">
      <Breadcrumb />
      <Filters
        actionsType={actionTypeData()}
        applicationsType={applicationTypeData()}
        onLogFilter={handleLogFilter}
        onAppIdFilter={handleAppIdFilter}
        onActionTypeFilter={handleActionTypeFilter}
        onApplicationTypeFilter={handleApplicationTypeFilter}
        onDateFilter={handleDateFilter}
      />
      <Logs
        logData={logData}
        setLogData={setLogData}
        filteredData={filteredData}
        setFilteredData={setFilteredData}
      />
    </div>
  );
};

export default App;
