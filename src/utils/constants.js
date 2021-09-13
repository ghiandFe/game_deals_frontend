
// FORM - FRONT-END VALIDATION
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const SIGNUP_SCHEMA = Yup.object().shape({
  password: Yup.string().password(),
  password2: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'passwords must match'
  ),
  username: Yup.string().required("required")
    .min(4, "username must be at least 4 characters")
});

export const LOGIN_SCHEMA = Yup.object().shape({
  password: Yup.string().required("password required"),
  username: Yup.string().required("username required"),
});


// FORM - INITIAL STATES
export const INITIAL_USER_STATE = {
  username: "",
  password: "",
  password2: ""
};

export const INITIAL_AUTH_ERROR_STATE = {
  username: null,
  password: null,
  login: null,
  signup: null
};


// USER AUTHENTICATION
export const AUTH_TOKEN = "auth";
export const AUTH_USER = "auth-user";


// DEALS PAGINATION
export const DEAL_PER_PAGE = 8;


// DOCUMENT TITLE
export const MAIN_TITLE = "GAME DEALS";


// DEAL CARD and DETAIL COLOR
export const STORE_COLOR = {
  1: "success",
  7: "warning",
  11: "danger"
};


// INITIAL DEAL STATE for DEAL DETAIL SCREEN
export const INITIAL_DEAL_STATE = {
  id: "",
  title: "",
  salePrice: 0,
  normalPrice: 0,
  savings: 0,
  dealRating: 0,
  ratingText: "",
  releaseDate: 0,
  imgUrl: "",
  headerImg: "",
  store: {
    id: 0,
    name: ""
  }
};


// MISC
export const DEAL_CARD_TITLE_MAX_CHARS = 40;