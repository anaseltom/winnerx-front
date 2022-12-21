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
  IonIcon,
  IonModal,
  IonBackButton,
  useIonToast,
} from "@ionic/react";
import {
  mail,
  cart,
  heart,
  closeCircleOutline,
  checkmark,
} from "ionicons/icons";

import {
  IonButton,
  IonContent,
  IonPopover,
  IonList,
  IonItem,
} from "@ionic/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openSigninModal,
  Product_Cart,
  Product_Wishlist,
  sendPhoneOTPVerifcation,
  userSignIn,
  userSignUp,
  usersUpdate,
} from "../actions/UserAction";
import { RootStore } from "../store";
import { users } from "../actions/UserAction";
import { useTranslation } from "react-i18next";
import jwt_decode from "jwt-decode";

import i18n from "i18next";
import { baseURL } from "../utilities/axios";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { version } from "react-dom";

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    google: any;
  }
}

const Header: React.FC<any> = () => {
  const { t } = useTranslation();
  const products_cart = useSelector((state: RootStore) => state.cart);
  const products_wishlist = useSelector((state: RootStore) => state.wishlist);
  const dispatch = useDispatch();
  const userProfile = useSelector((state: RootStore) => state.user);
  const [logged, setLogged] = useState<any>({
    isLogged: false,
  });
  const [hamburger, setHamburger] = useState<any>(false);
  const [language, setLanguage] = useState<any>(localStorage.getItem("lang"));
  const history = useHistory();

  const [present] = useIonToast();
  const presentToast = (
    position: "top" | "middle" | "bottom",
    msg: any,
    success: any
  ) => {
    present({
      message: msg,
      duration: 1500,
      position: position,
      icon: success ? checkmark : closeCircleOutline,
      color: success ? "success" : "danger",
    });
    setSigninMessage({});
    setSignupMessage({});
    setTab(1);
  };

  // sign up
  const [signup, setSignup] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    user_type: "customer",
    user_type_main: "customer",
    social_media: true,
    email_status: "verified",
  });
  // signin
  const { id } = useParams<any>();
  const [login, setLogin] = useState<any>({
    email: "",
    password: "",
    // billing: ref=="redirect" ? true : false
    billing: true,
    utk: id?.split("v?uveid=")[1]?.length > 0 ? id?.split("v?uveid=")[1] : "",
  });
  const [signinMessage, setSigninMessage] = useState<any>({
    status: "500",
    message: "",
    color: "success",
  });
  const [signupMessage, setSignupMessage] = useState<any>({
    status: "500",
    message: "",
  });
  const [sendOTPResponse, setSendOTPResponse] = useState<any>({
    success: "",
    msg: "",
  });
  const [phone, setPhone] = useState<any>("");
  const open_modal = useSelector((state: RootStore) => state.open_modal);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [dismiss, setDismiss] = useState<any>(false);
  const [tab, setTab] = useState<any>(1);
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [otpMessage, setOtpMessage] = useState({
    msg: "",
    color: "",
  });

  function handleCallbackResponse(response: any) {
    console.log(response);
    const userObject: any = jwt_decode(response.credential);

    if (userObject && userObject?.email_verified) {
      // window.location.href = "/home";
      signupUser(userObject);
    }
  }
  const sendOTPResponseFn = (res: any) => {
    if (res.status == 200) {
      setSendOTPResponse({
        success: true,
        msg: res.msg,
      });
      setTab(2);
      setMinutes(1);
      setSeconds(30);
    } else {
      setSendOTPResponse({
        success: false,
        msg: res.msg,
      });
    }
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    dispatch(userSignUp({ ...signup, phone_no: `+${phone}` }, SignupResponse));
    // console.log(signupMessage);
  };

  const SigninResponse = (res: any) => {
    // console.log("response", res);

    if (res.status == 200) {
      var temp_arr = res;
      temp_arr.session = "121232";
      // console.log("new array", temp_arr);
      setSigninMessage({
        ...signinMessage,
        status: "200",
        message: "Signin successfully.",
        color: "success",
      });
      localStorage.setItem("session", "live");
      localStorage.setItem("session_id", temp_arr.id);
      localStorage.setItem("email", temp_arr.email);
      localStorage.setItem("username", temp_arr.user_name);
      localStorage.setItem("user_dm", "url(/assets/girl.jpg)");

      // if (ref == "redirect") {
      //   history.push("/confirm_checkout");
      // } else {
      //   history.push("/");
      // }
    } else if (res.status == 500) {
      setSigninMessage({
        ...signinMessage,
        status: "200",
        message: res.msg,
        color: "danger",
      });
    }
  };

  const SignupResponse = (res: any) => {
    if (res.status == 200) {
      dispatch(usersUpdate(res.id, res.utk, verificationMode));
      setSignupMessage({
        ...signupMessage,
        status: "200",
        message: "Signup successfully.",
        color: "success",
      });
      localStorage.setItem("session", "live");
      localStorage.setItem("session_id", res.id);
      dispatch(openSigninModal());
      setLogged({ isLogged: true });
    } else {
      dispatch(
        userSignIn(
          {
            email: res.email,
            password: "",
            billing: true,
            utk:
              id?.split("v?uveid=")[1]?.length > 0
                ? id?.split("v?uveid=")[1]
                : "",
            social_media: true,
          },
          SigninResponse
        )
      );
    }
  };

  const verificationMode = () => {};

  const signupUser = (res: any) => {
    // console.log(res);
    const signupData = {
      first_name: res.given_name,
      last_name: res.family_name,
      email: res.email,
      username: res.email,
      user_type: "customer",
      user_type_main: "customer",
      email_status: "verified",
    };

    const resultSignup = dispatch(userSignUp(signupData, SignupResponse));
  };

  const sendOTP = async (e: any) => {
    e.preventDefault();
    axios
      .post(`${baseURL}phone/send-otp`, {
        phone: `+${phone}`,
      })
      .then((result) => {
        if (result?.data?.status == 200) {
          setTab(2);
          setMinutes(0);
          setSeconds(30);
        } else {
          setOtpMessage({
            msg: "Please make sure the phone number is valid",
            color: "#f8d7da",
          });
          setTimeout(() => {
            setOtpMessage({
              msg: "",
              color: "",
            });
          }, 3000);
        }
      })
      .catch((err) => {
        setOtpMessage({
          msg: "Something went wrong",
          color: "#f8d7da",
        });
        setTimeout(() => {
          setOtpMessage({
            msg: "",
            color: "",
          });
        }, 3000);
      });
  };
  const verifyOTP = async (phone: any, code: any) => {
    axios
      .post(`${baseURL}phone/verify-otp`, {
        phone,
        code,
      })
      .then((res) => {
        if (res.status == 200) {
          setOtpMessage({
            msg: "Your phone number has been verified",
            color: "#d1e7dd",
          });
          axios
            .post(`${baseURL}user/phone/signin`, { phone })
            .then((res) => {
              if (res.status == 200) {
                dispatch(openSigninModal());
                localStorage.setItem("session", "live");
                localStorage.setItem("session_id", res.data.user.id);
                localStorage.setItem("email", res.data.user.email);
                localStorage.setItem("username", res.data.user.user_name);
                localStorage.setItem("user_dm", "url(/assets/girl.jpg)");
                setLogged({ isLogged: true });
              } else {
                setTab(3);
              }
            })
            .catch((err) => {
              setTab(3);
            });
          setTimeout(() => {
            setOtpMessage({
              msg: "",
              color: "",
            });
          }, 3000);
          // setTab(3);
        } else {
          setOtpMessage({
            msg: "The OTP you have provided does not match the one we sent",
            color: "#f8d7da",
          });
          setTimeout(() => {
            setOtpMessage({
              msg: "",
              color: "",
            });
          }, 3000);
        }
      })
      .catch((err) => {
        setOtpMessage({
          msg: "The OTP you have provided does not match the one we sent",
          color: "#f8d7da",
        });
        setTimeout(() => {
          setOtpMessage({
            msg: "",
            color: "",
          });
        }, 3000);
      });
  };

  const loginWithPhone = () => {};
  const openModal = () => {
    dispatch(openSigninModal());
  };
  const divRef = useRef(null);

  useEffect(() => {
    /* global google */
    window.google?.accounts.id.initialize({
      client_id:
        "580884249363-g8fr53jtk9me0u8lsu6sgvkh9mr8as0r.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    window?.google?.accounts?.id.renderButton(
      document.getElementById("signInGoogleDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );
  }, []);
  // end signin

  useEffect(() => {
    dispatch(Product_Cart());
    // dispatch(users());
  }, []);
  console.log(divRef);

  useEffect(() => {
    dispatch(Product_Wishlist());
  }, []);
  useEffect(() => {}, [language]);

  const loggedChecker = () => {
    if (localStorage.getItem("session_id")) {
      setLogged({ isLogged: true });
    } else {
      setLogged({ isLogged: false });
    }
    // console.log("logged is", logged);
  };
  useEffect(() => {
    // console.log(language);
  }, [language]);

  useEffect(() => {
    loggedChecker();
    // if (localStorage.getItem("lang") === "en") {
    //   htmlEl?.setAttribute("dir", "");
    // }
    // if (localStorage.getItem("lang") === "ar") {
    //   htmlEl?.setAttribute("dir", "rtl");
    // }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  // const setEnglishLanguage = () => {
  //   localStorage.removeItem("lang");
  //   localStorage.setItem("lang", "en");
  //   history.push("/");
  // };
  // const setArabicLanguage = () => {
  //   localStorage.removeItem("lang");
  //   localStorage.setItem("lang", "ar");
  //   history.push("/");
  // };

  // useEffect(()=>{
  //     if(localStorage.getItem('session')) {
  //       const user_id = localStorage.getItem('session_id');
  //       setLogged({...logged, isLogged: "200"});
  //     }
  //     else {
  //       window.location.href = "/signin";
  //     }
  //   }, [])
  // console.log(i18n.language);
  const logout = () => {
    localStorage.removeItem("session");
    localStorage.removeItem("session_id");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("user_dm");
    setLogged(false);
    history.push("/");
  };
  // console.log(isOpen);
  // console.log(open_modal);
  // console.log(window.google);
  return (
    <>
      <IonModal
        isOpen={open_modal}
        canDismiss={true}
        // onDid  Dismiss={() => openModal()}
        backdropDismiss={false}
        style={{ padding: "0 15px" }}
      >
        {tab == 1 && (
          <>
            <IonIcon
              icon={closeCircleOutline}
              style={{
                position: "absolute",
                right: "10px",
                top: "8px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => openModal()}
            ></IonIcon>
            <div style={{ padding: "0 15px" }}>
              <div style={{ marginTop: "80px" }}>
                <IonTitle style={{ textAlign: "center", fontSize: "28px" }}>
                  {t("login_to_continue")}
                </IonTitle>
              </div>
              {otpMessage.msg && (
                <p
                  style={{
                    background: otpMessage.color,
                    padding: "10px 5px",
                    textAlign: "center",
                  }}
                >
                  {otpMessage.msg}
                </p>
              )}
              <p style={{ textAlign: "center" }}>{t("login_order")}</p>
              <p style={{ textAlign: "center", marginTop: "40px" }}>
                {t("phone_login")}
              </p>
              <div
                style={{
                  margin: "30px auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "50%",
                }}
                dir="ltr"
              >
                <PhoneInput
                  country={"ae"}
                  value={phone}
                  enableSearch={true}
                  onChange={(phone) => setPhone(phone)}
                  regions={"middle-east"}
                  excludeCountries={["il"]}
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="primary-btn" onClick={sendOTP}>
                  {t("send_otp")}
                </button>
              </div>
              {window?.google && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        backgroundColor: "gray",
                      }}
                    />

                    <div>
                      <h3
                        style={{
                          width: "100px",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                      >
                        {t("or")}
                      </h3>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        backgroundColor: "gray",
                      }}
                    />
                  </div>

                  <div
                    id="signInGoogleDiv"
                    ref={divRef}
                    data-width="100%"
                    data-height="200"
                  ></div>
                </>
              )}
            </div>
          </>
        )}
        {tab == 2 && (
          <>
            <IonIcon
              icon={closeCircleOutline}
              style={{
                position: "absolute",
                right: "10px",
                top: "8px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(openSigninModal())}
            ></IonIcon>
            <div style={{ padding: "0 15px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonTitle style={{ textAlign: "center", marginTop: "80px" }}>
                  {t("enter_otp")}
                </IonTitle>
                <h6 style={{ position: "absolute", top: "0", left: "10px" }}>
                  {t("change_phone")}
                  <span>
                    <IonBackButton style={{ width: "50px", height: "50px" }} />
                  </span>
                </h6>
              </div>
              {otpMessage.msg && (
                <p
                  style={{
                    background: otpMessage.color,
                    padding: "10px 5px",
                    textAlign: "center",
                  }}
                >
                  {otpMessage.msg}
                </p>
              )}
              <p style={{ textAlign: "center" }}>
                {t("otp_sent")}
                {phone}
              </p>
              <div className="form-group">
                <label className="text-dark">{t("")}</label>
                <input
                  className="form-control email forms_required"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  id="OTP"
                  type="number"
                  required
                  placeholder="000000"
                  style={{
                    textAlign: "center",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                {seconds > 0 || minutes > 0 ? (
                  <p>
                    {t("time_remain")}: {minutes < 10 ? `0${minutes}` : minutes}
                    :{seconds < 10 ? `0${seconds}` : seconds}
                  </p>
                ) : (
                  <p>{t("no_code")}</p>
                )}
                <button
                  disabled={seconds > 0 || minutes > 0}
                  style={{
                    color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#dcb841",
                    height: "36px",
                  }}
                  onClick={sendOTP}
                >
                  {t("resend_otp")}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: "80px" }}>
                <button
                  className="primary-btn"
                  onClick={() => verifyOTP(`+${phone}`, otp)}
                >
                  {t("confirm_otp")}
                </button>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "gray",
                  }}
                />

                <div>
                  <h3
                    style={{
                      width: "100px",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    {t("or")}
                  </h3>
                </div>

                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "gray" }}
                />
              </div> */}
              {/* <div id="signInDiv" data-width="100%" data-height="200"></div> */}
            </div>
          </>
        )}
        {tab == 3 && (
          <>
            <IonIcon
              icon={closeCircleOutline}
              style={{
                position: "absolute",
                right: "10px",
                top: "8px",
                fontSize: "30px",
                cursor: "pointer",
              }}
              onClick={() => dispatch(openSigninModal())}
            ></IonIcon>
            <div style={{ padding: "0 15px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonTitle style={{ textAlign: "center", marginTop: "80px" }}>
                  {t("fill_information")}
                </IonTitle>
                {/* <h6 style={{ position: "absolute", top: "0", left: "10px" }}>
                  {t("change_phone")}
                  <span>
                    <IonBackButton style={{ width: "50px", height: "50px" }} />
                  </span>
                </h6> */}
              </div>
              <form onSubmit={handleSignUp}>
                <div
                  className="form-group"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  <label htmlFor="first_name" className="text-dark">
                    {t("first_name")}
                  </label>
                  <input
                    className="form-control email forms_required"
                    value={signup.first_name}
                    id="first_name"
                    type="text"
                    required
                    onChange={(e) => {
                      setSignup({ ...signup, first_name: e.target.value });
                    }}
                    placeholder={t("first_name_")}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  <label htmlFor="last_name" className="text-dark">
                    {t("last_name")}
                  </label>
                  <input
                    className="form-control email forms_required"
                    value={signup.last_name}
                    id="last_name"
                    type="text"
                    required
                    onChange={(e) => {
                      setSignup({ ...signup, last_name: e.target.value });
                    }}
                    placeholder={t("last_name_")}
                  />
                </div>
                <div
                  className="form-group"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  <label htmlFor="email" className="text-dark">
                    {t("email")}
                  </label>
                  <input
                    className="form-control email forms_required"
                    value={signup.email}
                    id="email"
                    type="email"
                    required
                    onChange={(e) => {
                      setSignup({ ...signup, email: e.target.value });
                    }}
                    placeholder={t("email_")}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <button className="primary-btn" type="submit">
                    {t("sign_up")}
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </IonModal>
      <div
        onClick={() => {
          setHamburger(false);
        }}
        className={`humberger__menu__overlay ${
          hamburger ? "hamburger_overlay_on" : ""
        }`}
      ></div>
      <div
        className={`humberger__menu__wrapper ${
          hamburger ? "hamburger_toggle_on" : ""
        }`}
      >
        <div className="humberger__menu__logo" style={{ marginBottom: "20px" }}>
          <Link to={`/home`}>
            <img src="/assets/img/winnerX-logo.png" alt="" />
          </Link>
        </div>
        <div
          style={{
            display: "block",
            width: "100%",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <button
            type="submit"
            className="primary-btn"
            style={{
              fontSize: language === "ar" ? "18px" : "16px",
              margin: "0 auto",
              width: "100%",
            }}
            onClick={() => {
              logged.isLogged ? logout() : dispatch(openSigninModal());
            }}
          >
            {logged.isLogged ? t("logout") : t("login")}
          </button>
        </div>
        <div
          className="humberger__menu__widget"
          style={{
            display: language === "ar" ? "flex" : "block",
          }}
        >
          <div
            className="header__top__right__language"
            onClick={() => {
              localStorage.removeItem("lang");
              localStorage.setItem("lang", "en");
              setLanguage("en");
              i18n.changeLanguage("en");
              document.querySelector("html")?.setAttribute("dir", "ltr");
            }}
          >
            <img src="/assets/img/language.png" alt="" />
            <div>{t("english")}</div>
          </div>
          <div
            className="header__top__right__language"
            onClick={() => {
              localStorage.removeItem("lang");
              localStorage.setItem("lang", "ar");
              setLanguage("ar");
              i18n.changeLanguage("ar");
              document.querySelector("html")?.setAttribute("dir", "rtl");
            }}
          >
            <img
              src="/assets/img/language-1.png"
              alt=""
              width="30"
              height="25"
            />
            <div>{t("arabic")}</div>
          </div>
          <div className="header__top__right__auth">
            {logged.isLogged ? (
              <a
                onClick={() => {
                  logout();
                }}
              >
                <img
                  className="social_media"
                  src={userProfile.prfile_url}
                  alt=""
                />{" "}
                Logout
              </a>
            ) : (
              <button onClick={() => dispatch(openSigninModal())}>
                <img
                  className="social_media"
                  src={userProfile.prfile_url}
                  alt=""
                />{" "}
                Login
              </button>
            )}
          </div>
        </div>
        {/* <nav className="humberger__menu__nav mobile-menu">
                <ul>
                    <li className=""><Link to={`/home`}>Home</Link></li>
                    <li><Link to={`/browse/ref=all`}>Browse</Link></li>
                </ul>
            </nav> */}
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            <li className="active">
              <a href="./index.html">Home</a>
            </li>
            <li>
              <a href="./shop-grid.html">Shop</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap">
          <div className="slicknav_menu">
            <a
              href="#"
              aria-haspopup="true"
              role="button"
              className="slicknav_btn slicknav_collapsed"
              style={{ outline: "none" }}
            >
              <span className="slicknav_menutxt">MENU</span>
              <span className="slicknav_icon">
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
                <span className="slicknav_icon-bar"></span>
              </span>
            </a>
            <nav
              className="slicknav_nav slicknav_hidden"
              aria-hidden="true"
              role="menu"
              style={{ display: "none" }}
            >
              <ul>
                {/* <li className="active"><a href="./index.html" role="menuitem">Home</a></li>
                        <li><a href="./blog.html" role="menuitem">Blog</a></li> */}
                <li
                  className=""
                  style={{ textAlign: language === "ar" ? "right" : "left" }}
                >
                  <Link to={`/home`}>{t("home")}</Link>
                </li>
                <li
                  className=""
                  style={{ textAlign: language === "ar" ? "right" : "left" }}
                >
                  <Link to={`/profile`}>{t("profile")}</Link>
                </li>
                {/* <li><Link to={`/browse/ref=all`}>Browse</Link></li> */}
                {logged.isLogged ? (
                  <>
                    <li
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                      }}
                    >
                      <Link to={`/account`}>{t("orders")}</Link>
                    </li>
                    <li
                      style={{
                        textAlign: language === "ar" ? "right" : "left",
                      }}
                    >
                      <Link to={`/winners`}>{t("winners")}</Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </nav>
          </div>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li style={{ display: "flex", alignItems: "center" }}>
              <IonIcon
                icon={mail}
                style={{ fontSize: "20px", color: "#eebf36" }}
              ></IonIcon>{" "}
              <span style={{ marginLeft: "5px", marginRight: "5px" }}>
                support@storein.com
              </span>
            </li>
            <li
              style={{
                textAlign: language === "ar" ? "right" : "left",
              }}
            >
              {t("free_shipping")}
            </li>
          </ul>
        </div>
      </div>

      <header className="header" style={{ padding: 0 }}>
        <div className="header__top" style={{ display: "none" }}>
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <img
                        className="social_media"
                        src="/assets/img/004-email.png"
                        alt=""
                      />{" "}
                      support@storein.com
                    </li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <a href="#">
                      <img
                        className="social_media"
                        src="/assets/img/001-facebook.png"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        className="social_media"
                        src="/assets/img/003-instagram-logo.png"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        className="social_media"
                        src="/assets/img/004-youtube.png"
                        alt=""
                      />
                    </a>
                    <a href="#">
                      <img
                        className="social_media"
                        src="/assets/img/002-twitter.png"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="header__top__right__language">
                    <img src="/assets/img/language.png" alt="" />
                    <div>English</div>
                    <img
                      className="down_arrow"
                      src="/assets/img/down-arrow.png"
                      alt=""
                    />
                    <ul>
                      <li>
                        <a href="#">English</a>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth">
                    {logged.isLogged ? (
                      <a
                        onClick={() => {
                          logout();
                        }}
                      >
                        <img
                          className="social_media"
                          src="/assets/img/user.png"
                          alt=""
                        />{" "}
                        Logout
                      </a>
                    ) : (
                      <button onClick={() => dispatch(openSigninModal())}>
                        <img
                          className="social_media"
                          src="/assets/img/user.png"
                          alt=""
                        />{" "}
                        Login
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link
                  to={`/home`}
                  // style={{ float: language === "ar" ? "right" : "left" }}
                >
                  <img
                    src="/assets/img/winnerX-logo.png"
                    style={{ width: "150px" }}
                    alt=""
                  />
                </Link>

                <div
                  className="header__cart mobile_cart_wrapper"
                  style={{
                    padding: "5px 0",
                    width: `${logged.isLogged ? "130px" : "80px"}`,
                  }}
                >
                  <ul
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <li style={{ margin: "0" }}>
                      <Link to={`/wishlist`}>
                        {/* <img
                          className="social_media"
                          src="/assets/img/003-like-white.png"
                          alt=""
                        />{" "} */}
                        <IonIcon
                          icon={heart}
                          style={{ fontSize: "28px" }}
                        ></IonIcon>
                        <span style={{ position: "absolute", top: "0" }}>
                          {products_wishlist.length}
                        </span>
                      </Link>
                    </li>

                    <li style={{ margin: "0" }}>
                      <Link to={`/checkout`}>
                        {/* <img
                          className="social_media margin-l-10"
                          src="/assets/img/002-shopping-bag-white.png"
                          alt=""
                        />{" "} */}
                        <IonIcon
                          icon={cart}
                          style={{ fontSize: "28px" }}
                        ></IonIcon>
                        <span>{products_cart.length}</span>
                      </Link>
                    </li>
                    {/* {console.log(logged)} */}
                    {logged.isLogged && (
                      <li style={{ margin: "0" }}>
                        <Link to={`/profile`}>
                          {/* {console.log(userProfile)} */}
                          <img
                            style={{
                              height: "25px",
                              borderRadius: "20%",
                            }}
                            className="social_media margin-l-10"
                            src={
                              userProfile.profile_url != null
                                ? userProfile.profile_url
                                : "/assets/img/user-p.png"
                            }
                            alt=""
                            width="30px"
                            height="30px"
                          />{" "}
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <nav className="header__menu">
                <ul
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <li className="">
                    <Link
                      to={`/home`}
                      style={{
                        letterSpacing: "0",
                        fontSize: "18px",
                        margin: 0,
                      }}
                    >
                      {t("home")}
                    </Link>
                  </li>
                  {/* <li><Link to={`/browse/ref=all`}>Browse</Link></li> */}
                  {logged.isLogged ? (
                    <>
                      <li>
                        <Link
                          to={`/account`}
                          style={{
                            letterSpacing: "0",
                            fontSize: "18px",
                            margin: 0,
                          }}
                        >
                          {t("orders")}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`/winners`}
                          style={{ letterSpacing: "0", fontSize: "18px" }}
                        >
                          {t("winners")}
                        </Link>
                      </li>
                    </>
                  ) : (
                    ""
                  )}

                  {/* <li><a href="./contact.html">Contact</a></li> */}
                </ul>
              </nav>
            </div>
            <div className="col-lg-5">
              <div
                className="header__cart desktop_cart_wrapper"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <ul
                  style={{
                    width: `${logged.isLogged ? "200px" : "180px"}`,
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "5px",
                    alignItems: "center",
                  }}
                  className="col-lg-6"
                >
                  <li style={{ margin: "0" }}>
                    <Link to={`/wishlist`}>
                      {/* <img
                        className="social_media"
                        src="/assets/img/003-like-white.png"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />{" "} */}
                      <IonIcon
                        icon={heart}
                        style={{ fontSize: "25px" }}
                      ></IonIcon>
                      <span style={{ position: "absolute", top: "-10px" }}>
                        {products_wishlist.length}
                      </span>
                    </Link>
                  </li>
                  <li style={{ margin: "0" }}>
                    <Link to={`/checkout`}>
                      {/* <img
                        className=""
                        src="/assets/img/002-shopping-bag-white.png"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />{" "} */}
                      <IonIcon
                        icon={cart}
                        style={{ fontSize: "25px" }}
                      ></IonIcon>
                      <span style={{ position: "absolute", top: "-10px" }}>
                        {products_cart.length}
                      </span>
                    </Link>
                  </li>
                  {language === "en" && (
                    <li
                      className="header__top__right__language"
                      style={{ padding: 0, margin: "0", cursor: "pointer" }}
                      onClick={() => {
                        localStorage.removeItem("lang");
                        localStorage.setItem("lang", "ar");
                        setLanguage("ar");
                        i18n.changeLanguage("ar");
                        document
                          .querySelector("html")
                          ?.setAttribute("dir", "rtl");
                      }}
                    >
                      <img
                        src="/assets/img/language-1.png"
                        alt=""
                        width="30"
                        height="25"
                        style={{ marginTop: "-8px" }}
                      />
                    </li>
                  )}
                  {language === "ar" && (
                    <li
                      className="header__top__right__language"
                      style={{ padding: 0, cursor: "pointer", margin: "0" }}
                      onClick={() => {
                        localStorage.removeItem("lang");
                        localStorage.setItem("lang", "en");
                        i18n.changeLanguage("en");
                        setLanguage("en");
                        document
                          .querySelector("html")
                          ?.setAttribute("dir", "ltr");
                      }}
                    >
                      <img
                        src="/assets/img/language.png"
                        style={{ marginTop: "-8px", height: "15px" }}
                        alt=""
                      />
                    </li>
                  )}
                  {logged.isLogged ? "" : ""}
                </ul>
                <ul
                  style={{
                    // border: "solid",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="col-lg-5"
                >
                  {logged.isLogged && (
                    <li style={{ margin: "0" }}>
                      <Link to={`/profile`}>
                        <img
                          style={{
                            borderRadius: "20%",
                          }}
                          className=""
                          src={
                            userProfile.profile_url || "/assets/img/user-p.png"
                          }
                          alt=""
                          width="30px"
                          height="30px"
                        />{" "}
                      </Link>
                    </li>
                  )}
                  <li
                    className="header__top__right__auth"
                    style={{
                      boxSizing: "border-box",
                      padding: "7px 10px",
                      background: "white",
                      borderRadius: "",
                      cursor: "pointer",
                    }}
                  >
                    {/* <select style={{ background: "white" }}>
                    <option>hello</option>
                    <option>hello</option>
                    <option>hello</option>
                  </select> */}

                    {logged.isLogged ? (
                      <a
                        onClick={() => {
                          logout();
                        }}
                        style={{ color: "black " }}
                      >
                        <img
                          className="social_media"
                          src="/assets/img/user.png"
                          alt=""
                        />{" "}
                        {t("logout")}
                      </a>
                    ) : (
                      <button
                        style={{ background: "transparent", color: "black" }}
                        onClick={() => dispatch(openSigninModal())}
                      >
                        <img
                          className="social_media"
                          src="/assets/img/user.png"
                          alt=""
                        />{" "}
                        {t("Login")}
                      </button>
                    )}
                    {/* <IonButton id="cover-trigger">Size=Cover</IonButton>
                  <IonPopover trigger="cover-trigger" size="cover">
                    <IonContent class="ion-padding" style={{ color: "black" }}>
                      Hello!
                    </IonContent>
                  </IonPopover> */}
                  </li>{" "}
                </ul>

                {/* <div className="header__cart__price">item: <span>$150.00</span></div> */}
              </div>
            </div>
          </div>
          <div className="humberger__open">
            <img
              onClick={() => {
                hamburger ? setHamburger(false) : setHamburger(true);
              }}
              className="social_media"
              src="/assets/img/005-menu.png"
              alt=""
            />
          </div>
        </div>
      </header>
      {signinMessage.message &&
        presentToast(
          "bottom",
          signinMessage.message,
          signinMessage.status == 200 ? true : false
        )}
      {signupMessage.message &&
        presentToast(
          "bottom",
          signupMessage.message,
          signupMessage.status == 200 ? true : false
        )}
    </>
  );
};

export default Header;
