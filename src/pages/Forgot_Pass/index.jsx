import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";
import {  Modal } from "react-bootstrap";

function Forgot_Pass() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const { username, password } = formData;

    var data = JSON.stringify({
        "username": username,
        "password": password,
    });
    const [msg,setMsg] = useState();
    const submitHandler = (e) => {
        e.preventDefault();
        if ((username === "") || (password === "")) {
            alert("Please fill in the above information in ");
        } else {
            var data = JSON.stringify({
                "username": username,
                "password": password,
                "is_pool":true
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
    const [otp, setOtp] = useState(0);

    const otpHandler = (e) => {
        e.preventDefault();
        if (otp === 0) {
            alert("Please fill in the otp ");
        } else {
            var data = JSON.stringify({
                "otp": otp,
                "add": msg
            })
            console.log(data);
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
            <div className="container">
                <div className="row ">
                    <div className="col col-md-4"></div>
                    <div className="col col-md-3 ms-5 mt-5">
                        <form onSubmit={submitHandler}>
                            <div className="card back ">
                                <div className="card-body ">
                                    <h5 className="card-title text-center text-bold">Enter Your Credentials</h5>
                                    <div className='input1 w-100'>
                                        <input
                                            type="email"
                                            name="username"
                                            value={username}
                                            onChange={onChange}
                                            placeholder="Enter your Email "
                                            className="pressed p-2 mb-3 mt-3 w-100 txt-underline"
                                        />
                                        <span class="underline"></span>
                                    </div>
                                    <div className='input1 w-100'>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={onChange}
                                            placeholder="Enter new Password"
                                            className="pressed p-2 mb-2 w-100 txt-underline"
                                        />
                                        <span class="underline"></span>
                                    </div>
                                    <input type="submit" className="primary w-100 mt-4" value="SEND OTP" name="Sign In" id="danger-outlined" autoComplete="off"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col col-4"></div>
                </div>
                <Modal show={show} onHide={() => setShow(false)} className="modal-dialog1">
                    <div className="back p-3">
                        <b>Please Enter the OTP</b>
                        <div className="input1 w-100">
                            <input
                                type="number"
                                className="txt-underline p-3 mb-3 w-100 input pressed mt-3"
                                placeholder="Enter your OTP"
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
        </div>
    );
}

export default Forgot_Pass;
