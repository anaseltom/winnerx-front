// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import { useIonToast } from "@ionic/react";
import { checkmark } from "ionicons/icons";
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

const Products: React.FC<any> = ({
  feature,
  title,
  filterControl,
  filterBy,
}) => {
  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom") => {
    present({
      message: "Added to cart successfully",
      duration: 1500,
      position: position,
      icon: checkmark,
      color: "success",
    });
  };

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

  const addToCart = (code: any) => {
    if (localStorage.getItem("w-commerce-token-qerfdswe")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-qerfdswe")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);
      // console.log("index", prodIndex);

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

  const addToWishlist = (id: any) => {
    console.log("hello");
    if (localStorage.getItem("w-commerce-token-widerange")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-widerange")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.id === id);
      // console.log("index", prodIndex);

      console.log(prodIndex);
      if (prodIndex >= 0) {
        product_value[prodIndex].qty += 1;
        localStorage.setItem(
          "w-commerce-token-widerange",
          JSON.stringify(product_value)
        );
      } else {
        var temp_value = { id: id, qty: 1 };
        product_value.push(temp_value);
        localStorage.setItem(
          "w-commerce-token-widerange",
          JSON.stringify(product_value)
        );
      }
    } else {
      var new_value = [{ id, qty: 1 }];
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

  const filterProd = (items: any, index: number) => {
    if (
      (items.deal_products[index].price_id !== null &&
        items.deal_products[index].product_id !== null) ||
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
      // console.log("dispatching LoadProdId");
      dispatch(LoadProductId());
    }
  };

  return (
    <section className="featured spad prod_orig">
      <div className="container">
        <div
          className="row featured__filter"
          style={{ justifyContent: "center" }}
        >
          {deals &&
            deals.length > 0 &&
            deals.slice(0, 2).map((ar: any, ctr: number) => {
              return (
                <div
                  onClick={(e) => {
                    setProdIsOpen(true);
                    setUpdateProdSummary(ar?.deal_products[0]?.product);
                    addToWishlist(ar.id);
                  }}
                  key={ar.id}
                  className={`col-lg-6 col-md-12 col-sm-12 mix ${ar.categoryName}`}
                >
                  <div
                    className="featured__item"
                    style={{
                      backgroundImage: `url('assets/img/product-bg.jpeg')`,
                    }}
                  >
                    <div className="prod_qty_info">
                      <span className="info_text">
                        {ar?.deal_products[0]?.quantity_sold} sold out of{" "}
                        {ar?.deal_products[0]?.quantity_max}
                      </span>
                      <div className="bar">
                        <div className="progress"></div>
                      </div>
                    </div>

                    <div className="items_wrapper">
                      <div className="items buy">
                        <div className="item_header">BUY</div>
                        <img
                          src={ar?.deal_products[0]?.product?.image_url_main}
                          alt=""
                        />
                        <div className="item_title">
                          {ar?.deal_products[0]?.product?.product_name}
                        </div>
                        <div className="item_subtitle"></div>
                      </div>
                      <div className="items win">
                        <div className="item_header">WIN</div>
                        <img src={ar.image_url_main} alt="" />
                        <div className="item_title">{ar.name}</div>
                        <div className="item_subtitle"></div>
                      </div>
                    </div>

                    <div className="bottom_nav">
                      <div className="box">
                        <div
                          onClick={(e) => {
                            setProdIsOpen(true);
                            setUpdateProdSummary(ar?.deal_products[0]?.product);
                            // console.log(ar.deal_products[0].product);
                          }}
                          className="details item"
                        >
                          VIEW PRODUCT
                        </div>
                        <div className="price item">
                          {ar?.deal_products[0]?.product?.currency_code}{" "}
                          {numberWithCommas(
                            ar?.deal_products[0]?.product?.unit_price
                          )}
                        </div>
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(
                              ar?.deal_products[0]?.product.product_code
                            );
                            presentToast("bottom");
                          }}
                          className="button item"
                        >
                          ADD TO CART
                        </div>
                      </div>
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
