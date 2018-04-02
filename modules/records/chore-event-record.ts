import { RepositoryBase, loaderOf, NumberId } from "./record";
import {
  ChoreEventRecord,
  PersonRecord,
  ChoreRecord
} from "records/record-infos";
import { PersonId } from "records/person-record";
import { ChoreId } from "records/chore-record";

export type ChoreEventId = NumberId<"choreEvent">;

export interface UnsavedChoreEvent {
  date: string | null;
  personId: PersonId | null;
  choreId: ChoreId | null;
  skip: boolean | null;
}
export interface SavedChoreEvent extends UnsavedChoreEvent {
  id: ChoreEventId;
}

//make a method to get all chore events except the ones that have been skipped (refer to delta)

export class ChoreEventRepository extends RepositoryBase(ChoreEventRecord) {
  //here have method that gets chore event by personId and choreId
  // allForChoreId = loaderOf(this).allBelongingTo(ChoreEventRecord, "choreId");
  //allForPersonId = loaderOf(this).allBelongingTo(ChoreEventRecord, "personId");
  //  chores = loaderOf(this).allBelongingTo(ChoreRecord, "choreId");

  byId = loaderOf(this).findOneBy("id");
  forPerson = loaderOf(this).allBelongingTo(PersonRecord, "personId");
  forChore = loaderOf(this).allBelongingTo(ChoreRecord, "choreId");
  async getSkipsForPersonChore(
    personId: number,
    choreId: number
  ): Promise<SavedChoreEvent[]> {
    //want to get all entries from the chore event record where choreId is id and person id is personId
    let query = this.table()
      .where({ personId: personId })
      .where({ choreId: choreId })
      .where({ skip: true });

    return await query;
  }

  /*
  async findWithTagsNamed(tagNames: string[]): Promise<SavedSnack[]> {
    let query = this.table().select(this.db.raw(`"snacks".*`));

    for (let i = 0; i < tagNames.length; i++) {
      const tag = tagNames[i];

      const taggingsN = `taggings${i}`;
      const tagsN = `tag${i}`;

      query = query.joinRaw(
        `
          INNER JOIN taggings ${taggingsN} ON ${taggingsN}."snackId" = "snacks".id
          INNER JOIN tags ${tagsN} on
            ${taggingsN}."tagId" = ${tagsN}.id
            AND ${tagsN}.name = ?
        `,
        tag
      );
    }
    return await query;
 }
 */
}
