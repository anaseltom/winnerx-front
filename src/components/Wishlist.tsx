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
} from "react-router-dom";
import Header from "./Header";
import SearchBar from "./SearchBar";
import WishlistSummary from "./WishlistSummary";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import { Products_list } from "../actions/UserAction";
import {
  Product_Cart,
  Product_Cart_Total,
  Product_Wishlist,
} from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Checkout: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_wishlist = useSelector((state: RootStore) => state.wishlist);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  const dispatch = useDispatch();
  // console.log(products_wishlist);
  useEffect(() => {
    // console.log("categories");
    dispatch(Products_list(""));
  }, []);

  useEffect(() => {
    dispatch(Product_Wishlist());
  }, []);
  const { t } = useTranslation();
  const language = i18n.language;

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
  if (localStorage.getItem("w-commerce-token-widerange")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-widerange")!
    );
    // console.log(product_value);
  }

  const getProd = (code: any) => {
    var prodIndex = products_list?.findIndex((s: any) => {
      return s.product_code === code;
    });
    // console.log(prodIndex);
    // console.log(products_list[prodIndex]);
    return products_list[prodIndex];
  };

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_list]);

  return (
    <>
      <Header />

      <section className="hero">
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
              <span>{t("wishlist")}</span>
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
                {products_wishlist.length > 0 ? (
                  <table
                    style={{ width: "100%" }}
                    dir={language === "ar" ? "rtl" : "ltr"}
                  >
                    <thead>
                      <tr>
                        <th className="shoping__product">{t("products")}</th>
                        <th>{t("price")}</th>
                        <th style={{ textAlign: "right" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products_list.length > 0 &&
                        products_wishlist &&
                        products_wishlist.length > 0 &&
                        products_wishlist.map((ar: any, key: number) => {
                          const prod = getProd(ar.code);
                          return (
                            <WishlistSummary
                              key={key}
                              product={prod}
                              qty={ar.qty}
                            />
                          );
                        })}
                    </tbody>
                  </table>
                ) : (
                  <h1>{t("empty_wishlist")}</h1>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to={`/`}>
                  <button
                    className="primary-btn cart-btn"
                    style={{
                      fontSize: language === "ar" ? "16px" : "14px",
                      letterSpacing: language === "ar" ? "0" : "1px",
                    }}
                  >
                    {t("continue_shopping")}
                  </button>
                </Link>
                {/* <a href="#" className="primary-btn cart-btn cart-btn-right"><span className="icon_loading"></span>
                                    Upadate Cart</a> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Checkout;
