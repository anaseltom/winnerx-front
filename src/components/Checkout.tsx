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
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CheckoutSummary from "../components/CheckoutSummary";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";
import { Products_list } from "../actions/UserAction";
import { Product_Cart, Product_Cart_Total } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";

const Checkout: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  const dispatch = useDispatch();
  console.log(products_list);
  console.log(products_cart);

  useEffect(() => {
    dispatch(Products_list(""));
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

  const getProd = (code: any) => {
    var prodIndex = products_list?.findIndex(
      (s: any) => s.product_code === code
    );
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
            <div className="header_title">
              <span>CART</span>
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
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products_list.length > 0 &&
                      products_cart &&
                      products_cart.length > 0 &&
                      products_cart.map((ar: any, key: number) => {
                        const prod = getProd(ar.code);
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
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="shoping__cart__btns">
                <Link to={`/home`}>
                  <button className="primary-btn cart-btn">
                    CONTINUE SHOPPING
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
            <div className="col-lg-6">
              <div className="shoping__checkout">
                <h5>Cart Total</h5>
                <ul>
                  <li>
                    Subtotal{" "}
                    <span>{numberWithCommas(products_cart_total?.total)}</span>
                  </li>
                  <li>
                    Total{" "}
                    <span>{numberWithCommas(products_cart_total?.total)}</span>
                  </li>
                </ul>
                {products_cart.length > 0 ? (
                  <Link to={`/confirm_checkout`}>
                    <button className="primary-btn checkout_button">
                      PROCEED TO CHECKOUT
                    </button>
                  </Link>
                ) : (
                  <Link
                    onClick={(event) => event.preventDefault()}
                    to={`/confirm_checkout`}
                  >
                    <button className="warning-btn checkout_button">
                      PROCEED TO CHECKOUT
                    </button>
                  </Link>
                )}
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
