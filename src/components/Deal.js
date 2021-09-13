import React from "react";

import { DEAL_CARD_TITLE_MAX_CHARS, STORE_COLOR } from "../utils/constants";


function Deal(props) {

  // All props required except headerImg
  const {
    storeId, title,
    imgUrl, headerImg,
    salePrice, normalPrice
  } = props;

  // Different color for each store
  const color = STORE_COLOR[storeId];

  return (
    <div className="card text-center">

      <div className={ `card-img-container p-3 bg-${color}` }>
        <img
          src={ headerImg ? headerImg : imgUrl }
          className="card-img-top"
          // Slice the title after 120 chars
          alt={ title.slice(0, 120) }
        />
      </div>

      <div className="card-body">
        <h4 className={ `upper text-${color}` }>
          {
            // Slices the title after the chosen chars number
            // See "utils/constants.js"
            title.length > DEAL_CARD_TITLE_MAX_CHARS ?
            `${title.slice(0, DEAL_CARD_TITLE_MAX_CHARS)}...` :
            title
          }
        </h4>
        <h1 className="price text-primary">{ salePrice } $</h1>
      </div>

      <div className={ `card-footer border-${color}` }>
        <p className={ `card-text text-${color}` }>
          Instead of <span>{ normalPrice }$</span>
        </p>
      </div>

    </div>
  );
}


export default Deal;