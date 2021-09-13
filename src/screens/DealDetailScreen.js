import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";

import { Button, Error, Loading } from "../components";
import { DEAL_DETAIL_QUERY } from "../graphql/queries";
import { useTitle } from "../hooks";
import { INITIAL_DEAL_STATE, STORE_COLOR } from "../utils/constants";


function DealDetailScreen() {
  const { id } = useParams();
  const history = useHistory();

  const [deal, setDeal] = useState(INITIAL_DEAL_STATE);
  const [error, setError] = useState(null);

  useTitle(deal.title);

  const { loading } = useQuery(DEAL_DETAIL_QUERY, {
    variables: {
      dealId: id
    },
    onCompleted: (data) => {
      setDeal(data.deal);
    },
    onError: (error) => {
      setError(error);
    }
  });

  const color = STORE_COLOR[deal.store.id];

  function formatDate(timestamp) {
    if (timestamp !== 0) {
      const date = new Date(timestamp*1000);
      return new Intl.DateTimeFormat(
        'en-US',
        { month: 'long', year: 'numeric' }
      ).format(date);
    }
    return "-";
  }

  if (loading) return <Loading mt="5" pt="5" />
  if (error) return <Error err={ error.message } />

  return (
    <div className="">
      <header className="row justify-content-center text-center mb-5">

        <div className={`bg-${color} p-4 col-12 mb-3 shadow`}>
          <img
          className="shadow detail-img"
            src={
              deal.headerImg ?
              deal.headerImg :
              deal.imgUrl
            }
            alt={ deal.title }
          />
        </div>

        <h1 className={ `upper text-${color}` } >
          { deal.title }
        </h1>
        <h2>on {deal.store.name}</h2>

        <h1 className="mt-3 price">{deal.salePrice} $</h1>
        <h5>instead of {deal.normalPrice}$ (-{deal.savings}%)</h5>

      </header>

      <section className="row justify-content-center">
        <div className={`deal-detail-${color} col-lg-4 col-md-6 col-sm-12`}>
          <h3>Deal rating: { deal.dealRating ? deal.dealRating : "-" }</h3>
          <h3>Game rating: { deal.ratingText ? deal.ratingText : "-" }</h3>
          <h3>Released: { formatDate(deal.releaseDate) }</h3>
        </div>
      </section>

      <div className="text-center mt-3">
        <Button
          text="Back to list"
          bgColor="warning"
          onClick={ () => {
            history.length > 1 ?
            history.goBack() :
            history.push("/")
          }}
        />
        <Button
          text="Go to the store page"
          href={ `https://www.cheapshark.com/redirect?dealID=${id}` }
        />
      </div>
    </div>
  );
}


export default DealDetailScreen;