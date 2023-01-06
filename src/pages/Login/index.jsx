import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import "./login.css";
import Animation from "../../Animation";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import side_login_img from "./Vector.png";
import google_img from "./image 21.png";
import Toast from 'react-bootstrap/Toast';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken, user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);
  const [gAuth, setgAuth] = useState(false)

  useEffect(() => {
    if(userToken === undefined) {
      setShowB(true);
    }
    if (userToken?.access_token) {
      dispatch(userLogin());
    }
    if (user) {
      if (user?.username) {
        navigate("/dashboard");
      }
    }
    if(gAuth && formData.username.length>0 && formData.password.length>0){
      dispatch(loginToken(formData))
    }
  }, [userToken, user, dispatch]);

  var [formData, setFormData] = useState({
    username: "",
    password: "",
    type: null,
    otp: "",
  });

  var {
    username,
    password,
    type,
    otp,
  } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setShowA(true);
    } else if (fa2 === "true") {
      setShow(true);
    } else {
      dispatch(loginToken(formData));
    }
  };

  const otpHandler = (e) => {
    e.preventDefault();
    dispatch(loginToken(formData));
    setShow(false);
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    checkUser(username);
  };

  const [fa2, setfa2] = useState("false");

  const checkUser = (e) => {
    const data = JSON.stringify({
      "emailid": e
    })
    fetch('https://flitchcoin.com/api/userchrono_info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
    }).then(res => res.json())
      .then((data) => {
        if (data.is_pool) {
          setFormData((prevData) => ({
            ...prevData,
            type: 'pool'
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            type: 'participant'
          }));
        }
        if (data.fa2 === null) {
          setfa2("null")
        } else if (data.fa2 === true) {
          setfa2("true")
        }
      }).catch((err) => {
        console.log(err);
      })
  };

  // sigin with google

  const firebaseConfig = {
    apiKey: "AIzaSyD9-xgz9FYET9nVocqKmfPqWeOShtDw5AY",
    authDomain: "auth-77872.firebaseapp.com",
    // authDomain: "auth.flitchcoin.com",
    projectId: "auth-77872",
    storageBucket: "auth-77872.appspot.com",
    messagingSenderId: "768493241754",
    appId: "1:768493241754:web:6e3a5b66a938bff5962623"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  const sigInWithGoogle = () => {
    signInWithPopup(auth, provider).then(result => {
      setgAuth(true)
      setFormData((prevData) => ({
        ...prevData,
        username: result.user.email,
        password: result.user.uid,
      }));
      checkUser(result.user.email);
      if (fa2 === "true") {
        setShow(true);
      } else {
        dispatch(loginToken(formData));
      }
    }).catch(err => console.log(err));
  };

  return (
    <div className="mt-4">
      <Animation />
      <div className="url" style={{ position: "absolute", width: "100%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} viewBox="0 0 24 24" fill="none" className="css-11gn95z"><path fillRule="evenodd" clipRule="evenodd" d="M7 8v2H5v11h14V10h-2V8A5 5 0 007 8zm7.5 2V8a2.5 2.5 0 00-5 0v2h5zm-1 8v-5h-3v5h3z" fill="currentColor"></path></svg>&nbsp;&nbsp;&nbsp;URL verification: <span className="text-muted">&nbsp;&nbsp;https://</span>www.flitchcoin.com/login
      </div>
      <form className="container" onSubmit={submitHandler}>
        <div className="row ">
          <div className="col-lg-3">
            <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Flitchcoin</strong>
                <small>Error !</small>
              </Toast.Header>
              <Toast.Body>Please enter details to proceed for Login.</Toast.Body>
            </Toast>
            <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
              <Toast.Header>
                <strong className="me-auto">Flitchcoin</strong>
                <small>Error !</small>
              </Toast.Header>
              <Toast.Body>Wrong Username or Password.</Toast.Body>
            </Toast>
          </div>
          <div className="col-lg-5 ps-5 pe-5 card back special_card_order margin_login">
            <div className="segment mt-2">
              <h1><img src={side_login_img} style={{ height: "78px", width: "51px" }} />&nbsp;&nbsp;Log In</h1>
            </div>
            <label className="label">
              <input
                className="input_login"
                type="email"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter your Username"
              />
            </label>
            <label className="label">
              <input
                className="input_login"
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Enter your Password"
                style={{ marginTop: "4%" }}
              />
            </label>
            <div className="row mt-4">
              <div className="col-xl-5 signup_margin">
                <button type="button" className="round-btn red button no_pad ps-3 pe-3" onClick={() => navigate("/sign-up")}>New Signup</button>
              </div>
              <div className="col-xl-6 forgot_margin ">
                <button type="button" className="ps-3 pe-2 round-btn red button no_pad" onClick={() => navigate("/forgot_Password")}>Forgot password ?</button>
              </div>
            </div>
            {
              fa2 === "true" ?
                <button
                  className="red button mt-4"
                  type="submit"
                  value="Log In"
                  name="Log In"
                  style={{ fontSize: "2vw" }}
                >
                  Enter OTP
                </button>
                :
                <>

                  <button
                    className="red button mt-4 small_pad"
                    type="submit"
                    value="Log In"
                    name="Log In"
                    style={{ fontSize: "2vw" }}
                  >
                    <div className="row">
                      <div className="col-4"></div>
                      <div className="col-4 text-center ">
                        Login
                      </div>
                      <div className="col-4 ps-5">
                        <svg width="27" height="35" className="less_pad" viewBox="0 0 27 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.375 35C2.44688 35 1.65262 34.6739 0.99225 34.0217C0.33075 33.3683 0 32.5833 0 31.6667V15C0 14.0833 0.33075 13.2983 0.99225 12.645C1.65262 11.9928 2.44688 11.6667 3.375 11.6667H5.0625V8.33333C5.0625 6.02778 5.88544 4.06222 7.53131 2.43667C9.17606 0.812222 11.1656 0 13.5 0C15.8344 0 17.8245 0.812222 19.4704 2.43667C21.1151 4.06222 21.9375 6.02778 21.9375 8.33333V11.6667H23.625C24.5531 11.6667 25.3479 11.9928 26.0094 12.645C26.6698 13.2983 27 14.0833 27 15V31.6667C27 32.5833 26.6698 33.3683 26.0094 34.0217C25.3479 34.6739 24.5531 35 23.625 35H3.375ZM13.5 26.6667C14.4281 26.6667 15.2229 26.3406 15.8844 25.6883C16.5448 25.035 16.875 24.25 16.875 23.3333C16.875 22.4167 16.5448 21.6317 15.8844 20.9783C15.2229 20.3261 14.4281 20 13.5 20C12.5719 20 11.7776 20.3261 11.1173 20.9783C10.4558 21.6317 10.125 22.4167 10.125 23.3333C10.125 24.25 10.4558 25.035 11.1173 25.6883C11.7776 26.3406 12.5719 26.6667 13.5 26.6667ZM8.4375 11.6667H18.5625V8.33333C18.5625 6.94444 18.0703 5.76389 17.0859 4.79167C16.1016 3.81944 14.9062 3.33333 13.5 3.33333C12.0938 3.33333 10.8984 3.81944 9.91406 4.79167C8.92969 5.76389 8.4375 6.94444 8.4375 8.33333V11.6667Z" fill="#AE1100" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </>
            }
            <button type="button" onClick={sigInWithGoogle} className="mt-4 primary round-btn w-100 mb-5 place_order_btn" >
              <div className="row">
                <div className="col-2">
                  <img src={google_img} style={{ height: "41px", width: "41px" }} />
                </div>
                <div className="col-9" style={{ fontSize: "2vw" }}>
                  Sign In With Google
                </div>
              </div>
            </button>
          </div>
        </div>
      </form>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
        className="modal-dialog-login"
      >
        <div className="back p-3">
          <h2>Wecome Back !</h2>
          <b>Please Enter the OTP</b>
          <div className="input1 w-100">
            <input
              type="text"
              className="txt-underline p-3 mb-3 w-100 input pressed mt-3"
              placeholder="x - x - x - x - x - x - x - x"
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
          <button type="button" className="primary" onClick={otpHandler}>
            Confirm
          </button>
        </div>
      </Modal>


    </div>
  );
}

export default Login;
