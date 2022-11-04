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
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const Faq: React.FC = () => {
  const { t } = useTranslation();
  const [loader, setLoader] = useState<any>("");
  const language = i18n.language;
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
          <div className="title">{t("FAQs_")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_1")}</div>
          <div className="pharagraph">{t("FAQ_a1")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_2")}</div>
          <div className="pharagraph">{t("FAQ_a2")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_3")}</div>
          <div className="pharagraph">{t("FAQ_a3")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_4")}</div>
          <div className="pharagraph">{t("FAQ_a4")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_5")}</div>
          <div className="pharagraph">{t("FAQ_a5")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_6")}</div>
          <div className="pharagraph">{t("FAQ_a6")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_7")}</div>
          <div className="pharagraph">{t("FAQ_a7")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_8")}</div>
          <div className="pharagraph">{t("FAQ_a8")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_9")}</div>
          <div className="pharagraph">{t("FAQ_a9")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_10")}</div>
          <div className="pharagraph">{t("FAQ_a10")}</div>
        </div>

        <div className="row">
          <div className="title">{t("FAQ_11")}</div>
          <div className="pharagraph">{t("FAQ_a11")}</div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Faq;
