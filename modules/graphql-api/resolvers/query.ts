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
        chore: chore
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
    const jobs = await context.ChoreEventRepository.all();
    var relevantChores = jobs.filter(j => j.choreId == args.chore);
    if (
      jobs.length < 0 ||
      relevantChores.length < 1 ||
      relevantChores == null
    ) {
      var nextPersonId = await context.PersonOrderRepository.forOrder.load(0);
      var nextPerson = await context.PersonRepository.findById.load(
        nextPersonId[0].personId as number
      );
      return nextPerson as MinimalPerson;
    }
    var mostRecentChore = relevantChores.reduce(function(a, b) {
      return a > b ? a : b;
    });
    var mostRecentPersonId = mostRecentChore.personId;
    if (mostRecentPersonId != null) {
      const mostRecentPerson = await context.PersonRepository.findById.load(
        mostRecentPersonId
      );
      var personOrder;
      if (mostRecentPersonId != null) {
        personOrder = await context.PersonOrderRepository.forPerson.load(
          mostRecentPersonId as number
        );
      }

      var personOrderEntries = await context.PersonOrderRepository.all();
      var personOrderEntriesLength = personOrderEntries.length;

      var order = 0;
      if (personOrder != null && personOrder.length > 0) {
        order = (personOrder[0].order + 1) % personOrderEntriesLength;
      }
      //get person for person order
      // tslint:disable-next-line:no-multi-spaces
      var nextPersonId = await context.PersonOrderRepository.forOrder.load(
        order
      );
      var nextPerson = await context.PersonRepository.findById.load(
        nextPersonId[0].personId as number
      );
      return nextPerson as MinimalPerson;
    } else {
      return null;
    }
  }
};
