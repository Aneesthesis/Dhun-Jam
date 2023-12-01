import axios from "axios";
import React from "react";
import DashboardScreen from "../screens/DashboardScreen";

function Dashboard() {
  (async function fetchAdminDetails() {
    try {
      const data = await axios.get("https://stg.dhunjam.in/account/admin/4");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  })();

  return <DashboardScreen />;
}

export default Dashboard;
