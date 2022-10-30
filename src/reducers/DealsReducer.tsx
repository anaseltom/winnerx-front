import { 
    DEALS
 } from "../actions/types";

const Deals = (state: any = {}, action: any) => {
  switch (action.type) {
    case DEALS:
        // use the below return code if you have multiple items
        // return { ...state, items: action.payload };
        console.log("actionpayload", action.payload)
        return action.payload;
    default:
      return state;
  }
};
export default Deals;
