import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';

import "./styles/index.scss";
import "./styles/index.css";

import reportWebVitals from "./reportWebVitals";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import { AppProvider } from "./context/context";
import { AUTH_TOKEN } from "./utils/constants";


const httpLink = createHttpLink({
  // Switch before deploy
  uri: "http://127.0.0.1:8000/graphql/"
  // uri: "https://game-deals-demo-project.herokuapp.com/graphql/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? `GDjwt ${token}` : ""
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={ client }>
      <AppProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();