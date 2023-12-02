import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";
import LoginScreen from "../screens/LoginScreen";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    if (state.adminInfo) {
      navigate("/dashboard");
    }
  }, [navigate, state.adminInfo]);

  async function handleLogin(username, password) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: username,
          password: password,
        }
      );
      if (data.status === 200) {
        ctxDispatch({ type: "ADMIN_SIGNIN", payload: data.data });
        localStorage.setItem("adminInfo", JSON.stringify(data.data));
        navigate("/dashboard");
        console.log(data);
      } else {
        console.error("Login failed. Status:", data.status);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  }

  return <LoginScreen handleLogin={handleLogin} loading={loading} />;
}

export default Login;
