import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link } from "react-router-dom";
import { fetchToken, setToken } from "../../Auth";
import { useSelector } from "react-redux";
import {  Modal } from "react-bootstrap";
import './login.css';
import { loginUser } from '../../Feature/Auth/authSlice';
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedType, userToken } = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userToken?.access_token) {
      dispatch(userLogin());
    }
  }, [userToken]);

  var [formData, setFormData] = useState({
    usernamePool: "",
    usernameParticipant: "",
    passwordPool: "",
    passwordParticipant: "",
    type: null,
    otp: ''
  });

  var { usernamePool, usernameParticipant, passwordPool, passwordParticipant, type, otp } = formData;

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
    setFormData((prevData) => ({
      ...prevData,
      type: 'pool',
    }))
    if (type === 'pool') {
      if (usernamePool === "" || passwordPool === "") {
        alert("Please fill in the above information in POOL");
      } else {
        setShow(true);
      }
    };
  }

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <Animation/>
        <div className="container">
          <div className="row login__two">
            <div className="col col-md-2"></div>
            <div className="col col-sm-12 col-md-4 page_fill_3 pb-5">
              <form onSubmit={participantHandler}>
                <div className="back card">
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
            <div className="col col-sm-12 col-md-4 page_fill_3 pb-5">
              <form onSubmit={poolHandler}>
                <div className="back card">
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
      <Modal show={show} onHide={() => setShow(false)} className="mt-5">
          <div className="back p-3">
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
      </Modal>
      <Footer/>
    </div>
  );
}

export default Login;