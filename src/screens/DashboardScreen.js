import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import BarChart from "../UI/BarChart";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_CAT7":
      return { ...state, category7: action.payload };
    case "UPDATE_CAT8":
      return { ...state, category8: action.payload };
    case "UPDATE_CAT9":
      return { ...state, category9: action.payload };
    case "UPDATE_CAT10":
      return { ...state, category10: action.payload };
    default:
      return state;
  }
};

function DashboardScreen(data) {
  const navigate = useNavigate();

  const {
    amount = {},
    charge_customers = false,
    name = "",
    location = "",
    id = "",
  } = data.data || {};
  const [chargeCustomers, setChargeCustomers] = useState(charge_customers);
  const [customSongRequestAmount, setCustomSongRequestAmount] = useState(
    amount["category_6"] || 0
  );

  const [{ category7, category8, category9, category10 }, dispatch] =
    useReducer(reducer, {
      category7: amount["category_7"] || 0,
      category8: amount["category_8"] || 0,
      category9: amount["category_9"] || 0,
      category10: amount["category_10"] || 0,
    });

  const { state, dispatch: ctxDispatch } = useContext(Store);

  useEffect(() => {
    const { amount = {}, charge_customers = false } = data.data || {};
    setChargeCustomers(charge_customers);
    setCustomSongRequestAmount(amount["category_6"] || 0);
  }, [data.data]);

  const minValueCat6 = 99;
  const minValueCat7 = 79;
  const minValueCat8 = 59;
  const minValueCat9 = 39;
  const minValueCat10 = 19;

  const categoryData = {
    Custom: customSongRequestAmount,
    Category1: category7,
    Category2: category8,
    Category3: category9,
    Category4: category10,
  };

  function logoutHandler() {
    ctxDispatch({ type: "ADMIN_SIGNOUT" });
    localStorage.removeItem("adminInfo");
    navigate("/");
  }
  function checkedChangeHandler(value) {
    if (value !== chargeCustomers) {
      setChargeCustomers(value);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <main className="text-white flex flex-col space-y-6 items-center mx-48 my-10">
        <h1 className="text-center">
          {name}, {location} on Dhun Jam
        </h1>
        <section className="configs  flex flex-col items-start justify-center space-y-4">
          <div className="flex justify-between w-full">
            <p className="w-[40%]">
              Do you want to charge your customers for requesting songs?
            </p>
            <div className="w-1/2 flex items-center justify-center space-x-2">
              <input
                className="checked:accent-[#6741D9] checked:border-transparent "
                type="radio"
                id="yes"
                name="charge"
                checked={chargeCustomers === true}
                onChange={() => checkedChangeHandler(true)}
              />
              <label htmlFor="yes">Yes</label>
              <input
                className="checked:accent-[#6741D9] checked:border-transparent "
                type="radio"
                id="no"
                name="charge"
                checked={chargeCustomers === false}
                onChange={() => checkedChangeHandler(false)}
              />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div className="flex  justify-between w-full">
            <p className="w-1/2">Custom song request amount</p>
            <input
              className={`" w-1/2 text-center bg-black outline-none rounded-md border border-white " ${
                customSongRequestAmount < 99 || !chargeCustomers
                  ? "text-[#C2C2C2] border-[#C2C2C2]"
                  : "text-white border-white"
              }`}
              min={minValueCat6}
              type="number"
              value={customSongRequestAmount}
              required={chargeCustomers}
              onChange={(e) => setCustomSongRequestAmount(e.target.value)}
              disabled={!chargeCustomers}
            />
          </div>
          <div className="flex justify-between">
            <p className="w-[40%]">
              Regular song request amounts, from high to low
            </p>
            <div className=" w-1/2 flex justify-between items-center space-x-2">
              <input
                className={`bg-black outline-none rounded-md border w-16 h-8 text-center  ${
                  !chargeCustomers
                    ? "text-[#C2C2C2] border-[#C2C2C2]"
                    : "text-white border-white"
                }`}
                min={minValueCat7}
                type="number"
                value={category7}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CAT7", payload: e.target.value })
                }
                disabled={!chargeCustomers}
              />
              <input
                className={`bg-black outline-none rounded-md border w-16 h-8 text-center  ${
                  !chargeCustomers
                    ? "text-[#C2C2C2] border-[#C2C2C2]"
                    : "text-white border-white"
                }`}
                min={minValueCat8}
                type="number"
                value={category8}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CAT8", payload: e.target.value })
                }
                disabled={!chargeCustomers}
              />
              <input
                className={`bg-black outline-none rounded-md border w-16 h-8 text-center  ${
                  !chargeCustomers
                    ? "text-[#C2C2C2] border-[#C2C2C2]"
                    : "text-white border-white"
                }`}
                min={minValueCat9}
                type="number"
                value={category9}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CAT9", payload: e.target.value })
                }
                disabled={!chargeCustomers}
              />
              <input
                className={`bg-black outline-none rounded-md border w-16 h-8 text-center  ${
                  !chargeCustomers
                    ? "text-[#C2C2C2] border-[#C2C2C2]"
                    : "text-white border-white"
                }`}
                min={minValueCat10}
                type="number"
                value={category10}
                onChange={(e) =>
                  dispatch({ type: "UPDATE_CAT10", payload: e.target.value })
                }
                disabled={!chargeCustomers}
              />
            </div>
          </div>
          {chargeCustomers && <BarChart data={categoryData} />}
        </section>
        <button
          className={`w-full text-white px-4 py-2 rounded-md focus:border-[#F0C3F1] focus:border-[1px] active:border-[#F0C3F1] active:border-[1px] hover:border-[#F0C3F1] hover:border-[1px] ${
            customSongRequestAmount < 99 ||
            !chargeCustomers ||
            category7 <= minValueCat7 ||
            category8 <= minValueCat8 ||
            category9 <= minValueCat9 ||
            category10 <= minValueCat10
              ? "bg-gray-500 text-[#C2C2C2]"
              : "bg-[#6741D9]"
          }`}
          style={{ width: "600px" }}
          disabled={
            customSongRequestAmount < 99 ||
            !chargeCustomers ||
            category7 <= minValueCat7 ||
            category8 <= minValueCat8 ||
            category9 <= minValueCat9 ||
            category10 <= minValueCat10
          }
        >
          Save
        </button>
      </main>
    </div>
  );
}

export default DashboardScreen;
