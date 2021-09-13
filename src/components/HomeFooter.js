import React from "react";

import { Button, Loading } from ".";
import { useGlobalContext } from "../hooks";
import { DEAL_PER_PAGE } from "../utils/constants";


function HomeFooter() {
  const {
    isLogged,
    variables,
    setOffset,
    allDeals,
    noMoreDeals,
    loading,
  } = useGlobalContext();


  return (
    <section className="text-center">
    {

      isLogged ?

      <div className="mb-5">
        {
          noMoreDeals ?
            <h4>
              No {allDeals.length === 0 ? "" : "more"} deals to show
            </h4> : (
            loading ? <Loading /> :
            <Button
              text="load more"
              isLarge={ true }
              onClick={ () => setOffset(variables.offset + DEAL_PER_PAGE) }
            />
          )
        }
      </div>

      :

      <React.Fragment>
        <h4 className="mt-5">
          Register or login to view, filter, and sort all offers!
        </h4>
        <div className="mt-4">
          <Button text="Register" href="/signup" isLarge={true} bgColor="danger" />
          <Button text="Login" href="/login" isLarge={true} />
        </div>
      </React.Fragment>

    }
    </section>
  );
}


export default HomeFooter;