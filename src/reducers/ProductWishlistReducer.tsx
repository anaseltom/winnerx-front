import { 
  PRODUCT_WISHLIST,
  PRODUCT_WISHLIST_DELETE
 } from "../actions/types";

const Product_wishlist = (state: any = {}, action: any) => {
  switch (action.type) {
    case PRODUCT_WISHLIST:
      // use the below return code if you have multiple items
      // return { ...state, items: action.payload };
      return action.payload;
    case PRODUCT_WISHLIST_DELETE:
        const index = action.payload.index;
        (state).splice(index, 1);

      return [...state];
    default:
      return state;
  }
};
export default Product_wishlist;
