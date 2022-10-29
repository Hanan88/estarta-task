import React, { useEffect, useState } from "react";
import axios from "axios";
import Breadcrumb from "./components/Breadcrumb";
import Filters from "./components/Filters";
import Logs from "./components/Logs";
import dayjs from "dayjs";

const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const App = () => {
  const [logData, setLogData] = useState([]);
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLogData();
  }, []);

  const handleLogFilter = (logId) => {
    const filteredData = logData.filter((item) => {
      if (item.logId.toString().toLowerCase().includes(logId.toLowerCase())) {
        return item;
      }
    });
    setLogData(filteredData);
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
    setLogData(filteredData);
  };

  const handleActionTypeFilter = (actionType) => {
    const filteredData = logData.filter((item) => {
      if (item?.actionType === actionType) {
        return item;
      }
    });
    setLogData(filteredData);
  };

  const handleApplicationTypeFilter = (applicationType) => {
    const filteredData = logData.filter((item) => {
      if (item?.applicationType === applicationType) {
        return item;
      }
    });
    setLogData(filteredData);
  };

  const handleDateFilter = (date, field) => {
    const filteredData = logData.filter((item) => {
      if (
        field === "fromDate" &&
        dayjs(item.creationTimestamp).isSameOrAfter(dayjs(date))
      ) {
        return item;
      }
    });
    setLogData(filteredData);
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
      <Logs logData={logData} setLogData={setLogData} />
    </div>
  );
};

export default App;
