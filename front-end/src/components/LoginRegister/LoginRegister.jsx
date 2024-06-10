import React, { useState } from "react";
import "./Login.css";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRegister = () => {
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
  // console.log(SavedFormData);
  const loginsubmitForm = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:2222/api/login/`, loginData)
      .then((data) => {
        sessionStorage.setItem("userRole", data.data.userRole);
        sessionStorage.setItem("userId", data.data.userId);
        sessionStorage.setItem("token", data.data.token);
        console.log(data);
        if (SavedFormData) {
          navigate("/user/booking");
        } else if (data.data.userRole == 1) {
          navigate("/home");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
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
    axios
      .post(`http://localhost:2222/api/register`, registerData)
      .then((data) => {
        console.log(data);
        setFormchange(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
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

              <form action="" className="login-form">
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
                </button>
                <div className="form-changer-area-sec">
                  <div className="form-changer-area">
                    Are you a new user ? &nbsp;
                    <div onClick={formChanger} className="form-to-register">
                      Register
                    </div>
                  </div>
                  <div className="form-changer-area">
                    Register As Phtographer? &nbsp;
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
              <form action="" className="register-form">
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
                <div className="login-inputfield-sec">
                  <img src="/email.png" alt="" className="input-logo" />
                  <input
                    type="text"
                    name="email"
                    onChange={formHandler}
                    className="register-input-field"
                    placeholder="Email"
                  />
                </div>
                <div className="login-inputfield-sec">
                  <img src="/phone.png" alt="" className="input-logo" />
                  <input
                    type="text"
                    name="phone"
                    onChange={formHandler}
                    className="register-input-field"
                    placeholder="Phone"
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
    </div>
  );
};

export default LoginRegister;
