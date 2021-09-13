import React from "react";
import { Route, Switch } from 'react-router-dom';

import { Error, Navbar } from "./components";
import {
  AuthScreen,
  DealDetailScreen,
  HomeScreen,
  RedirectScreen
} from "./screens";


function App() {
  return (
    <div>

      <header>
        <Navbar />
      </header>

      <section className="container-fluid m-0 p-0">
        <Switch>
          <Route exact path="/" component={ HomeScreen } />
          <Route exact path="/login">
            <AuthScreen isLoginForm={true} />
          </Route>
          <Route exact path="/signup">
            <AuthScreen isLoginForm={false} />
          </Route>
          <Route exact path="/redirect" component={ RedirectScreen } />
          <Route exact path="/deal/:id" component={ DealDetailScreen } />
          <Route>
            <Error err="The page you are looking for does not exists" />
          </Route>
        </Switch>
      </section>

    </div>
  );
}


export default App;