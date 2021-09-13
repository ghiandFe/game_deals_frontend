import React from "react";
import { IconContext } from "react-icons";
import { BiError } from "react-icons/bi";
import { useHistory } from "react-router-dom";

import { Button } from ".";
import { useGlobalContext } from "../hooks";


function Error({ err=null }) {
  const history = useHistory();
  const { userLogout } = useGlobalContext();

  // If token has expired.
  // Deletes it from local storage then redirects to login page
  function logout() {
    userLogout();
    history.push("/login");
  }

  return (
    <div className="text-center mt-5 pt-5">
      <IconContext.Provider value={{ className: "danger-icon" }}>
        <div>
          <BiError />
        </div>
      </IconContext.Provider>
      <h4>Ops! Something gone wrong...</h4>
      <p>
        { err }
      </p>
      {
        // Check for "signature has expired" backend error
        err === "Signature has expired" ? (
          <Button text="Login again here" onClick={ logout } />
        ) : (
          <Button text="Go to Homepage" href="/" />
        )
      }
    </div>
  );
}


export default Error;