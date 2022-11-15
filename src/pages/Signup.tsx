import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import "./Signup.css";
import { arrowBack } from "ionicons/icons";
import React, { useState } from "react";
import { userSignUp, usersUpdate } from "../actions/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "../store";
import i18n, { t } from "i18next";
import { useHistory } from "react-router";

const Signup: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: RootStore) => state.user);
  const language = i18n.language;

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
    email_status: "verified",
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
      console.log("response from signup", res);
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

  const verificationMode = () => {
    setTimeout(() => {
      window.location.href = "/signin";
    }, 500);
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
                    className="btn btn-block btn-dark login_button"
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
    </>
  );
};

export default Signup;
