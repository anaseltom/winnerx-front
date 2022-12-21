import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonModal,
} from "@ionic/react";
import "./Signup.css";
import { arrowBack } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { userSignUp, usersUpdate } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import i18n, { t } from "i18next";
import { useHistory } from "react-router";
import axios from "axios";
import { baseURL } from "../utilities/axios";

const Signup: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: RootStore) => state.user);
  const language = i18n.language;

  const [isOpen, setIsOpen] = useState<any>(false);
  const [dismiss, setDismiss] = useState<any>(false);
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [otpMessage, setOtpMessage] = useState({
    msg: "",
    color: "",
  });

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
      .post(`${baseURL}/user/verify-otp`, { email: signup.email, otp: otp })
      .then((res: any) => {
        // console.log(res);
        if (res.data.status == 200) {
          setOtpMessage({
            msg: "Your account has been verified",
            color: "#d4edda",
          });
          setDismiss(true);
          setIsOpen(false);
          setTimeout(() => {
            history.push("/");
          }, 1000);
        } else {
          setOtpMessage({
            msg: "Incorrect OTP",
            color: "#f8d7da",
          });
        }
      })
      .catch((err: any) => {
        setOtpMessage({
          msg: "Something went wrong",
          color: "#f8d7da",
        });
        setDismiss(true);
        setIsOpen(false);
        setTimeout(() => {
          history.push("/signin");
        }, 1000);
      });
  };

  const resendOTP = () => {
    axios
      .post(`${baseURL}/user/send-otp`, { email: signup.email })
      .then((res) => {
        setIsOpen(true);
        setMinutes(1);
        setSeconds(30);
      });
  };

  const [signupMessage, setSignupMessage] = useState<any>({
    status: "500",
    message: "",
  });
  const [signup, setSignup] = useState<any>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    address: "",
    password: "",
    confirmPassword: "",
    org_name: "",
    user_type: "customer",
    user_type_main: "customer",
  });

  const dispatch = useDispatch();

  const SignupResponse = (res: any) => {
    if (res.status == 200) {
      setSignupMessage({
        ...signupMessage,
        status: "200",
        message: "Signup successfully.",
        color: "#d4edda",
      });
      axios
        .post(`${baseURL}/user/send-otp`, { email: signup.email })
        .then((res) => {
          setIsOpen(true);
          setMinutes(1);
          setSeconds(30);
        });

      dispatch(usersUpdate(res.id, res.utk, verificationMode));
    } else {
      setSignupMessage({
        ...signupMessage,
        status: "500",
        message: res.msg,
        color: "#f8d7da",
      });
    }
  };

  const signupUser = (e: any) => {
    e.preventDefault();
    if (signup.password === signup.confirmPassword) {
      const resultSignup = dispatch(userSignUp(signup, SignupResponse));
    } else {
      setSignupMessage({
        ...signupMessage,
        status: "500",
        message: "Password did not match",
        color: "#f8d7da",
      });
    }
  };

  const verificationMode = (data: any) => {
    localStorage.setItem("session", "live");
    localStorage.setItem("session_id", data.id);
    localStorage.setItem("email", signup.email);
    localStorage.setItem("username", signup.username);
    localStorage.setItem("user_dm", "url(/assets/girl.jpg)");
  };

  return (
    <>
      <div
        className="auth-wrapper d-flex no-block justify-content-center align-items-center position-relative"
        style={{
          backgroundImage: `url(assets/img/shopping.jpg)`,
          textAlign: language === "en" ? "left" : "right",
        }}
      >
        <div className="auth-box row">
          <div className="signup-box col-lg-8 col-md-8">
            <div
              style={{
                display: "flex",
                justifyContent: language === "en" ? "flex-start" : "flex-end",
                cursor: "pointer",
                marginTop: "10px",
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
            <form className="p-3" onSubmit={signupUser}>
              <div className="text-center">
                {/* <img
                  className="comp_logo"
                  src="assets/img/workone-ico.png"
                  alt="wrapkit"
                /> */}
              </div>
              <h2 className="mt-3 text-center">{t("sign_up")}</h2>
              <p className="text-center">{t("fill_information")}</p>
              {signupMessage.message && (
                <h4
                  style={{
                    marginBottom: "10px",
                    lineHeight: "1",
                    background: signupMessage.color,
                    height: "40px",
                    textAlign: "center",
                    paddingTop: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {signupMessage.message}
                </h4>
              )}
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-dark">{t("first_name")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.first_name}
                      onChange={(e) => {
                        setSignup({ ...signup, first_name: e.target.value });
                      }}
                      id="fname"
                      type="text"
                      required
                      placeholder={t("first_name_")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-dark">{t("last_name")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.last_name}
                      onChange={(e) => {
                        setSignup({ ...signup, last_name: e.target.value });
                      }}
                      id="lname"
                      type="text"
                      required
                      placeholder={t("last_name_")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-dark">{t("email")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.email}
                      onChange={(e) => {
                        setSignup({ ...signup, email: e.target.value });
                      }}
                      id="email"
                      type="email"
                      required
                      placeholder={t("email_")}
                    />
                  </div>
                  {/* <div className="form-group">
                    <label className="text-dark">Username</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.username}
                      onChange={(e) => {
                        setSignup({ ...signup, username: e.target.value });
                      }}
                      id="uname"
                      type="text"
                      placeholder="enter your username"
                    />
                  </div> */}
                  <div className="form-group">
                    <label className="text-dark">{t("complete_add")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.address}
                      onChange={(e) => {
                        setSignup({ ...signup, address: e.target.value });
                      }}
                      id="address"
                      type="text"
                      placeholder={t("complete_add_")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-dark">{t("password")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.password}
                      onChange={(e) => {
                        setSignup({ ...signup, password: e.target.value });
                      }}
                      id="password"
                      type="password"
                      required
                      placeholder={t("password_")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="text-dark">{t("confirm_pass")}</label>
                    <input
                      className="form-control email forms_required"
                      value={signup.confirmPassword}
                      onChange={(e) => {
                        setSignup({
                          ...signup,
                          confirmPassword: e.target.value,
                        });
                      }}
                      required
                      id="c-password"
                      type="password"
                      placeholder={t("confirm_pass_")}
                    />
                  </div>
                </div>
                <div className="col-lg-12 text-center">
                  <button
                    type="submit"
                    // onClick={() => {
                    //   signupUser();
                    // }}
                    className="primary-btn"
                  >
                    {t("sign_up")}
                  </button>
                </div>
                <div className="col-lg-12 text-center mt-5">
                  {t("have_account")}{" "}
                  <a
                    onClick={() => {
                      history.push("/signin");
                    }}
                    style={{ cursor: "pointer" }}
                    className="text-danger"
                  >
                    {t("sign_in")}
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

export default Signup;
