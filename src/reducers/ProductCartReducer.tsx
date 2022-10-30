import { PRODUCT_CART, PRODUCT_CART_DELETE } from "../actions/types";

const Product_cart = (state: any = {}, action: any) => {
  switch (action.type) {
    case PRODUCT_CART:
      // use the below return code if you have multiple items
      // return { ...state, items: action.payload };
      return action.payload;
    case PRODUCT_CART_DELETE:
      const index = action.payload.index;
      state.splice(index, 1);

      return [...state];
    default:
      return state;
  }
};
export default Product_cart;
