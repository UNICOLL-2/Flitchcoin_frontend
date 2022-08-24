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
  const [otpMsg, setOtpMsg] = useState(null)

  useEffect(() => {
    if (verifyString)
    {
      if (verifyString?.status === 400)
      {
        setOtpMsg(verifyString.msg)
      } else if (verifyString?.status === 200)
      {
        setOtpMsg(verifyString.msg);
        navigate('/login')
      } else
      {
        setOtpMsg("Please Enter correct OTP")
      }
    }
    if (loginString)
    {
      setShow(true);
    }
    console.log(selectedType);
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
    usernameParticipant: "",
    passwordParticipant: "",
    fullNameParticipant: "",
    usernamePool: "",
    passwordPool: "",
    fullNamePool: "",
    type: ""
  });
  const { usernameParticipant, passwordParticipant, fullNameParticipant, usernamePool, passwordPool, fullNamePool, type } = formData;

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
  return (
    <>
      <Animation />
      <div className="container">
        <div className="row login__two" >
          <div className="col col-3"></div>
          <div className="col col-sm-12 col-md-3 page_fill_3 pb-5">
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
                    <span class="underline"></span>
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
                    <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="text"
                      name="fullNameParticipant"
                      value={fullNameParticipant}
                      onChange={onChange}
                      placeholder="Enter your Fullname"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span class="underline"></span>
                  </div>
                  <input type="submit" className=" primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"/>
                </div>
              </div>
            </form>
          </div>
          <div className="col col-sm-12 col-md-3 page_fill_3 pb-5">
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
                    <span class="underline"></span>
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
                    <span class="underline"></span>
                  </div>
                  <div className='input1 w-100'>
                    <input
                      type="text"
                      name="fullNamePool"
                      value={fullNamePool}
                      onChange={onChange}
                      placeholder="Enter your Fullname"
                      className="pressed txt-underline p-2 mb-2 w-100"
                    />
                    <span class="underline"></span>
                  </div>
                  <input type="submit" className="primary w-100 mt-4" value="Sign Up" name="Sign In" id="danger-outlined" autoComplete="off"/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Modal show={show} onHide={() => setShow(false)} className="modal-dialog1">
        <div className="back p-3">
          <b>Please Enter the OTP</b>
          <div className="input1 w-100">
            <input
              type="text"
              className="txt-underline p-3 mb-3 w-100 input pressed"
              placeholder="Enter your OTP"
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
