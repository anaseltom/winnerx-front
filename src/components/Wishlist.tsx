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

const Checkout: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_wishlist = useSelector((state: RootStore) => state.wishlist);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("categories");
    dispatch(Products_list(""));
  }, []);

  useEffect(() => {
    dispatch(Product_Wishlist());
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
  if (localStorage.getItem("w-commerce-token-widerange")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-widerange")!
    );
    // console.log(product_value);
  }

  const getProd = (id: any) => {
    var prodIndex = products_list?.findIndex((s: any) => {
      console.log(s.id);
      return s.id === id;
    });
    // console.log(prodIndex);
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
            <div className="header_title">
              <span>WISHLIST</span>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th className="shoping__product">Products</th>
                      <th>Price</th>
                      <th style={{ textAlign: "right" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products_list.length > 0 &&
                      products_wishlist &&
                      products_wishlist.length > 0 &&
                      products_wishlist.map((ar: any, key: number) => {
                        const prod = getProd(ar.id);
                        console.log(prod);
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
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to={`/browse/ref=all`}>
                  <button className="primary-btn cart-btn">
                    CONTINUE SHOPPING
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
