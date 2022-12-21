// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRouterOutlet,
  IonApp,
  IonTabButton,
} from "@ionic/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CheckoutSummary from "../components/CheckoutSummary";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";
import { openSigninModal, Products_list } from "../actions/UserAction";
import { Product_Cart, Product_Cart_Total } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Checkout: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  const [logged, setLogged] = useState<any>({
    isLogged: false,
  });
  const history = useHistory();

  const dispatch = useDispatch();
  // console.log(products_list);
  // console.log(products_cart);
  const { t } = useTranslation();
  const language = i18n.language;

  const loggedChecker = () => {
    if (localStorage.getItem("session_id")) {
      setLogged({ isLogged: true });
    } else {
      setLogged({ isLogged: false });
    }
    // console.log("logged is", logged);
  };

  useEffect(() => {
    dispatch(Products_list(""));
    loggedChecker();
  }, []);

  useEffect(() => {
    dispatch(Product_Cart());
  }, []);

  const numberWithCommas = (x: any) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  };

  var product_value = [];
  // console.log(localStorage.getItem("w-commerce-token-qerfdswe"));
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
  }

  const getProd = (id: any) => {
    var prodIndex = products_list?.findIndex((s: any) => s.id === id);
    return products_list[prodIndex];
  };

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_list]);

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_cart]);

  return (
    <>
      <Header />

      <section className="hero pad-t-50">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 search_hero">
              {/* <SearchBar 
                            /> */}
            </div>
          </div>
        </div>
      </section>

      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div
              className="header_title"
              style={{ letterSpacing: language === "ar" ? "0" : "10px" }}
            >
              <span>{t("cart")}</span>
            </div>
          </div>
          <div
            className="row"
            style={{ marginBottom: "40px", textAlign: "center" }}
          >
            <div className="col-lg-12">
              <div
                className=""
                style={{
                  borderTop: "solid 0.5px gray",
                  borderBottom: "solid 0.5px gray",
                  padding: "20px 5px",
                  width: "100%",
                }}
              >
                {products_cart.length > 0 ? (
                  <table
                    style={{ width: "100%" }}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <thead>
                      <tr>
                        <th className="shoping__product">{t("products")}</th>
                        <th>{t("price")}</th>
                        <th>{t("quantity")}</th>
                        <th>{t("total")}</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products_list.length > 0 &&
                        products_cart &&
                        products_cart.length > 0 &&
                        products_cart.map((ar: any, key: number) => {
                          const prod = getProd(ar.id);
                          return (
                            <CheckoutSummary
                              key={key}
                              product={prod}
                              qty={ar.qty}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <h1>{t("empty_cart")}</h1>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to={`/home`}>
                  <button
                    className="primary-btn cart-btn"
                    style={{
                      letterSpacing: language === "ar" ? "0" : "1px",
                      fontSize: language === "ar" ? "18px" : "16px",
                    }}
                  >
                    {t("continue_shopping")}
                  </button>
                </Link>
                {/* <a href="#" className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span>
                                    Upadate Cart</a> */}
              </div>
            </div>
            {/* <div className="col-lg-6">
                            <div className="shoping__continue">
                                <div className="shoping__discount">
                                    <h5>Discount Codes</h5>
                                    <form action="#">
                                        <input type="text" placeholder="Enter your coupon code" />
                                        <button type="submit" className="site-btn">APPLY COUPON</button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
            <div
              className="col-lg-6"
              style={{ textAlign: language === "ar" ? "right" : "left" }}
            >
              {products_cart.length > 0 && (
                <div className="shoping__checkout">
                  <h5>{t("cart_total")}</h5>
                  <ul>
                    <li>
                      {t("subtotal")}{" "}
                      <span
                        style={{ float: language === "ar" ? "left" : "right" }}
                      >
                        {numberWithCommas(products_cart_total?.total)}
                      </span>
                    </li>
                    <li>
                      {t("total")}{" "}
                      <span
                        style={{ float: language === "ar" ? "left" : "right" }}
                      >
                        {numberWithCommas(products_cart_total?.total)}
                      </span>
                    </li>
                  </ul>
                  {products_cart.length > 0 ? (
                    <div
                      onClick={() => {
                        loggedChecker();
                        logged.isLogged != true
                          ? dispatch(openSigninModal())
                          : history.push("/confirm_checkout");
                      }}
                    >
                      <button
                        className="primary-btn checkout_button"
                        style={{
                          letterSpacing: language === "ar" ? "0" : "1px",
                          fontSize: language === "ar" ? "18px" : "16px",
                        }}
                      >
                        {t("proceed_to_checkout")}
                      </button>
                    </div>
                  ) : (
                    <Link
                      onClick={(event) => event.preventDefault()}
                      to={`/confirm_checkout`}
                    >
                      <button className="warning-btn checkout_button">
                        {t("proceed_to_checkout")}
                      </button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
