import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { useState, useRef, useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { users } from "../actions/UserAction";
import { RootStore } from "../store";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const Pharagraph: React.FC = () => {
  const { t } = useTranslation();
  const language = i18n.language;
  const dispatch = useDispatch();
  const [loader, setLoader] = useState<any>("");
  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    setTimeout(function () {
      setLoader("loader_remove");
    }, 500);
  }, []);

  return (
    <>
      <div id="preloder" className={loader}>
        <div className="loader"></div>
      </div>
      <Header />

      <div
        className="pharagraph_wrapper"
        style={{ textAlign: language === "en" ? "left" : "right" }}
      >
        <div className="row">
          <div className="title">{t("privacy_policy")}</div>
        </div>

        <div className="MuiContainer-root MuiContainer-maxWidthLg">
          <h5 className="section-heading">{t("privacy_policy")}</h5>
          <div className="">
            <pre className="preTag">{t("policy_1")}</pre>
            <h5 className="pp-heading">{t("info_col")}</h5>
            <p>{t("info_col_")}</p>
            <h5 className="pp-heading">{t("log_data")}</h5>
            <p>{t("log_data_")}</p>
            <h5 className="pp-heading">{t("cookies")}</h5>
            <pre className="preTag">{t("cookies_")}</pre>
            <h5 className="pp-heading">{t("service_providers")}</h5>
            <p>{t("service_providers_1")}</p>
            <pre className="preTag">{t("service_providers_2")}</pre>
            <p>{t("service_providers_3")}</p>
            <h5 className="pp-heading">{t("security")}</h5>
            <p>{t("security_")}</p>
            <h5 className="pp-heading">{t("links_to_other_sites")}</h5>
            <p>{t("links_to_other_sites_")}</p>
            <h5 className="pp-heading">{t("children")}</h5>
            <p>{t("children_")}</p>
            <h5 className="pp-heading">{t("changes")}</h5>
            <p>{t("changes_")}</p>
            <h5 className="pp-heading">{t("contact_us")}</h5>
            <p>{t("contact_us_")}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pharagraph;
