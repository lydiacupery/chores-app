import { Context } from "graphql-api";
import {
  AddChoreMutationArgs,
  AddPersonMutationArgs,
  AddEventMutationArgs,
  IncrementTurnAfterEventMutationArgs
} from "graphql-api/schema-types";
import { MinimalChore } from "graphql-api/resolvers/chore";
import { MinimalPerson } from "graphql-api/resolvers/person";
import { MinimalChoreEvent } from "./chore-event";
import { SavedPersonOrder } from "records/person-order-record";

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
  },
  async addEvent(
    obj: {},
    args: AddEventMutationArgs,
    context: Context
  ): Promise<MinimalChoreEvent | null> {
    try {
      return await context.ChoreEventRepository.insert(args);
    } catch (e) {
      return null;
    }
  },
  async incrementTurnAfterEvent(
    obj: {},
    args: IncrementTurnAfterEventMutationArgs,
    context: Context
  ): Promise<MinimalPerson | null> {
    const turnEntry = await context.CurrentTurnRepository.forChore.load(
      args.choreId
    );
    console.log("deleting", turnEntry);
    //if there is an existing entry for that chore, delete it
    if (turnEntry[0] != null) {
      await context.CurrentTurnRepository.delete(turnEntry[0].id);
    }

    //get the next person in the order
    //get current person from person order table
    const currentPerson = await context.PersonOrderRepository.findById.load(
      args.personId
    );
    //get the length of the person order repo
    if (currentPerson == undefined) {
      return null;
    }
    const nextPerson: SavedPersonOrder = await getNextPersonFromCurrentPerson(
      context,
      currentPerson
    );

    if (nextPerson == null || nextPerson == undefined) {
      return null;
    }

    //CHECK FOR SKIPS
    //set next person to be the person returned from here

    const nextPersonAdjustedForSkips = await checkForSkipsAndIncrement(
      args.choreId,
      nextPerson,
      context
    );

    console.log("next person id", nextPersonAdjustedForSkips.personId);

    //add an entry to the current turn repository with the next person and the chore
    const nextTurn = {
      personId: nextPersonAdjustedForSkips.personId,
      choreId: args.choreId
    };

    console.log("unsaved current turn", nextTurn);
    await context.CurrentTurnRepository.insert(nextTurn);

    //need to delete skips and increment person until find a person without skips

    return nextPerson;
  }
};
async function checkForSkipsAndIncrement(
  choreId: number,
  person: SavedPersonOrder,
  context: Context
): Promise<SavedPersonOrder> {
  //find skips
  const peopleAndChoresEtc = await context.ChoreEventRepository.getSkipsForPersonChore(
    person.id,
    choreId
  );
  console.log(
    " ---> skips for person id",
    person.id,
    " and chore id ",
    choreId,
    "are ",
    peopleAndChoresEtc
  );

  let nextPerson = person;

  //is there a skip for that person and that chore
  if (
    peopleAndChoresEtc != null &&
    peopleAndChoresEtc != undefined &&
    peopleAndChoresEtc.length > 0
  ) {
    //delete that event
    peopleAndChoresEtc.forEach(async element => {
      console.log("setting skip to null", element.id);
      await context.ChoreEventRepository.setSkipToNull(element.id);
    });
    //get the next person
    nextPerson = await getNextPersonFromCurrentPerson(context, person);
    console.log("NEXT PERSON", nextPerson.personId);
    return await checkForSkipsAndIncrement(choreId, nextPerson, context);
  } else {
    return nextPerson;
  }
}

async function getNextPersonFromCurrentPerson(
  context: Context,
  currentPerson: SavedPersonOrder
): Promise<SavedPersonOrder> {
  const personOrderRepo = await context.PersonOrderRepository.all(); //TODO: change this to count
  const personOrderRepoLength = personOrderRepo.length;
  console.log("LENGTH", personOrderRepoLength);
  let nextPersonOrder = 1;
  if (currentPerson != undefined) {
    nextPersonOrder = (currentPerson.order + 1) % personOrderRepoLength;
    console.log("next person order is", nextPersonOrder);
  } else {
    nextPersonOrder = 1;
  }
  //find the person with that order
  console.log(
    "next order is",
    nextPersonOrder,
    personOrderRepoLength.valueOf()
  );
  const nextPerson = await context.PersonOrderRepository.forOrder.load(
    nextPersonOrder
  );
  console.log(
    "person with id ",
    nextPerson[0].personId,
    "is associated with person order",
    nextPersonOrder
  );
  return nextPerson[0];
}
