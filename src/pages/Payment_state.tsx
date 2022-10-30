import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../actions/UserAction";
import { RootStore } from "../store";
import { useLocation, useHistory } from "react-router-dom";
import { Products_list } from "../actions/UserAction";
import { Product_Cart, Product_Cart_Total } from "../actions/UserAction";
import { SpinnerDotted } from "spinners-react";
import axios from "axios";

const PaymentState: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useLocation().search;
  const ref = new URLSearchParams(search).get("ref");

  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const userProfile = useSelector((state: RootStore) => state.user);

  const [loader, setLoader] = useState<any>("");
  const [response, setResponse] = useState<any>("");
  const [orderArray, setOrderArray] = useState<any>([]);
  const [paid, setPaid] = useState<any>("");
  const [success, setSuccess] = useState<any>(false);

  const checkPayment = async () => {
    axios
      .post("http://3.11.79.117:8000/check_payment", {
        ref,
      })
      .then(async (response) => {
        console.log(response);
        if (
          response.status === 200 &&
          response?.data._embedded?.payment[0]?.state === "CAPTURED"
        ) {
          const newArray = await getOrderArray();

          newArray && createOrder(newArray);
        } else if (response?.data._embedded?.payment[0]?.state != "CAPTURED")
          setSuccess(null);
      })
      .catch(({ response }) => {
        if (response.status === 404) setSuccess(404);
        else if (!response || response.status === 500) setSuccess(500);
        else if (response?.data._embedded?.payment[0]?.state != "CAPTURED")
          setSuccess(null);
      });
  };

  const getOrderArray = async () => {
    let array = products_cart?.map((ar: any, key: number) => {
      const prod = getProd(ar.code);
      console.log(prod);
      return {
        product_id: prod.id,
        quantity: ar.qty,
        price: prod.unit_price,
        deal_id: prod.deal_products[0].deal_id,
      };
    });
    return array;
    // history.push("/");
  };
  const createOrder = (array: any) => {
    let shipping_address = localStorage.getItem("w-commerce-billing-address");

    shipping_address =
      shipping_address !== null ? JSON.parse(shipping_address) : {};

    if (array.length > 0) {
      axios
        .post("http://3.11.79.117:8000/api/v1/orders/update", {
          id: 0,
          customer_id: userProfile.id,
          status: "active",
          items: array,
          payment_status: "paid",
          shipping_address,
          ref,
        })
        .then((res) => {
          console.log(res);
          setSuccess(true);
          localStorage.setItem("w-commerce-token-qerfdswe", JSON.stringify([]));
          setTimeout(() => {
            history.push("/");
          }, 5000);
        })
        .catch((err) => {
          if (err.response.status === 401) return setSuccess(401);
          setSuccess(0);
        });
    }
  };
  const getProd = (code: any) => {
    var prodIndex = products_list?.findIndex(
      (s: any) => s.product_code === code
    );
    return products_list[prodIndex];
  };

  useEffect(() => {
    dispatch(users());
    dispatch(Products_list(""));
    dispatch(Product_Cart());
    setTimeout(function () {
      setLoader("loader_remove");
    }, 500);
    if (!ref) history.push("/");
  }, []);
  useEffect(() => {
    checkPayment();
  }, [products_list]);
  // useEffect(() => {
  //   // orderArray && createOrder(orderArray);
  // }, [orderArray]);

  return (
    <>
      <div id="preloder" className={loader}>
        <div className="loader"></div>
      </div>
      <Header />

      <div
        style={{
          width: "40%",
          height: "200px",
          margin: "70px auto",
          display: "flex",
          flex: 1,
          flexDirection: "column",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          background: "#f3f6fa",
          backdropFilter: "saturate(180%) blur(1px)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
        }}
      >
        <div style={{ margin: "10px auto" }}>
          <SpinnerDotted
            style={{ color: "black" }}
            enabled={success === false}
          />
        </div>
        {success === true && (
          <div style={{ margin: "10px auto" }}>
            <svg
              style={{ color: "#2ee59d" }}
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
            >
              <path
                fill="#2ee59d"
                d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"
              ></path>
            </svg>
          </div>
        )}
        {(success === 404 ||
          success === 500 ||
          success === 0 ||
          success === null ||
          success === 401) && (
          <div style={{ margin: "10px auto" }}>
            <svg
              style={{ color: "#EF4444" }}
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
                fill="#EF4444"
              ></path>{" "}
            </svg>
          </div>
        )}
        <h1
          style={{
            textAlign: "center",
            color: "#1E293B",
            padding: "15px 15px",
          }}
        >
          {success === true && "Order has been created successfully"}
          {success === 0 && "There was an error creating your order"}
          {success === 404 && "Order with refrence id not found"}
          {success === 401 && "Order already exists"}
          {success === 500 && "There was a problem with our server"}
          {success === null && "You have not paid for the order"}
        </h1>
      </div>

      <Footer />
    </>
  );
};

export default PaymentState;
