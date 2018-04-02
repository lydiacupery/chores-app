import { NumberId, loaderOf, RepositoryBase } from "records/record";
import { PersonId } from "records/person-record";
import { CurrentTurnRecord } from "records/record-infos";
import { ChoreId } from "./chore-record";

export type CurrentTurnId = NumberId<"currentTurn">;

export interface UnsavedCurrentTurnOrder {
  personId: PersonId;
  choreId: ChoreId;
}
export interface SavedCurrentTurnOrder extends UnsavedCurrentTurnOrder {
  id: CurrentTurnId;
}

export class CurrentTurnRepository extends RepositoryBase(CurrentTurnRecord) {
  byId = loaderOf(this).findOneBy("id");
  forPerson = loaderOf(this).allBelongingTo(CurrentTurnRecord, "personId");
  forChore = loaderOf(this).allBelongingTo(CurrentTurnRecord, "choreId");
}
