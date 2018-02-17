import { Context } from "graphql-api";
import {
  AddChoreMutationArgs,
  AddPersonMutationArgs
} from "graphql-api/schema-types";
import { MinimalChore } from "graphql-api/resolvers/chore";
import { MinimalPerson } from "graphql-api/resolvers/person";

export const MutationResolvers = {
  async addChore(
    obj: {},
    args: AddChoreMutationArgs,
    context: Context
  ): Promise<MinimalChore | null> {
    try {
      return await context.choreRepository.insert(args);
    } catch (e) {
      const dupe = await context.choreRepository.byName.load(args.name);
      return dupe || null;
    }
  },
  async addPerson(
    obj: {},
    args: AddPersonMutationArgs,
    context: Context
  ): Promise<MinimalPerson | null> {
    try {
      return await context.PersonRepository.insert(args);
    } catch (e) {
      return null;
    }
  }
};
