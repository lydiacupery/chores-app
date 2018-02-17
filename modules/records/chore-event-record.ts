import { RepositoryBase, loaderOf, NumberId } from "./record";
import { ChoreEventRecord, PersonRecord } from "records/record-infos";
import { PersonId } from "records/person-record";
import { ChoreId } from "records/chore-record";

export type ChoreEventId = NumberId<"choreEvent">;

export interface UnsavedChoreEvent {
  date: string | null;
  personId: PersonId | null;
  choreId: ChoreId | null;
}
export interface SavedChoreEvent extends UnsavedChoreEvent {
  id: ChoreEventId;
}

export class ChoreEventRepository extends RepositoryBase(ChoreEventRecord) {
  //here have method that gets chore event by personId and choreId
  // allForChoreId = loaderOf(this).allBelongingTo(ChoreEventRecord, "choreId");
  //allForPersonId = loaderOf(this).allBelongingTo(ChoreEventRecord, "personId");
  //  chores = loaderOf(this).allBelongingTo(ChoreRecord, "choreId");

  byId = loaderOf(this).findOneBy("id");
  forPerson = loaderOf(this).allBelongingTo(PersonRecord, "personId");
}
