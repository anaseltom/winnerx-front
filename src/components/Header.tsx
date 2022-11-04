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
} from "@ionic/react";
import { mail } from "ionicons/icons";

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
import { Product_Cart, Product_Wishlist } from "../actions/UserAction";
import { RootStore } from "../store";
import { users } from "../actions/UserAction";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

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
  useEffect(() => {
    dispatch(Product_Cart());
    dispatch(users());
  }, []);

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
    window.location.href = "/home";
  };
  return (
    <>
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
        <div className="humberger__menu__logo">
          <Link to={`/home`}>
            <img src="/assets/img/storein-bl.png" alt="" />
          </Link>
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
              <Link to={`/signin`}>
                <img
                  className="social_media"
                  src={userProfile.prfile_url}
                  alt=""
                />{" "}
                Login
              </Link>
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

      <header className="header">
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
                      <Link to={`/signin`}>
                        <img
                          className="social_media"
                          src="/assets/img/user.png"
                          alt=""
                        />{" "}
                        Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link to={`/home`}>
                  <img
                    src="/assets/img/winnerX-logo.png"
                    style={{ width: "150px" }}
                    alt=""
                  />
                </Link>
                <div className="header__cart mobile_cart_wrapper">
                  <ul>
                    <li>
                      <Link to={`/wishlist`}>
                        <img
                          className="social_media"
                          src="/assets/img/003-like-white.png"
                          alt=""
                        />{" "}
                        <span>{products_wishlist.length}</span>
                      </Link>
                    </li>

                    <li>
                      <Link to={`/checkout`}>
                        <img
                          className="social_media margin-l-10"
                          src="/assets/img/002-shopping-bag-white.png"
                          alt=""
                        />{" "}
                        <span>{products_cart.length}</span>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/profile`}>
                        <img
                          style={{
                            height: "25px",
                            borderRadius: "20%",
                          }}
                          className="social_media margin-l-10"
                          src={
                            userProfile.profile_url || "/assets/img/user-p.png"
                          }
                          alt=""
                          width="30px"
                          height="30px"
                        />{" "}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
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
            <div className="col-lg-4">
              <div
                className="header__cart desktop_cart_wrapper"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <ul
                  style={{
                    width: "55%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "5px",
                  }}
                >
                  <li>
                    <Link to={`/wishlist`}>
                      <img
                        className="social_media"
                        src="/assets/img/003-like-white.png"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />{" "}
                      <span>{products_wishlist.length}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/checkout`}>
                      <img
                        className=""
                        src="/assets/img/002-shopping-bag-white.png"
                        alt=""
                        style={{ width: "20px", height: "20px" }}
                      />{" "}
                      <span>{products_cart.length}</span>
                    </Link>
                  </li>
                  {language === "en" && (
                    <li
                      className="header__top__right__language"
                      style={{ padding: 0, cursor: "pointer" }}
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
                      />
                    </li>
                  )}
                  {language === "ar" && (
                    <li
                      className="header__top__right__language"
                      style={{ padding: 0, cursor: "pointer" }}
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
                      <img src="/assets/img/language.png" alt="" />
                    </li>
                  )}
                  {logged.isLogged ? (
                    <li>
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
                  ) : (
                    ""
                  )}
                </ul>
                <div
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
                    >
                      <img
                        className="social_media"
                        src="/assets/img/user.png"
                        alt=""
                      />{" "}
                      {t("logout")}
                    </a>
                  ) : (
                    <Link to={`/signin`}>
                      <img
                        className="social_media"
                        src="/assets/img/user.png"
                        alt=""
                      />{" "}
                      {t("Login")}
                    </Link>
                  )}
                  {/* <IonButton id="cover-trigger">Size=Cover</IonButton>
                  <IonPopover trigger="cover-trigger" size="cover">
                    <IonContent class="ion-padding" style={{ color: "black" }}>
                      Hello!
                    </IonContent>
                  </IonPopover> */}
                </div>{" "}
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
    </>
  );
};

export default Header;
