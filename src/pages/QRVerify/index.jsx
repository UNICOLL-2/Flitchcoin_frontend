import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from "react-router-dom";
import Animation from "../../Animation";
import { fetchToken } from "../../Auth";
import statement from "./Group 87.png";
import setting from "./Group 97.png";
import line from "./Line 18.png";
import Toast from 'react-bootstrap/Toast';
import SmallFooter from '../SmallFooter';

const QRVerify = () => {

    const navigate = useNavigate();
    const [otp1, setOtp1] = useState();
    const [qr, setQr] = useState("");
    const [page, setPage] = useState("Choose");
    const [isActive, setIsActive] = useState(false);
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showD, setShowD] = useState(false);

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

    useEffect(() => {
        getOtp();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(otp1);
        if (otp1 === undefined || otp1 === "") {
            setShowA(true);
        } else {
            const data = JSON.stringify({
                "otp": otp1
            });
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
                    if (data.status == 200) {
                        setShowB(true);
                        navigate("/dashboard");
                    } else {
                        setShowC(true);
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
                    setShowD(true);
                    navigate("/dashboard");
                }
            })).catch(err => console.log(err))
    };

    return (
        <>
            <Animation />
            <div className="container">
                <div className="row mt-5">
                    <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Flitchcoin</strong>
                            <small>Unfilled !</small>
                        </Toast.Header>
                        <Toast.Body>Please enter the OTP to proceed.</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Flitchcoin</strong>
                            <small>Congrats !</small>
                        </Toast.Header>
                        <Toast.Body>You have now opted for 2 FA !</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowC(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showC} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Flitchcoin</strong>
                            <small>Error !</small>
                        </Toast.Header>
                        <Toast.Body>Please enter the correct OTP to proceed.</Toast.Body>
                    </Toast>
                    <Toast onClose={() => setShowD(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showD} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Flitchcoin</strong>
                            <small>Done !</small>
                        </Toast.Header>
                        <Toast.Body>You have now opted not to continue with 2 FA .</Toast.Body>
                    </Toast>
                    <h1 className='text-center setup_text'>Setup Two Factor Authentication</h1>
                    <div className="row ps-5 pe-5">
                        <div className="card back parent_card ms-3 me-3 mb-3 mt-4 pb-5">
                            <div className="row">
                                <div className={`col-xl-4 ps-5 ${page === "Choose" ? 'to_middle' : 'to_middle_2'}`}>
                                    <i className={`ps-4 pe-4 pt-2 mt-1 dropdown-qr ${page === "Choose" ? 'selected-qr ' : ''}`} onClick={() => setPage("Choose")}><img src={statement} style={{ height: "32px", width: "32px" }} /> &nbsp; Choose</i>
                                    <img src={line} alt="line" className='line_link' />
                                    <i className={`ps-4 pe-4 pt-2 mt-1 dropdown-qr ${page === "Setup" ? 'selected-qr' : ''}`}><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Setup Auth</i>
                                    <img src={line} alt="line" className='line_link' />
                                    <i className={`ps-4 pe-4 pt-2 mt-1 dropdown-qr ${page === "Verify" ? 'selected-qr' : ''}`}><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Verify QR code</i>
                                </div>
                                <div className="col-xl-8 p-5 pb-0">
                                    {
                                        page === "Choose" ?
                                            <>
                                                <div className="row">
                                                    <div className="row settings_box ps-5 pe-5 pt-3 pb-2">
                                                        <div className="col-lg-8">
                                                            <p className='qr_head'>I want to Activate 2 - Step Verification</p>
                                                            <p>*** You can change this anytime through settings page.</p>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <button className="round-btn margin_btn place_order_btn ps-5 pe-5 mt-3 qr_btn" onClick={() => { setIsActive(true); setPage("Setup") }}>
                                                                Activate
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="row settings_box ps-5 pe-5 pt-3 pb-2 mt-4 mb-5">
                                                        <div className="col-lg-8">
                                                            <p className='qr_head'>Nah ! I'm good without 2 - Step Verification</p>
                                                            <p>*** You can change this anytime through settings page.</p>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <button className="round-btn red button ps-4 pe-4 mt-5 qr_btn" onClick={noFa}>
                                                                De - Activate
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p><span className="text_design">Two-factor authentication (2FA) </span>is an excellent way to add an extra layer of security to your online accounts, including your wallet. Here are a few reasons why you should consider using it:<br />
                                                        1. It helps protect against unauthorized access to your accounts, even if someone else has obtained your login credentials.<br />
                                                        2. It's quick and easy to set up, and can be done through a variety of methods, such as SMS, email, or google authentication app.<br />
                                                        3. It provides peace of mind knowing that your accounts have an extra level of protection.<br />
                                                        4. Many online services, including financial institutions, now require 2FA for added security, so it's becoming increasingly important to use it.</p>
                                                </div>
                                            </> :
                                            <>
                                                {
                                                    page === "Setup" && isActive ?
                                                        <>
                                                            <p><span className="qr_head"> Here’s an example to set up two-factor authentication (2FA) using the <span className="text_design"> Google Authenticator</span> app:</span><br /><br />
                                                                1. Download the Google Authenticator app on your phone. It is available for both Android and iOS devices.<br />
                                                                2. Go to the account or service that you want to enable 2FA for and look for the option to enable 2FA. This is usually found in the security settings.<br />
                                                                3. Follow the prompts to set up 2FA. This may include scanning a QR code or entering a secret key.<br />
                                                                4. The Google Authenticator app will generate a 6-digit code that you will need to enter in order to complete the setup process.<br />
                                                                5. From now on, whenever you log in to your account, you will be prompted to enter both your password and the 6-digit code generated by the Google Authenticator app.<br /><br />
                                                                That's it! You have now successfully set up 2FA using the Google Authenticator app. It's a good idea to write down the secret key or save it somewhere safe, in case you lose access to your phone or the app.<br /><br />
                                                                <p className="text-muted">**You can change your auth app anytime through the same process.</p></p>
                                                            <div className="row">
                                                                <div className="col-lg-6">
                                                                    <button className="round-btn red button ps-4 pe-4 mt-5 qr_btn w-100">
                                                                        I need more help !
                                                                    </button>
                                                                </div>
                                                                <div className="col-lg-6 text-center">
                                                                    <button className="round-btn margin_btn place_order_btn ps-5 pe-5 mt-5 qr_btn w-100" onClick={() => setPage("Verify")}>
                                                                        I've Completed setup &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'>'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </> :
                                                        <>
                                                            {
                                                                page === "Verify" && isActive ?
                                                                    <>
                                                                        <div className="row mb-4">
                                                                            <div className="col-xl-4">
                                                                                <QRCodeSVG
                                                                                    value={qr}
                                                                                    size={150}
                                                                                />
                                                                            </div>
                                                                            <div className="col-xl-8 mt-5">
                                                                                <p>Enter OTP here : &nbsp;&nbsp;&nbsp;<input placeholder='x - x - x - x' value={otp1} onChange={(e) => setOtp1(e.target.value)} className='input_login w-50 p-2 ps-4'></input></p>
                                                                            </div>
                                                                        </div>
                                                                        <p>Here are the steps to scan a QR code and enter a one-time passcode (OTP) for two-factor authentication (2FA):<br />
                                                                            1. Open the authenticator app on your phone (such as Google Authenticator).<br />
                                                                            2. Tap the plus sign (+) or the option to add a new account.<br />
                                                                            3. Choose the option to scan a QR code.<br />
                                                                            4. Hold your phone up to the QR code displayed on the screen. The app should automatically scan the code and add the account to your app.<br />
                                                                            5. Once the account has been added to your authenticator app, it will display a 6-digit code. This is the one-time passcode (OTP) that you will need to enter in order to complete the login process.<br />
                                                                            6. Finally enter the OTP in input box above and click “proceed & Finish Setup button”.<br />
                                                                        </p>
                                                                        <p className="text-muted">**You can change your auth app anytime through the same process.</p>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <button className="round-btn red button ps-4 pe-4 mt-4 qr_btn w-100" onClick={noFa}>
                                                                                    I don't need 2 FA !
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-lg-6 text-center">
                                                                                <button className="round-btn margin_btn place_order_btn ps-5 pe-5 mt-4 qr_btn w-100" onClick={submitHandler}>
                                                                                    Proceed & Finish setup &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'>'}
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </> :
                                                                    <></>
                                                            }
                                                        </>
                                                }
                                            </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SmallFooter/>
        </>
    )
}

export default QRVerify