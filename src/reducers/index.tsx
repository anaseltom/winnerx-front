import { combineReducers } from "redux";

import UserReducer from "./UserReducer";
import Categories from "./Products";
import Products_list from "./ProductsListReducer";
import Deals from "./DealsReducer";
import Product_cart from "./ProductCartReducer";
import Product_wishlist from "./ProductWishlistReducer";
import Product_Cart_total from "./Product_Cart_total";
import User_Order_List from "./UserOrderList";
import Entries from "./Entries";
import billing_addresses from "./BillingReducer";
import user_addresses from "./UserAddressReducer";
import open_modal from "./OpenModal";
// import { Product_Cart_Total } from "../actions/UserAction";

const rootReducer = combineReducers({
  user: UserReducer,
  categories: Categories,
  products_list: Products_list,
  deals: Deals,
  cart: Product_cart,
  wishlist: Product_wishlist,
  cart_total: Product_Cart_total,
  order_list: User_Order_List,
  entries: Entries,
  billing: billing_addresses,
  user_addresses: user_addresses,
  open_modal: open_modal,
});

export default rootReducer;
