import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

function LoginScreen({ loading, handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  console.log(handleLogin, loading);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <Helmet>
        <title>Login</title>
      </Helmet>

      <form className="bg-black p-8 shadow-md w-auto">
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
            className="w-[600px] bg-black border border-white rounded-lg px-3 py-2 mt-1 text-white"
          />
        </div>

        <div className="mb-4 relative">
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[600px] bg-black border border-white rounded-lg px-3 py-2 mt-1 text-white"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
          >
            {showPassword ? (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0.528"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9.75 12C9.75 10.7574 10.7574 9.75 12 9.75C13.2426 9.75 14.25 10.7574 14.25 12C14.25 13.2426 13.2426 14.25 12 14.25C10.7574 14.25 9.75 13.2426 9.75 12Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 12C2 13.6394 2.42496 14.1915 3.27489 15.2957C4.97196 17.5004 7.81811 20 12 20C16.1819 20 19.028 17.5004 20.7251 15.2957C21.575 14.1915 22 13.6394 22 12C22 10.3606 21.575 9.80853 20.7251 8.70433C19.028 6.49956 16.1819 4 12 4C7.81811 4 4.97196 6.49956 3.27489 8.70433C2.42496 9.80853 2 10.3606 2 12ZM12 8.25C9.92893 8.25 8.25 9.92893 8.25 12C8.25 14.0711 9.92893 15.75 12 15.75C14.0711 15.75 15.75 14.0711 15.75 12C15.75 9.92893 14.0711 8.25 12 8.25Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                </g>
              </svg>
            ) : (
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24.00 24.00"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#ffffff"
                stroke-width="0.528"
                transform="matrix(-1, 0, 0, 1, 0, 0)"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke="#FFFFFFCCCCCC"
                  stroke-width="0.192"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21.2714 9.17834C20.9814 8.71834 20.6714 8.28834 20.3514 7.88834C19.9814 7.41834 19.2814 7.37834 18.8614 7.79834L15.8614 10.7983C16.0814 11.4583 16.1214 12.2183 15.9214 13.0083C15.5714 14.4183 14.4314 15.5583 13.0214 15.9083C12.2314 16.1083 11.4714 16.0683 10.8114 15.8483C10.8114 15.8483 9.38141 17.2783 8.35141 18.3083C7.85141 18.8083 8.01141 19.6883 8.68141 19.9483C9.75141 20.3583 10.8614 20.5683 12.0014 20.5683C13.7814 20.5683 15.5114 20.0483 17.0914 19.0783C18.7014 18.0783 20.1514 16.6083 21.3214 14.7383C22.2714 13.2283 22.2214 10.6883 21.2714 9.17834Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                  <path
                    d="M14.0206 9.98062L9.98062 14.0206C9.47062 13.5006 9.14062 12.7806 9.14062 12.0006C9.14062 10.4306 10.4206 9.14062 12.0006 9.14062C12.7806 9.14062 13.5006 9.47062 14.0206 9.98062Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                  <path
                    d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                  <path
                    d="M14.8581 11.9981C14.8581 13.5681 13.5781 14.8581 11.9981 14.8581C11.9381 14.8581 11.8881 14.8581 11.8281 14.8381L14.8381 11.8281C14.8581 11.8881 14.8581 11.9381 14.8581 11.9981Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                  <path
                    d="M21.7689 2.22891C21.4689 1.92891 20.9789 1.92891 20.6789 2.22891L2.22891 20.6889C1.92891 20.9889 1.92891 21.4789 2.22891 21.7789C2.37891 21.9189 2.56891 21.9989 2.76891 21.9989C2.96891 21.9989 3.15891 21.9189 3.30891 21.7689L21.7689 3.30891C22.0789 3.00891 22.0789 2.52891 21.7689 2.22891Z"
                    fill="#FFFFFF"
                  ></path>{" "}
                </g>
              </svg>
            )}
          </span>
        </div>

        <button
          onClick={() => handleLogin(username, password)}
          type="button"
          className="bg-[#6741D9] w-full text-white px-4 py-2 rounded-md focus:border-[#F0C3F1] focus:border-[1px] active:border-[#F0C3F1] active:border-[1px] hover:border-[#F0C3F1] hover:border-[1px]"
          style={{ width: "600px" }}
        >
          {loading ? "Just a sec..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default LoginScreen;
