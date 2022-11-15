import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import "./Signin.css";
import { useState, useRef, useEffect } from "react";
import { userSignIn, userSignUp, usersUpdate } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { RootStore } from "../store";
import i18n, { t } from "i18next";
// import { useIonToast } from "@ionic/react";

declare global {
  interface Window {
    // ⚠️ notice that "Window" is capitalized here
    google: any;
  }
}

const Signin: React.FC = () => {
  function handleCallbackResponse(response: any) {
    const userObject: any = jwt_decode(response.credential);

    if (userObject && userObject?.email_verified) {
      // window.location.href = "/home";
      signupUser(userObject);
    }
  }
  useEffect(() => {
    const google = window?.google;
    google?.accounts.id.initialize({
      client_id:
        "580884249363-g8fr53jtk9me0u8lsu6sgvkh9mr8as0r.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "dark",
      size: "large",
      width: "100%",
    });
  }, []);
  const language = i18n.language;
  const handleFailure = (result: any) => {};

  const handleLogin = (googleData: any) => {};

  const user = useSelector((state: RootStore) => state.user);
  const [ref, setRef] = useState<any>("none");
  const { id } = useParams<any>();
  const [login, setLogin] = useState<any>({
    email: "",
    password: "",
    // billing: ref=="redirect" ? true : false
    billing: true,
    utk: id?.split("v?uveid=")[1]?.length > 0 ? id?.split("v?uveid=")[1] : "",
  });

  const Child = () => {
    if (id) {
      setRef(id);
      // setLogin({...login, billing:id=="redirect" ? true : false})
    }
  };

  useEffect(() => {
    Child();
  }, [id]);

  // check if signed in or not
  useEffect(() => {
    // window.location.href = "/signin";
    if (localStorage.getItem("session")) {
      window.location.href = "/";
    } else {
    }
  }, []);

  const dispatch = useDispatch();

  // ------------------------
  // This is for the social media login - first we need to register the user

  const SignupResponse = (res: any) => {
    if (res.status == 200) {
      dispatch(usersUpdate(res.id, res.utk, verificationMode));
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

  const signupUser = (res: any) => {
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
  const verificationMode = () => {
    // setTimeout(() => {
    //   window.location.href = "/signin";
    // }, 500);
  };
  const history = useHistory();

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
        color: "#d4edda",
      });
      localStorage.setItem("session", "live");
      localStorage.setItem("session_id", temp_arr.id);
      localStorage.setItem("email", temp_arr.email);
      localStorage.setItem("username", temp_arr.user_name);
      localStorage.setItem("user_dm", "url(/assets/girl.jpg)");

      if (ref == "redirect") {
        window.location.href = "/confirm_checkout";
      } else {
        window.location.href = "/";
      }
    } else if (res.status == 500) {
      setSigninMessage({
        ...signinMessage,
        status: "200",
        message: res.msg,
        color: "#f8d7da",
      });
    }
  };

  const authentication = (e: any) => {
    // console.log("updated ref", ref);
    e.preventDefault();
    dispatch(userSignIn(login, SigninResponse));
    // signinMessage.message && presentToast("bottom");
  };
  const [signinMessage, setSigninMessage] = useState<any>({
    status: "500",
    message: "",
    color: "#f8d7da",
  });

  // const [present] = useIonToast();
  // const presentToast = (position: "top" | "middle" | "bottom") => {
  //   present({
  //     message: signinMessage.message,
  //     duration: 1500,
  //     position: position,
  //     icon: checkmark,
  //     color: signinMessage.meesage ? "success" : "danger",
  //   });
  // };
  return (
    <>
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
        style={{ backgroundImage: `url(assets/img/shopping.jpg)` }}
      >
        <div className="auth-box row" style={{ height: "auto" }}>
          <div className="signin-box col-lg-5 col-md-7">
            <form className="p-3" onSubmit={authentication}>
              {/* <div className="text-center">
                            <img className="comp_logo" src="assets/img/winnerX-logo.png" alt="wrapkit" />
                        </div> */}
              <div
                style={{
                  display: "flex",
                  justifyContent: language === "en" ? "flex-start" : "flex-end",
                  cursor: "pointer",
                }}
                onClick={() => {
                  history.push("/");
                }}
              >
                <span>
                  <IonIcon
                    icon={arrowBack}
                    style={{ height: "25px", width: "25px" }}
                  ></IonIcon>
                </span>
                <span>{t("back_to_home")}</span>
              </div>
              <h2 className="mt-3 text-center">{t("sign_in")}</h2>
              <p className="text-center">{t("email&password")}</p>
              {/* {console.log(signinMessage)} */}
              {signinMessage?.message && (
                <h4
                  style={{
                    fontSize: "13px",
                    lineHeight: "1",
                    background: signinMessage.color,
                    height: "40px",
                    textAlign: "center",
                    paddingTop: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {signinMessage.message}
                </h4>
              )}
              <div
                className="row"
                style={{ textAlign: language === "ar" ? "right" : "left" }}
              >
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-dark">{t("email")}</label>
                    <input
                      className="form-control email forms_required"
                      id="uname"
                      value={login.email}
                      onChange={(e) => {
                        setLogin({ ...login, email: e.target.value });
                      }}
                      type="text"
                      placeholder={
                        language === "en"
                          ? "enter your email"
                          : "أدخل البريد الإلكتروني"
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-dark">{t("password")}</label>
                    {/* {console.log(login)} */}
                    <input
                      className="form-control password forms_required"
                      id="pwd"
                      value={login.password}
                      onChange={(e) => {
                        setLogin({ ...login, password: e.target.value });
                      }}
                      type="password"
                      placeholder={
                        language === "en"
                          ? "enter your password"
                          : "أدخل كلمة السر"
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <button
                    // onClick={() => {
                    //   authentication();
                    // }}
                    type="submit"
                    className="btn btn-block btn-dark login_button"
                  >
                    {t("sign_in")}
                  </button>
                </div>
                <div id="signInDiv" data-width="100%" data-height="200"></div>
                <div className="col-lg-12 text-center mt-5">
                  {t("no_account")}{" "}
                  <a
                    onClick={() => {
                      history.push("/signup");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-danger"
                  >
                    {t("sign_up")}
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
