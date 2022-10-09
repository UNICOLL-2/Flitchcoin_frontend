import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, verifyEmail } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

function SignUp() {
  var { selectedType } = useSelector((state) => state.auth);

  const { loginString, verifyString } = useSelector((state) => state.auth)

  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpMsg, setOtpMsg] = useState(null);
  const [signType, setSignType] = useState('');
  const [user, setUser] = useState(false)

  useEffect(() => {
    if (verifyString) {
      if (verifyString?.status === 400) {
        setOtpMsg(verifyString.msg)
      } else if (verifyString?.status === 200) {
        setOtpMsg(verifyString.msg);
        navigate('/login')
      } else {
        setOtpMsg("Please Enter correct OTP")
      }
    }
    console.log(loginString)
    if (loginString) {
      setShow(true);
      setUser(true);
    }
  }, [selectedType, loginString, verifyString]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const otpHandler = (e) => {
    let data = {
      otp: String(otp),
      add: String(loginString.msg)
    }
    e.preventDefault();
    dispatch(verifyEmail(data))
  }

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    type: signType
  });
  const { username, password, fullName, type } = formData;

  const submitHandler = (type) => {
    if (username === '' && password === '') {
      alert("Please enter the above information")
    } else {
      dispatch(signupUser({ formData, type }))
      if (user) {
        alert("User already exist \nTaking back to Login page...")
        setTimeout(() => {
          navigate('/login')
        }, 3000)
    }
  }
};

const onChange = (e) => {
  setFormData((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
  }));
};

const onRadioChange = (data) => {
  setSignType(data)
};

return (
  <>
    <Animation />
    <form onSubmit={(e) => {
      e.preventDefault();
      submitHandler(signType)
    }}>
      <div className="form">
        <div className="segment">
          <h1>Sign Up</h1>
        </div>

        <label className="label">
          <input className="input_login"
            type="email"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Enter your Username" />
        </label>
        <label className="label">
          <input className="input_login"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter your Password"
            style={{ marginTop: "4vw" }} />
        </label>
        <label className="label">
          <input className="input_login"
            type="text"
            name="fullName"
            value={fullName}
            onChange={onChange}
            placeholder="Enter your Full Name"
            style={{ marginTop: "9vw" }} />
        </label>
        <div className="segment">
          <a href="#flexRadioDefault1"><button className="unit button" type="button" >&#8595;</button></a>
        </div>
      </div>
      <div className="container">
        <div className="row checks" >
          <div className="col col-md-3"></div>
          <div className="col col-md-4">
            <div className="form-check">
              <h5 className="text-muted">
                <input className="form-check-input" type="radio" name="flexRadioDefault" value='participant' id="flexRadioDefault1" onChange={e => onRadioChange(e.target.value)} style={{ position: 'absolute' }} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  Become a Participant
                </label>
              </h5>
            </div>
            <div className="form-check mt-5">
              <h5 className="text-muted">
                <input className="form-check-input" type="radio" name="flexRadioDefault" value='pool' id="flexRadioDefault2" onChange={e => onRadioChange(e.target.value)} style={{ position: 'absolute' }} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  Become a Pool
                </label>
              </h5>
            </div>
            <button className="button sign" type="submit" value="Sign up" name="Sign up">Sign up</button>
          </div>
          <div className="col col-md-4">
            {
              signType === 'participant' ?
                <div>
                  <p> &#x2714; it provides</p>
                  <p> &#x2714; it provides</p>
                  <p> &#x2716; it does not provides</p>
                  <p> &#x2714; it provides</p>

                </div> : <div></div>
            }
            {
              signType === 'pool' ?
                <div>
                  <p> &#x2714; it provides</p>
                  <p> &#x2714; it provides</p>
                  <p> &#x2716; it does not provides</p>
                </div> : <div></div>
            }
            {
              signType === '' ?
                <div>
                  <p> &#x2714; it provides</p>
                  <p> &#x2714; it provides</p>
                  <p> &#x2716; it does not provides</p>
                </div> : <div></div>
            }
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
