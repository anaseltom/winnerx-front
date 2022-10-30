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
import { useState, useRef, useEffect } from "react";
import {
  Products_list,
  Deals,
  Product_Cart,
  Product_Wishlist,
  LoadProductId,
} from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { RootStore } from "../store";

const Products: React.FC<any> = ({ image }) => {
  return (
    <section className="featured spad banner_image">
      <div className="container">
        <div
          className="row featured__filter"
          style={{ justifyContent: "center" }}
        >
          <div className={`col-lg-12 col-md-12 col-sm-12 banner_wrapper`}>
            <img src={`assets/img/${image}`} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
