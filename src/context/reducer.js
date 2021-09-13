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

import { AUTH_TOKEN, AUTH_USER, DEAL_PER_PAGE } from "../utils/constants";


export function reducer(state, {type, payload}) {

  switch (type) {

    // USER AUTHENTICATION
    case USER_LOGIN:
      const { token, username } = payload;
      localStorage.setItem(AUTH_TOKEN, token);
      localStorage.setItem(AUTH_USER, username);
      state = {
        ...state,
        isLogged: true,
        user: username,
        jwt: token,
        allDeals: [],
        variables: {
          storeId: 0,
          priceLower: null,
          priceHigher: null,
          orderBy: null,
          offset: 0,
          limit: DEAL_PER_PAGE
        }
      };
      break;

    case USER_LOGOUT:
      localStorage.clear();
      state = {
        ...state,
        isLogged: false,
        user: "",
        jwt: "",
        variables: {
          storeId: null,
          priceLower: null,
          priceHigher: null,
          orderBy: null,
          offset: 0,
          limit: 3
        }
      };
      break;

    // FILTER DEALS
    case SET_STORE_ID_FILTER:
      state = {
        ...state,
        defaultSelect: {
          ...state.defaultSelect,
          storeFilter: payload
        },
        variables: {
          ...state.variables,
          offset: 0,
          storeId: payload,
        }
      };
      break;

    case SET_PRICE_FILTER:
      state = {
        ...state,
        defaultSelect: {
          ...state.defaultSelect,
          priceFilter: payload.priceCode
        },
        variables: {
          ...state.variables,
          offset: 0,
          priceLower: payload.range.length === 1 ? null : payload.range[0],
          priceHigher: payload.range.length === 1 ? null : payload.range[1]
        }
      };
      break;

    // SORT DEALS
    case SET_DEALS_ORDER:
      state = {
        ...state,
        defaultSelect: {
          ...state.defaultSelect,
          orderBy: payload === "-last_change" ? null : payload
        },
        variables: {
          ...state.variables,
          offset: 0,
          orderBy: payload
        }
      };
      break;

    // DEALS PAGINATION
    case SET_OFFSET:
      state = {
        ...state,
        variables: {
          ...state.variables,
          offset: payload
        }
      }
      break;

    case SET_ALL_DEALS:
      state = {
        ...state,
        allDeals: payload
      }
      break;

    case SET_NO_MORE_DEALS:
      state = {
        ...state,
        noMoreDeals: payload
      }
      break;

    default:
      break;
  }
  return state;
}