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
  const language = i18n.language;
  const { t } = useTranslation();
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
          <div className="title">{t("terms_of_services")}</div>
        </div>

        <div className="MuiContainer-root MuiContainer-maxWidthLg">
          <h2 className="section-heading">{t("terms_of_services")}</h2>
          <div className="">
            <p className="">{t("terms_1")}</p>
            <p>{t("terms_1")}</p>
          </div>
          <h2 className="section-heading">{t("general_provisions")}</h2>
          <div className="">
            <p className="">1. {t("general_1")}</p>
            <p>2. {t("general_2")}</p>
          </div>
          <h2 className="section-heading">{t("terms_and_conditions")}</h2>
          <div className="">
            <p className="">3. {t("trms_1")}</p>
            <p>4. {t("trms_2")}</p>
            <p>5. {t("trms_3")}</p>
            <p>6. {t("trms_4")}</p>
          </div>
          <h2 className="section-heading">{t("user_registration")}</h2>
          <div className="">
            <p className="">7. {t("reg_1")}</p>
            <p>8. {t("reg_2")}</p>
            <p>9. {t("reg_3")}</p>
            <p>10. {t("reg_4")}</p>
          </div>
          <h2 className="section-heading">{t("user_rep")}</h2>
          <div className="">
            <p className="">11. {t("rep_1")}</p>
            <p>• {t("rep_2")}</p>
            <p>• {t("rep_3")}</p>
            <p>• {t("rep_4")}</p>
            <p>• {t("rep_5")}</p>
            <p>• {t("rep_6")}</p>
            <p>• {t("rep_7")}</p>
            <p>• {t("rep_8")}</p>
            <p>• {t("rep_9")}</p>
            <p>• {t("rep_10")}</p>
            <p>• {t("rep_11")}</p>
            <p>• {t("rep_12")}</p>
            <p>12. {t("rep_13")}</p>
            <p>13. {t("rep_14")}</p>
          </div>
          <h2 className="section-heading">{t("payment_gateway")}</h2>
          <div className="">
            <p className="">14. {t("gate_1")}</p>
            <p>15. {t("gate_2")}</p>
            <p>16. {t("gate_3")}</p>
            <p>17. {t("gate_4")}</p>
            <p>18. {t("gate_5")}</p>
          </div>
          <h2 className="section-heading">{t("Refund policy")}</h2>
          <div className="">
            <p className="">19. {t("refund_1")}</p>
            <p>20. {t("refund_2")}</p>
            <p>21. {t("refund_3")}</p>
          </div>
          <h2 className="section-heading">{t("property_rights")}</h2>
          <div className="">
            <p className="">22. {t("rights_1")}</p>
            <p>23. {t("rights_2")}</p>
            <p>24. {t("rights_3")}</p>
          </div>
          <h2 className="section-heading">{t("user_submissions")}</h2>
          <div className="">
            <p className="">25. {t("subm_1")}</p>
            <p>26. {t("subm_2")}</p>
          </div>
          <h2 className="section-heading">{t("digital_media")}</h2>
          <div className="">
            <p className="">27. {t("dig_1")}</p>
          </div>
          <h2 className="section-heading">{t("third_party")}</h2>
          <div className="">
            <p className="">28. {t("third_1")}</p>
            <p>29. {t("third_2")}</p>
          </div>
          <h2 className="section-heading">{t("limitations")}</h2>
          <div className="">
            <p className="">30. {t("lim_1")}</p>
            <p>(1) {t("lim_2")}</p>
            <p>(2) {t("lim_3")}</p>
            <p>(3) {t("lim_4")}</p>
            <p>(4) {t("lim_5")}</p>
            <p>(5) {t("lim_6")}</p>
            <p>(6) {t("lim_7")}</p>
            <p>31. {t("lim_8")}</p>
            <p>32. {t("lim_9")}</p>
            <p>33. {t("lim_10")}</p>
            <p>34. {t("lim_11")}</p>
            <p>35. {t("lim_12")}</p>
            <p>36. {t("lim_13")}</p>
            <p>37. {t("lim_14")}</p>
            <p>38. {t("lim_15")}</p>
            <p>39. {t("lim_16")}</p>
            <p>40. {t("lim_17")}</p>
            <p>41. {t("lim_18")}</p>
          </div>
          <h2 className="section-heading">{t("indemnity")}</h2>
          <div className="">
            <p className="">42. {t("idem_1")}</p>
          </div>
          <h2 className="section-heading">{t("spam_policy")}</h2>
          <div className="">
            <p className="">43. {t("spam_1")}</p>
          </div>
          <h2 className="section-heading">{t("final")}</h2>
          <div className="">
            <p className="">44. {t("final_1")}</p>
            <p>45. {t("final_2")}</p>
            <p>46. {t("final_3")}</p>
            <p>47. {t("final_4")}</p>
            <p>48. {t("final_5")}</p>
            <p>49. {t("final_6")}</p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Pharagraph;
