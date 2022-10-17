import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { loginToken } from "../../Feature/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import Animation from "../../Animation";
import { useDispatch } from "react-redux";
import { fetchToken } from "../../Auth";

const QRVerify = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState();
    const [qr, setQr] = useState("");
    const [page, setPage] = useState(true);
    const [changeButton, setChangeButton] = useState(false);

    useEffect(() => {
        console.log("inside useeffect");
        getOtp();
    }, []);

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
                console.log(res)
                setQr(res);
            })
        })
    };

    const submitHandler = (e) => {
        const data = JSON.stringify({
            "otp": otp
        });
        e.preventDefault();
        if (otp == "") {
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
                        console.log("inside if ")
                        dispatch(loginToken());
                    } else if (data.false) {
                        console.log("inside else if")
                        alert("WRONG OTP");
                    } else {
                        console.log("inside else")
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
                'Accept' : 'application/json'
            }
        }).then(result => result.json()
        .then(res => {
            if(res.status === 200){
                dispatch(loginToken());
            }
        })).catch(err => console.log(err))
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
                                <label className="btn btn-outline-info p-4 mb-4" htmlFor="success-outlined">Continue with 2 factor Authentication</label>

                                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" onClick={() => setChangeButton(true)} />
                                <label className="btn btn-outline-danger p-4" htmlFor="danger-outlined">Continue without 2 factor Authentication</label>
                                {changeButton ?
                                    <>
                                        <button className="btn-primary w-50 mt-5" onClick={noFa}>Log in Without 2-FA</button>
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
                                            value={otp}
                                            onChange={e => setOtp(e.target.value)}
                                            placeholder="x - x - x - x - x - x - x - x" />
                                    </label>
                                    <button className="btn-primary w-50" type="submit" value="Log In" name="Log In">Log in</button>
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