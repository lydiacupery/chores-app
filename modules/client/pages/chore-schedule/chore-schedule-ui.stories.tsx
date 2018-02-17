import { storiesOf } from "@storybook/react";
import { SnackReportUI } from "./chore-schedule-ui";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { graphqlClient } from "client/graphql-client";

storiesOf("Page – ChoreSchedule", module)
  .add("No rows", () => <SnackReportUI choreRows={[]} peopleRows={[]} />)
  .add("Chores with no people", () => (
    <SnackReportUI
      choreRows={[
        { name: "sweep", id: 1 },
        { name: "dust", id: 2 },
        { name: "clean bathroom", id: 3 }
      ]}
      peopleRows={[]}
    />
  ))
  .add("People with no chores", () => (
    <SnackReportUI
      choreRows={[]}
      peopleRows={[
        { firstName: "Lydia", lastName: "Cupery", id: 1 },
        { firstName: "Hannah", lastName: "Cupery", id: 2 },
        { firstName: "Maria", lastName: "Cupery", id: 3 },
        { firstName: "Daniel", lastName: "Cupery", id: 4 }
      ]}
    />
  ))
  .add("People with one chore", () => (
    <ApolloProvider client={graphqlClient}>
      <SnackReportUI
        choreRows={[{ name: "sweep", id: 1 }]}
        peopleRows={[
          { firstName: "Lydia", lastName: "Cupery", id: 1 },
          { firstName: "Hannah", lastName: "Cupery", id: 2 },
          { firstName: "Maria", lastName: "Cupery", id: 3 },
          { firstName: "Daniel", lastName: "Cupery", id: 4 }
        ]}
      />
    </ApolloProvider>
  ))
  .add("People with many chores", () => (
    <ApolloProvider client={graphqlClient}>
      <SnackReportUI
        choreRows={[
          { name: "sweep", id: 1 },
          { name: "dust", id: 2 },
          { name: "clean bathroom", id: 3 }
        ]}
        peopleRows={[
          { firstName: "Lydia", lastName: "Cupery", id: 1 },
          { firstName: "Hannah", lastName: "Cupery", id: 2 },
          { firstName: "Maria", lastName: "Cupery", id: 3 },
          { firstName: "Daniel", lastName: "Cupery", id: 4 }
        ]}
      />
    </ApolloProvider>
  ));
