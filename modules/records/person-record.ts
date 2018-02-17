import { RepositoryBase, loaderOf, NumberId } from "./record";
import { PersonRecord, ChoreEventRecord } from "records/record-infos";

export type PersonId = NumberId<"chore">;

export interface UnsavedPerson {
  firstName: string | null;
  lastName: string | null;
}

export interface SavedPerson extends UnsavedPerson {
  id: PersonId;
}

export class PersonRepository extends RepositoryBase(PersonRecord) {
  byId = loaderOf(this).findOneBy("id");
  allChoreEntries = loaderOf(this).allBelongingTo(ChoreEventRecord, "id");
}
