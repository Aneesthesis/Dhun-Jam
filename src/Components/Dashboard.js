import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import DashboardScreen from "../screens/DashboardScreen";
import { LoadingBox } from "../UI/LoadingSpinner";
import { MessageBox } from "../UI/MessageBox";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, adminData: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Dashboard() {
  const [{ loading, adminData, error }, dispatch] = useReducer(reducer, {
    loading: false,
    adminData: {},
    error: null,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.adminInfo) {
      navigate("/");
    }
  }, [navigate, state.adminInfo]);

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  async function fetchAdminDetails() {
    try {
      dispatch({ type: "FETCH_REQUEST" });

      const data = await axios.get("https://stg.dhunjam.in/account/admin/4");

      if (data.status === 200) {
        dispatch({ type: "FETCH_SUCCESS", payload: data.data.data });
        console.log(data.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "FETCH_FAIL", payload: error });
    }
  }
  async function onSave(amountObject) {
    try {
      const response = await axios.put(
        "https://stg.dhunjam.in/account/admin/4",
        {
          amount: amountObject,
        }
      );

      console.log("Update successful", response.data);

      fetchAdminDetails();
    } catch (error) {
      console.error("Error updating data", error);
    }
  }

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox>{error.message}</MessageBox>
  ) : (
    adminData && <DashboardScreen onSave={onSave} data={adminData} />
  );
}

export default Dashboard;
