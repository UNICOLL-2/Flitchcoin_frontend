import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import { Modal } from "react-bootstrap";

function Forgot_Pass() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = formData;
    const [msg, setMsg] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        if ((username === "") || (password === "")) {
            alert("Please fill in the above information in ");
        } else {
            var data = JSON.stringify({
                "username": username,
                "password": password,
                "is_pool": true
            })
            fetch("http://34.73.24.72/forgot/Signup", {
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
            alert("Please fill in the otp ");
        } else {
            var data = JSON.stringify({
                "otp": Number(otp),
                "add": msg
            })
            fetch("http://34.73.24.72/forgot/verify_email", {
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
    }

    return (
        <div>
            <Animation />
            <form className="container mt-5" onSubmit={submitHandler}>
                <div className="segment">
                    <h1>Enter Your Credentials</h1>
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
                                placeholder="Enter New Password"
                                style={{ marginTop: "4%" }}
                            />
                        </label>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
                <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-12 col-lg-4 pb-5">
                        <button className="red button" type="submit" value="Send OTP" name="Sign In" onClick={() =>
                            setFormData({
                                ...formData,
                            })
                        }>Send OTP</button>
                    </div>
                    <div className="col-lg-4"></div>
                </div>
            </form>

            <Modal show={show} onHide={() => setShow(false)} className="modal-dialog-login">
                <div className="back p-3">
                    <b>Please Enter the OTP</b>
                    <div className="input1 w-100">
                        <input
                            type="text"
                            className="txt-underline p-3 mb-3 w-100 input pressed mt-3"
                            placeholder="x x x x x x"
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
        </div>
    );
}

export default Forgot_Pass;
