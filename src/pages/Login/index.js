import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link } from "react-router-dom";
import { fetchToken, setToken } from "../../Auth";
import { logOutUser } from "../../Feature/Auth/authSlice";
import { useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { Button, Modal } from "react-bootstrap";
import './login.css';
import { loginUser } from '../../Feature/Auth/authSlice';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedType, userToken } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  useEffect(() => {
    // ping_pong();
    if (userToken?.access_token) {
      dispatch(userLogin());
    }
  }, [userToken]);

  function rel_login(e) {
    fetch("/rel_login").then((result) => {
      result.json().then((res) => {
        console.log("result", res);
      })
    });
    setFormData((prevData) => ({
      ...prevData,
      type: null
    }));
    console.log(selectedType);
  };

  function ping_pong() {
    fetch('/ping', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fetchToken()}`,
      },
      body: "ping"
    }).then((res) => {
      console.log(res);
      if (res.status != 200) {
        onClick();
      }
    })
  };

  const onClick = (e) => {
    localStorage.removeItem("token");
    rel_login();
    dispatch(logOutUser(formData));
  }

  var [formData, setFormData] = useState({
    usernamePool: "",
    usernameParticipant: "",
    passwordPool: "",
    passwordParticipant: "",
    type: null,
    otp: ''
  });

  const [reactKey, setReactKey] = useState(process.env.REACT_APP_SECRET_KEY)

  var { usernamePool, usernameParticipant, passwordPool, passwordParticipant, type, otp } = formData;
  const encryptedPassword = CryptoJS.AES.encrypt(passwordParticipant, "W_F8slNJSgODGHH3gNWMtMeGFmrmNVe1phDc_dTXRHI=").toString();

  //String to  Base 64 string
  var words = CryptoJS.enc.Utf8.parse(encryptedPassword);
  const base64 = CryptoJS.enc.Base64.stringify(words);

  //Base 64 string to String
  // var words = CryptoJS.enc.Base64.parse(base64);
  // var textString = CryptoJS.enc.Utf8.stringify(words);

  const bytes = CryptoJS.AES.decrypt(encryptedPassword, "W_F8slNJSgODGHH3gNWMtMeGFmrmNVe1phDc_dTXRHI=");
  const password = bytes.toString(CryptoJS.enc.Utf8)

  const participantHandler = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      type: 'participant',
    }))
    if (type === 'participant') {
      if (usernameParticipant === "" || passwordParticipant === "") {
        alert("Please fill in the above information in PARTICIPANT");
      } else {
        setShow(true);
      }
    };
  }

  const otpHandler = (e) => {
    e.preventDefault();
    dispatch(loginToken(formData));
    setShow(false);
  }


  const poolHandler = (e) => {
    e.preventDefault();
    console.log("clicked");
    setFormData((prevData) => ({
      ...prevData,
      type: 'participant',
    }))
    if (type === 'pool') {
      if (usernamePool == "" || passwordPool == "") {
        alert("Please fill in the above information in POOL");
      } else {
        var logInData = new FormData();
        logInData.append('username', usernamePool);
        logInData.append('password', passwordPool);
        fetch("/token", {
          method: 'POST',
          body: logInData
        }).then(res => res.json())
          .then((data) => {
            console.log("data is ", data);
            console.log(data.access_token);
            if (data.access_token) {
              setToken(data.access_token);
              console.log(fetchToken());
              dispatch(loginUser(formData));
              navigate("/");
            }
          })
          .catch((err) => {
            console.log("error", err);
            alert("Incorrect Username / Password");
          })
      }
    }
  }

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="back shadow">
        <div className="container">
          <div className="row login__two">
            <div className="col col-sm-12 col-md-6 page_fill_1 pb-5">
              <form onSubmit={participantHandler}>
                <div className="back-shadow back card">
                  <div className="card-body">
                    <h5 className="card-title text-center">I am a Borrower!</h5>
                    <h5 className="card-title mt-5 mb-3">Login as Participants</h5>
                    <div className="input1 w-100">
                      <input
                        type="email"
                        name="usernameParticipant"
                        value={usernameParticipant}
                        onChange={onChange}
                        placeholder="Enter your username"
                        className="input pressed txt-underline w-100 p-2 mb-3 "
                      />
                      <span class="underline"></span>
                    </div>
                    <div className="input1 w-100">
                      <input
                        type="password"
                        name="passwordParticipant"
                        value={passwordParticipant}
                        onChange={onChange}
                        placeholder="Enter your Password"
                        className="pressed txt-underline p-2 mb-3 w-100"
                      />
                      <span class="underline"></span>
                    </div>
                    <Link to='/forgot_Password' className="text-dark text-underline"><u>Forgot password ?</u></Link>
                    <input type="submit" className="btn btn-dark w-100 mt-4" value="Log In" name="Sign In" id="danger-outlined" autoComplete="off" />
                  </div>
                </div>
              </form>
            </div>
            <div className="col col-sm-12 col-md-6 page_fill_2 pb-5">
              <form onSubmit={poolHandler}>
                <div className="back-shadow back card">
                  <div className="card-body">
                    <h5 className="card-title text-center">I am a lender!</h5>
                    <h5 className="card-title mt-5 mb-3">Login as Pool</h5>
                    <div className="input1 w-100">
                      <input
                        type="email"
                        name="usernamePool"
                        value={usernamePool}
                        onChange={onChange}
                        placeholder="Enter your username "
                        className="pressed txt-underline p-2 mb-3  w-100"
                      />
                      <span class="underline"></span>
                    </div>
                    <div className="input1 w-100">
                      <input
                        type="password"
                        name="passwordPool"
                        value={passwordPool}
                        onChange={onChange}
                        placeholder="Enter your Password"
                        className="pressed txt-underline p-2 mb-3 w-100"
                      />
                      <span class="underline"></span>
                    </div>
                    <Link to='/forgot_Password' className="text-dark text-underline"><u>Forgot password ?</u></Link>
                    <input type="submit" className="btn btn-dark w-100 mt-4" value="Log In" name="Sign In" id="danger-outlined" autoComplete="off" />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row text-center pb-5">
            <p>
              Don't have an account?
              <span className="text-warning px-2 text" role="button">
                <Link to="/sign-up" className="text-warning" style={{ position: "absolute" }}>Register here . </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)} className="mt-5 modal fade shadow">
          <div className="back shadow">
            <div className="modal-body">
              <b>Please Enter the OTP</b>
              <div className="input1 w-100">
                <input
                  type="text"
                  className="txt-underline p-3 mb-3 w-100 input pressed"
                  placeholder="Enter your OTP"
                  onChange={onChange}
                  name="otp"
                  value={otp}
                />
                <span className="underline"></span>
              </div>
              <button
                type="button"
                className="primary me-4"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button type="button" className="primary"
                onClick={otpHandler} >
                Confirm
              </button>
            </div>
        </div>
      </Modal>
    </div>
  );
}

export default Login;