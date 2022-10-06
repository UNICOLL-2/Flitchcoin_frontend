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
    usernamePool: "",
    usernameParticipant: "",
    passwordPool: "",
    passwordParticipant: "",
    type: null,
    otp: "",
  });

  var {
    usernamePool,
    usernameParticipant,
    passwordPool,
    passwordParticipant,
    type,
    otp,
  } = formData;

  const participantHandler = (e) => {
    e.preventDefault();
    setShow(true);
    setFormData((prevData) => ({
      ...prevData,
      type: "participant",
    }));
    if (type === "participant") {
      if (usernameParticipant === "" || passwordParticipant === "") {
        alert("Please fill in the above information in PARTICIPANT");
      } else {
        setShow(true);
      }
    }
  };

  const otpHandler = (e) => {
    e.preventDefault();
    dispatch(loginToken(formData));
    setShow(false);
  };

  const poolHandler = (e) => {
    e.preventDefault();
    setFormData((prevData) => ({
      ...prevData,
      type: "pool",
    }));
    if (type === "pool") {
      if (usernamePool === "" || passwordPool === "") {
        alert("Please fill in the above information in POOL");
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

  return (
    <div>
      <Animation />
      <form className="form" onSubmit={participantHandler}>
        <div className="segment">
          <h1>Log In</h1>
        </div>

        <label className="label">
          <input
            className="input_login"
            type="email"
            name="usernameParticipant"
            value={usernameParticipant}
            onChange={onChange}
            placeholder="Enter your Username"
          />
        </label>
        <label className="label">
          <input
            className="input_login"
            type="password"
            name="passwordParticipant"
            value={passwordParticipant}
            onChange={onChange}
            placeholder="Enter your Password"
            style={{ marginTop: "4%" }}
          />
        </label>
        <Link
          to="/forgot_Password"
          className="text-danger forgot text-underline"
        >
          <u>Forgot password ?</u>
        </Link>
        <button
          className="red button"
          type="submit"
          value="Log In"
          name="Log In"
        >
          Log in
        </button>
        <div className="row text-center pb-5 to_sign me-4">
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
