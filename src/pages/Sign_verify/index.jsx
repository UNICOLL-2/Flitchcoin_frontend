import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinUser } from "../../Feature/Auth/authSlice";
import Animation from "../../Animation";

const Sign_verify = () => {
    const { selectedType } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        otp: "",
        type: null,
    });
    const { otp, type } = formData;

    const data = JSON.stringify({
        "otp": otp
    });

    function rel_signup(){
        fetch("http://127.0.0.1:8000/rel_signup").then((result) => {
          result.json().then((res) => {
            console.log("result", res);
          })
        })
      };

    const submitHandler = (e) => {
        e.preventDefault();
        if (otp == "") {
            alert("Enter OTP");
        } else {
            fetch("http://127.0.0.1:8000/verify_email", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.true){
                    dispatch(signinUser(formData));
                    navigate("/qr_verify");
                    }
                    else if(data.false){
                        alert("WRONG OTP");
                    } else {
                        alert("Max tries Reached. Try again !!");
                        navigate("/sign-up");
                        rel_signup();
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
        <>
        <Animation/>
        <div className='back'>
            <div className="container">
                <div className="row page_fill_1">
                    <div className="col col-4 pt-5 pb-5"></div>
                    <div className="col col-4 pt-5 pb-5">
                        {selectedType === "participant" ? (
                            <form onSubmit={submitHandler}>
                                <div className="card back">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">EMAIL OTP VERIFICATION</h5>
                                        <h5 className="text-info mt-5 mb-3">Signing up as Participant</h5>
                                        <div className='input1 w-100'>
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            onChange={onChange}
                                            placeholder="Enter OTP"
                                            className="pressed txt-underline p-2 mb-2 w-100"
                                        />
                                        <span class="underline"></span>
                                        </div>
                                        <input type="submit" className="btn btn-dark w-100 mt-4" value="Sign Up" name="Sign Up" id="danger-outlined" autoComplete="off"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    type: "participant",
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        ) : null}

                        {selectedType === "pool" ? (
                            <form onSubmit={submitHandler}>
                                <div className="card back">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">EMAIL OTP VERIFICATION</h5>
                                        <h5 className="text-info mt-5 mb-3">Signing up as Pool</h5>
                                        <div className='input1 w-100'>
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            onChange={onChange}
                                            placeholder="Enter OTP"
                                            className="pressed txt-underline p-2 mb-2 w-100"
                                        />
                                        <span class="underline"></span>
                                        </div>
                                        <input type="submit" className="btn btn-dark w-100 mt-4" value="Sign Up" name="Sign Up" id="danger-outlined" autoComplete="off"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                    type: "pool",
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                        ) : null}
                    </div>
                    <div className="col col-4 pt-5 pb-5 mt-5 ps-5"></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Sign_verify