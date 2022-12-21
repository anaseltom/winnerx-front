import { BILLING_ADDRESSES } from "../actions/types";

const billing_addresses = (state: any = {}, action: any) => {
  switch (action.type) {
    case BILLING_ADDRESSES:
      return action.payload;
    default:
      return state;
  }
};
export default billing_addresses;
