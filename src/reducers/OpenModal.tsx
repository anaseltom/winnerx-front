import { TOGGLE_MODAL } from "../actions/types";

const open_modal = (state: any = false, action: any) => {
  switch (action.type) {
    case TOGGLE_MODAL:
      return !state;
    default:
      return state;
  }
};
export default open_modal;
