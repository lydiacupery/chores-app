import { PopularityMode } from "client/state";

export enum ActionTypeKeys {
  SET_POPULARITY = "SET_POPULARITY",
  OTHER_ACTION = "__fake_to_support_system_events__",
  SIGN_IN_USER = "SIGN_IN_USER",
  SIGN_OUT_USER = "SIGN_OUT_USER"
}
export type ActionTypes = SetPopularityAction | OtherAction;

export type SetPopularityAction = {
  type: ActionTypeKeys.SET_POPULARITY;
  popularityMode: PopularityMode;
};

export const setPopularity = (
  popularityMode: PopularityMode
): SetPopularityAction => ({
  type: ActionTypeKeys.SET_POPULARITY,
  popularityMode
});

export type OtherAction = {
  readonly type: ActionTypeKeys.OTHER_ACTION;
};
