import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, verifyEmail } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import side_login_img from "./Vector.png";
import login_lock from "./Vector (1).png";
import google_img from "./image 21.png";
import referal_img from "./image 28.png";
import Toast from 'react-bootstrap/Toast';

function SignUp() {

  var { selectedType } = useSelector((state) => state.auth);
  const { loginString, verifyString } = useSelector((state) => state.auth)

  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpMsg, setOtpMsg] = useState(null);
  const [signType, setSignType] = useState('');
  const [page, setPage] = useState(true);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  useEffect(() => {

  }, [selectedType]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otpHandler = (e) => {
    let data = {
      otp: String(otp),
      add: String(loginString.msg)
    }
    e.preventDefault();
    dispatch(verifyEmail(data));
    if (verifyString) {
      console.log(verifyString);
      if (verifyString?.status === 400) {
        setOtpMsg(verifyString.msg)
      } else if (verifyString?.status === 200) {
        setOtpMsg(verifyString.msg);
        navigate('/login')
      } else {
        setOtpMsg("Please Enter correct OTP")
      }
    }
  }

  var [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    type: signType
  });
  var { username, password, fullName, type } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    if (page) {
      setSignType("pool");
      type = "pool";
    } else {
      setSignType("participant");
      type = "participant";
    }
    if (username == "" || password == "" || fullName == "" || type == "") {
      setShowA(true);
    } else {
      dispatch(signupUser({ formData, type }));
      if (loginString === "false") {
        setShowB(true);
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setShow(true);
      }
    }
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // signup with google

  const firebaseConfig = {
    apiKey: "AIzaSyD9-xgz9FYET9nVocqKmfPqWeOShtDw5AY",
    authDomain: "auth-77872.firebaseapp.com",
    projectId: "auth-77872",
    storageBucket: "auth-77872.appspot.com",
    messagingSenderId: "768493241754",
    appId: "1:768493241754:web:6e3a5b66a938bff5962623"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const provider = new GoogleAuthProvider();
  const sigInWithGoogle = (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider).then(result => {
      setFormData((prevData) => ({
        ...prevData,
        username: result.user.email,
        password: result.user.uid,
        fullName: result.user.displayName,
      }));
    }).catch(err => console.log(err));
  };

  const toggle = () => {
    if (page) {
      setPage(false);
    } else {
      setPage(true);
    }
  };

  return (
    <>
      <Animation />
      <form onSubmit={submitHandler} >
        <div className="container">
          <div className="row">
            <div className="col-lg-4 ms-3 mb-3 card back special_card_profile margin_bottom">
              <div className="segment">
                <h1><img src={side_login_img} style={{ height: "78px", width: "51px" }} />&nbsp;&nbsp; &nbsp;  Sign Up</h1>
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
              <label className="label">
                <input className="input_login"
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={onChange}
                  placeholder="Enter your Full Name"
                  style={{ marginTop: "8%" }} />
              </label>
              <div className="plain_text row mb-4 mt-3">
                <div className="col-4 text-end">
                  Pool
                </div>
                <div className="col-2" style={{ marginTop: "-22px" }}>
                  <div>
                    <input type="checkbox" id="toggle" onClick={toggle} />
                    <label htmlFor="toggle" className="switch_toggle"></label>
                  </div>
                </div>
                <div className="col-4 text-start">
                  Participant
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4">
                  <p className="plain_text pt-3"><img src={referal_img} style={{ height: "25px", width: "25px" }} /> Referral : </p>
                </div>
                <div className="col-lg-8">
                  <label className="label">
                    <input className="input_login"
                      type="text"
                      name="fullName"
                      value={fullName}
                      onChange={onChange}
                      placeholder="Enter your Full Name" />
                  </label>
                </div>
              </div>
              <button className="button red mt-3" type="submit" value="Sign up" name="Sign up" style={{ fontSize: "28px" }}>
                <div className="row">
                  <div className="col-4"></div>
                  <div className="col-4 text-center">
                    Signup
                  </div>
                  <div className="col-4">
                    <img src={login_lock} className="pb-2" style={{ height: "35px", width: "27px" }} />
                  </div>
                </div>
              </button>

              <button onClick={sigInWithGoogle} className="mt-4 primary round-btn w-100 mb-5 place_order_btn" >
                <div className="row">
                  <div className="col-2">
                    <img src={google_img} style={{ height: "41px", width: "41px" }} />
                  </div>
                  <div className="col-10 pt-1">
                    Sign Up With Google
                  </div>
                </div>
              </button>
            </div>
            <div className="col-lg-2"></div>
            <div className="col-lg-4 mt-5">
              {
                page ?
                  <>
                    <div className="card back special_card_profile">
                      <div className="segment">
                        <h1>Becoming a Pool :</h1>
                      </div>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                    </div>
                  </> :
                  <>
                    <div className="card back special_card_profile">
                      <div className="segment">
                        <h1>Becoming a Participant :</h1>
                      </div>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                      <p className="plain_text ps-4">- It provides you with </p>
                    </div>
                  </>
              }
              <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                <Toast.Header>
                  <strong className="me-auto">Flitchcoin</strong>
                  <small>Unfilled !</small>
                </Toast.Header>
                <Toast.Body>Please enter details to proceed.</Toast.Body>
              </Toast>
              <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
                <Toast.Header>
                  <strong className="me-auto">Flitchcoin</strong>
                  <small>Error !</small>
                </Toast.Header>
                <Toast.Body>User already exist .Taking you back to login page.</Toast.Body>
              </Toast>
            </div>
          </div>
        </div>
      </form>

      <Modal show={show} onHide={() => setShow(false)} backdrop="static" keyboard={false} className="modal-dialog-login">
        <div className="back p-3">
          <b>Please Enter the OTP</b>
          <div className="input1 w-100">
            <input
              type="text"
              className="txt-underline p-3 mb-3 w-100 input pressed"
              placeholder="x x x x"
              onChange={(e) => setOtp(e.target.value)}
              name="otp"
              value={otp}
            />
            <span className="underline"></span>
          </div>
          {verifyString && (
            <div className="w-100 pb-1">{otpMsg}</div>
          )}
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
      </Modal>
    </>
  );
}

export default SignUp;
