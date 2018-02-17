import { QueryResolvers } from "./query";
import { SnackResolvers } from "graphql-api/resolvers/snack";
import { MutationResolvers } from "graphql-api/resolvers/mutation";
import { VoteResolvers } from "graphql-api/resolvers/vote";
import { ChoreResolvers } from "graphql-api/resolvers/chore";
import { PersonResolvers } from "graphql-api/resolvers/person";

export default {
  Mutation: MutationResolvers,
  Query: QueryResolvers,
  Snack: SnackResolvers,
  Chore: ChoreResolvers,
  Vote: VoteResolvers,
  Person: PersonResolvers
};
