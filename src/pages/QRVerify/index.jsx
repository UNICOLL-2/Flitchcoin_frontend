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
                                <div className="number mb-3 pt-2 pb-2 text-center"><b>Continue with 2 - FA </b></div>
                                <div className="number me-3 pt-2 pb-2 text-center">Verify Your QR</div>
                            </> :
                            <>
                                <div className="number mb-3 pt-2 pb-2 text-center position-relative">Continue with 2 - FA<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">&#10004;</span></div>
                                <div className="number me-3 pt-2 pb-2 text-center"><b>Verify Your QR</b></div>
                            </>}
                    </div>
                    <div className="col card mt-3 mb-3 col-12 col-md-7 p-5">
                        {page === true ?
                            <>
                                <h2 className='text-center'>Continue with 2 - FA ?</h2>
                                <p className='text-muted mt-4'>2 Factor Authentication provides you with the most provided security features and enhanced protection of wallet.</p>
                                <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked />
                                <label class="btn btn-outline-success" for="success-outlined">Checked success radio</label>

                                <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" />
                                <label class="btn btn-outline-danger" for="danger-outlined">Danger radio</label>
                            </> :
                            <>

                            </>}
                    </div>
                    <div className="col col-md-1"></div>
                </div>
            </div>

            {/* <form className="form" onSubmit={submitHandler}>
                <div className="segment">
                    <h1>QR OTP VERIFICATION</h1>
                </div>
                <QRCodeSVG
                    value={qr}
                    style={{marginLeft: '11vw',position: 'absolute'}}
                    size={150}

                />
                <label className="label">
                    <input className="input_login"
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        placeholder="x - x - x - x - x - x - x  x"
                        style={{ marginTop: "40%" }} />
                </label>
                <button className="red button" type="submit" value="Log In" name="Log In">Log in</button>
            </form> */}
        </>
    )
}

export default QRVerify