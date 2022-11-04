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
          <div className="title">{t("prize_draw_terms")}</div>
        </div>

        <div className="row">
          <div className="pharagraph">{t("prize_draw_terms_first")}</div>
        </div>

        <div className="row">
          <div className="pharagraph">{t("prize_draw_terms_second")}</div>
        </div>

        <div className="row">
          <div className="pharagraph">{t("prize_draw_terms_third")}</div>
        </div>

        <div className="row">
          <div className="pharagraph bullets">
            1. {t("prize_draw_1")} <br />
            <br />
            2. {t("prize_draw_2")} <br />
            <br />
            3. {t("prize_draw_3")} <br />
            <br />
            4. {t("prize_draw_4")}
            <br />
            <br />
            5. {t("prize_draw_5")} <br />
            <br />
            6. {t("prize_draw_6")} <br />
            <br />
            7. {t("prize_draw_7")} <br />
            <br />
            8. {t("prize_draw_8")} <br />
            <br />
            9. {t("prize_draw_9")} <br />
            <br />
            10. {t("prize_draw_10")} <br />
            <br />
            11. {t("prize_draw_11")} <br />
            <br />
            12. {t("prize_draw_12")} <br />
            <br />
            13. {t("prize_draw_13")} <br />
            <br />
            14. {t("prize_draw_14")} <br />
            <br />
            15. {t("prize_draw_15")}
            <br />
            <br />
            16. {t("prize_draw_16")} <br />
            <br />
            17. {t("prize_draw_17")} <br />
            <br />
            18. {t("prize_draw_18")} <br />
            <br />
            19. {t("prize_draw_19")} <br />
            <br />
            20. {t("prize_draw_20")} <br />
            <br />
            21. {t("prize_draw_21")} <br />
            <br />
            22. {t("prize_draw_22")} <br />
            <br />
            23. {t("prize_draw_23")} <br />
            <br />
            24. {t("prize_draw_24")} <br />
            <br />
            25. {t("prize_draw_25")} <br />
            <br />
            26. {t("prize_draw_26")}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pharagraph;
