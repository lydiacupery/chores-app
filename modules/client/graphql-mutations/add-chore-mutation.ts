import { ApolloClient } from "apollo-client";
import {
  AddChoreMutation,
  AddChoreMutationVariables
} from "client/graphql-types";

const MUTATION = require("./AddChore.graphql");

export function addChoreMutation(
  apolloClient: ApolloClient,
  chore: { name: string }
) {
  /*
  const name = chore.name;
  return apolloClient.mutate<AddChoreMutation>({
    mutation: MUTATION,

    variables: { name } as AddChoreMutationVariables,

    optimisticResponse: {
      addChore: {
        __typename: "Chore",
        id: -1,
        name
      }
    } as AddChoreMutation
  });
  */
  //add a different type of mutation
}
