import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";

function Forgot_Pass() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        full_name: "",
    });
    const { username, password,full_name} = formData;

    var data = JSON.stringify({
        "username": username,
        "password": password,
        "full_name": full_name
    });

    const submitHandler = (e) => {
        e.preventDefault();
            if ((username === "") || (password === "") || (full_name === "")) {
                alert("Please fill in the above information in ");
            } else {
                var data = JSON.stringify({
                    "username": username,
                    "password": password,
                    "full_name": full_name
                })
                fetch("http://34.73.24.72/forgot_pass", {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data
                }).then(res => res.json())
                    .then((data) => {
                        if (data) {
                            dispatch(loginUser(formData));
                            navigate("/pass_verify");
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
    return (
        <div>
        <Animation/>
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
                                    <div className='input1 w-100'>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={full_name}
                                        onChange={onChange}
                                        placeholder="Enter your Fullname"
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
            </div>
        </div>
    );
}

export default Forgot_Pass;
