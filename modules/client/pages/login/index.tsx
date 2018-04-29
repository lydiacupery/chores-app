import { ApolloClient } from "apollo-client";
import * as React from "react";
import { AddChoreContainer } from "client/containers/add-chore";
import { AddPersonContainer } from "client/containers/add-person";
import { LoginContainer } from "../../containers/login";

<script type="text/javascript" src="node_modules/auth0-js/build/auth0.js" />;

export interface ConnectedProps {
  readonly client: ApolloClient;
}

export class LoginPage extends React.Component {
  render() {
    return (
      <div className="flex-container">
        <LoginContainer />
      </div>
    );
  }
}
