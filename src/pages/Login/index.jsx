import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import "./login.css";
import Animation from "../../Animation";
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

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
        navigate("/home");
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
    console.log("submitHandler called");
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill in the above information.");
    } else if(fa2 === "true") {
      setShow(true);
    }else{
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
        }else if(data.fa2 === true){
          setfa2("true")
        }
      }).catch((err) => {
        console.log(err);
      })
  };

  const onFa2Click = (e) => {
    e.preventDefault();
    dispatch(loginToken(formData));
    navigate('/qr_verify');
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
    console.log("sigInWithGoogle called")
      signInWithPopup(auth, provider).then(result => {
        setFormData((prevData) => ({
          ...prevData,
          username: result.user.email,
          password: result.user.uid,
        }));
        checkUser();
        if(fa2 === "true") {
          setShow(true);
        }else{
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
        <div className="segment mt-4">
          <h1>Log In</h1>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-lg-4 col-12">
            <label className="label">
              <input
                className="input_login"
                type="email"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Enter your Username"
                onBlur={e => checkUser(e.target.value)}
              />
            </label>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-12 col-lg-4">
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
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-12 col-lg-4">
            <Link
              to="/forgot_Password"
              className="text-danger forgot text-underline"
            >
              <u>Forgot password ?</u>
            </Link>
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-12 col-lg-4">
            {
              fa2 === "null" ?
                <button
                  className="red button"
                  type="button"
                  value="To Fa2"
                  name="To Fa2"
                  onClick={onFa2Click}
                >
                  To Fa2
                </button>
                :
                <>
                  {
                    fa2 === "false" ?
                      <button
                        className="red button"
                        type="submit"
                        value="Log In"
                        name="Log In"
                      >
                        Log in
                      </button>
                      :
                      <button
                        className="red button"
                        type="submit"
                        value="Log In"
                        name="Log In"
                      >
                        Enter OTP
                      </button>
            }
                </>
            }
          </div>
          <div className="col-lg-4"></div>
        </div>
        <div className="row">
        <div className="col-lg-4"></div>
        <div className="col-12 col-lg-4">
          <button onClick={sigInWithGoogle} type="button" className="button_google button w-100"><i className="fa-brands fa-google text-primary">&nbsp;&nbsp;&nbsp;Sign In With Google</i></button>
        </div>
        </div>
        <div className="col-lg-4"></div>
        <div className="row">
          <div className="col-lg-4"></div>
          <div className="col-12 col-lg-4">
            <div className="text-center pb-5 pt-5 me-4">
              <p>
                Don't have an account?
                <span className="text-warning px-2" role="button">
                  <Link
                    to="/sign-up"
                    className="text-warning"
                    style={{ position: "absolute" }}
                  >
                    Signup
                  </Link>
                </span>
              </p>
            </div>
          </div>
          <div className="col-lg-4"></div>
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
