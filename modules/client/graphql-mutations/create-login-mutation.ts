import { ApolloClient } from "apollo-client";
import {
  AddChoreMutation,
  AddChoreMutationVariables,
  CreateLoginMutation,
  CreateLoginMutationVariables
} from "client/graphql-types";

const MUTATION = require("./CreateLogin.graphql");

export function createLoginMutation(
  apolloClient: ApolloClient,
  login: { username: string; password: string }
) {
  return apolloClient.mutate<CreateLoginMutation>({
    mutation: MUTATION,

    variables: {
      username: login.username,
      password: login.password
    } as CreateLoginMutationVariables
  });
}
