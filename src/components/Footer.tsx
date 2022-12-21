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
import {
  mailOutline,
  locationOutline,
  logoFacebook,
  logoInstagram,
  logoTiktok,
  logoTwitter,
} from "ionicons/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Footer: React.FC<any> = () => {
  const { t } = useTranslation();
  const language = i18n.language;
  return (
    <footer
      className="footer spad"
      style={{ background: "white", textAlign: "center" }}
    >
      <div className="footer_div_copy">
        <div className="footer_div_copy_" style={{ padding: "20px 0" }}>
          <div className="footer_div_copy__">
            <IonIcon
              icon={mailOutline}
              style={{ width: "50px", height: "50px", color: "#f6de68" }}
            ></IonIcon>
            <h4>{t("call_us_footer")}</h4>
            <h5>{t("call_us_footer_")}</h5>
          </div>
          <div className="footer_div_copy__">
            <IonIcon
              icon={locationOutline}
              style={{ width: "50px", height: "50px", color: "#f6de68" }}
            ></IonIcon>
            <h4>{t("location_footer")}</h4>
            <h5>{t("location_footer_")}</h5>
            <h5>{t("location_footer__")}</h5>
          </div>
          <div className="footer_div_copy__">
            <IonIcon
              icon={mailOutline}
              style={{ width: "50px", height: "50px", color: "#f6de68" }}
            ></IonIcon>
            <h4>{t("contact_footer")}</h4>
            <h5>{t("contact_footer_")}</h5>
          </div>
        </div>
      </div>
      <div className="footer_2_div_copy">
        <div className="footer_div_copy_" style={{ padding: "20px 0" }}>
          <div className="footer_2_div_copy__" style={{ marginTop: "0" }}>
            <h4>{t("useful_links")}</h4>
            <ul>
              <li>
                <Link to={`/how-it-works`}>{t("how_it_works")}</Link>
              </li>
              <li>
                <Link to={`/prize-draw-terms`}>{t("prize_draw_terms")}</Link>
              </li>
              <li>
                <Link to={`/faq`}>{t("FAQs")}</Link>
              </li>
              <li>
                <Link to={`/terms-of-service`}>{t("terms_of_services")}</Link>
              </li>
              <li>
                <Link to={`/privacy-policy`}>{t("privacy_policy")}</Link>
              </li>
            </ul>
          </div>
          {/* we are here */}

          <div className="footer_2_div_copy__">
            <h4>{t("footer_2_pay")}</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "40px",
              }}
            >
              <img src="assets/apple_pay.svg" width="40px" />
              <img src="assets/samsung_pay.svg" width="40px" />
              <img src="assets/visa_logo.svg" width="40px" />
              <img src="assets/mastercard_logo.svg" width="40px" />
            </div>
          </div>
          <div className="footer_2_div_copy__">
            <h4>{t("footer_3_contact")}</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: "40px",
                width: "100%",
                marginBottom: "20px",
              }}
            >
              <IonIcon
                icon={logoFacebook}
                className="social_media_copy"
              ></IonIcon>
              <IonIcon
                icon={logoInstagram}
                className="social_media_copy"
              ></IonIcon>
              <IonIcon
                icon={logoTwitter}
                className="social_media_copy"
              ></IonIcon>
              <IonIcon
                icon={logoTiktok}
                className="social_media_copy"
              ></IonIcon>
            </div>
            <div id="app_store">
              <img src="assets/downloadAppStroe.png" alt="" width="120px" />
              <img src="assets/downloadAppStore.png" alt="" width="120px" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <a>
                  <Link to={`/home`}>
                    <img
                      src="/assets/img/winnerX-logo.png"
                      style={{ width: "150px" }}
                      alt=""
                    />
                  </Link>
                </a>
              </div>
              <ul>
                <li>{t("win_add")}</li>
                <li>{t("win_phone")}</li>
                <li>{t("win_email")}</li>
              </ul>
            </div>
          </div>
          <div className="col-lg-7 col-md-7 col-sm-6 offset-lg-1">
            <div className="footer__widget">
              <h6>{t("useful_links")}</h6>
              <ul>
                <li>
                  <Link to={`/how-it-works`}>{t("how_it_works")}</Link>
                </li>
                <li>
                  <Link to={`/prize-draw-terms`}>{t("prize_draw_terms")}</Link>
                </li>
                <li>
                  <Link to={`/faq`}>{t("FAQs")}</Link>
                </li>
                <li>
                  <Link to={`/terms-of-service`}>{t("terms_of_services")}</Link>
                </li>
                <li>
                  <Link to={`/privacy-policy`}>{t("privacy_policy")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> */}
    </footer>
  );
};

export default Footer;
