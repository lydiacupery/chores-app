import { ApolloClient } from "react-apollo";

import { GraphQLSchema } from "graphql";

const { createLocalInterface } = require("apollo-local-query");

import * as graphql from "graphql";

import * as db from "../db";

import { executableSchema } from "./index";
import { SnackRepository } from "records/snack-record";
import { VoteRepository } from "records/vote-record";
import { ChoreRepository } from "records/chore-record";
import { PersonRepository } from "records/person-record";
import { ChoreEventRepository } from "records/chore-event-record";
import { PersonOrderRepository } from "records/person-order-record";
import { CurrentTurnRepository } from "records/current-turn-record";
import { UserRepository } from "records/user-record";

export function buildLocalApollo(schema: GraphQLSchema = executableSchema) {
  return new Context().apolloClient;
}

/** The graphql context type for this app.  */
export class Context {
  constructor(schema: GraphQLSchema = executableSchema) {
    this.apolloClient = new ApolloClient({
      ssrMode: true,
      networkInterface: createLocalInterface(graphql, schema, {
        context: this
      })
    });
  }

  // Add global request context, such as
  // repositories and dataloaders here.
  // someRepo = new SomeRepository()

  /** An ApolloClient which can be used for local graphql queries. Does not hit the network. */
  apolloClient: ApolloClient;

  // TODO: Perhaps compose this in?
  pg = db.getConnection();
  snackRepository = new SnackRepository(this.pg);
  voteRepository = new VoteRepository(this.pg);
  choreRepository = new ChoreRepository(this.pg);
  PersonRepository = new PersonRepository(this.pg);
  ChoreEventRepository = new ChoreEventRepository(this.pg);
  PersonOrderRepository = new PersonOrderRepository(this.pg);
  CurrentTurnRepository = new CurrentTurnRepository(this.pg);
  UsersRepository = new UserRepository(this.pg);
}

/** Builds a new empty context for a request. */
export function buildContext(
  schema: GraphQLSchema = executableSchema
): Context {
  return new Context(schema);
}
