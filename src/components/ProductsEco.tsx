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
import i18next, { t } from "i18next";

const Products: React.FC<any> = ({
  feature,
  title,
  filterControl,
  filterBy,
}) => {
  const categories = useSelector((state: RootStore) => state.categories);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const deals = useSelector((state: RootStore) => state.deals);
  const dispatch = useDispatch();
  const [filterProduct, setFilterProduct] = useState<any>(filterBy);
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);
  const [activeTab, setActiveTab] = useState<any>(1);
  const [updateProdSummary, setUpdateProdSummary] = useState<any>({});
  const DisableProductId = false;

  useEffect(() => {
    setFilterProduct(filterBy);
  }, [filterBy]);
  const language = i18next.language;
  // console.log(language);
  const addToCart = (code: any) => {
    if (localStorage.getItem("w-commerce-token-qerfdswe")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-qerfdswe")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);

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

  const truncateString = (string: any, maxLength: any) => {
    var cut_string = "";
    string?.length > maxLength
      ? (cut_string = `${string.substring(0, maxLength)}...`)
      : (cut_string = string);
    // console.log("this is the cut", cut_string);
    return cut_string;
  };

  const addToWishlist = (code: any) => {
    if (localStorage.getItem("w-commerce-token-widerange")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-widerange")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);
      // console.log("index", prodIndex);

      if (prodIndex >= 0) {
        product_value[prodIndex].qty += 1;
        localStorage.setItem(
          "w-commerce-token-widerange",
          JSON.stringify(product_value)
        );
      } else {
        var temp_value = { code: code, qty: 1 };
        product_value.push(temp_value);
        localStorage.setItem(
          "w-commerce-token-widerange",
          JSON.stringify(product_value)
        );
      }
    } else {
      var new_value = [{ code: code, qty: 1 }];
      localStorage.setItem(
        "w-commerce-token-widerange",
        JSON.stringify(new_value)
      );
    }
    dispatch(Product_Wishlist());
  };

  useEffect(() => {
    // console.log("categories");
    dispatch(Products_list(""));
    dispatch(Deals(""));
  }, []);

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filterProd = (items: any) => {
    return !items.is_recyclable && items.product_name_ar;
  };

  return (
    <section className="featured spad prod_eco">
      <div className="" style={{ overflowX: "hidden", position: "relative" }}>
        <div className="overlay"></div>
        <div className="header_text">
          <img src="assets/img/eco2.png" alt="" />
        </div>
        <div
          className="row featured__filter"
          style={{
            justifyContent: "flex-start",
            backgroundImage: `url('assets/img/slide-02.jpg')`,
            overflowX: "auto",
            flexWrap: "nowrap",
          }}
        >
          {products_list &&
            products_list.length > 0 &&
            products_list
              .filter((product: any) => filterProd(product))
              .slice(0, 10)
              .map((ar: any, ctr: number) => {
                // console.log(ar);
                return (
                  <div
                    onClick={(e) => {
                      setProdIsOpen(true);
                      setUpdateProdSummary(ar);
                    }}
                    key={ar.id}
                    className={`col-lg-2 col-md-3 col-sm-4 mix ${truncateString(
                      ar.category_name,
                      15
                    )}`}
                  >
                    <div className="featured__item">
                      <div className="prod_qty_info">
                        <span className="info_text">
                          {t("sold", {
                            sold: ar.unitsInStock || 0,
                            available: ar.units_in_stock,
                          })}
                          {/* {ar.unitsInStock} sold out of {ar.units_in_stock} */}
                        </span>
                        <div className="bar">
                          <div
                            className="progress"
                            style={{
                              width: `${
                                (ar.unitsInStock / ar.units_in_stock) * 100
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="items_wrapper">
                        <div
                          className="image_wrapper"
                          style={{
                            backgroundImage: `url('${ar?.image_url_main}')`,
                          }}
                        >
                          {/* <img src={ar?.image_url_main} alt=""/> */}
                        </div>
                        <div className="item_title">
                          {truncateString(
                            language === "ar"
                              ? ar?.product_name_ar
                              : ar.product_name,
                            15
                          )}
                        </div>
                      </div>

                      {/* <div className="bottom_nav">
                                        <div className="box">
                                            <div onClick={(e)=> {setProdIsOpen(true);setUpdateProdSummary(ar?.deal_products[0]?.product);}} className="details item">VIEW PRODUCT</div>
                                            <div className="price item">{ar?.deal_products[0]?.product?.currency_code} {numberWithCommas(ar?.deal_products[0]?.product?.unit_price)}</div>
                                            <div onClick={(e)=>{e.stopPropagation(); addToCart(ar?.deal_products[0]?.product.product_code) }} className="button item">ADD TO CART</div>
                                        </div>
                                    </div> */}
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
      <ProductDetails
        prodIsOpen={prodIsOpen}
        setProdIsOpen={setProdIsOpen}
        product={updateProdSummary}
      />
    </section>
  );
};

export default Products;
