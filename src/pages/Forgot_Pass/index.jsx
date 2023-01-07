import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import { Modal } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';
import Footer from '../../layouts/Footer/index';

function Forgot_Pass() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = formData;
    const [msg, setMsg] = useState();
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        if ((username === "") || (password === "")) {
            setShowA(true);
        } else {
            var data = JSON.stringify({
                "username": username,
                "password": password,
                "is_pool": true
            })
            fetch("https://flitchcoin.com/api/forgot/Signup", {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    if ((data.status) === 200) {
                        setShow(true);
                        dispatch(loginUser(formData));
                        setMsg(data.msg);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    };

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const [show, setShow] = useState(false);
    const [otp, setOtp] = useState("");

    const otpHandler = (e) => {
        e.preventDefault();
        if (otp === "") {
            setShowB(true);
        } else {
            var data = JSON.stringify({
                "otp": Number(otp),
                "add": msg
            })
            fetch("https://flitchcoin.com/api/forgot/verify_email", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    console.log(data)
                    if ((data.status) === 200) {
                        dispatch(loginUser(formData));
                        navigate('/login')
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    };

    return (
        <div>
            <Animation />
            <form className="container mt-5" onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-lg-4">
                        <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Unfilled !</small>
                            </Toast.Header>
                            <Toast.Body>Please enter details to proceed.</Toast.Body>
                        </Toast>
                        <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Error !</small>
                            </Toast.Header>
                            <Toast.Body>Please fill in the OTP.</Toast.Body>
                        </Toast>
                    </div>
                    <div className="col-lg-4 card back special_card_profile margin_login mt-2 mb-3">
                        <div className="segment">
                            <h1>Enter Your Credentials</h1>
                        </div>
                        <label className="label">
                            <input
                                className="input_login"
                                type="email"
                                name="username"
                                value={username}
                                onChange={onChange}
                                placeholder="Enter your Username"
                            />
                        </label>
                        <label className="label">
                            <input
                                className="input_login"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                placeholder="Enter New Password"
                                style={{ marginTop: "4%" }}
                            />
                        </label>
                        <button className="red button mb-4" type="submit" value="Send OTP" name="Sign In" onClick={() =>
                            setFormData({
                                ...formData,
                            })
                        }>Send OTP</button>
                    </div>
                </div>
            </form>

            <Modal show={show} onHide={() => setShow(false)} className="modal-dialog-login">
                <div className="back p-3">
                    <b>Please Enter the OTP</b>
                    <div className="input1 w-100">
                        <input
                            type="text"
                            className="txt-underline p-3 mb-3 w-100 input pressed mt-3"
                            placeholder="x - x - x - x - x - x - x  x"
                            onChange={(e) => setOtp(e.target.value)}
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
                    <button type="button" className="primary"
                        onClick={otpHandler} >
                        Confirm
                    </button>
                </div>
            </Modal>
            <Footer/>
        </div>
    );
}

export default Forgot_Pass;
