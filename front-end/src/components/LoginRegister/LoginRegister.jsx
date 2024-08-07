import React, { useState } from "react";
import "./Login.css";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import BASE_URI from "../Constant/Constant";
import Loader from "../Loader/Loader";

const LoginRegister = () => {
  // show Loader

  const [showloader, setShowloader] = useState(false);

  const [formChange, setFormchange] = useState(true); //Form changer

  //////Password Hide and show

  const [hidePass, setHidePass] = useState(false);

  const passwordHandler = () => {
    setHidePass((prev) => !prev);
  };

  //Login section

  const [loginData, setLoginData] = useState({}); //Login form inputs

  const loginformHandler = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  ////Login
  const navigate = useNavigate();

  //Saved form Data for Booked Users
  const SavedFormData = sessionStorage.getItem("SavedFormData");
  const photographerId = sessionStorage.getItem("photographerId");
  // console.log(SavedFormData);
  const loginsubmitForm = (e) => {
    e.preventDefault();
    let field = ["email", "password"];
    let message = ["Email", "Password"];
    for (let i = 0; i < field.length; i++) {
      let validation = document.forms["login-form"][field[i]].value;
      if (validation == "") {
        toast.error(`Please Fill ${message[i]}`);
        return false;
      }
    }
    setShowloader(true);
    axios
      // .post(`http://localhost:2222/api/login/`, loginData)
      .post(`${BASE_URI}/api/login/`, loginData)
      .then((data) => {
        setShowloader(false);
        toast.success("Login Successful");

        sessionStorage.setItem("userRole", data.data.userRole);
        sessionStorage.setItem("userId", data.data.userId);
        sessionStorage.setItem("token", data.data.token);
        setTimeout(() => {
          sessionStorage.clear();
        }, 1000 * 60 * 60);
        console.log(data);

        if (SavedFormData) {
          navigate(`/photographer-review/${photographerId}`);
        } else if (data.data.userRole == 1) {
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setShowloader(false);

        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  ///Form changer

  const formChanger = (e) => {
    setHidePass(false);
    setFormchange((prev) => !prev);
  };

  //reigister Section

  const [registerData, setRegisterData] = useState({});

  const formHandler = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  ///Register

  const submitForm = (e) => {
    e.preventDefault();
    let field = ["name", "email", "phone", "password"];
    let message = ["Name", "Email", "Phone", "Password"];
    for (let i = 0; i < field.length; i++) {
      let validation = document.forms["register-form"][field[i]].value;
      if (validation == "") {
        toast.error(`Please Fill ${message[i]}`);
        return false;
      }
    }
    axios
      .post(`${BASE_URI}/api/register`, registerData)
      .then((data) => {
        console.log(data);
        toast.success("Register Successful");
        setFormchange(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <Toaster />
      {showloader == true ? (
        <Loader />
      ) : (
        <>
          <div className="login-main">
            <div
              className={
                formChange == true ? "login-sub-body" : "register-sub-body"
              }
            >
              <div
                className={
                  formChange == true ? "login-image-sec" : "register-image-sec"
                }
              ></div>

              {formChange == true ? (
                <div className="login-form-sec">
                  {/* ///Login Form */}

                  <form action="" className="login-form" name="login-form">
                    <div className="form-title">LOGIN</div>
                    <div className="login-inputfield-sec">
                      <img src="/email.png" alt="" className="input-logo" />
                      <input
                        type="text"
                        name="email"
                        onChange={loginformHandler}
                        className="login-input-field"
                        placeholder="Email"
                      />
                    </div>
                    <div className="login-inputfield-sec">
                      <img
                        src={
                          hidePass == true
                            ? "open-eye-login.png"
                            : "/closed-eye-login.png"
                        }
                        alt=""
                        className="input-logo"
                        style={{ cursor: "pointer" }}
                        onClick={passwordHandler}
                      />
                      <input
                        type={hidePass == true ? "text" : "password"}
                        name="password"
                        onChange={loginformHandler}
                        className="login-input-field"
                        placeholder="Password"
                      />
                    </div>
                    <button onClick={loginsubmitForm} className="login-button">
                      Login
                      <div className="login-btn-back"></div>
                    </button>
                    <div className="form-changer-area-sec">
                      <div className="form-changer-area">
                        Are you a new user ? &nbsp;
                        <div onClick={formChanger} className="form-to-register">
                          Register
                        </div>
                      </div>
                      <div className="form-changer-area">
                        Register As Photographer? &nbsp;
                        <Link
                          to={"/photographer-register"}
                          className="form-to-register"
                        >
                          Click
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                ///Register Form

                <div className="register-form-sec">
                  <form
                    action=""
                    className="register-form"
                    name="register-form"
                  >
                    <div className="register-form-title">REGISTER</div>

                    <div className="register-inputfield-sec">
                      <img src="/userlogin.png" alt="" className="input-logo" />
                      <input
                        type="text"
                        name="name"
                        onChange={formHandler}
                        className="register-input-field"
                        placeholder="Name"
                      />
                    </div>
                    <div className="register-inputfield-sec">
                      <img src="/email.png" alt="" className="input-logo" />
                      <input
                        type="text"
                        name="email"
                        onChange={formHandler}
                        className="register-input-field"
                        placeholder="Email"
                      />
                    </div>
                    <div className="register-inputfield-sec">
                      <img src="/phone.png" alt="" className="input-logo" />
                      <input
                        type="text"
                        name="phone"
                        onChange={formHandler}
                        className="register-input-field"
                        placeholder="Phone"
                      />
                    </div>
                    <div className="register-inputfield-sec">
                      <img
                        src={
                          hidePass == true
                            ? "open-eye-login.png"
                            : "/closed-eye-login.png"
                        }
                        alt=""
                        className="input-logo"
                        onClick={passwordHandler}
                        style={{ cursor: "pointer" }}
                      />
                      <input
                        type={hidePass == true ? "text" : "password"}
                        name="password"
                        onChange={formHandler}
                        className="register-input-field"
                        placeholder="Password"
                      />
                    </div>
                    <button onClick={submitForm} className="register-button">
                      Register
                      <div className="register-btn-back"></div>
                    </button>
                    <div className="form-changer-area">
                      Already a User ? &nbsp;
                      <div onClick={formChanger} className="form-to-login">
                        Login
                      </div>
                    </div>
                  </form>{" "}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginRegister;
