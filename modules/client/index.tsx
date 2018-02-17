import * as React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route } from "react-router-dom";

import { History } from "history";
import { App } from "client/components/app";
import { ChoreSchedulePage } from "client/pages/chore-schedule";
import { Switch } from "react-router";
import { AddChorePersonPage } from "client/pages/add-chore-person";

export default function Root(props: { history: History }) {
  return (
    <ConnectedRouter history={props.history}>
      <App>
        <Switch>
          <Route exact path="/add-snack" component={AddChorePersonPage} />
          <Route exact path="/chore-schedule" component={ChoreSchedulePage} />
        </Switch>
      </App>
    </ConnectedRouter>
  );
}
