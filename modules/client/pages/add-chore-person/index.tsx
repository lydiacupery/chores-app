import { ApolloClient } from "apollo-client";
import * as React from "react";
import { AddChoreContainer } from "client/containers/add-chore";
import { AddPersonContainer } from "client/containers/add-person";

require("./styles.scss");

export interface ConnectedProps {
  readonly client: ApolloClient;
}

export class AddChorePersonPage extends React.Component {
  render() {
    return (
      <div className="flex-container">
        <AddChoreContainer />
        <AddPersonContainer />
      </div>
    );
  }
}
