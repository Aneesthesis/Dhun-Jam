import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

function LoginScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    if (state.adminInfo) {
      navigate("/dashboard");
    }
  }, [navigate, state.adminInfo]);

  async function handleLogin(e) {
    try {
      const { data } = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: username,
          password: password,
        }
      );

      ctxDispatch({ type: "ADMIN_SIGNIN", payload: data.data });
      localStorage.setItem("adminInfo", JSON.stringify(data.data));
      navigate("/dashboard");

      console.log(data);
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <form className="bg-black p-8 rounded shadow-md w-96">
        <h2 className="text-2xl text-center font-semibold mb-4 text-white">
          Venue Admin Login
        </h2>
        <div className="mb-4">
          <input
            placeholder="Username"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-white rounded-lg px-3 py-2 mt-1 text-white"
          />
        </div>

        <div className="mb-4 relative">
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-white rounded-lg px-3 py-2 mt-1 text-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
          >
            {showPassword ? (
              <svg
                className="h-8 w-8 text-white hover:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 5c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2zm3 5c-3.87 0-7 3.13-7 7s3.13 7 7 7s7-3.13 7-7s-3.13-7-7-7zm-1 10h2v-2h-2v2zm0-6h2V7h-2v7z"></path>
              </svg>
            ) : (
              <svg
                className="h-8 w-8 text-white hover:text-gray-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 14c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3z"></path>
              </svg>
            )}
          </span>
        </div>

        <button
          onClick={handleLogin}
          type="button"
          className="bg-[#6741D9] w-full text-white px-4 py-2 rounded hover:bg-[#F0C3F1]"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
