import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

function DashboardScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  function logoutHandler() {
    ctxDispatch({ type: "ADMIN_SIGNOUT" });
    localStorage.removeItem("adminInfo");
    navigate("/");
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <main>
        <h1>Social, Hebbal on Dhun Jam</h1>
        <section className="configs">
          <div>
            <p>Do you want to charge your customers for requesting songs?</p>
            <div>
              <input type="radio" id="yes" name="charge" defaultChecked />
              <label htmlFor="yes">Yes</label>
              <input type="radio" id="no" name="charge" />
              <label htmlFor="no">No</label>
            </div>
          </div>
          <div>
            <p>Custom song request amount</p>
            {/* <input type="number" value={customSongRequestAmount} required={charge}/> */}
          </div>
          <div>
            <p>Regular song request amounts, from high to low</p>
          </div>
        </section>
      </main>

      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
}

export default DashboardScreen;
