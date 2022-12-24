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
import login_lock from "./Vector (1).png";
import google_img from "./image 21.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userToken, user } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userToken?.access_token) {
      dispatch(userLogin());
    }
    if (user) {
      if (user?.username) {
        navigate("/dashboard");
      }
    }
  }, [userToken, user]);

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
      alert("Please fill in the above information.");
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
    console.log("inside check user");
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
      setFormData((prevData) => ({
        ...prevData,
        username: result.user.email,
        password: result.user.uid,
      }));
      checkUser();
      if (fa2 === "true") {
        setShow(true);
      } else {
        dispatch(loginToken(formData));
      }
    }).catch(err => console.log(err));
  };

  return (
    <div>
      <Animation />
      <div className="url" style={{ position: "absolute", width: "100%" }}>
        <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} viewBox="0 0 24 24" fill="none" className="css-11gn95z"><path fillRule="evenodd" clipRule="evenodd" d="M7 8v2H5v11h14V10h-2V8A5 5 0 007 8zm7.5 2V8a2.5 2.5 0 00-5 0v2h5zm-1 8v-5h-3v5h3z" fill="currentColor"></path></svg>&nbsp;&nbsp;&nbsp;URL verification: <span className="text-muted">&nbsp;&nbsp;https://</span>www.flitchcoin.com/login
      </div>
      <form className="container" onSubmit={submitHandler}>
        <div className="row ">
        <div className="col-lg-4"></div>
        <div className="col-lg-4 card back special_card_profile margin_bottom">
        <div className="segment mt-4">
          <h1><img src={side_login_img} style={{height: "78px", width: "51px"}}/>&nbsp;&nbsp; &nbsp;  Log In</h1>
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
            <div className="row">
            <div className="col-lg-6">
                <button type="button" className="round-btn red button" onClick={()=>navigate("/sign-up")}>New Signup</button>
              </div>
              <div className="col-lg-6">
                <button type="button" className="round-btn red button" onClick={()=>navigate("/forgot_Password")}>Forgot password</button>
              </div>
            </div>
            {
              fa2 === "true" ?
                <button
                  className="red button mt-5"
                  type="submit"
                  value="Log In"
                  name="Log In"
                  style={{fontSize: "28px"}}
                >
                  Enter OTP
                </button>
                :
                <>
                
                  <button
                  className="red button mt-5"
                  type="submit"
                  value="Log In"
                  name="Log In"
                  style={{fontSize: "28px"}}
                >
                  <div className="row">
                    <div className="col-4"></div>
                  <div className="col-4 text-center">
                  Log in
                  </div>
                  <div className="col-4">
                  <img src={login_lock} className="pb-2" style={{height: "35px", width: "27px"}}/>
                  </div>
                  </div>
                </button>                  
                </>
            }
            <button type="button" onClick={sigInWithGoogle} className="mt-4 primary round-btn w-100 mb-5 place_order_btn" >
              <div className="row">
                <div className="col-2">
                <img src={google_img} style={{height: "41px", width: "41px"}}/>
                </div>
                <div className="col-10 pt-1">
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
