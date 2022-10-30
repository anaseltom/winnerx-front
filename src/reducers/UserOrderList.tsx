import { USER_ORDER_LIST } from "../actions/types";

const Product_cart = (state: any = {}, action: any) => {
  switch (action.type) {
    case USER_ORDER_LIST:
      return action.payload;
    default:
      return state;
  }
};
export default Product_cart;
