// import { Redirect, Route, Link } from 'react-router-dom';
import { IonReactRouter } from "@ionic/react-router";
import { useIonToast } from "@ionic/react";
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

const ProductSummary: React.FC<any> = ({ product }) => {
  const dispatch = useDispatch();
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);
  const [prodQty, setProdQty] = useState<any>(1);

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

  const changeQty = (action: any) => {
    if (action == "dec") {
      if (prodQty > 1) {
        setProdQty(prodQty - 1);
      }
    } else if (action == "inc") {
      setProdQty(prodQty + 1);
    }
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

  const addToCart = (code: any) => {
    if (localStorage.getItem("w-commerce-token-qerfdswe")) {
      var product_value = JSON.parse(
        localStorage.getItem("w-commerce-token-qerfdswe")!
      );
      var prodIndex = product_value?.findIndex((s: any) => s.code === code);

      if (prodIndex >= 0) {
        product_value[prodIndex].qty += prodQty;
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(product_value)
        );
      } else {
        var temp_value = { code: code, qty: prodQty };
        product_value.push(temp_value);
        localStorage.setItem(
          "w-commerce-token-qerfdswe",
          JSON.stringify(product_value)
        );
      }
    } else {
      var new_value = [{ code: code, qty: prodQty }];
      localStorage.setItem(
        "w-commerce-token-qerfdswe",
        JSON.stringify(new_value)
      );
    }
    dispatch(Product_Cart());
  };

  return (
    <>
      {/* {console.log("This is the selected products:", product)} */}
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
              <div className="product__details__text">
                <h3>
                  {language === "en"
                    ? product?.product_name
                    : product?.product_name_ar}
                </h3>
                <div className="product__details__rating">
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
                  {/* <span>(18 reviews)</span> */}
                </div>
                <div className="product__details__price">
                  {product?.currency_code}{" "}
                  {numberWithCommas(product?.unit_price)}
                </div>
                <p>
                  {language === "en"
                    ? product?.description
                    : product?.description_ar}
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
                <button
                  onClick={() => {
                    addToCart(product?.product_code);
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
                    addToWishlist(product?.product_code);
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
                  {product?.units_in_stock > 0 ? (
                    <li>
                      <b>{t("availability")}</b> <span>{t("in_stock")}</span>
                    </li>
                  ) : (
                    <li>
                      <b>{t("availability")}</b>{" "}
                      <span>{t("out_of_stock")}</span>
                    </li>
                  )}
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
            <div className="col-lg-12">
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSummary;
