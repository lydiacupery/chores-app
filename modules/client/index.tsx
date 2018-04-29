import * as React from "react";
import { Route, Router } from "react-router-dom";

import { History } from "history";
import { App } from "client/components/app";
import { ChoreSchedulePage } from "client/pages/chore-schedule";
import { Switch } from "react-router";
import { AddChorePersonPage } from "client/pages/add-chore-person";
import { LoginPage } from "./pages/login";
import Auth from "client/Auth/Auth";

const auth = new Auth();

const handleAuthentication = (nextState: any) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export default function Root(props: { history: History }) {
  return (
    /*
    <ConnectedRouter history={props.history}>
      <App auth={auth}>
        <Switch>
          <Route exact path="/" component={LoginPage} auth={auth} />
          <Route exact path="/login" component={LoginPage} auth={auth} />
          <Route exact path="/add-snack" component={AddChorePersonPage} />
          <Route exact path="/chore-schedule" component={ChoreSchedulePage} />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <ChoreSchedulePage {...props} />;
            }}
          />
        </Switch>
      </App>
    </ConnectedRouter>
    */
    <Router history={props.history}>
      <div>
        <Route
          exact
          path="/"
          render={props => <App auth={auth} {...props} />}
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <App auth={auth} {...props} />;
          }}
        />
        <Route
          exact
          path="/login"
          render={props => <App auth={auth} children={<LoginPage />} />}
        />
        <Route
          exact
          path="/add-snack"
          render={props => (
            <App auth={auth} children={<AddChorePersonPage />} />
          )}
        />
        <Route
          exact
          path="/chore-schedule"
          render={props => <App auth={auth} children={<ChoreSchedulePage />} />}
        />
      </div>
    </Router>
  );
}
