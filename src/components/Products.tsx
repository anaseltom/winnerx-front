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
  Product_Cart,
  Product_Wishlist,
  LoadProductId,
} from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "../components/ProductDetails";
import { RootStore } from "../store";

const Products: React.FC<any> = ({
  feature,
  title,
  filterControl,
  filterBy,
}) => {
  const categories = useSelector((state: RootStore) => state.categories);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const dispatch = useDispatch();
  const [filterProduct, setFilterProduct] = useState<any>(filterBy);
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);
  const [activeTab, setActiveTab] = useState<any>(1);
  const [updateProdSummary, setUpdateProdSummary] = useState<any>({});
  const DisableProductId = false;

  useEffect(() => {
    setFilterProduct(filterBy);
  }, [filterBy]);

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

  const addToWishlist = (code: any) => {
    if (localStorage.getItem("w-commerce-token-widerange")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-widerange")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);
      console.log("index", prodIndex);

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
  }, []);

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filterProd = (items: any) => {
    if (
      (items.price_id !== null && items.product_id !== null) ||
      DisableProductId
    ) {
      if (filterProduct === "") {
        if (feature == "") {
          return true;
        } else {
          return items.keywords === feature;
        }
      } else {
        return items.categoryCode === filterProduct;
      }
    } else {
      console.log("dispatching LoadProdId");
      dispatch(LoadProductId());
    }
  };

  return (
    <section className="featured spad prod_cat">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2>{title}</h2>
            </div>
            {filterControl != null && filterControl != "" && (
              <div className="featured__controls">
                <ul>
                  {feature == "" && (
                    <li
                      className={activeTab == 1 ? "active" : ""}
                      onClick={() => {
                        setFilterProduct("");
                        setActiveTab(1);
                      }}
                      data-filter="*"
                    >
                      All
                    </li>
                  )}
                  {feature == "" &&
                    categories &&
                    categories.length > 0 &&
                    categories.map((ar: any, i: number) => {
                      i += 1;
                      return (
                        <li
                          className={activeTab == ++i ? "active" : ""}
                          key={i}
                          onClick={() => {
                            setFilterProduct(ar.categoryCode);
                            setActiveTab(i);
                          }}
                          data-filter={`.${ar.categoryName}`}
                        >
                          {ar.categoryName}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className="row featured__filter"
          style={{ justifyContent: "center" }}
        >
          {products_list &&
            products_list.length > 0 &&
            products_list
              .filter((product: any) => filterProd(product))
              .map((ar: any, index: number) => {
                return (
                  <div
                    onClick={(e) => {
                      setProdIsOpen(true);
                      setUpdateProdSummary(ar);
                    }}
                    key={index}
                    className={`col-lg-2 col-md-3 col-sm-6 mix ${ar.categoryName}`}
                  >
                    <div className="featured__item">
                      <div
                        className="featured__item__pic set-bg"
                        style={{
                          backgroundImage: `url('${ar.image_url_main}')`,
                          backgroundSize: "contain",
                        }}
                        data-setbg="/assets/img/featured/feature-1.jpg"
                      >
                        <ul className="featured__item__pic__hover">
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              addToWishlist(ar.productCode);
                            }}
                          >
                            <a>
                              <img
                                className="social_media"
                                src="/assets/img/003-like.png"
                                alt=""
                              />
                            </a>
                          </li>
                          <li
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(ar.productCode);
                            }}
                          >
                            <a>
                              <img
                                className="social_media"
                                src="/assets/img/002-shopping-bag.png"
                                alt=""
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="featured__item__text">
                        <h6>
                          <a href="#">{ar.productName}</a>
                        </h6>
                        <h5>
                          {ar.currencyCode} {numberWithCommas(ar.unitPrice)}
                        </h5>
                        {/* <h5>$30.00</h5> */}
                      </div>
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
