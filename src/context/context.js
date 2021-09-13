import React, { createContext, useReducer } from "react";
import { useQuery } from "@apollo/client";

import {
  USER_LOGIN,
  USER_LOGOUT,
  SET_STORE_ID_FILTER,
  SET_PRICE_FILTER,
  SET_DEALS_ORDER,
  SET_ALL_DEALS,
  SET_OFFSET,
  SET_NO_MORE_DEALS
} from "./actions";

import { ALL_DEALS_QUERY } from "../graphql/queries";
import { reducer } from "./reducer";
import { AUTH_TOKEN, AUTH_USER, DEAL_PER_PAGE } from "../utils/constants";


const AppContext = createContext();


const stored_username = localStorage.getItem(AUTH_USER);
const stored_token = localStorage.getItem(AUTH_TOKEN);

const initialState = {
  isLogged: stored_token ? true : false,
  user: stored_token ? stored_username : "",
  jwt: stored_token ? stored_token : "",
  allDeals: [],
  noMoreDeals: false,
  defaultSelect: {
    storeFilter: null,
    priceFilter: null,
    orderBy: null
  },
  variables: {
    storeId: null,
    priceLower: null,
    priceHigher: null,
    orderBy: "-last_change",
    offset: 0,
    limit: DEAL_PER_PAGE
  }
}


function AppProvider({children}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { loading, error } = useQuery(ALL_DEALS_QUERY, {
    variables: state.variables,
    fetchPolicy: "network-only",
    onCompleted: ({deals}) => {
      let allDeals = deals;
      let noMoreDeals = false;
      if (state.variables.offset !== 0) {
        allDeals = [ ...state.allDeals, ...deals];
      }
      if (deals.length === 0 || deals.length < DEAL_PER_PAGE) {
        noMoreDeals = true;
      }
      dispatch({ type: SET_ALL_DEALS, payload: allDeals });
      dispatch({ type: SET_NO_MORE_DEALS, payload: noMoreDeals });
    }
  });


  // USER AUTHENTICATION
  function userLogin(token, username) {
    dispatch({
      type: USER_LOGIN,
      payload: { token: token, username: username }
    });
  }

  function userLogout() {
    dispatch({ type: USER_LOGOUT });
  }


  // FILTER DEALS
  function setStoreIdFilter(storeId) {
    if (storeId === "0") {
      storeId = null;
    }
    dispatch({ type: SET_STORE_ID_FILTER, payload: storeId });
  }

  function setPriceFilter(priceCode) {
    const range = priceCode.split(":").map((el) => {
      return parseInt(el);
    });
    dispatch({
      type: SET_PRICE_FILTER,
      payload: { range: range, priceCode: priceCode }
    });
  }


  // SORT DEALS
  function setDealsOrder(order) {
    if (order === "0") {
      order = "-last_change";
    }
    dispatch({ type: SET_DEALS_ORDER, payload: order });
  }


  // DEALS PAGINATION
  function setOffset(offset) {
    dispatch({ type: SET_OFFSET, payload: offset });
  }


  return (
    <AppContext.Provider
      value={{
        ...state,
        error,
        loading,
        userLogin,
        userLogout,
        setStoreIdFilter,
        setPriceFilter,
        setDealsOrder,
        setOffset
      }}
    >
      {children}
    </AppContext.Provider>
  );
}


export { AppProvider, AppContext };