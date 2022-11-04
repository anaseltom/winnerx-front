import { Suspense, useEffect, useRef } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import HowItWorks from "./pages/HowItWorks";
import PrizeDrawTerms from "./pages/PrizeDrawTerms";
import FAQ from "./pages/FAQ";
import Policy from "./pages/Policy";
import TermsOfService from "./pages/TermsOfService";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";
import CheckoutBilling from "./components/CheckoutBilling";
import CheckOutStripe from "./components/CheckOutStripe";
import Account from "./components/Account";
import Winners from "./components/Winners";
import { Provider } from "react-redux";
import store from "./store";
import en from "./language/en.json";
import ar from "./language/ar.json";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import PaymentState from "./pages/Payment_state";
import "./theme/variables.css";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationEn = en;
const translationAr = ar;

/* Theme variables */
setupIonicReact();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEn },
    ar: { translation: translationAr },
  },
  lng: `${localStorage.getItem("lang")}`,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

// console.log(localStorage.getItem("lang"));
const App: React.FC = () => {
  useEffect(() => {
    if (localStorage.getItem("lang") === "ar") {
      document.querySelector("html")?.setAttribute("dir", "rtl");
    }
    if (localStorage.getItem("lang") === "en") {
      document.querySelector("html")?.setAttribute("dir", "ltr");
    }
  }, []);
  return (
    <Suspense fallback="Loading...">
      <Provider store={store}>
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/prize-draw-terms">
                <PrizeDrawTerms />
              </Route>
              <Route exact path="/faq">
                <FAQ />
              </Route>
              <Route exact path="/terms-of-service">
                <TermsOfService />
              </Route>
              <Route exact path="/privacy-policy">
                <Policy />
              </Route>
              <Route exact path="/how-it-works">
                <HowItWorks />
              </Route>
              <Route exact path="/signin/">
                <Signin />
              </Route>
              <Route path="/signin/:id" component={Signin}></Route>
              <Route exact path="/signup/">
                <Signup />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route exact path="/browse/">
                <Browse />
              </Route>
              <Route path="/browse/:id" component={Browse}></Route>
              <Route exact path="/checkout/">
                <Checkout />
              </Route>
              <Route exact path="/wishlist/">
                <Wishlist />
              </Route>
              <Route exact path="/confirm_checkout/">
                <CheckoutBilling />
              </Route>
              <Route exact path="/stripe/">
                <CheckOutStripe />
              </Route>
              <Route exact path="/account/">
                <Account />
              </Route>
              <Route path="/account/:id" component={Account}></Route>
              <Route exact path="/winners/">
                <Winners />
              </Route>
              <Route exact path="/payment">
                <PaymentState />
              </Route>
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      </Provider>
    </Suspense>
  );
};

export default App;
