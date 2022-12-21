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
import { useIonToast } from "@ionic/react";
import { checkmark } from "ionicons/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import WishlistSummary from "../components/WishlistSummary";
import Footer from "../components/Footer";
import { useState, useRef, useEffect } from "react";
import { users, usersProfileUpdate } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
import axios from "axios";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import { apiUrl } from "../utilities/axios";

const Profile: React.FC<any> = ({ feature, title, filterControl }) => {
  const products_list = useSelector((state: RootStore) => state.products_list);
  const products_cart = useSelector((state: RootStore) => state.cart);
  const userProfile = useSelector((state: RootStore) => state.user);
  const products_wishlist = useSelector((state: RootStore) => state.wishlist);
  const products_cart_total = useSelector(
    (state: RootStore) => state.cart_total
  );
  const { t } = useTranslation();
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

  const dispatch = useDispatch();
  const [billingAddress, setBillingAddress] = useState<any>({
    country: "",
    region: "",
    bldg: "",
    street: "",
    mobile: "",
    company: "",
    orderNotes: "",
  });
  const language = i18n.language;
  const [updateMessage, setUpdateMessage] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<any>(null);

  useEffect(() => {
    dispatch(users());
  }, []);

  const [userDetails, setUserDetails] = useState<any>({
    first_name: userProfile?.first_name ? userProfile?.first_name : "",
    last_name: userProfile?.last_name ? userProfile?.last_name : "",
    email: userProfile?.email ? userProfile?.email : "",
    mobile: userProfile?.customer?.phone_no
      ? userProfile?.customer?.phone_no
      : "",
    bldg: userProfile?.customer?.apartment
      ? userProfile?.customer?.apartment
      : "",
    street: userProfile?.customer?.address
      ? userProfile?.customer?.address
      : "",
    country: userProfile?.customer?.country
      ? userProfile?.customer?.country
      : "",
    city: userProfile?.customer?.city ? userProfile?.customer?.city : "",
    customer_id: userProfile?.customer?.id,
  });

  // const [userDetails, setUserDetails] = useState<any>(
  //     {
  //         first_name: userProfile?.first_name,
  //         last_name: userProfile?.last_name,
  //         email: userProfile?.email,
  //         mobile: userProfile?.customer?.phone_no,
  //         bldg: userProfile?.customer?.apartment,
  //         street: userProfile?.customer?.address,
  //         country: userProfile?.customer?.country,
  //         city: userProfile?.customer?.city
  //     });

  const selectCountry = (value: any) => {
    setUserDetails({ ...userDetails, country: value });
  };

  const selectRegion = (value: any) => {
    setUserDetails({ ...userDetails, city: value });
  };

  const numberWithCommas = (x: any) => {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return 0;
    }
  };

  const submitEditProfile = () => {
    // var empty = false;
    // if(userDetails.first_name === "" || userDetails.last_name === "" || userDetails.email === "" || userDetails.mobile === "" || userDetails.bldg === "" ||  userDetails.street === "" ||  userDetails.country === "" ||  userDetails.city === "")
    // {
    //     empty = true;
    // }
    // console.log(userDetails);
    dispatch(usersProfileUpdate(userDetails, setUpdateMessage));
  };

  var product_value = [];
  if (localStorage.getItem("w-commerce-token-widerange")) {
    product_value = JSON.parse(
      localStorage.getItem("w-commerce-token-widerange")!
    );
  }

  const getProd = (code: any) => {
    var prodIndex = products_list?.findIndex(
      (s: any) => s.productCode === code
    );
    return products_list[prodIndex];
  };

  const handleImageChange = async (e: any) => {
    e.preventDefault();
    // setSelectedFile();
    // handleSubmitImage(e);
  };

  const handleSubmitImage = async (e: any) => {
    e.preventDefault();
    // console.log(selectedFile);
    const file = e.target.files[0];
    if (file) {
      const fd = new FormData();
      fd.append("image", file, file.name);
      const resp = await axios.post(
        `${apiUrl}/upload/profile/${userProfile?.customer?.id}`,
        fd
      );
      if (resp.status === 200) {
        dispatch(users());
        presentToast("bottom", "Updated profile picture successfully");
      }
    }
  };

  useEffect(() => {
    // console.log("user details", userDetails);
    // console.log(userProfile);
    setUserDetails({
      first_name: userProfile?.first_name,
      last_name: userProfile?.last_name,
      email: userProfile?.email,
      mobile: userProfile?.customer?.phone_no,
      bldg: userProfile?.customer?.apartment,
      street: userProfile?.customer?.address,
      country: userProfile?.customer?.country,
      city: userProfile?.customer?.city,
      customer_id: userProfile?.customer?.id,
      profile: userProfile?.profile_url,
    });
  }, [userProfile]);

  return (
    <>
      <Header />

      <section className="hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 search_hero"></div>
          </div>
        </div>
      </section>

      <section className="shoping-cart spad">
        <div className="container">
          <div className="row">
            <div
              className="header_title"
              style={{ letterSpacing: language === "ar" ? "0" : "10px" }}
            >
              <span>{t("profile")}</span>
            </div>
            <form
              className="mb-5"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                className=""
                style={{
                  position: "relative",
                  margin: "auto 0 auto 0",
                }}
              >
                <img
                  src={userDetails.profile || "/assets/img/user-p.png"}
                  className="mx-auto img-fluid img-thumbnail"
                  style={{
                    width: "180px",
                    height: "180px",
                    background: "no-repeat scroll center top ",
                    borderRadius: "50%",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                />
                <label htmlFor="image">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="white"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 20,
                      zIndex: 3,
                      cursor: "pointer",
                      background: "gray",
                      padding: "5px",
                      borderRadius: "30%",
                      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                    }}
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleSubmitImage}
                    accept="image/png, image/jpg, image/gif, image/jpeg"
                    style={{ display: "none" }}
                  />
                </label>
              </div>
            </form>
          </div>
          <div
            className="row"
            style={{ textAlign: language === "ar" ? "right" : "left" }}
          >
            <div className="col-lg-12 col-md-12">
              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("first_name")}
                      <span>*</span>
                    </p>
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          first_name: e.target.value,
                        });
                      }}
                      value={userDetails.first_name}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("last_name")}
                      <span>*</span>
                    </p>
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          last_name: e.target.value,
                        });
                      }}
                      value={userDetails.last_name}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("email")}
                      <span>*</span>
                    </p>
                    <input
                      type="email"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          email: e.target.value,
                        });
                      }}
                      value={userDetails.email}
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
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          mobile: e.target.value,
                        });
                      }}
                      value={userDetails.mobile}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("bldng")}
                      <span>*</span>
                    </p>
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          bldg: e.target.value,
                        });
                      }}
                      value={userDetails.bldg}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("street")}
                      <span>*</span>
                    </p>
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          street: e.target.value,
                        });
                      }}
                      value={userDetails.street}
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
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          country: e.target.value,
                        });
                      }}
                      value={userDetails.country}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="checkout__input">
                    <p>
                      {t("city")}
                      <span>*</span>
                    </p>
                    <input
                      type="text"
                      style={{ paddingRight: "15px" }}
                      onChange={(e) => {
                        setUserDetails({
                          ...userDetails,
                          city: e.target.value,
                        });
                      }}
                      value={userDetails.city}
                    />
                  </div>
                </div>
              </div>
              <div style={{ width: "100%", textAlign: "center" }}>
                <button
                  type="submit"
                  className="primary-btn"
                  style={{
                    fontSize: language === "ar" ? "18px" : "16px",
                    margin: "0 auto",
                    width: "50%",
                  }}
                  onClick={() => {
                    submitEditProfile();
                  }}
                >
                  {t("save")}
                </button>
              </div>
              <h1>
                {updateMessage &&
                  presentToast(
                    "bottom",
                    "Profile has been updated successfully"
                  )}
              </h1>
            </div>
          </div>
        </div>
        {/* <div>{updateMessage}</div> */}
      </section>

      <Footer />
    </>
  );
};

export default Profile;
