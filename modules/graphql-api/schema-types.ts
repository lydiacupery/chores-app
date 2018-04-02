/* tslint:disable */

export interface Query {
  allSnacks: Array<Snack>;
  allChores: Array<Chore>;
  allPeople: Array<Person>;
  personById: Person | null;
  choreEvents: Array<ChoreEvent> | null;
  whoseTurn: Person | null;
}

export interface PersonByIdQueryArgs {
  id: number;
}

export interface ChoreEventsQueryArgs {
  person: number;
  chore: number;
}

export interface WhoseTurnQueryArgs {
  chore: number;
}

export interface Snack {
  id: number;
  name: string;
  voteCount: number;
}

export interface Chore {
  id: number;
  name: string;
}

export interface Person {
  id: number;
  firstName: string | null;
  lastName: string | null;
  completedChores: Array<ChoreEvent> | null;
}

export interface ChoreEvent {
  id: number;
  date: string | null;
  person: Person | null;
  chore: Chore | null;
  skip: boolean | null;
}

export interface Mutation {
  addChore: Chore | null;
  addPerson: Person | null;
  addEvent: ChoreEvent | null;
  incrementTurnAfterEvent: Person | null;
}

export interface AddChoreMutationArgs {
  name: string;
}

export interface AddPersonMutationArgs {
  firstName: string | null;
  lastName: string | null;
}

export interface AddEventMutationArgs {
  personId: number;
  choreId: number;
  date: string | null;
  skip: boolean | null;
}

export interface IncrementTurnAfterEventMutationArgs {
  personId: number;
  choreId: number;
}

export interface Vote {
  id: number;
  snack: Snack;
}
