import { IonReactRouter } from "@ionic/react-router";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonImg,
  IonRouterOutlet,
  IonApp,
  IonTabButton,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonContent,
  IonItemDivider,
  IonListHeader,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import CheckoutSummary from "../components/CheckoutSummary";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";
import { Products_list } from "../actions/UserAction";
import {
  Product_Cart,
  Product_Cart_Total,
  Products_Billing,
  users,
  UserAddresses,
} from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import { RootStore } from "../store";

// import {
//   CardElement,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from "@stripe/react-stripe-js";
import StatusMessages, { useMessages } from "./StatusMessages";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { add, addOutline, checkmark, close } from "ionicons/icons";
import { apiUrl } from "../utilities/axios";

const country = "AE";

const CheckOut: React.FC<any> = ({ feature, title, filterControl }) => {
  const { t } = useTranslation();
  const [present] = useIonToast();
  const presentToast = (
    position: "top" | "middle" | "bottom",
    msg: any,
    color: any,
    icon: any
  ) => {
    present({
      message: msg,
      duration: 1500,
      position: position,
      icon,
      color,
    });
  };

  const language = i18n.language;
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  // console.log(products_cart);
  const billing = useSelector((state: RootStore) => state.user_addresses);
  // console.log(billing);
  const userProfile = useSelector((state: RootStore) => state.user);
  // console.log(products_cart_total);
  const user = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  // let productsBilling: any = [];
  const [productsBilling, setProductsBilling] = useState<any>([]);
  // const [cardDetails, setCardDetails] = useState<any>({
  //   card: "",
  //   mo_ex: "",
  //   yr_ex: "",
  //   cvv: "",
  // });
  const [processpay, setProcessPay] = useState<any>(false);
  const [billingAddress, setBillingAddress] = useState<any>({});

  // useEffect(() => {
  //   if(!localStorage.getItem('session_id')) {
  //       window.location.href = "/signin/redirect";
  //   }
  //   }, []);

  // made by anas

  const history = useHistory();

  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    // console.log("categories");
    dispatch(UserAddresses());
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
  if (localStorage.getItem("w-commerce-token-qerfdswe")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-qerfdswe")!
    );
  }

  useEffect(() => {
    dispatch(Product_Cart_Total(products_list, products_cart));
  }, [products_list]);

  const confirmCheckout = () => {
    dispatch(Products_Billing(productsBilling, products_cart_total));
  };

  // const stripe = useStripe();
  // const elements = useElements();

  const [items, setItems] = useState<any>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [currency, setCurrencty] = useState<string>("aed");
  const [messages, addMessage] = useMessages();
  const [paymentType, setPaymenetType] = useState<string>("pay with card");
  const [addLocation, setAddLocation] = useState<boolean>(false);
  const [success, setSuccess] = useState<number>(0);

  const inputStyle = {
    iconColor: "#c4f0ff",
    color: "black",
    fontWeight: "500",
    border: "1px solid",
    borderColor: "black",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#00000",
    },
  };
  const [url, setUrl] = useState("");

  useEffect(() => {
    var tempData: any = [];

    products_list.length > 0 &&
      products_cart &&
      products_cart.length > 0 &&
      products_cart.map((ar: any, key: number) => {
        const prod = getProd(ar.id);
        tempData = [
          ...tempData,
          {
            currency: prod?.currencyCode,
            name: prod?.productName,
            price: prod?.unitPrice,
            price_id: prod?.price_id,
            product_id: prod?.id,
            productCode: prod?.productCode,
            quantity: ar?.qty,
            status: "in_warehouse",
          },
        ];
      });

    setItems(tempData);
    setProductsBilling(tempData);
  }, [setProductsBilling, products_cart, products_list]);

  // const handleSubmit = async (e: any) => {}
  // console.log(productsBilling);
  const getOrderArray = async () => {
    let array = products_cart?.map((ar: any, key: number) => {
      const prod = getProd(ar.id);
      // console.log(ar.deal_id);
      return {
        product_id: prod.id,
        quantity: ar.qty,
        price: prod.unit_price,
        deal_id: ar.deal_id || prod.deal_products[0].deal_id,
      };
    });
    return array;
    // history.push("/");
  };

  const createOrder = (array: any) => {
    if (array.length > 0) {
      axios
        .post(`${apiUrl}/api/v1/orders/update`, {
          id: 0,
          customer_id: userProfile.id,
          status: "active",
          items: array,
          payment_status: "unpaid",
          payment_type: "cash on delivery",
          billingAddress,
          user_addresses: { ...billingAddress, customer_id: userProfile.id },
        })
        .then((res) => {
          setSuccess(1);
          localStorage.setItem("w-commerce-token-qerfdswe", JSON.stringify([]));
          // setTimeout(() => {
          //   history.push("/");
          // }, 5000);
        })
        .catch((err) => {
          return setSuccess(2);
        });
    }
  };

  const getProd = (id: any) => {
    var prodIndex = products_list?.findIndex((s: any) => s.id === id);
    return products_list[prodIndex];
  };
  const handleSubmit = async (e: any) => {
    // We don't want to let default form submission happen here,
    e.preventDefault();
    // which would refresh the page.
    if (products_cart.length > 0) {
      if (billingAddress?.country && billingAddress?.city) {
        if (paymentType !== "cash on delivery") {
          setLoader("");
          const response = await axios.post(`${apiUrl}/payment_api`, {
            amount: products_cart_total?.total,
          });
          localStorage.setItem(
            "w-commerce-billing-address",
            JSON.stringify(billingAddress)
          );
          setBillingAddress({});

          const url = response?.data?.data?._links?.payment?.href;
          // console.log(resp);
          if (url) {
            window.location.href = url;
            setLoader("loader_remove");
          }
        } else {
          const newArray = await getOrderArray();
          createOrder(newArray);
        }
      } else {
        presentToast(
          "bottom",
          "Please fill the shipping address",
          "danger",
          close
        );
      }
    } else {
      presentToast("bottom", "No products in cart", "danger", close);
    }

    // console.log(response.data);
    // window.location.replace(url);
    // if(processpay)
    // {
    //     return;
    // }

    // // payment is in process
    // setProcessPay(true);

    // console.log("updated data", productsBilling)
    // console.log("user Customer id", user?.customer?.customer_id)
    // // setItems(productsBilling);

    // if (!stripe || !elements) {
    //   // Stripe.js has not yet loaded.
    //   // Make sure to disable form submission until Stripe.js has loaded.
    //   // addMessage("Stripe.js has not yet loaded.");
    //   return;
    // }

    // const { error: backendError, clientSecret } = await axios
    //   .post(
    //     "https://api.winnerx.shop/api/v1/stripe/create-invoice-intent",
    //     {
    //       customerId: user?.customer?.customer_id,
    //       paymentMethodType: "card",
    //       currency,
    //       // productsBilling,
    //       items,
    //     }
    //   )
    //   .then((r: any) => r.data);

    // if (backendError) {
    //   // addMessage(backendError.message);
    //   return;
    // }

    // // addMessage("Client secret returned");

    // const card: any = elements.getElement(CardElement);
    // console.log("this is the card", card);
    // const { error: stripeError, paymentIntent } =
    //   await stripe.confirmCardPayment(clientSecret, {
    //     payment_method: {
    //       card,
    //       billing_details: {
    //         name: "Auric Gavin",
    //         email: "auric.gavin@tividad.com",
    //         address: {
    //           line1: 'Silicon Oasis',
    //           city: 'Dubai',
    //           state: 'Dubai',
    //           country: 'AE',
    //           postal_code: '00000'
    //         }
    //       },
    //     },
    //   });

    // if (stripeError) {
    //   // Show error to your customer (e.g., insufficient funds)
    //   // addMessage(stripeError.message);
    //   ////// e.complete("fail");
    //   return;
    // }

    // //////e.complete("success");

    // // Check if the PaymentIntent requires any actions and if so let Stripe.js
    // // handle the flow. If using an API version older than "2019-02-11" instead
    // // instead check for: `paymentIntent.status === "requires_source_action"`.
    // if (paymentIntent.status === "requires_action") {
    //   // Let Stripe.js handle the rest of the payment flow.
    //   let { error, paymentIntent } = await stripe.confirmCardPayment(
    //     clientSecret
    //   );
    //   if (error) {
    //     // The payment failed -- ask your customer for a new payment method.
    //     // addMessage(error.message);
    //     paymentError();
    //     return;
    //   }
    //   // addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    // }

    // // Show a success message to your customer
    // // There's a risk of the customer closing the window before callback
    // // execution. Set up a webhook or plugin to listen for the
    // // payment_intent.succeeded event that handles any business critical
    // // post-payment actions.
    // addMessage(`Payment ${paymentIntent.status}: ${paymentIntent.id}`);
    // if(paymentIntent.status === "succeeded")
    // {
    //   paymentSuccess(paymentIntent);
    // }
  };

  const paymentSuccess = (intent: any) => {
    // console.log("stripe response", intent);
    // alert("success payment");
    dispatch(Products_Billing(items, products_cart_total));
  };

  const paymentError = () => {
    alert("Payment unsuccessful, please try again");
  };

  const [loader, setLoader] = useState<any>("loader_remove");

  const selectCountry = (value: any) => {
    setBillingAddress({ ...billingAddress, country: value });
  };

  const selectRegion = (value: any) => {
    setBillingAddress({ ...billingAddress, city: value });
  };
  // useEffect(() => {
  //   setTimeout(function () {}, 500);
  //   console.log(loader);
  // }, []);

  return (
    <>
      <div id="preloder" className={loader}>
        <div className="loader"></div>
      </div>
      <Header />
      <section
        className="checkout spad"
        style={{ textAlign: language === "ar" ? "right" : "left" }}
      >
        <div className="container">
          <div className="checkout__form">
            <h4>{t("billing_details")}</h4>
            <form id="payment-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <p>{t("delivery")} </p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: "15px",
                    }}
                  >
                    {billing.length > 0 && (
                      <>
                        <IonList style={{ borderRadius: "20px", width: "80%" }}>
                          <IonItem>
                            <IonSelect
                              placeholder={t("delivery_location")}
                              interface="action-sheet"
                              onIonChange={(e) => {
                                setBillingAddress(e.detail.value);
                              }}
                            >
                              {billing.length > 0 &&
                                billing.map((val: any, idx: any) => (
                                  <IonSelectOption key={idx} value={val}>
                                    {val.address}
                                  </IonSelectOption>
                                ))}
                            </IonSelect>
                          </IonItem>
                        </IonList>
                        <button
                          style={{
                            height: "55%",
                            margin: "auto 0",
                            color: "#dcb841",
                            background: "#000",
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            setAddLocation(true);
                          }}
                        >
                          <IonIcon icon={add} size="large"></IonIcon>
                        </button>
                      </>
                    )}
                  </div>
                  {/* <div className="checkout__input">
                    <p>
                      Credit Card # 16digits:<span>*</span>
                    </p>
                    <input value={cardDetails.card} onChange={(e)=>{ setCardDetails({...cardDetails, card:e.target.value}) }} type="number" placeholder="xxxxxxxxxxxxxxxx"/>
                    <CardElement
                      id="card"
                      options={{
                        style: {
                          base: inputStyle,
                        },
                      }}
                    />
                  </div> */}
                  {/* {url && (
                    <iframe
                      className="col-lg-12"
                      src={url}
                      style={{
                        position: "absolute",
                        zIndex: 12,
                        width: "1200px",
                        height: "500px",
                      }}
                    ></iframe>
                  )} */}
                  {/* <div className="row">
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>Card Expiry Date<span>*</span></p>
                                            <div className="input_wrapper">
                                                <input value={cardDetails.mo_ex} onChange={(e)=>{ setCardDetails({...cardDetails, mo_ex:e.target.value}) }} type="number" placeholder="MM" />
                                                <span>/</span>
                                                <input value={cardDetails.yr_ex} onChange={(e)=>{ setCardDetails({...cardDetails, yr_ex:e.target.value}) }} type="number" placeholder="YY" />
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="checkout__input">
                                            <p>CVV<span>*</span></p>
                                            <input value={cardDetails.cvv} onChange={(e)=>{ setCardDetails({...cardDetails, cvv:e.target.value}) }} type="number" placeholder="xxx"/>
                                        </div>
                                    </div>
                                </div> */}

                  {(addLocation || billing.length < 1) && (
                    <>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              {t("complete_add")} <span>*</span>
                            </p>
                            <input
                              type="text"
                              required
                              name="address"
                              onChange={(e) => {
                                setBillingAddress({
                                  ...billingAddress,
                                  address: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              {t("mobile")}
                              <span>*</span>
                            </p>
                            <input
                              type="number"
                              required
                              value={billingAddress.mobile_no}
                              onChange={(e) => {
                                setBillingAddress({
                                  ...billingAddress,
                                  mobile_no: e.target.value,
                                  new: true,
                                  id: 0,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              {t("country")}
                              <span>*</span>
                            </p>
                            {/* <input type="text" /> */}
                            <CountryDropdown
                              value={billingAddress.country}
                              onChange={(val) => selectCountry(val)}
                              whitelist={["AE", "BH", "KW", "OM", "QA", "SA"]}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              {t("city")}
                              <span>*</span>
                            </p>
                            {/* <input type="text" /> */}
                            <RegionDropdown
                              country={billingAddress.country}
                              value={billingAddress.city}
                              onChange={(val) => selectRegion(val)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>{t("company")}</p>
                            <input
                              type="text"
                              value={billingAddress.company}
                              onChange={(e) => {
                                setBillingAddress({
                                  ...billingAddress,
                                  company: e.target.value,
                                });
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* <div className="checkout__input__checkbox">
                                    <label>
                                        Ship to a different address?
                                        <input type="checkbox" id="diff-acc" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div> */}
                  {/* <div className="checkout__input">
                    <p>
                      Order notes<span>*</span>
                    </p>
                    <input
                      type="text"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                    />
                  </div> */}
                </div>
                <div className="col-lg-6 col-md-6">
                  <h3
                    style={{
                      background: "#f5f5f5",
                      margin: "0",
                      padding: "5px 15px",
                    }}
                  >
                    {t("choose_payment_type")}
                  </h3>
                  <IonRadioGroup
                    style={{ background: "white" }}
                    allowEmptySelection={false}
                    defaultChecked={true}
                    value={paymentType}
                    onIonChange={(e) => {
                      setPaymenetType(e.detail.value);
                    }}
                  >
                    <IonItem color={"dark"}>
                      <IonLabel>{t("pay_with_credit")}</IonLabel>
                      <IonRadio slot="start" value="pay with card" />
                    </IonItem>

                    <IonItem color={"dark"}>
                      <IonLabel>{t("cash_on_delivery")}</IonLabel>
                      <IonRadio slot="start" value="cash on delivery" />
                    </IonItem>

                    <IonItem color={"dark"}>
                      <IonLabel>{t("donate")}</IonLabel>
                      <IonRadio slot="start" value="donate" />
                    </IonItem>
                  </IonRadioGroup>
                  <div className="checkout__order">
                    <h4>{t("order")}</h4>
                    <div className="checkout__order__products">
                      {t("products")}{" "}
                      <span
                        style={{ float: language === "en" ? "right" : "left" }}
                      >
                        {t("total")}
                      </span>
                    </div>
                    <ul>
                      {/* <li>Vegetable???s Package <span>$75.99</span></li>
                                        <li>Fresh Vegetable <span>$151.99</span></li>
                                        <li>Organic Bananas <span>$53.99</span></li> */}

                      {/* {products_list.length > 0 &&
                        products_cart &&
                        products_cart.length > 0 &&
                        products_cart.map((ar: any, key: number) => {
                          const prod = getProd(ar.code);
                          return (
                            <li key={key}>
                              {prod?.productName}
                              <span>
                                {prod?.currencyCode}{" "}
                                {numberWithCommas(ar.qty * prod?.unitPrice)}
                              </span>
                            </li>
                          );
                        })} */}
                    </ul>
                    <div className="checkout__order__subtotal">
                      {t("subtotal")}{" "}
                      <span
                        style={{ float: language === "en" ? "right" : "left" }}
                      >
                        {products_cart_total?.total}
                      </span>
                    </div>
                    <div className="checkout__order__total">
                      {t("total")}{" "}
                      <span
                        style={{ float: language === "en" ? "right" : "left" }}
                      >
                        {numberWithCommas(products_cart_total?.total)}
                      </span>
                    </div>
                    {/* <p>Add your payment details to confirm your order.</p> */}

                    <button
                      type="submit"
                      className="primary-btn"
                      style={{
                        fontSize: language === "ar" ? "16px" : "14px",
                        letterSpacing: language === "ar" ? "0" : "5px",
                      }}
                    >
                      {processpay ? (
                        <img
                          className="social_media"
                          src="/assets/img/load.gif"
                          style={{ minWidth: "16px" }}
                          alt=""
                        />
                      ) : (
                        t("place_order")
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      <br />
      <br />

      {/* {totalAmount && items && items.length > 0 && (
        <ApplePayCheckout
          customerId={customerId}
          country={country}
          items={items}
          totalAmount={totalAmount * 100}
          currency={currency}
        />
      )} */}
      {/* {console.log("items >>>>", items)} */}

      {/* <form id="payment-form" onSubmit={handleSubmit}>
        <label htmlFor="card">Card</label>
        <CardElement id="card" options={{
          style: {
            base: inputStyle,
          }
        }} />

      

        <button type="submit">
          Pay Total Amount of {currency.toUpperCase()}
          {totalAmount}
        </button>
      </form> */}
      {success > 0 &&
        presentToast(
          "bottom",
          success === 1
            ? "Order has been created successfully"
            : "Order was not created",
          success === 1 ? "success" : "danger",
          success === 1 ? checkmark : close
        )}
      <StatusMessages messages={messages} />
    </>
  );
};

export default CheckOut;
