import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser, verifyEmail } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';
import { useEffect } from "react";
import { Modal } from "react-bootstrap";

function SignUp() {
  var { selectedType } = useSelector((state) => state.auth);

  const { loginString, verifyString } = useSelector((state) => state.auth)

  const [show, setShow] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpMsg, setOtpMsg] = useState(null);
  const [signType, setSignType] = useState('');

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
    if (loginString) {
      setShow(true);
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
    type: ""
  });
  const { username, password, fullName, type } = formData;

  const submitHandler = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      type
    }));
    dispatch(signupUser({ formData, type }))
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

  useEffect(() => {
    console.log(signType);
  }, [signType])

  return (
    <>
      <Animation />
      {/* <div className="container">
        <div className="row login__two" >
          <div className="col col-2"></div>
          <div className="col col-sm-12 col-md-4 page_fill_3 pb-5">
            <form onSubmit={(e) => {
              e.preventDefault();
              submitHandler('participant')
            }}>
              <div className="card back">
                <div className="card-body">
                  <h5 className="card-title text-center">
                    I am a Borrower!
                  </h5>
                  <h5 className="card-title mt-5 mb-3">
                    Sign up as Participants
                  </h5>
                  <div className='input1 w-100'>
                    <input
                      type="email"
                      name="usernameParticipant"
                      value={usernameParticipant}
                      onChange={onChange}
                      placeholder="Enter your Email "
                      className="pressed txt-underline p-2 mb-3 mt-3 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="password"
                      name="passwordParticipant"
                      value={passwordParticipant}
                      onChange={onChange}
                      placeholder="Enter your Password"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="text"
                      name="fullNameParticipant"
                      value={fullNameParticipant}
                      onChange={onChange}
                      placeholder="Enter your Full Name"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <input type="submit" className=" primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"/>
                </div>
              </div>
            </form>
          </div>
          <div className="col col-sm-12 col-md-4 page_fill_3 pb-5">
            <form onSubmit={(e) => {
              e.preventDefault();
              submitHandler('pool')
            }}>
              <div className="card back">
                <div className="card-body">
                  <h5 className="card-title text-center">I am a lender!</h5>
                  <h5 className="card-title mt-5 mb-3">Sign up as Pool</h5>
                  <div className='input1 w-100'>
                    <input
                      type="email"
                      name="usernamePool"
                      value={usernamePool}
                      onChange={onChange}
                      placeholder="Enter your Email "
                      className="pressed txt-underline p-2 mb-3 mt-3 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="password"
                      name="passwordPool"
                      value={passwordPool}
                      onChange={onChange}
                      placeholder="Enter your Password"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="text"
                      name="fullNamePool"
                      value={fullNamePool}
                      onChange={onChange}
                      placeholder="Enter your Full Name"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span className="underline"></span>
                  </div>
                  <input type="submit" className="primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div> */}

      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        submitHandler(signType)
      }}>
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
            style={{ marginTop: "4%" }} />
        </label>
        <label className="label">
          <input className="input_login"
            type="text"
            name="fullName"
            value={fullName}
            onChange={onChange}
            placeholder="Enter your Full Name"
            style={{ marginTop: "9%" }} />
        </label>
        <div className="row checks">
          <div className="col-6">
          <div className="form-check">
            <h5 className="text-muted">
              <input className="form-check-input" type="radio" name="flexRadioDefault" value='participant' id="flexRadioDefault1" onChange={e => onRadioChange(e.target.value)} />
              <label className="form-check-label" htmlFor="flexRadioDefault1">
                Become a Participant
              </label>
            </h5>
          </div>
          <div className="form-check mt-5">
            <h5 className="text-muted">
              <input className="form-check-input" type="radio" name="flexRadioDefault" value='pool' id="flexRadioDefault2" onChange={e => onRadioChange(e.target.value)} />
              <label className="form-check-label" htmlFor="flexRadioDefault2">
                Become a Pool
              </label>
            </h5>
          </div>
          </div>
          <div className="col-6">
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
            </div>: <div></div>
          } 
          </div>
        </div>
        <button className="button sign" type="submit" value="Sign up" name="Sign up">Sign up</button>
        <div className="pb-5 to_sign">
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
      {/* <Footer /> */}
    </>
  );
}

export default SignUp;
