import { 
    WINNERS
 } from "../actions/types";

const Winners = (state: any = {}, action: any) => {
  switch (action.type) {
    case WINNERS:
      // use the below return code if you have multiple items
      // return { ...state, items: action.payload };
      console.log("actionpayload", action.payload)
      return action.payload;
    default:
      return state;
  }
};
export default Winners;
