import { RouterState } from "react-router-redux";
import { Store as ApolloStore } from "apollo-client/store";
import { Lens } from "@atomic-object/lenses/lib";

export enum PopularityMode {
  PERCENTAGE = "PERCENTAGE",
  VOTE_COUNT = "VOTE_COUNT"
}

interface State {
  readonly router: RouterState;
  readonly apollo: ApolloStore;
  readonly popularityMode: PopularityMode;
}
export type Type = State;

export const popularityMode = Lens.from<State>().prop("popularityMode");

export const DEFAULT: State = {
  router: undefined as any, // provided at startup
  apollo: undefined as any, // provided at startup
  popularityMode: PopularityMode.PERCENTAGE
};
