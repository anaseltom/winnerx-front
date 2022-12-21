// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import { useIonToast } from "@ionic/react";
import { checkmark, close } from "ionicons/icons";
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
import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { RootStore } from "../store";
import i18n, { t } from "i18next";

const Products: React.FC<any> = ({
  feature,
  title,
  filterControl,
  filterBy,
}) => {
  const [present] = useIonToast();
  const presentToast = (
    position: "top" | "middle" | "bottom",
    icon: any,
    color: any,
    msg: any
  ) => {
    present({
      message: msg,
      duration: 1500,
      position: position,
      icon: icon,
      color: color,
    });
  };

  const categories = useSelector((state: RootStore) => state.categories);
  const products_list = useSelector((state: RootStore) => state.products_list);
  const deals = useSelector((state: RootStore) => state.deals);
  const dispatch = useDispatch();
  const [filterProduct, setFilterProduct] = useState<any>(filterBy);
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);
  const [activeTab, setActiveTab] = useState<any>(1);
  const [indexOfFirstProduct, setFirstIndex] = useState<any>([]);
  const [updateProdSummary, setUpdateProdSummary] = useState<any>({});
  const [updateDealSummary, setUpdateDealSummary] = useState<any>({});
  const DisableProductId = false;
  const language = i18n.language;

  useEffect(() => {
    const map =
      deals.length > 0 &&
      deals?.map((val: any, idx: any) => {
        // console.log(val);
        return {
          id: idx,
          product_id: val?.deal_products[0]?.product ? 0 : null,
        };
      });
    map.length > 0 && setFirstIndex(map);
    // console.log(map);
  }, [deals]);

  // console.log(updateDealSummary);

  useEffect(() => {
    setFilterProduct(filterBy);
  }, [filterBy]);

  useEffect(() => {}, [deals]);

  const getProductId = (parent_id: any, name: any) => {};

  const checkProductAvailability = (id: any) => {
    const product = products_list.filter((val: any) => val.id == id);
  };

  const addToCart = (id: any, dealID: any) => {
    const prod = products_list.filter((val: any) => val.id == id);
    if (prod.length > 0) {
      const variants = JSON.parse(prod[0]?.variants);
      if (variants.length > 0 && variants[0]?.values[0]) {
        presentToast("bottom", close, "danger", t("product_variants"));
        setProdIsOpen(true);
        setUpdateProdSummary(prod[0]);
        // setUpdateDealSummary(prod[0]?.deal_products[0]?.deal);
        return;
      }
      if (localStorage.getItem("w-commerce-token-qerfdswe")) {
        var product_value = JSON.parse(
          localStorage.getItem("w-commerce-token-qerfdswe")!
        );
        var prodIndex = product_value?.findIndex((s: any) => s.id === id);

        if (prodIndex >= 0) {
          product_value[prodIndex].qty += 1;
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
          presentToast("bottom", checkmark, "success", t("added_to_cart"));
        } else {
          var temp_value = { id, qty: 1, deal_id: dealID };
          product_value.push(temp_value);
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
          presentToast("bottom", checkmark, "success", t("added_to_cart"));
        }
      } else {
        var new_value = [{ id, qty: 1, deal_id: dealID }];
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(new_value)
        );
        presentToast("bottom", checkmark, "success", t("added_to_cart"));
      }
    }
    dispatch(Product_Cart());
  };

  const addToWishlist = (code: any) => {
    // console.log(code);
    if (localStorage.getItem("w-commerce-token-widerange")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-widerange")!
      );
      var prodIndex = product_value?.findIndex((s: any) => {
        // console.log(s);
        return s.code === code;
      });
      // console.log("index", prodIndex);
      // console.log(prodIndex);
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
      var new_value = [{ code, qty: 1 }];
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
    if (!x) return null;
    if (typeof x === "number") {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
      <div>
        {/* <div
          style={{ width: "100%", height: "500px", background: "red" }}
        ></div> */}
        {indexOfFirstProduct.length > 0 && (
          <div
            className="row featured__filter"
            style={{
              // justifyContent: "center",
              // display: "inline",
              margin: "0",
              overflowY: "hidden",
              width: "100vw",
              height: "550px",
              whiteSpace: "nowrap",
              display: "flex",
              flexDirection: "column",
              // background: "red",
            }}
          >
            {deals &&
              deals.length > 0 &&
              deals.map((ar: any, ctr: number) => {
                // console.log(ar.deal_products[0]);
                return (
                  <div
                    style={{ minWidth: "600px", flex: 1, margin: "0 50px" }}
                    // onClick={(e) => {
                    //   setProdIsOpen(true);
                    //   setUpdateProdSummary(ar?.deal_products[0]?.product);
                    //   // addToWishlist(ar?.deal_products[0]?.product.product_code);
                    // }}
                    key={ar.id}
                    // className={`col-sm-8  mix ${ar.categoryName}`}
                  >
                    <div
                      className="featured__item"
                      style={{
                        backgroundImage: `url('assets/img/product-bg.jpeg')`,
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        height: "fit-content",
                      }}
                    >
                      <div
                        className="prod_qty_info"
                        style={{
                          marginRight: language === "ar" ? "20px" : "",
                          position: "static",
                          paddingTop: "10px",
                          height: "fit-content",
                        }}
                      >
                        {/* {console.log(indexOfFirstProduct[ctr].product_id)} */}
                        {/* {console.log(
                        "hello",
                        ar?.deal_products[indexOfFirstProduct[ctr].product_id]
                      )} */}
                        {indexOfFirstProduct[ctr]?.product_id != null && (
                          <span className="info_text">
                            {/* تحتاج تعديلا */}
                            {t("sold", {
                              sold: ar.deal_products[
                                indexOfFirstProduct[ctr].product_id
                              ].quantity_sold,
                              available:
                                ar.deal_products[
                                  indexOfFirstProduct[ctr].product_id
                                ].quantity_max,
                            })}
                            {/* {ar?.deal_products[0]?.quantity_sold || 5} sold out of{" "}
                          {ar?.deal_products[0]?.quantity_max ||} */}
                          </span>
                        )}
                        {indexOfFirstProduct[ctr].product_id != null && (
                          <div className="bar">
                            <div
                              className="progress"
                              style={{
                                width: `${
                                  (ar.deal_products[
                                    indexOfFirstProduct[ctr].product_id
                                  ].quantity_sold /
                                    ar.deal_products[
                                      indexOfFirstProduct[ctr].product_id
                                    ].quantity_max) *
                                  100
                                }%`,
                                display: "block",
                              }}
                            ></div>
                          </div>
                        )}
                        <div
                          style={{ width: "60%", margin: "10px auto 0 auto" }}
                        >
                          <IonList style={{ borderRadius: "20px" }}>
                            <IonItem>
                              <IonSelect
                                placeholder="Select Product"
                                interface="action-sheet"
                                onIonChange={(ev: any) => {
                                  const newArray = indexOfFirstProduct.map(
                                    (obj: any) => {
                                      if (obj.id == ctr) {
                                        return {
                                          ...obj,
                                          product_id: ev.detail.value,
                                        };
                                      }
                                      return obj;
                                    }
                                  );
                                  setFirstIndex(newArray);
                                }}
                              >
                                {ar?.deal_products?.map(
                                  (value: any, idx: any) => {
                                    return (
                                      value?.product !== null && (
                                        <IonSelectOption
                                          value={idx}
                                          key={idx}
                                          style={{ background: "black" }}
                                        >
                                          {value?.product?.product_name}
                                        </IonSelectOption>
                                      )
                                    );
                                  }
                                )}
                              </IonSelect>
                            </IonItem>
                          </IonList>
                        </div>
                      </div>

                      <div
                        className="items_wrapper"
                        style={{ alignItems: "center" }}
                      >
                        {indexOfFirstProduct[ctr].product_id != null && (
                          <div className="items buy">
                            <div className="item_header">{t("buy")}</div>

                            <img
                              src={
                                ar?.deal_products[
                                  indexOfFirstProduct[ctr].product_id
                                ]?.product?.image_url_main
                              }
                              alt=""
                            />
                            <div className="item_title"></div>
                            <div>
                              <h1 className="item_subtitle">
                                {language === "en"
                                  ? ar?.deal_products[
                                      indexOfFirstProduct[ctr].product_id
                                    ]?.product?.product_name
                                  : ar?.deal_products[
                                      indexOfFirstProduct[ctr].product_id
                                    ]?.product?.product_name_ar}
                              </h1>
                            </div>
                          </div>
                        )}
                        <div className="items win">
                          <div className="item_header">{t("win")}</div>

                          <img
                            src={ar.image_url_main}
                            style={{
                              // width: "100%",
                              height: "fit-content",
                              scale: "1.5",
                            }}
                            alt=""
                          />
                          <div>
                            <h1 className="item_title">
                              {language === "en" ? ar.name : ar.name_ar}
                            </h1>
                          </div>
                          <div className="item_subtitle"></div>
                        </div>
                      </div>

                      {indexOfFirstProduct[ctr]?.product_id != null && (
                        <div className="bottom_nav">
                          <div className="box" style={{ height: "50px" }}>
                            <div
                              onClick={(e) => {
                                setProdIsOpen(true);
                                setUpdateProdSummary(
                                  ar?.deal_products[
                                    indexOfFirstProduct[ctr].product_id
                                  ]?.product
                                );
                                setUpdateDealSummary(ar);
                                // console.log(ar.id);
                              }}
                              className="details item"
                              style={{
                                fontSize: language === "ar" ? "16px" : "12px",
                                fontWeight: "bold",
                                borderRight:
                                  language === "en" ? "solid .5px gray" : "",
                                borderLeft:
                                  language === "ar" ? "solid .5px gray" : "",
                              }}
                            >
                              {t("view_product")}
                            </div>
                            {indexOfFirstProduct[ctr].product_id != null && (
                              <div
                                className="price item"
                                style={{
                                  fontSize: "15px",
                                }}
                              >
                                {
                                  ar?.deal_products[
                                    indexOfFirstProduct[ctr].product_id
                                  ]?.product?.currency_code
                                }{" "}
                                {numberWithCommas(
                                  ar?.deal_products[
                                    indexOfFirstProduct[ctr].product_id
                                  ]?.product?.unit_price ||
                                    ar?.deal_products[
                                      indexOfFirstProduct[ctr].product_id
                                    ]?.product?.unitPrice
                                )}
                              </div>
                            )}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(
                                  ar?.deal_products[
                                    indexOfFirstProduct[ctr].product_id
                                  ]?.product?.id,
                                  ar.id
                                );
                              }}
                              className="button item"
                              style={{
                                fontSize: language === "ar" ? "16px" : "12px",
                                fontWeight: "bold",
                                borderRight:
                                  language === "ar" ? "solid .5px gray" : "",
                                borderLeft:
                                  language === "en" ? "solid .5px gray" : "",
                              }}
                            >
                              {t("add_to_cart")}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <ProductDetails
        prodIsOpen={prodIsOpen}
        setProdIsOpen={setProdIsOpen}
        product={updateProdSummary}
        deal={updateDealSummary}
      />
    </section>
  );
};

export default Products;
