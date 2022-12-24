import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { loginToken,userLogin } from "../../Feature/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import Animation from "../../Animation";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { fetchToken } from "../../Auth";
import { useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const QRVerify = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp1, setOtp1] = useState();
    const [qr, setQr] = useState("");
    const [page, setPage] = useState(true);
    const [changeButton, setChangeButton] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show, setShow] = useState(false);

    const getOtp = () => {
        fetch("https://flitchcoin.com/api/fa2url", {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${fetchToken()}`,
            },
        }).then((result) => {
            result.json().then((res) => {
                setQr(res);
            })
        })
    };


    const findUser = () => {
        fetch("https://flitchcoin.com/api/users/me/items/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                setFormData((prevData) => ({
                    ...prevData,
                    username: res.username,
                }))
                if (res.is_pool) {
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
            })).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        getOtp();
        findUser();
    }, []);

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
            console.log(result.user.uid);
            setFormData((prevData) => ({
                ...prevData,
                username: result.user.email,
                password: result.user.uid,
            }))
        }).catch(err => console.log(err));
    };

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
        const data = JSON.stringify({
            "otp": otp1
        });
        e.preventDefault();
        if (otp1 === "") {
            alert("Enter OTP");
        } else {
            fetch("https://flitchcoin.com/api/fa2url", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${fetchToken()}`,
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    console.log(data)
                    if (data.true) {
                        dispatch(loginToken(formData));
                    } else if (data.false) {
                        alert("WRONG OTP");
                    } else {
                        alert("Max tries Reached. Try again !!");
                        navigate("/login");
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    };

    const noFa = () => {
        fetch("https://flitchcoin.com/api/fa2url", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`,
            }
        }).then(result => result.json()
            .then(res => {
                if (res.status === 200) {
                    dispatch(loginToken(formData));
                    navigate("/dashboard");
                }
            })).catch(err => console.log(err))
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
                <div className="row mt-5">
                    <h1 className='text-center text-muted'>Setup Two Factor Authentication</h1>
                    <div className="col col-md-1"></div>
                    <div className="col card mt-3 mb-3 col-12 col-md-3 p-5">
                        {page === true ?
                            <>
                                <div className="number mb-3 pt-2 pb-2 text-center mt-5"><b>Continue with 2 - FA </b></div>
                                <div className="number me-3 pt-2 pb-2 text-center mt-4">Verify Your QR</div>
                            </> :
                            <>
                                <div className="number mb-3 pt-2 pb-2 text-center position-relative mt-5">Continue with 2 - FA<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">&#10004;</span></div>
                                <div className="number me-3 pt-2 pb-2 text-center mt-4"><b>Verify Your QR</b></div>
                            </>}
                    </div>
                    <div className="col card mt-3 mb-3 col-12 col-md-7 p-5">
                        {page === true ?
                            <>
                                <h3>Continue with 2 - FA ?</h3>
                                <p className='text-muted mt-4'>2 Factor Authentication provides you with the most provided security features and enhanced protection of wallet.</p>
                                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" onClick={() => setChangeButton(false)} />
                                <label className="btn btn-outline-info p-4 mb-4" htmlhtmlFor="success-outlined">Continue with 2 factor Authentication</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" onClick={() => setChangeButton(true)} />
                                <label className="btn btn-outline-danger p-4" htmlhtmlFor="danger-outlined">Continue without 2 factor Authentication</label>
                                {changeButton ?
                                    <>
                                        <button className="btn-primary w-50 mt-5" onClick={() => setShow1(true)}>Log in Without 2-FA</button>
                                        <Modal
                                            show={show1}
                                            onHide={() => setShow1(false)}
                                            backdrop="static"
                                            keyboard={false}
                                            className="modal-dialog-login"
                                        >
                                            <div className="back p-3">
                                                <h2>Enter Your Password</h2><br />
                                                <input type="password" className='txt-underline p-3 w-100 input pressed' placeholder='Password' name="password" value={password} onChange={onChange} /><br />
                                                <button onClick={sigInWithGoogle} type="button" className="button_google button w-100"><i className="fa-brands fa-google text-primary">&nbsp;&nbsp;&nbsp;Google user</i></button><br /><br /><br />
                                                <button
                                                    type="button"
                                                    className="primary me-4"
                                                    onClick={() => setShow1(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="button" className="primary" onClick={noFa}>
                                                    Confirm
                                                </button>
                                            </div>
                                        </Modal>
                                    </> :
                                    <>
                                        <button className="btn-primary w-50 mt-5" onClick={() => setPage(false)}>Next</button>
                                    </>}
                            </> :
                            <>
                                <form onSubmit={submitHandler}>
                                    <h3>QR OTP VERIFICATION</h3>
                                    <p className='text-muted mt-4'>Use an Authenticator app like Google Authenthicator to scan the QR code.</p>
                                    <QRCodeSVG
                                        value={qr}
                                        size={150}
                                    />
                                    <p className='text-muted mt-5'>Once you have connected your app enter your most recent 6-digit verification code for Flitchcoin.</p>
                                    <label className="label">
                                        <input className="input_login w-50"
                                            type="text"
                                            name="otp"
                                            value={otp1}
                                            onChange={e => setOtp1(e.target.value)}
                                            placeholder="x - x - x - x - x - x - x - x" />
                                    </label>
                                    <button className="btn-primary w-50" onClick={() => setShow(true)} value="Log In" name="Log In">Log in</button>
                                    <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                        backdrop="static"
                                        keyboard={false}
                                        className="modal-dialog-login"
                                    >
                                        <div className="back p-3">
                                            <h2>Enter Your Password</h2><br />
                                            <input type="password" className='txt-underline p-3 w-100 input pressed' placeholder='Password' name="password" value={password} onChange={onChange} /><br />
                                            <button onClick={sigInWithGoogle} type="button" className="button_google button w-100"><i className="fa-brands fa-google text-primary">&nbsp;&nbsp;&nbsp;Google user</i></button><br /><br /><br />
                                            <button
                                                type="button"
                                                className="primary me-4"
                                                onClick={() => setShow(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button className="primary" type="submit">
                                                Confirm
                                            </button>
                                        </div>
                                    </Modal>
                                </form>
                            </>}
                    </div>
                    <div className="col col-md-1"></div>
                </div>
            </div>
        </>
    )
}

export default QRVerify