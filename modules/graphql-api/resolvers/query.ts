import { Context } from "graphql-api";
import { MinimalSnack } from "graphql-api/resolvers/snack";
import sortBy from "lodash-es/sortBy";
import { MinimalChore } from "graphql-api/resolvers/chore";
import { MinimalPerson } from "graphql-api/resolvers/person";
import {
  PersonByIdQueryArgs,
  ChoreEventsQueryArgs,
  WhoseTurnQueryArgs
} from "graphql-api/schema-types";
import { MinimalChoreEvent } from "graphql-api/resolvers/chore-event";

export const QueryResolvers = {
  async allSnacks(
    query: {},
    args: {},
    context: Context
  ): Promise<MinimalSnack[]> {
    const snacks = await context.snackRepository.all();
    return sortBy(snacks, "name");
  },
  async allChores(
    query: {},
    args: {},
    context: Context
  ): Promise<MinimalChore[]> {
    const chores = await context.choreRepository.all();
    return sortBy(chores, "name");
  },
  async allPeople(
    query: {},
    args: {},
    context: Context
  ): Promise<MinimalPerson[]> {
    const people = await context.PersonRepository.all();
    return sortBy(people, "id");
  },
  async choreEvents(
    query: {},
    args: ChoreEventsQueryArgs,
    context: Context
  ): Promise<MinimalChoreEvent[]> {
    const jobs = await context.ChoreEventRepository.all();
    const person = await context.PersonRepository.findById.load(args.person);
    const chore = await context.choreRepository.findById.load(args.chore);
    var filtered = jobs.filter(
      j => j.choreId == args.chore && j.personId == args.person
    );
    var mapped = filtered.map(e => {
      return {
        id: e.id,
        date: e.date,
        person: person,
        chore: chore,
        skip: e.skip
      };
    });
    return mapped;
  },
  async personById(
    query: {},
    args: PersonByIdQueryArgs,
    context: Context
  ): Promise<MinimalPerson | null> {
    const person = await context.PersonRepository.findById.load(args.id);
    if (person != undefined) {
      return person as MinimalPerson;
    } else {
      return null;
    }
  },
  async whoseTurn(
    query: {},
    args: WhoseTurnQueryArgs,
    context: Context
  ): Promise<MinimalPerson | null> {
    //from chore id get back person
    const jobs = await context.CurrentTurnRepository.all();
    var personForChore = jobs.filter(j => j.choreId == args.chore);

    if (personForChore[0] != null) {
      var nextPerson = await context.PersonRepository.findById.load(
        personForChore[0].personId as number
      );
      return nextPerson as MinimalPerson;
    } else {
      return null;
    }
  }
};
