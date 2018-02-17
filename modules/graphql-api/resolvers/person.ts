import { Person } from "graphql-api/schema-types";
import { Context } from "graphql-api";

/** The graphql schema-compatible typescript type required to implement any snack resolver */
export interface MinimalPerson {
  id: Person["id"];
}

export const PersonResolvers = {
  async firstName(
    person: MinimalPerson,
    args: {},
    context: Context
  ): Promise<string | null> {
    if ((person as any).firstName) return (person as any).firstName;
    const record = await context.PersonRepository.byId.load(person.id);
    //todo: probably a better way to do this
    if (record != null) {
      return record.firstName;
    } else {
      return null;
    }
  },
  async lastName(
    person: MinimalPerson,
    args: {},
    context: Context
  ): Promise<string | null> {
    if ((person as any).lastName) return (person as any).lastName;
    const record = await context.PersonRepository.byId.load(person.id);
    //todo: probably a better way to do this
    if (record != null) {
      return record.lastName;
    } else {
      return null;
    }
  },
  async completedChores(person: MinimalPerson, args: {}, context: Context) {
    var choreEvents = await context.ChoreEventRepository.forPerson.load(
      person.id
    );
    return choreEvents;
  }
};
