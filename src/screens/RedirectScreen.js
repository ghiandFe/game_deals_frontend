import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { ThreeDots } from "react-loading-icons";
import { useHistory } from "react-router-dom";

import { useGlobalContext, useTitle } from "../hooks";


function RedirectScreen() {
  const history = useHistory();
  const { isLogged } = useGlobalContext();

  useTitle(isLogged ? "Login..." : "Logout...");

  useEffect(() => {
    setTimeout(() => {
      history.push("/")
    }, 1500);
  });

  return (
    <div className="container text-center my-5">

      <IconContext.Provider value={{ className: "logout-icon" }}>
        <div>
          { isLogged? <BiLogInCircle /> : <BiLogOutCircle /> }
        </div>
      </IconContext.Provider>

      <h4 className="mt-4">Logged { isLogged? "In" : "Out" }</h4>
      <h6 className="mb-5">
        In a few seconds you will be redirected to the { isLogged ? "" : "public" } home page
      </h6>
      <ThreeDots fill="#2A9D8F" width="50px" />

    </div>
  );
}


export default RedirectScreen;