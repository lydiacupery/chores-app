import { ApolloClient } from "apollo-client";
import { AddPersonMutationArgs } from "graphql-api/schema-types";
import {
  AddPersonMutation,
  AddPersonMutationVariables
} from "client/graphql-types";

const MUTATION = require("./AddPerson.graphql");

export function addPersonMutation(
  apolloClient: ApolloClient,
  person: { firstName: string | null; lastName: string | null }
) {
  const firstName = person.firstName;
  const lastName = person.lastName;
  return apolloClient.mutate<AddPersonMutationArgs>({
    mutation: MUTATION,

    variables: { firstName, lastName } as AddPersonMutationVariables,

    optimisticResponse: {
      addPerson: {
        __typename: "Person",
        id: -1,
        firstName,
        lastName
      }
    } as AddPersonMutation
  });
}
