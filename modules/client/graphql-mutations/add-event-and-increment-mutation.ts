import { ApolloClient } from "apollo-client";
import {
  AddEventAndIncrementMutationVariables,
  AddEventAndIncrementMutation
} from "client/graphql-types";
import { gql } from "react-apollo";

const MUTATION = require("./AddEventAndIncrement.graphql");

export function addEventAndIncrementMutation(
  apolloClient: ApolloClient,
  event: {
    personId: number;
    choreId: number;
    date: string;
    skip?: boolean;
  }
) {
  const { personId, choreId, date, skip } = event;
  return apolloClient.mutate<AddEventAndIncrementMutation>({
    mutation: MUTATION,

    variables: {
      personId,
      choreId,
      date,
      skip
    } as AddEventAndIncrementMutationVariables,
    refetchQueries: [
      {
        query: gql`
          query ChoreEvent($person: Int!, $chore: Int!) {
            choreEvents(person: $person, chore: $chore) {
              id
              date
              skip
              chore {
                id
                name
              }
              person {
                id
                firstName
                lastName
              }
            }
            whoseTurn(chore: $chore) {
              id
            }
          }
        `,
        variables: { person: personId, chore: choreId }
      }
    ]
  });
}
