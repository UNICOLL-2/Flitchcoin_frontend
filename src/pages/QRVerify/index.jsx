import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { loginToken } from "../../Feature/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import Animation from "../../Animation";
import { useDispatch } from "react-redux";

const QRVerify = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState();
    const [qr, setQr] = useState("");
    
    useEffect(() => {
        getOtp();
    }, []);

    const getOtp = () => {
        fetch("http://34.73.24.72/fa2url").then((result) => {
            result.json().then((res) => {
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
            fetch("http://34.73.24.72/fa2url", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    if (data.true) {
                        dispatch(loginToken());
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

    return (
        <>
            <Animation />
            <form className="form" onSubmit={submitHandler}>
                <div className="segment">
                    <h1>QR OTP VERIFICATION</h1>
                </div>
                <QRCodeSVG
                    value={qr}
                    style={{marginLeft: '11vw'}}
                    size={150}
                />
                <label className="label">
                    <input className="input_login"
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        placeholder="x x x x x x"
                        style={{ marginTop: "4%" }} />
                </label>
                <button className="red button" type="submit" value="Log In" name="Log In">Log in</button>
            </form>
        </>
    )
}

export default QRVerify