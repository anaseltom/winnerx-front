// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import { IonBadge, useIonToast } from "@ionic/react";
import { checkmark } from "ionicons/icons";
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link,
//     useParams
//   } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Product_Cart,
  Product_Delete,
  Product_Wishlist,
} from "../actions/UserAction";
import { RootStore } from "../store";
import i18n, { t } from "i18next";

const ProductSummary: React.FC<any> = ({ product, deal }) => {
  const dispatch = useDispatch();
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);
  const [prodQty, setProdQty] = useState<any>(1);
  const [tab, setTab] = useState<any>(1);
  const [variants, setVariants] = useState<any>([]);
  const [inStock, setInStock] = useState<any>(null);
  const [productID, setProductID] = useState<any>(null);

  const [selectedVariants, setSelectedVariants] = useState<any>(null);

  const numberWithCommas = (x: any) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const language = i18n.language;
  const [present] = useIonToast();
  const presentToast = (position: "top" | "middle" | "bottom", msg: any) => {
    present({
      message: msg,
      duration: 1500,
      position: position,
      icon: checkmark,
      color: "success",
    });
  };

  useEffect(() => {
    product && getProductId(product?.id);
    product && productID && checkProductInventory(productID);
  }, [productID, selectedVariants]);

  const getProductId = (parent_id: any) => {
    if (selectedVariants) {
      const product_name = selectedVariants
        .map((val: any) => val.value)
        .join(" / ");
      const product = products_list.filter(
        (val: any) =>
          val.parent_id == parent_id && val.product_name == product_name
      );
      if (product.length > 0) {
        setProductID(product[0].id);
      } else {
        setProductID(null);
        setInStock(0);
      }
    } else {
      setProductID(product.id);
    }
  };

  const checkProductAvailability = (id: any) => {
    const product = products_list.filter((val: any) => val.id == id);

    return true;
  };
  const checkProductInventory = (id: any) => {
    const product = products_list.filter((val: any) => val.id == id);
    if (product.length > 0) {
      if (product[0].parent_id) {
        return setInStock(product[0].units_in_stock);
      }
      return setInStock(
        product[0].deal_products[0].quantity_max -
          product[0].deal_products[0].quantity_sold
      );
    } else {
      return;
    }
  };

  const changeQty = (action: any) => {
    if (action == "dec") {
      if (prodQty > 1) {
        setProdQty(prodQty - 1);
      }
    } else if (action == "inc") {
      inStock - prodQty > 0 && setProdQty(prodQty + 1);
    }
  };
  useEffect(() => {
    // console.log(product);
    if (product?.variants) {
      setVariants(JSON.parse(product.variants));

      // console.log(selectedVariants);
    }
  }, [product]);

  const products_list = useSelector((state: RootStore) => state.products_list);

  useEffect(() => {
    if (variants[0]?.values[0] || variants[1]?.values[0]) {
      let arr = variants.map((val: any, idx: any) => {
        return { id: idx, variant: 0, value: val.values[0] };
      });
      // console.log(arr);
      setSelectedVariants([...arr]);
    }
  }, [variants]);
  const addToWishlist = (id: any) => {
    // console.log(code);
    if (localStorage.getItem("w-commerce-token-widerange")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-widerange")!
      );
      var prodIndex = product_value?.findIndex((s: any) => {
        // console.log(s);
        return s.id === id;
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
        var temp_value = { id, qty: 1 };
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

  const addToCart = (id: any, dealId: any) => {
    if (selectedVariants) {
      var product = products_list.filter(
        (val: any) =>
          val.parent_id == id &&
          val.product_name ==
            `${selectedVariants[0]?.value} / ${selectedVariants[1]?.value}`
      );
      if (localStorage.getItem("w-commerce-token-qerfdswe")) {
        var product_value = JSON.parse(
          localStorage.getItem("w-commerce-token-qerfdswe")!
        );
        var prodIndex = product_value?.findIndex(
          (s: any) => s.id === product[0].id
        );

        if (prodIndex >= 0) {
          product_value[prodIndex].qty += prodQty;
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
        } else {
          var temp_value = {
            id: product[0].id,
            qty: prodQty,
            deal_id: dealId || null,
          };
          product_value.push(temp_value);
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
        }
      } else {
        var new_value = [
          { id: product[0].id, qty: prodQty, deal_id: dealId || null },
        ];
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(new_value)
        );
      }
    } else {
      if (localStorage.getItem("w-commerce-token-qerfdswe")) {
        var product_value = JSON.parse(
          localStorage.getItem("w-commerce-token-qerfdswe")!
        );
        var prodIndex = product_value?.findIndex((s: any) => s.id === id);

        if (prodIndex >= 0) {
          product_value[prodIndex].qty += prodQty;
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
        } else {
          var temp_value = {
            id,
            qty: prodQty,
            deal_id: dealId || null,
          };
          product_value.push(temp_value);
          localStorage.setItem(
            "w-commerce-token-qerfdswe",
            JSON.stringify(product_value)
          );
        }
      } else {
        var new_value = [{ id, qty: prodQty, deal_id: dealId || null }];
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(new_value)
        );
      }
    }
    // console.log(localStorage.getItem("w-commerce-token-qerfdswe"));
    dispatch(Product_Cart());
  };
  // console.log(localStorage.getItem("w-commerce-token-qerfdswe"));

  return tab == 1 ? (
    <>
      <section
        className="product-details spad"
        style={{ textAlign: language === "en" ? "left" : "right" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item--large"
                    src={`${product?.image_url_main}`}
                    alt=""
                  />
                </div>

                {/* <div className="product__details__pic__slider owl-carousel">
                                <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                    src="img/product/details/thumb-1.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                    src="img/product/details/thumb-2.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                    src="img/product/details/thumb-3.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                    src="img/product/details/thumb-4.jpg" alt="" />
                            </div> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div
                style={{
                  margin: "10px 0 0 0",
                  display: "flex",
                }}
              >
                {(deal || product?.deal_products[0]?.deal) && (
                  <button
                    className={`product-deal-tab${tab == 1 && "-active"}`}
                    style={{ margin: "0 10px" }}
                    onClick={() => setTab(1)}
                  >
                    {t("product_details")}
                  </button>
                )}
                {(deal || product?.deal_products[0]?.deal) && (
                  <button
                    className="product-deal-tab"
                    onClick={() => setTab(2)}
                  >
                    {t("prize_details")}
                  </button>
                )}
              </div>
              <div className="product__details__text">
                <h3>
                  {language === "en"
                    ? product?.product_name
                    : product?.product_name_ar}
                </h3>
                {/* <div className="product__details__rating">
                  <img
                    className="social_media"
                    src="/assets/img/star.png"
                    alt=""
                  />
                  <img
                    className="social_media"
                    src="/assets/img/star.png"
                    alt=""
                  />
                  <img
                    className="social_media"
                    src="/assets/img/star.png"
                    alt=""
                  />
                  <img
                    className="social_media"
                    src="/assets/img/star.png"
                    alt=""
                  />
                  <span>(18 reviews)</span>
                </div> */}
                {/* {console.log(selectedVariants)} */}

                <div className="product__details__price">
                  {product?.currency_code}{" "}
                  {numberWithCommas(product?.unit_price)}
                </div>
                <p style={{ whiteSpace: "pre-line" }}>
                  {language === "en"
                    ? product?.description
                    : product?.description_ar}
                </p>
                {inStock > 0 && (
                  <h5>
                    {t("left_in_stock")}
                    {inStock}
                  </h5>
                )}
                {inStock <= 0 && <h5>{t("empty_stock")}</h5>}
                {variants.length > 0 &&
                  (variants[0]?.values[0] || variants[1]?.values[0]) &&
                  variants.map((val: any, index: any) => (
                    <div>
                      <h3>{val.name}</h3>
                      {val?.values?.length > 0 ? (
                        val?.values?.map((values: any, idx: any) => (
                          <IonBadge
                            color={
                              selectedVariants &&
                              selectedVariants[index]?.variant == idx
                                ? "primary"
                                : "medium"
                            }
                            key={idx}
                            // color={"dark"}
                            onClick={() => {
                              let newArray = selectedVariants?.map(
                                (obj: any) => {
                                  if (obj.id == index)
                                    return {
                                      ...obj,
                                      variant: idx,
                                      value: values,
                                    };
                                  return obj;
                                }
                              );
                              setSelectedVariants(newArray);
                            }}
                            style={{
                              width: "fit-content",
                              minWidth: "50px",
                              fontSize: "18px",
                              margin: "0 5px",
                              cursor: "pointer",
                            }}
                          >
                            {values}
                          </IonBadge>
                        ))
                      ) : (
                        <h6>no {val.name} available</h6>
                      )}
                    </div>
                  ))}

                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <span
                        onClick={() => {
                          changeQty("dec");
                        }}
                        className="dec qtybtn"
                      >
                        -
                      </span>
                      <input type="text" value={prodQty} disabled />
                      <span
                        onClick={() => {
                          changeQty("inc");
                        }}
                        className="inc qtybtn"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(
                      product?.id,
                      deal?.id || product?.deal_products[0]?.deal?.id || null
                    );
                    presentToast("bottom", "Added to cart successfuly");
                  }}
                  className="primary-btn"
                  style={{
                    letterSpacing: language === "ar" ? "0" : "3px",
                    fontSize: language === "ar" ? "16px" : "14px",
                    background: inStock <= 0 ? "#3B3B3B" : "",
                  }}
                  disabled={inStock <= 0}
                >
                  {t("add_to_cart")}
                </button>
                <a
                  className="heart-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    addToWishlist(product?.id);
                    presentToast("bottom", "Added to wishlist successfuly");
                  }}
                >
                  <img
                    className="social_media"
                    src="/assets/img/003-like.png"
                    alt=""
                  />
                </a>
                {/* <ul> */}
                {/* <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                <li><b>Weight</b> <span>0.5 kg</span></li> */}
                {/* <li><b>Share on</b>
                                    <div className="share">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </div>
                                </li> */}
                {/* </ul> */}
              </div>
            </div>
            {/* <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      {t("description")}
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="tabs-1" role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>{t("products_infomation")}</h6>
                      <p>
                        {language === "en"
                          ? product?.description
                          : product?.description_ar}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </>
  ) : (
    (deal || product?.deal_products[0]?.deal) && (
      <section
        className="product-details spad"
        style={{ textAlign: language === "en" ? "left" : "right" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="product__details__pic">
                <div className="product__details__pic__item">
                  <img
                    className="product__details__pic__item--large"
                    src={`${
                      deal?.image_url_main ||
                      product?.deal_products[0].deal.image_url_main
                    }`}
                    alt=""
                  />
                </div>
                {/* {console.log(JSON.parse(product?.variants))} */}
                {/* <div className="product__details__pic__slider owl-carousel">
                                <img data-imgbigurl="img/product/details/product-details-2.jpg"
                                    src="img/product/details/thumb-1.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-3.jpg"
                                    src="img/product/details/thumb-2.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-5.jpg"
                                    src="img/product/details/thumb-3.jpg" alt="" />
                                <img data-imgbigurl="img/product/details/product-details-4.jpg"
                                    src="img/product/details/thumb-4.jpg" alt="" />
                            </div> */}
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div
                style={{
                  margin: "10px 0 0 0",
                  display: "flex",
                }}
              >
                <button
                  className="product-deal-tab"
                  style={{ margin: "0 10px" }}
                  onClick={() => setTab(1)}
                >
                  {t("product_details")}
                </button>
                <button
                  className={`product-deal-tab${tab == 2 && "-active"}`}
                  onClick={() => setTab(2)}
                >
                  {t("prize_details")}
                </button>
              </div>
              <div className="product__details__text">
                <h3>
                  {language === "en"
                    ? deal?.name || product?.deal_products[0]?.deal?.name
                    : deal?.name_ar || product?.deal_products[0]?.deal?.name_ar}
                </h3>
                {/* <div className="product__details__rating">
                <img
                  className="social_media"
                  src="/assets/img/star.png"
                  alt=""
                />
                <img
                  className="social_media"
                  src="/assets/img/star.png"
                  alt=""
                />
                <img
                  className="social_media"
                  src="/assets/img/star.png"
                  alt=""
                />
                <img
                  className="social_media"
                  src="/assets/img/star.png"
                  alt=""
                />
                <span>(18 reviews)</span>
              </div> */}
                <div className="product__details__price">
                  {product?.currency_code}{" "}
                  {numberWithCommas(product?.unit_price)}
                </div>
                <p style={{ whiteSpace: "pre-line" }}>
                  {language === "en"
                    ? deal?.description ||
                      product?.deal_products[0]?.deal?.description
                    : deal?.description_ar ||
                      product?.deal_products[0]?.deal?.description}
                </p>

                <div className="product__details__quantity">
                  <div className="quantity">
                    <div className="pro-qty">
                      <span
                        onClick={() => {
                          changeQty("dec");
                        }}
                        className="dec qtybtn"
                      >
                        -
                      </span>
                      <input type="text" value={prodQty} disabled />
                      <span
                        onClick={() => {
                          changeQty("inc");
                        }}
                        className="inc qtybtn"
                      >
                        +
                      </span>
                    </div>
                  </div>
                </div>
                {/* {console.log(product.variants)} */}
                <button
                  onClick={() => {
                    addToCart(
                      product?.id,
                      deal?.id || product?.deal_products[0]?.deal?.id || null
                    );
                    presentToast("bottom", "Added to cart successfuly");
                  }}
                  className="primary-btn"
                  style={{
                    letterSpacing: language === "ar" ? "0" : "3px",
                    fontSize: language === "ar" ? "16px" : "14px",
                  }}
                >
                  {t("add_to_cart")}
                </button>
                <a
                  className="heart-icon"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    addToWishlist(product?.id);
                    presentToast("bottom", "Added to wishlist successfuly");
                  }}
                >
                  <img
                    className="social_media"
                    src="/assets/img/003-like.png"
                    alt=""
                  />
                </a>
                <ul>
                  {/* {product?.units_in_stock > 0 ? (
                  <li>
                    <b>{t("availability")}</b> <span>{t("in_stock")}</span>
                  </li>
                ) : (
                  <li>
                    <b>{t("availability")}</b> <span>{t("out_of_stock")}</span>
                  </li>
                )} */}
                  {/* <li><b>Shipping</b> <span>01 day shipping. <samp>Free pickup today</samp></span></li>
                                <li><b>Weight</b> <span>0.5 kg</span></li> */}
                  {/* <li><b>Share on</b>
                                    <div className="share">
                                        <a href="#"><i className="fa fa-facebook"></i></a>
                                        <a href="#"><i className="fa fa-twitter"></i></a>
                                        <a href="#"><i className="fa fa-instagram"></i></a>
                                        <a href="#"><i className="fa fa-pinterest"></i></a>
                                    </div>
                                </li> */}
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-12">
            <div className="product__details__tab">
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                    aria-selected="true"
                  >
                    {t("description")}
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                <div className="tab-pane active" id="tabs-1" role="tabpanel">
                  <div className="product__details__tab__desc">
                    <h6>{t("products_infomation")}</h6>
                    <p>
                      {language === "en"
                        ? product?.description
                        : product?.description_ar}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </section>
    )
  );
};

export default ProductSummary;
