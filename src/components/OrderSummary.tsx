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
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const CheckoutSummary: React.FC<any> = ({
  product,
  qty,
  setProd,
  setRefundIsOpen,
  date,
  packageStatus,
  setProdIsOpen,
}) => {
  const [prodQty, setProdQty] = useState<any>(0);
  const [enableRequest, setEnableRequest] = useState<any>(false);
  const [totalPrice, setTotalPrice] = useState<any>(0);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const dispatch = useDispatch();
  const todayDate = new Date();
  // const todayDate = today.toLocaleString("en-GB", {
  // day: "numeric",
  // month: "short",
  // year: "numeric"
  // });
  const { t } = useTranslation();
  const language = i18n.language;

  useEffect(() => {
    if (localStorage.getItem("session")) {
    } else {
      window.location.href = "/signin";
    }
  }, []);

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

  const date_formatter = (date: any) => {
    const dates = new Date(date);

    const formattedDate = dates.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "2-digit"
    });

    return formattedDate;
  };

  const date_comparison = (duration: any, date1: any, date2: any) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    var Difference_In_Time = date2?.getTime() - date1?.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log("Difference days is", Difference_In_Days);
    if (Difference_In_Days < duration) {
      if (packageStatus.toLowerCase() === "delivered") {
        setEnableRequest(true);
      }
    } else {
      setEnableRequest(false);
    }
  };

  useEffect(() => {
    date_comparison(10, date, todayDate);
  }, []);

  return (
    <tr>
      <td
        onClick={() => {
          setProd(product);
          setProdIsOpen(true);
        }}
        className="shoping__cart__item"
        style={{ width: "40%" }}
      >
        <img
          className="image"
          style={{ objectFit: "contain" }}
          src={`${product?.image_url_main}`}
          alt=""
        />
        <h5>
          {language === "en" ? product?.product_name : product?.product_name_ar}
        </h5>
      </td>
      <td className="shoping__cart__total" style={{ width: "15%" }}>
        {date_formatter(date)}
      </td>
      <td className="shoping__cart__total" style={{ width: "20%" }}>
        {product?.currencyCode} {numberWithCommas(prodQty * product?.unitPrice)}
      </td>
      <td className="shoping__cart__total" style={{ width: "15%" }}>
        {packageStatus?.toLowerCase() === "delivered" ||
        packageStatus?.toLowerCase().includes("refunded") ? (
          <span className="delivery_status success">
            {packageStatus?.replace("_", " ").toUpperCase()}
          </span>
        ) : packageStatus?.toLowerCase() === "pending" ||
          packageStatus?.toLowerCase().includes("warehouse") ||
          packageStatus?.toLowerCase().includes("refund_request") ? (
          <span className="delivery_status pending">
            {packageStatus?.replace("_", " ").toUpperCase()}
          </span>
        ) : (
          <span className="delivery_status">
            {packageStatus?.replace("_", " ").toUpperCase()}
          </span>
        )}
      </td>
      <td className="shoping__cart__item__close" style={{ width: "10%" }}>
        {enableRequest ? (
          <button
            onClick={() => {
              setProd(product);
              setRefundIsOpen(true);
            }}
            type="submit"
            className="site-btn button-refund"
          >
            Request Refund
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default CheckoutSummary;
