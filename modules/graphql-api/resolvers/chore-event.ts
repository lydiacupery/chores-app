//import { Context } from "graphql-api";
import { ChoreEvent } from "graphql-api/schema-types";

/** The graphql schema-compatible typescript type required to implement any chore resolver */
export interface MinimalChoreEvent {
  id: ChoreEvent["id"];
}

/*
export const ChoreEventResolvers = {
  async personId(
    chore: MinimalChoreEvent,
    args: {},
    context: Context
  ): Promise<number | null> {
    if ((chore as any).personId) return (chore as any);
    const record = await context.ChoreEventRepository.byId.load(chore.id);
    //todo: probably a better way to do this
    if (record != null) {
      return record.personId;
    } else {
      return null;
    }
  },
  async choreId(
    chore: MinimalChoreEvent,
    args: {},
    context: Context
  ): Promise<number | null> {
    if ((chore as any).choreId) return (chore as any).choreId;
    const record = await context.ChoreEventRepository.byId.load(chore.id);
    //todo: probably a better way to do this
    if (record != null) {
      return record.choreId;
    } else {
      return null;
    }
  },
  async date(
    chore: MinimalChoreEvent,
    args: {},
    context: Context
  ): Promise<String | null> {
    if ((chore as any).date) return (chore as any).date;
    const record = await context.ChoreEventRepository.byId.load(chore.id);
    //todo: probably a better way to do this
    if (record != null) {
      return record.date;
    } else {
      return null;
    }
  }
};
*/
