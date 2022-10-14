import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginToken, userLogin } from "../../Feature/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import "./login.css";
import Animation from "../../Animation";
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const clientId = "798613593742-0raprcg62m90v8oha2s07gbngugo4fle.apps.googleusercontent.com";

function Login() {

  // signin with google
  useEffect(() => {
    console.log("ehdukhfehk,b,")
    fetch("https://accounts.google.com/gsi/client", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      mode: "no-cors",
    }).then((result) => result.json().then((res)=>console.log("res",res)))
    console.log("rbfo egig eig eigre iulgie rle treholrilUHF/R RAIFEHLRKJF,BEVGUBFHV,KKRB,GJKERGB RERGEMEGEJKRE")
    // google.accounts.id.initialize({
    //   client_id: "798613593742-0raprcg62m90v8oha2s07gbngugo4fle.apps.googleusercontent.com",
    //   callback: handleCallbackResponse
    // });

    // google.accounts.id.renderButton(
    //   document.getElementById("signInDiv"),
    //   {theme: "outline", size: "large"}
    // );
  },[]);

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
  }


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
      alert("Please fill in the above information.");
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
  };

  const [loading, setLoading] = useState('Loading...');
  const [user1, setUser1] = useState(null);
 
  const handleLoginSuccess = (response) => {
    console.log("Login Success ", response);
    setUser1(response.profileObj);
    setLoading();
  }
 
  const handleLoginFailure = error => {
    console.log("Login Failure ", error);
    setLoading();
  }
 
  const handleLogoutSuccess = (response) => {
    console.log("Logout Success ", response);
    setUser1(null);
  }
 
  const handleLogoutFailure = error => {
    console.log("Logout Failure ", error);
  }
 
  const handleRequest = () => {
    setLoading("Loading...");
  }
 
  const handleAutoLoadFinished = () => {
    setLoading();
  }

  return (
    <div>
      <Animation />
      <div className="url" style={{position: "absolute", width:"100%"}}>
      <svg xmlns="http://www.w3.org/2000/svg" height={25} width={25} viewBox="0 0 24 24" fill="none" class="css-11gn95z"><path fill-rule="evenodd" clip-rule="evenodd" d="M7 8v2H5v11h14V10h-2V8A5 5 0 007 8zm7.5 2V8a2.5 2.5 0 00-5 0v2h5zm-1 8v-5h-3v5h3z" fill="currentColor"></path></svg>&nbsp;&nbsp;&nbsp;URL verification: <span className="text-muted">&nbsp;&nbsp;https://</span>www.flitchcoin.com/login
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

      <div>
      {/* <h3>Login with Google using React - <a href="https://www.cluemediator.com/" target="_blank" rel="noopener noreferrer">Clue Mediator</a></h3>
      {user1 ? <div>
        <div className="name">Welcome {user1.name}!</div>
        <GoogleLogout
          clientId={clientId}
          onLogoutSuccess={handleLogoutSuccess}
          onFailure={handleLogoutFailure}
        />
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div> :
        <GoogleLogin
          clientId={clientId}
          buttonText={loading}
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
          onRequest={handleRequest}
          onAutoLoadFinished={handleAutoLoadFinished}
          isSignedIn={true}
        />} */}
        <div id="signInDiv"></div>
    </div>

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
