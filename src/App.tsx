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

/* Theme variables */
import "./theme/variables.css";
import PaymentState from "./pages/Payment_state";
setupIonicReact();
// console.log(localStorage.getItem("lang"));
const App: React.FC = () => (
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
);

export default App;
