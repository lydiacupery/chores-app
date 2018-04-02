/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface AddChoreMutationVariables {
  name: string;
}

export interface AddChoreMutation {
  addChore: {
    id: number;
    name: string;
  } | null;
}

export interface AddEventMutationVariables {
  personId: number;
  choreId: number;
  date?: string | null;
  skip?: boolean | null;
}

export interface AddEventMutation {
  addEvent: {
    id: number;
  } | null;
}

export interface AddEventAndIncrementMutationVariables {
  personId: number;
  choreId: number;
  date?: string | null;
  skip?: boolean | null;
}

export interface AddEventAndIncrementMutation {
  addEvent: {
    id: number;
  } | null;
  incrementTurnAfterEvent: {
    id: number;
  } | null;
}

export interface AddPersonMutationVariables {
  firstName?: string | null;
  lastName?: string | null;
}

export interface AddPersonMutation {
  addPerson: {
    id: number;
    firstName: string | null;
    lastName: string | null;
  } | null;
}

export interface ChoreEventQueryVariables {
  person: number;
  chore: number;
}

export interface ChoreEventQuery {
  choreEvents: Array<{
    id: number;
    date: string | null;
    skip: boolean | null;
    chore: {
      id: number;
      name: string;
    } | null;
    person: {
      id: number;
      firstName: string | null;
      lastName: string | null;
    } | null;
  } | null> | null;
  whoseTurn: {
    id: number;
  } | null;
}

export interface ChoresQuery {
  allChores: Array<{
    id: number;
    name: string;
  }> | null;
}

export interface PeopleQuery {
  allPeople: Array<{
    id: number;
    firstName: string | null;
    lastName: string | null;
  }> | null;
}

export interface ScheduleQuery {
  allPeople: Array<{
    id: number;
    firstName: string | null;
    lastName: string | null;
  }> | null;
  allChores: Array<{
    id: number;
    name: string;
  }> | null;
}
