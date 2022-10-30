import { IonReactRouter } from "@ionic/react-router";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import {
  Product_Cart,
  Product_Wishlist_Delete,
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
      console.log("index", prodIndex);

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

  const addToCart = (code: any) => {
    if (localStorage.getItem("w-commerce-token-qerfdswe")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-qerfdswe")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);
      console.log("index", prodIndex);

      if (prodIndex >= 0) {
        product_value[prodIndex].qty += 1;
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(product_value)
        );
      } else {
        var temp_value = { code: code, qty: 1 };
        product_value.push(temp_value);
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(product_value)
        );
      }
    } else {
      var new_value = [{ code: code, qty: 1 }];
      localStorage.setItem(
        "w-commerce-token-qerfdswe",
        JSON.stringify(new_value)
      );
    }
    dispatch(Product_Cart());
  };

  const deleteProd = (code: any) => {
    dispatch(Product_Wishlist_Delete(code));
  };
  console.log(product);

  return (
    <tr>
      <td className="shoping__cart__item">
        <img
          className="image"
          src={`/assets/img/product/${product?.imageUrlMain}`}
          alt=""
        />
        <h5>{product?.productName}</h5>
      </td>
      <td className="shoping__cart__price">
        {product?.currencyCode} {numberWithCommas(product?.unitPrice)}
      </td>
      <td className="shoping__cart__item__close">
        <div className="td_box">
          <img
            onClick={() => {
              addToCart(product?.productCode);
            }}
            className="social_media"
            src="/assets/img/002-shopping-bag.png"
            style={{ minWidth: "16px" }}
            alt=""
          />
          <img
            onClick={() => {
              deleteProd(product?.productCode);
            }}
            className="social_media"
            src="/assets/img/delete.png"
            style={{ minWidth: "16px" }}
            alt=""
          />
        </div>
      </td>
    </tr>
  );
};

export default CheckoutSummary;
