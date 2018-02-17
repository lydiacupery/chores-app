import { Chore } from "graphql-api/schema-types";
import { Context } from "graphql-api";

/** The graphql schema-compatible typescript type required to implement any chore resolver */
export interface MinimalChore {
  id: Chore["id"];
}

export const ChoreResolvers = {
  async name(chore: MinimalChore, args: {}, context: Context) {
    if ((chore as any).name) return (chore as any).name;

    const record = await context.choreRepository.findById.load(chore.id);
    return record && record.name;
  }
};
