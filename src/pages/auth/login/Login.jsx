import "./Login.scss";
import { Button } from "../../../components";
import loginImg from "../../../assets/images/login-img.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { loginAction } from "../../../store/actions/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
import { setToken } from "../../../store/actions";
// import AlertDialog from "../../../components/dialog/Dialog";

function Login() {
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({});
  const navigate = useNavigate();
  const data = useSelector((state) => state.Auth);

  const login = () => {
    setLoginData(loginData);
    setToken(loginData, navigate);
  };

  // useEffect(() => {
  //   console.log("useEffect");

  //   localStorage.getItem("token") && navigate("/buy-for-me");
  // }, [navigate, setToken]);

  return (
    <>
      {/* {data.data.errors && (
        <div className="login-error-wrapper">
          <Alert severity="error">{data.data.errors.current}!</Alert>
        </div>
      )} */}
      <div className="login-wrapper">
        <div className="login-image w-50">
          <img
            src={loginImg}
            alt="login-images"
            title="5241364.svg"
            className="image"
          />
        </div>
        <div className="form-wrapper w-50">
          <div className="form-header">
            <h1>Buy For Me</h1>
          </div>
          <div className="form-content m-t20">
            <form className="form">
              <div className="inputs-wrapper">
                <div className="input-wrapper">
                  <label htmlFor="email" className="email-label">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="email"
                    className="email-input input"
                    onChange={(e) => (loginData.email = e.target.value)}
                  />
                </div>
                <div className="input-wrapper m-t20">
                  <label htmlFor="password" className="password-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="password-input input"
                    onChange={(e) => (loginData.password = e.target.value)}
                  />
                </div>
              </div>
              <div className="button-wrapper w-100 m-t20">
                <Button
                  onClick={login}
                  name={"Sign In"}
                  type={"btn-success"}
                  className={"sign-in-btn"}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
