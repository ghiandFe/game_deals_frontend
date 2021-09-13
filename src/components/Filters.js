import React from "react";

import { FormSelect } from ".";
import { useGlobalContext } from "../hooks";


function Filters() {
  const {
    setDealsOrder,
    setPriceFilter,
    setStoreIdFilter,
    defaultSelect
  } = useGlobalContext();

  return (
    <section className="row justify-content-evenly my-4 px-5">

      <div className="col-lg-3 col-md-4 col-sm-12">
        <FormSelect 
          name="storeFilter"
          label="Store"
          options={{
            0: "Any",
            1: "Steam",
            7: "GOG",
            11: "Humble Store"
          }}
          onChange={ (e) => setStoreIdFilter(e.target.value) }
          defaultValue={ defaultSelect.storeFilter }
        />
      </div>

      <div className="col-lg-3 col-md-4 col-sm-12">
        <FormSelect 
          name="priceFilter"
          label="Price"
          options={{
            0: "Any",
            ":5": "less than 5$",
            "5:10": "from 5$ to 10$",
            "10:20": "from 10$ to 20$",
            "20:": "more than 20$"
          }}
          onChange={ (e) => setPriceFilter(e.target.value) }
          defaultValue={ defaultSelect.priceFilter }
        />
      </div>

      <div className="col-lg-3 col-md-4 col-sm-12">
        <FormSelect 
          name="orderBy"
          label="Sort"
          options={{
            0: "Default",
            "sale_price": "Price: Low to High",
            "-savings": "Savings",
            "-deal_rating": "Deal Rating"
          }}
          onChange={ (e) => setDealsOrder(e.target.value) }
          defaultValue={ defaultSelect.orderBy }
        />
      </div>

    </section>
  );
}


export default Filters;