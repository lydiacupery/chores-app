/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type AddChoreMutationVariables = {
  name: string;
};

export type AddChoreMutation = {
  addChore: {
    id: number;
    name: string;
  } | null;
};

export type AddPersonMutationVariables = {
  firstName?: string | null;
  lastName?: string | null;
};

export type AddPersonMutation = {
  addPerson: {
    id: number;
    firstName: string | null;
    lastName: string | null;
  } | null;
};

export type ChoreEventQueryVariables = {
  person: number;
  chore: number;
};

export type ChoreEventQuery = {
  choreEvents: Array<{
    id: number;
    date: string | null;
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
};

export type ChoresQuery = {
  allChores: Array<{
    id: number;
    name: string;
  }> | null;
};

export type PeopleQuery = {
  allPeople: Array<{
    id: number;
    firstName: string | null;
    lastName: string | null;
  }> | null;
};

export type ScheduleQuery = {
  allPeople: Array<{
    id: number;
    firstName: string | null;
    lastName: string | null;
  }> | null;
  allChores: Array<{
    id: number;
    name: string;
  }> | null;
};
