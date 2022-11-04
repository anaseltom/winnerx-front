import { IonReactRouter } from "@ionic/react-router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import {
  Product_Cart,
  Product_Delete,
  Product_Cart_Total,
} from "../actions/UserAction";
import Product_cart from "../reducers/ProductCartReducer";

const CheckoutSummary: React.FC<any> = ({ product, qty }) => {
  const [prodQty, setProdQty] = useState<any>(0);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_cart]);

  useEffect(() => {
    setProdQty(qty);
  }, [product]);

  const numberWithCommas = (x: any) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  var product_value = [];
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
  }

  const changeQty = (code: any, action: any) => {
    if (localStorage.getItem("w-commerce-token-qerfdswe")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-qerfdswe")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);
      // console.log("index",prodIndex);

      if (prodIndex >= 0) {
        if (action == "dec") {
          if (product_value[prodIndex].qty > 1) {
            product_value[prodIndex].qty = product_value[prodIndex].qty - 1;
            setProdQty(prodQty - 1);
          }
        } else {
          product_value[prodIndex].qty = product_value[prodIndex].qty + 1;
          setProdQty(prodQty + 1);
        }

        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(product_value)
        );
        dispatch(Product_Cart());
        dispatch(Product_Cart_Total(products_list, products_cart));
      }
    }
  };

  const deleteProd = (code: any) => {
    dispatch(Product_Delete(code));
  };

  return (
    <tr>
      <td
        className="shoping__cart__item"
        style={{ float: "none", width: "10%" }}
      >
        <img
          className="image"
          src={`${product?.image_url_main}`}
          style={{ objectFit: "contain" }}
          alt=""
        />
        <h5>{product?.product_name}</h5>
      </td>
      <td className="shoping__cart__price" align="center">
        {product?.currencyCode} {numberWithCommas(product?.unitPrice)}
      </td>
      <td className="shoping__cart__quantity">
        <div className="quantity">
          <div className="pro-qty">
            <span
              onClick={() => {
                changeQty(product?.product_code, "dec");
              }}
              className="dec qtybtn"
            >
              -
            </span>
            <input type="text" value={prodQty} disabled />
            <span
              onClick={() => {
                changeQty(product?.product_code, "inc");
              }}
              className="inc qtybtn"
            >
              +
            </span>
          </div>
        </div>
      </td>
      <td className="shoping__cart__total">
        {product?.currency_code}{" "}
        {numberWithCommas(prodQty * product?.unitPrice)}
      </td>
      <td className="shoping__cart__item__close">
        <img
          onClick={() => {
            deleteProd(product?.product_code);
          }}
          className="social_media"
          src="/assets/img/delete.png"
          style={{ minWidth: "16px", cursor: "pointer" }}
          alt=""
        />
      </td>
    </tr>
  );
};

export default CheckoutSummary;
