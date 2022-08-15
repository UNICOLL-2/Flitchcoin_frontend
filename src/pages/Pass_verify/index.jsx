import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Feature/Auth/authSlice";

const Pass_verify = () => {
    const { selectedType } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        otp: "",
    });
    const { otp} = formData;

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
                    dispatch(loginUser(formData));
                    navigate("/login");
                    }
                    else if(data.false){
                        alert("WRONG OTP");
                    } else {
                        alert("Max tries Reached. Try again !!");
                        navigate("/login");
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
        <div className='back'>
            <div className="container">
                <div className="row page_fill_1">
                    <div className="pt-5 pb-5">
                            <form onSubmit={submitHandler}>
                                <div className="card back">
                                    <div className="card-body">
                                        <h5 className="card-title text-center pb-3">EMAIL OTP VERIFICATION</h5>
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            onChange={onChange}
                                            placeholder="Enter OTP"
                                            className="inp p-2 mb-2 w-100"
                                        /><br />
                                        <input type="submit" className="primary w-100 mt-4" value="Set new Password" name="Sign Up" id="danger-outlined" autoComplete="off"
                                            onClick={() => {
                                                setFormData({
                                                    ...formData,
                                                })
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pass_verify