import React from "react";
import { Link } from "react-router-dom";

import { Deal } from ".";
import { useGlobalContext } from "../hooks";


function Deals() {
  const { allDeals, isLogged } = useGlobalContext();

  return (
    allDeals.map((deal) => {
      if (deal) {
        return (
          <div key={ deal.id } className="col-lg-3 col-md-6 col-sm-12 mb-5">
            {
              // If user is authenticated can click on deal card
              isLogged ?
              <Link to={ `/deal/${deal.id}` }>
                <Deal {...deal} storeId={ deal.store.id } />
              </Link> :
              <Deal {...deal} storeId={ deal.store.id } />
            }
          </div>
        );
      } else {
        return "";
      }
    })
  );
}


export default Deals;