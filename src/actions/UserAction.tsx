import {
  USER_SIGNIN,
  USER_SIGNUP,
  USER_INFO,
  PRODUCTS_LIST,
  DEALS,
  PRODUCT_CATEGORIES,
  PRODUCT_CART,
  PRODUCT_CART_DELETE,
  PRODUCT_CART_TOTAL,
  USER_ORDER_LIST,
  PRODUCT_BILLING,
  PRODUCT_REFUND,
  PRODUCT_WISHLIST,
  PRODUCT_WISHLIST_DELETE,
  WINNERS,
  ENTRIES,
} from "./types";

import axios from "axios";
import axiosInstance from "../utilities/axios";

export const userSignIn =
  (userData: any, SigninResponse: any) => async (dispatch: any) => {
    // console.log("this is the data before signin in", userData);
    try {
      var { data } = await axiosInstance.post("user/signin", userData);

      // console.log("this is the response data", data);
      dispatch({
        type: USER_INFO,
        payload: data,
      });

      SigninResponse(data);
    } catch (e) {
      // dispatch({
      //   type: USER_SIGNIN,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
      SigninResponse({
        status: 500,
        msg: "Something went wrong while signing in. Please try again.",
        items: [],
      });
    }
  };

export const userSignUp =
  (userData: any, SignupResponse: any) => async (dispatch: any) => {
    try {
      console.log("UserData" + JSON.stringify(userData));

      const { data } = await axiosInstance.post("user/signup", userData);

      SignupResponse(data);

      // const data = {
      //   email: "asdf@gmail.com",
      //   firstname: "asdf",
      //   lastname: "xyz",
      //   isLogged: "true"
      // }

      // dispatch({
      //   type: USER_SIGNUP,
      //   payload: data,
      // });
    } catch (e) {
      // dispatch({
      //   type: USER_SIGNUP,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
    }
  };

export const users = () => async (dispatch: any) => {
  var user_id;
  if (localStorage.getItem("session_id")) {
    user_id = localStorage.getItem("session_id");
  } else {
    return;
  }
  try {
    const userData = {
      id: user_id,
    };

    const { data } = await axiosInstance.post("users/fetch-all", userData);

    // console.log("hi", data);
    dispatch({
      type: USER_INFO,
      payload: data.users[0],
    });
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const usersUpdate =
  (id: any, utk: any, verificationMode: any) => async (dispatch: any) => {
    try {
      const userData = {
        id: id,
        session: utk,
      };
      console.log("userData", userData);

      const { data } = await axiosInstance.post("users/update", userData);

      console.log("hi", data);
      if (data?.status == 200) {
        verificationMode(userData);
      }
    } catch (e) {
      // dispatch({
      //   type: USER_INFO,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
    }
  };

export const usersProfileUpdate =
  (userData: any, setUpdateMessage: any) => async (dispatch: any) => {
    var user_id;
    if (localStorage.getItem("session_id")) {
      user_id = localStorage.getItem("session_id");
    }

    const userUpdate = {
      id: user_id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    };

    const customerUpdate = {
      id: userData.customer_id,
      first_name: userData.first_name,
      last_name: userData.first_name,
      email: userData.email,
      phone_no: userData.mobile,
      country: userData.country,
      city: userData.city,
      apartment: userData.bldg,
      address: userData.street,
    };

    try {
      var { data } = await axiosInstance.post("users/update", userUpdate);

      if (data.status == 200) {
        var { data } = await axiosInstance.post(
          "customers/update",
          customerUpdate
        );

        if (data.status == 200) {
          setUpdateMessage("Saved successfully");
        }
      }

      console.log("hi", data);
      dispatch({
        type: USER_INFO,
        payload: data.users[0],
      });
    } catch (e) {
      // dispatch({
      //   type: USER_INFO,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
    }
  };

export const ProductCategories = () => async (dispatch: any) => {
  try {
    const { data } = await axiosInstance.post("categories/fetch-all");

    // console.log("hi", data);
    if (data && data.categories) {
      dispatch({
        type: PRODUCT_CATEGORIES,
        payload: data.categories,
      });
    }
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Products_list = (product_id: any) => async (dispatch: any) => {
  const tempData = {
    _id: "",
    _sellerName: "",
    _categoryCode: "",
    _productName: "",
    _brandName: "",
    _description: "",
    _color: "",
    _gender: "",
    _size: "",
    _keywords: "",
    status: "active",
  };

  try {
    // const { data } = await axiosInstance.post(
    //   "products/fetch-all",
    // );
    const { data } = await axiosInstance.post("products/deals");
    // console.log(data);
    if (data && data.products) {
      dispatch({
        type: PRODUCTS_LIST,
        payload: data.products,
      });
    }
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Deals = (product_id: any) => async (dispatch: any) => {
  try {
    // const { data } = await axiosInstance.post(
    //   "products/fetch-all",
    // );
    const { data } = await axiosInstance.post("deals/fetch-all");

    if (data && data.deals) {
      dispatch({
        type: DEALS,
        payload: data.deals,
      });
    }
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Product_Cart = () => async (dispatch: any) => {
  var product_value = [];
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
  }

  try {
    dispatch({
      type: PRODUCT_CART,
      payload: product_value,
    });
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Product_Delete = (code: any) => async (dispatch: any) => {
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    var product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
    var prodIndex = product_value?.findIndex((s: any) => s.code === code);
    product_value.splice(prodIndex, 1);
    localStorage.setItem(
      "w-commerce-token-qerfdswe",
      JSON.stringify(product_value)
    );
  }
  const tempData = {
    code: code,
    index: prodIndex,
  };

  try {
    dispatch({
      type: PRODUCT_CART_DELETE,
      payload: tempData,
    });
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Product_Cart_Total =
  (products_list: any, products_cart: any) => async (dispatch: any) => {
    try {
      var total = 0;
      products_list.length > 0 &&
        products_cart &&
        products_cart.length > 0 &&
        products_cart.map((ar: any, key: number) => {
          var index = products_list?.findIndex(
            (s: any) => s.product_code === ar.code
          );
          var price = products_list[index].unit_price;
          var qty = ar.qty;

          total += price * qty;
        });

      dispatch({
        type: PRODUCT_CART_TOTAL,
        payload: { total: total },
      });
    } catch (e) {}
  };

export const Order_list = () => async (dispatch: any) => {
  var user_id;
  if (localStorage.getItem("session_id")) {
    user_id = localStorage.getItem("session_id");
  }
  try {
    const tempData = {
      user_id: user_id,
      // "customer_id": user_id
    };

    const { data } = await axiosInstance.post("orders/fetch-all", tempData);

    // console.log("hi this is the id", user_id);
    // console.log("hi these are the orders", data);
    if (data && data.orders) {
      dispatch({
        type: USER_ORDER_LIST,
        payload: data.orders,
      });
    }
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

// export const Products_Billing = (products:any) => async (dispatch: any) => {

//   const tempData = {

//   }

//   try {

//     const { data } = await axiosInstance.post(
//       "orders/update", tempData
//     );

//     console.log("hi",data);
//     if(data && data.products)
//     {

//     }

//   } catch (e) {
//     // dispatch({
//     //   type: USER_INFO,
//     //   payload: {
//     //     status: 500,
//     //     msg: "Something went wrong while fetching tracks.",
//     //     items: [],
//     //   },
//     // });
//   }
// };

export const Products_Billing =
  (products: any, totalPrice: any) => async (dispatch: any) => {
    var user_id;
    if (localStorage.getItem("session_id")) {
      user_id = localStorage.getItem("session_id");
    }
    const tempData = {
      user_id: user_id,
      status: "active",
      payment_status: "paid",
      package_status: "in_warehouse",
      items: products,
      total_price: totalPrice?.total,
    };

    try {
      const { data } = await axiosInstance.post("orders/update", tempData);

      console.log("result of order", data);

      if (data?.status == 200) {
        localStorage.removeItem("w-commerce-token-qerfdswe");
        window.location.href = "/account/paymnent_sucess";
      }
    } catch (e) {
      // dispatch({
      //   type: USER_INFO,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
    }
  };

export const Products_Refunds =
  (refundDetails: any) => async (dispatch: any) => {
    const tempData = {};

    try {
      const { data } = await axios.post(
        "https://api.storein.net/api/v1/stripe/create-invoice-intent",
        tempData
      );

      console.log("hi", data);
      if (data && data.products) {
      }
    } catch (e) {
      // dispatch({
      //   type: USER_INFO,
      //   payload: {
      //     status: 500,
      //     msg: "Something went wrong while fetching tracks.",
      //     items: [],
      //   },
      // });
    }
  };

export const Product_Wishlist = () => async (dispatch: any) => {
  var product_value = [{}];
  if (localStorage.getItem("w-commerce-token-widerange")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-widerange")!
    );
  }

  try {
    // console.log(product_value);
    dispatch({
      type: PRODUCT_WISHLIST,
      payload: product_value,
    });
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const Product_Wishlist_Delete = (code: any) => async (dispatch: any) => {
  if (localStorage.getItem("w-commerce-token-widerange")) {
    var product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-widerange")!
    );
    var prodIndex = product_value?.findIndex((s: any) => s.code === code);
    product_value.splice(prodIndex, 1);
    localStorage.setItem(
      "w-commerce-token-widerange",
      JSON.stringify(product_value)
    );
  }
  const tempData = {
    code: code,
    index: prodIndex,
  };

  try {
    dispatch({
      type: PRODUCT_WISHLIST_DELETE,
      payload: tempData,
    });
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};

export const LoadProductId = () => async (dispatch: any) => {
  try {
    /******
        sample params: all fields are optional 
        {
            "id": 1,
            "task_id": 1,
            "user_id": 1,
            "provider_id": 1,
            "product_type": "user"
        }
          */
    const { data } = await axiosInstance.post(
      "stripe/create-product-price-filler",
      { plan: "fixed" }
    );

    // dispatch({
    //   type: FETCH_PRODUCT,
    //   payload: data,
    // });
  } catch (e) {}
};

export const Winner_list = () => async (dispatch: any) => {
  // console.log("entered in winner list");
  var user_id;
  if (localStorage.getItem("session_id")) {
    user_id = localStorage.getItem("session_id");
  }
  try {
    const tempData = {
      id: user_id,
      // "customer_id": user_id
    };

    var { data } = await axiosInstance.post("users/fetch-all", tempData);
    // console.log("first data", data);
    if (data && data.users) {
      // console.log("cus id", data?.users[0].customer?.id);
      const cus_id = {
        customer_id: data?.users[0].customer?.id,
      };

      var { data } = await axiosInstance.post("deal_entries/fetch-all", cus_id);
      // console.log("this is the entries data", data);
      dispatch({
        type: WINNERS,
        payload: data.deal_entries,
      });
    }
  } catch (e) {
    // dispatch({
    //   type: USER_INFO,
    //   payload: {
    //     status: 500,
    //     msg: "Something went wrong while fetching tracks.",
    //     items: [],
    //   },
    // });
  }
};
