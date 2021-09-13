import React from "react";
import { Grid } from "react-loading-icons";


// PROPS
// mt -> margin top (from 1 to 5)
// pt -> padding top (from 1 to 5)

function Loading({ mt=3, pt=3 }) {
  return (
    <div className={ `text-center mt-${mt} pt--${pt}` } >
      <Grid fill="#2A9D8F" width="50px"/>
    </div>
  );
}

export default Loading;