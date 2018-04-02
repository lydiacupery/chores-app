import { ApolloClient } from "apollo-client";
import {
  AddEventMutation,
  AddEventMutationVariables
} from "client/graphql-types";
import { gql } from "react-apollo";

const MUTATION = require("./AddEvent.graphql");

export function addEventMutation(
  apolloClient: ApolloClient,
  event: {
    personId: number;
    choreId: number;
    date: string;
    skip?: boolean;
  }
) {
  const { personId, choreId, date, skip } = event;
  return apolloClient.mutate<AddEventMutation>({
    mutation: MUTATION,

    variables: { personId, choreId, date, skip } as AddEventMutationVariables,
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
    ],
    optimisticResponse: {
      addEvent: {
        __typename: "Event",
        id: -1,
        name
      }
    } as AddEventMutation
  });
}
