import React, { useEffect, useState } from "react";
import { fetchToken } from "../../Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Feature/Auth/authSlice";

const Settings = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [checkPool, setCheckPool] = useState(false);

    const [formData, setFormData] = useState({
        type: null
    });
    const { type } = formData;

    function rel_login() {
        setFormData((prevData) => ({
            ...prevData,
            type: null
        }));
    };

    const onClick = (e) => {
        rel_login();
        dispatch(logOutUser());
    };

    const getInfo = () => {
        fetch('https://flitchcoin.com/api/users/me/items/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                if (res.is_pool) {
                    setCheckPool(true);
                }
                setUsername(res.username);
            })).catch((err) => {
                console.log(err);
            })
    };

    const [fa2, setfa2] = useState(false);

    const checkUser = (e) => {
        const data = JSON.stringify({
            "emailid": username
        })
        fetch('https://flitchcoin.com/api/userchrono_info', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: data
        }).then(res => res.json())
            .then((data) => {
                if (data.fa2 === true) {
                    setfa2(true)
                }
            }).catch((err) => {
                console.log(err);
            })
    };

    const become = (e) => {
        const data = JSON.stringify({
            "is_pool": !checkPool
        })
        e.preventDefault();
        fetch('https://flitchcoin.com/api/mode', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`,
                'Content-Type': 'application/json'
            },
            body: data
        }).then((result) => result.json()
            .then(res => {
                navigate("/login");
                onClick();
            })).catch(err => console.log(err));
    };

    const manageFa2 = () => {
        if (fa2) {
            fetch('https://flitchcoin.com/api/2fa_options', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${fetchToken()}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "fa2": !fa2
                })
            }).then((result) => result.json()
                .then(res => {
                    navigate('/login');
                    onClick();
                })).catch(err => console.log(err));
        } else {
            const data = JSON.stringify({
                "emailid": username,
                "fa2": "null"
            })
            fetch('https://flitchcoin.com/api/userchrono_info', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(res => res.json())
                .then((data) => {
                    console.log(data);
                }).catch((err) => {
                    console.log(err);
                })
            navigate("/login");
            onClick();
        }
    };

    const [setting, setSetting] = useState(true)

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 profile_section" style={{ background: "white" }}>
                    {setting ?
                        <>
                            <div className="row p-4">
                                <h6 className="col-3 navigate" role="button">2-Step Verification</h6>
                                <h6 className="col-3 " role="button" onClick={() => setSetting(false)}>Become {checkPool ? <>Participant</> : <>Pool</>}</h6>
                                <hr/><br/><br/><br/>
                                <p><b>Select your 2-step verification method</b></p>
                                <p>Your 2-step verification method is valid across all your Coinbase accounts</p><br/><br/><br/><br/>
                                <p className="text-muted"><b>CURRENT</b></p>
                                <p>You have currently opted to continue </p>
                            </div>
                        </> :
                        <>
                            <div className="row p-4">
                                <h6 className="col-3" role="button" onClick={() => setSetting(true)}>2-step Verification</h6>
                                <h6 className="col-3 navigate" role="button">Become {checkPool ? <>Participant</> : <>Pool</>}</h6>
                                <hr/>
                            </div>
                        </>}
                </div>
                <div className="col-md-2"></div>
            </div>
        </div>
    )
}

export default Settings