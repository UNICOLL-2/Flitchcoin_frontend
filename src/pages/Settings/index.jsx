import React, { useEffect, useState } from "react";
import { fetchToken } from "../../Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Feature/Auth/authSlice";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import statement from "./Group 87.png";
import setting_img from "./Group 97.png";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Toast from 'react-bootstrap/Toast';

const Settings = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [pass, setPass] = useState("");
    const [fa2, setfa2] = useState(false);
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    const [formData, setFormData] = useState({
        type: null
    });
    const { type } = formData;

    const onClick = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            type: null
        }));
        dispatch(logOutUser());
    };

    const getInfo = () => {
        fetch('https://flitchcoin.com/api/users/me/items/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                setUsername(res.username);
            })).catch((err) => {
                console.log(err);
            })
    };

    const checkUser = (e) => {
        const data = JSON.stringify({
            "emailid": username
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
                if (data.fa2) {
                    setfa2(true)
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    const manageFa2 = () => {
        if (fa2) {
            fetch('https://flitchcoin.com/api/2fa_options', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${fetchToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fa2": !fa2
                })
            }).then((result) => result.json()
                .then(res => {
                    navigate('/login');
                    onClick();
                })).catch(err => console.log(err));
        } else {
            const data = JSON.stringify({
                "fa2": "1110"
            })
            fetch('https://flitchcoin.com/api/dashboard', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${fetchToken()}`,
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    navigate("/qr_verify");
                    // onClick();
                }).catch((err) => {
                    console.log(err);
                })
        }
    };

    useEffect(() => {
        checkUser();
        getInfo();
        change();
    }, [], show1)

    const [avt, setAvt] = useState();

    const change = () => {
        fetch('https://www.flitchcoin.com/api/dashboard', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                setAvt(res.avtar_im);
            })).catch((err) => {
                console.log(err);
            })
    };

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
            setUsername(result.user.email);
            setPass(result.user.uid);
        }).catch(err => console.log(err));
    };

    const closeAccount = () => {
        var data = `grant_type=&username=${username}&password=${pass}&scope=&client_id=&client_secret=`;
        console.log(data);
        fetch("https://flitchcoin.com/api/Signup", {
            method: "DELETE",
            headers: {
                'Accept': 'application/x-www-form-urlencoded ',
                'Content-Type': 'application/x-www-form-urlencoded ',
                Authorization: `Bearer ${fetchToken()}`
            },
            body: data
        }).then(result => result.json()
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setShowA(true);
                    dispatch(logOutUser());
                    navigate("/login");
                } else {
                    setShowB(true);
                }
            })).catch(err => console.log(err))
    };

    return (
        <div>
            <div className="row mt-4">
                <div className="col-xxl-2 col-xl-3 col-12 side_navigation">
                    <Link to="/profile" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item mt-5 "><img src={avt} style={{ height: "30px", width: "30px", borderRadius: "50%" }} /> &nbsp; Profile</i></Link>
                    <Link to="/statements" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item"><img src={statement} style={{ height: "32px", width: "32px" }} /> &nbsp; Statements</i></Link>
                    <Link to="/settings" className='link'><i className="ps-4 pe-4 pt-2 pb-2 dropdown-item  selected-item"><img src={setting_img} style={{ height: "25px", width: "25px" }} /> &nbsp; Settings</i></Link>
                </div>
                <div className="col-md-2">
                <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Deleted !</small>
                            </Toast.Header>
                            <Toast.Body>Your account has been deleted permanently.</Toast.Body>
                        </Toast>
                        <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Error !</small>
                            </Toast.Header>
                            <Toast.Body>Wrong Password !</Toast.Body>
                        </Toast>
                </div>
                <div className="col-12 col-md-6 mt-4">
                    <p className='text-center mt-4' style={{ fontSize: "47px", fontWeight: "700" }}>Settings</p>
                    <hr />
                    <div className="mt-5">
                        <div className="row settings_box p-4">
                                <div className="col-lg-9">
                                    <p style={{fontSize : "32px", fontWeight: "600"}}>2 - Step Verification</p>
                                    <p className="text-muted">You have currently opted to continue <span className="text-dark"> {fa2 ? <>with</> : <>without</>}</span> 2 - Factor Authentication</p>
                                    <p className="text-muted">Note : To make your account secure we recommend to you to have active 2 factor authentication.</p>
                                <Modal
                                    show={show1}
                                    onHide={() => setShow1(false)}
                                    backdrop="static"
                                    keyboard={false}
                                    className="modal-dialog-login"
                                >
                                    <div className="back p-3">
                                        <h2>Confirm !!!</h2>
                                        <b>Do you want to continue to {fa2 ? <>Deactivate</> : <>Activate</>} 2-Factor Authentication</b>
                                        <p>Notice: On clicking Confirm You will be taken back to login page.</p>
                                        <button
                                            type="button"
                                            className="primary me-4"
                                            onClick={() => setShow1(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="button" className="primary" onClick={manageFa2}>
                                            Confirm
                                        </button>
                                    </div>
                                </Modal>
                                </div>
                                <div className="col-lg-3 mt-5 ">
                                <button className="w-100 btn-dark round-btn" onClick={() => setShow1(true)}>{fa2 ? <>Deactivate</> : <>Activate</>} 2-FA</button>
                                </div>
                        </div>
                        <div className="row settings_box p-4 mt-4 mb-4">
                                <div className="col-lg-9">
                                    <p style={{fontSize : "32px", fontWeight: "600"}}>Close Account</p>
                                    <p className="text-muted">On clicking the button you will close your account permanently . Make sure you have no amount in your flitchCoin wallet otherwise it may lead to loss of that amount.</p>
                                    <Modal
                                            show={show2}
                                            onHide={() => setShow2(false)}
                                            backdrop="static"
                                            keyboard={false}
                                            className="modal-dialog-login"
                                        >
                                            <div className="back p-3">
                                                <h2>Enter Your Password</h2><br />
                                                <input type="password" className='txt-underline p-3 w-100 input pressed' placeholder='Password' name="Password" value={pass} onChange={(e) => setPass(e.target.value)} /><br />
                                                <button onClick={sigInWithGoogle} type="button" className="button_google button w-100"><i className="fa-brands fa-google text-primary">&nbsp;&nbsp;&nbsp;Google user</i></button><br /><br /><br />
                                                <button
                                                    type="button"
                                                    className="primary me-4"
                                                    onClick={() => setShow2(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="button" className="primary" onClick={closeAccount}>
                                                    Confirm
                                                </button>
                                            </div>
                                        </Modal>
                                </div>
                                <div className="col-lg-3 mt-5 ">
                                <button className="w-100 btn-dark round-btn" onClick={() => setShow2(true)}>Close Account</button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings