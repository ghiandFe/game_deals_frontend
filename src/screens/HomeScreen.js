import React from "react";

import { Deals, Error, Filters, HomeFooter } from "../components";
import { useGlobalContext, useTitle } from "../hooks";


function HomeScreen() {
  const { isLogged, error } = useGlobalContext();

  useTitle( isLogged ? "Dashboard" : "Home" );

  if (error) return <Error err={ error.message } />

  return (
    <div className={`container${ !isLogged ? " mt-5 pt-3" : "" }`}>

      {
        !isLogged ? "" :
        <Filters />
      }

      <section
        className={`row justify-content-evenly${ isLogged ? "" : " px-5"}`}
      >
        <Deals />
      </section>

      <HomeFooter />

    </div>
  );
}


export default HomeScreen;