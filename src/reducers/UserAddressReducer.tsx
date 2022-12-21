import { USER_ADDRESSES } from "../actions/types";

const user_addresses = (state: any = {}, action: any) => {
  switch (action.type) {
    case USER_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};
export default user_addresses;
