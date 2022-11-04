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
import EntrySummary from "./EntrySummary";
import RefundDetails from "./RefundDetails";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import { Products_list } from "../actions/UserAction";
import {
  Product_Cart,
  Product_Cart_Total,
  Order_list,
  Winner_list,
} from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./ProductDetails";
import { RootStore } from "../store";
import { arch } from "os";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
const Winners: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const order_list = useSelector((state: RootStore) => state.order_list);
  const entries = useSelector((state: RootStore) => state.entries);
  const dispatch = useDispatch();
  const [refundIsOpen, setRefundIsOpen] = useState<any>(false);
  const [updateProdSummary, setUpdateProdSummary] = useState<any>({});
  const [prodIsOpen, setProdIsOpen] = useState<any>(false);

  // const {id} = useParams<any>();

  // const Child = () => {
  //   if(id)
  //   {
  //     console.log(id);
  //   }
  // }

  // useEffect(()=> {
  //     Child();
  // },[id] )

  const date_formatter = (date: any) => {
    const dates = new Date(date);

    const formattedDate = dates.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      // hour: "numeric",
      // minute: "2-digit"
    });

    return formattedDate;
  };
  const { t } = useTranslation();
  const language = i18n.language;
  var product_value = [];
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
  }

  const getProd = (code: any) => {
    var prodIndex = products_list?.findIndex(
      (s: any) => s.productCode === code
    );
    return products_list[prodIndex];
  };

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_list]);

  useEffect(() => {
    // console.log("orders");
    const user_id = dispatch(Winner_list());
  }, []);

  return (
    <>
      <Header />

      <section className="checkout spad">
        <div className="container">
          {/* <div className="checkout__form">
                        <h4>Profile</h4>
                        <form action="#">
                            <div className="row">
                                <div className="col-lg-8 col-md-12">
                                    
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>First Name<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="checkout__input">
                                                <p>Last Name<span>*</span></p>
                                                <input type="text" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkout__input">
                                        <p>Email Address<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>Home Address<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input">
                                        <p>Delivery Address<span>*</span></p>
                                        <input type="text" />
                                    </div>
                                    <div className="checkout__input__checkbox">
                                        <label>
                                            Ship to a different address?
                                            <input type="checkbox" id="diff-acc" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>
                                
                            </div>
                        </form>
                    </div>
                     */}
          <div
            className="checkout__form"
            style={{
              marginTop: "60px",
              textAlign: language === "ar" ? "right" : "left",
            }}
          >
            <h4 style={{ marginBottom: "0px" }}>{t("winners")}</h4>

            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th style={{ paddingBottom: "0" }}>{t("entry")}</th>
                    <th style={{ paddingBottom: "0" }}>{t("refrence")}</th>
                    <th style={{ paddingBottom: "0" }}>{t("price")}</th>
                    <th style={{ paddingBottom: "0" }}>{t("date")}</th>
                  </tr>
                </thead>
                <tbody>
                  {entries &&
                    entries.length > 0 &&
                    entries.map((ar: any, key: number) => {
                      ++key;
                      return (
                        <EntrySummary
                          key={key}
                          ctr={key}
                          code={ar.entry_code}
                          price={ar.deal.name}
                          date={ar.created_at}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <ProductDetails
        prodIsOpen={prodIsOpen}
        setProdIsOpen={setProdIsOpen}
        product={updateProdSummary}
      />

      <Footer />

      <RefundDetails
        refundIsOpen={refundIsOpen}
        setRefundIsOpen={setRefundIsOpen}
        product={updateProdSummary}
      />
    </>
  );
};

export default Winners;
