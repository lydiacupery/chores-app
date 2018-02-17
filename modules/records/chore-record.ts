import { RepositoryBase, loaderOf, NumberId } from "./record";
import { ChoreRecord } from "records/record-infos";

export type ChoreId = NumberId<"chore">;

export interface UnsavedChore {
  name: string;
}
export interface SavedChore extends UnsavedChore {
  id: ChoreId;
}

export class ChoreRepository extends RepositoryBase(ChoreRecord) {
  byName = loaderOf(this).findOneBy("name");
}
