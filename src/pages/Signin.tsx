import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonModal,
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
import { baseURL } from "../utilities/axios";
import axios from "axios";
// import { useIonToast } from "@ionic/react";

// declare global {
//   interface Window {
//     // ⚠️ notice that "Window" is capitalized here
//     google: any;
//   }
// }

const Signin: React.FC = () => {
  function handleCallbackResponse(response: any) {
    const userObject: any = jwt_decode(response.credential);

    if (userObject && userObject?.email_verified) {
      // window.location.href = "/home";
      signupUser(userObject);
    }
  }
  useEffect(() => {
    // const google = window?.google;
    // google?.accounts.id.initialize({
    //   client_id:
    //     "580884249363-g8fr53jtk9me0u8lsu6sgvkh9mr8as0r.apps.googleusercontent.com",
    //   callback: handleCallbackResponse,
    // });
    // google.accounts.id.renderButton(document.getElementById("signInDiv"), {
    //   theme: "dark",
    //   size: "large",
    //   width: "100%",
    // });
  }, []);
  const language = i18n.language;
  const history = useHistory();
  const handleFailure = (result: any) => {};

  const handleLogin = (googleData: any) => {};

  const user = useSelector((state: RootStore) => state.user);
  const [ref, setRef] = useState<any>("none");

  const [isOpen, setIsOpen] = useState<any>(false);
  const [dismiss, setDismiss] = useState<any>(false);
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [otpMessage, setOtpMessage] = useState({
    msg: "",
    color: "",
  });

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const handleSendOtp = async (e: any) => {
    e.preventDefault();
    axios
      .post(`${baseURL}/user/verify-otp`, { email: login.email, otp: otp })
      .then((res) => {
        // console.log(res);
        if (res.data.status == 200) {
          setOtpMessage({
            msg: "Your account has been verified",
            color: "#d4edda",
          });
          // authentication(null);
          setDismiss(true);
          setIsOpen(false);
          setTimeout(() => {
            dispatch(userSignIn(login, SigninResponse));
          }, 1000);
          // history.push("/");
        } else {
          setOtpMessage({
            msg: "Incorrect OTP",
            color: "#f8d7da",
          });
          setTimeout(() => {
            setIsOpen(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setOtpMessage({
          msg: "Something went wrong",
          color: "#f8d7da",
        });
        setTimeout(() => {
          setIsOpen(false);
        }, 1000);
      });
  };

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
  // console.log(login);
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
        history.push("/confirm_checkout");
      } else {
        history.push("/");
      }
    } else if (res.status == 500) {
      setSigninMessage({
        ...signinMessage,
        status: "200",
        message: res.msg,
        color: "#f8d7da",
      });
      if (
        res.msg ==
        "We sent you an email verification to your email, please read the instruction on how to verify your email."
      ) {
        axios
          .post(`${baseURL}/user/send-otp`, { email: login.email })
          .then((res) => {
            setIsOpen(true);
            setMinutes(1);
            setSeconds(30);
          });
      }
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

  const resendOTP = () => {
    axios
      .post(`${baseURL}/user/send-otp`, { email: login.email })
      .then((res) => {
        setIsOpen(true);
        setMinutes(1);
        setSeconds(30);
      });
  };
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
                    className="primary-btn"
                  >
                    {t("sign_in")}
                  </button>
                </div>
                {/* <div id="signInDiv" data-width="100%" data-height="200"></div> */}
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
      <IonModal
        isOpen={isOpen}
        canDismiss={dismiss}
        style={{ padding: "0 15px" }}
      >
        <IonHeader>
          <IonToolbar color={"dark"} style={{ textAlign: "center" }}>
            <IonTitle>{t("otp_verification")}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ padding: "0 15px" }}>
          <h3 style={{ background: otpMessage.color, padding: "10px 5px" }}>
            {otpMessage.msg}
          </h3>
          <h2>({t("check_junk")})</h2>
          <div
            className="col-lg-12"
            style={{ padding: "0", marginTop: "25px" }}
          >
            <div className="form-group">
              <label className="text-dark">OTP</label>
              {/* {console.log(login)} */}
              <input
                className="form-control password forms_required"
                id="pwd"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                type="text"
                placeholder={language === "en" ? "enter OTP" : "أدخل ال OTP"}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            {/* <h3>Hello</h3> */}
            {seconds > 0 || minutes > 0 ? (
              <p>
                {t("time_remain")}: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>{t("no_code")}</p>
            )}
            <button
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#dcb841",
                height: "36px",
              }}
              onClick={resendOTP}
            >
              {t("resend_otp")}
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: "120px" }}>
            <button className="primary-btn" onClick={handleSendOtp}>
              {t("submit")}
            </button>
          </div>
        </div>
      </IonModal>
    </>
  );
};

export default Signin;
