import { NumberId, loaderOf, RepositoryBase } from "records/record";
import { PersonId } from "records/person-record";
import { PersonOrderRecord } from "records/record-infos";

export type PersonOrderId = NumberId<"personOrder">;

export interface UnsavedPersonOrder {
  personId: PersonId;
  order: number;
}
export interface SavedPersonOrder extends UnsavedPersonOrder {
  id: PersonOrderId;
}

export class PersonOrderRepository extends RepositoryBase(PersonOrderRecord) {
  byId = loaderOf(this).findOneBy("id");
  forPerson = loaderOf(this).allBelongingTo(PersonOrderRecord, "personId");
  forOrder = loaderOf(this).allBelongingTo(PersonOrderRecord, "order");
}
