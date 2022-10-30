import { PRODUCT_CART_TOTAL } from "../actions/types";

const Product_cart = (state: any = {}, action: any) => {
  switch (action.type) {
    case PRODUCT_CART_TOTAL:
      return action.payload;
    default:
      return state;
  }
};
export default Product_cart;
