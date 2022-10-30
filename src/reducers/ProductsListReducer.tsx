import { 
    PRODUCTS_LIST
 } from "../actions/types";

const Products = (state: any = {}, action: any) => {
  switch (action.type) {
    case PRODUCTS_LIST:
        // use the below return code if you have multiple items
        // return { ...state, items: action.payload };
        console.log("actionpayload", action.payload)
        return action.payload;
    default:
      return state;
  }
};
export default Products;
