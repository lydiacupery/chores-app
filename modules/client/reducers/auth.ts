import { ActionTypeKeys } from "client/actions";

const initialState = {
  authenticated: false
};

export default function gifs(state = initialState, action: any) {
  switch (action.type) {
    case ActionTypeKeys.SIGN_IN_USER:
      return {
        ...state,
        authenticated: true
      };
    case ActionTypeKeys.SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false
      };
    default:
      return state;
  }
}
