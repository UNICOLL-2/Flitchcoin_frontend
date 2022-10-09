import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import "./login.css";
import Animation from "../../Animation";

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
    e.preventDefault();
    setShow(true);
    if (username === "" || password === "") {
      alert("Please fill in the above information in PARTICIPANT");
    } else {
      setShow(true);
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

  const [fa2, setfa2] = useState(false);

  const checkUser = (e) => {
    const data = JSON.stringify({
      "emailid": e
    })
    fetch('http://34.73.24.72/userchrono_info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      body: data
    }).then(res => res.json())
      .then((data) => {
        console.log(data)
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
          setfa2(true)
        } else {
          setfa2(false)
        }
      }).catch((err) => {
        console.log(err);
      })
  };

  const onFa2Click = (e) => {
    e.preventDefault();
    dispatch(loginToken(formData));
    navigate('/qr_verify');
  }

  return (
    <div>
      <Animation />
      <form className="container" onSubmit={submitHandler}>
        <div className="segment">
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
          fa2 === true ?
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
            <button
              className="red button"
              type="submit"
              value="Log In"
              name="Log In"
            >
              Log in
            </button>
        }
        </div>
        <div className="col-lg-4"></div>
        </div>
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
          <b>Please Enter the OTP</b>
          <div className="input1 w-100">
            <input
              type="text"
              className="txt-underline p-3 mb-3 w-100 input pressed mt-3"
              placeholder="x x x x x x"
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
