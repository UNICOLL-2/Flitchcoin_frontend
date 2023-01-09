import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchToken } from "../../Auth";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { avtarType } from "../../Feature/Order/orderSlice";
import { logOutUser } from "../../Feature/Auth/authSlice";
import statement from "./Group 87.png";
import setting from "./Group 97.png";
import Toast from 'react-bootstrap/Toast';
import SmallFooter from '../SmallFooter';

const Profile = () => {

    const [avt, setAvt] = useState();
    const [show, setShow] = useState(false);
    const [arr, setArr] = useState();
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState("");
    const [showA, setShowA] = useState(false);
    const [showB, setShowB] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getAvtar = () => {
        fetch('https://www.flitchcoin.com/api/avtar', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                let tempArray = [];
                for (let i = 0; i < Object.entries(res).length; i++) {
                    tempArray.push(Object.entries(res)[i][1]);
                }
                setArr([...tempArray]);
                setLoading(false)
            })).catch((err) => {
                console.log(err);
            })
    };

    const [checkPool, setCheckPool] = useState(false);

    useEffect(() => {
        getAvtar();
        change();
        user();
    }, []);

    const edit = (e) => {
        fetch('https://www.flitchcoin.com/api/avtar', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                for (let i = 0; i < Object.entries(res).length; i++) {
                    if (e === Object.entries(res)[i][1]) {
                        var data = JSON.stringify({
                            "avtar": i + 1
                        })
                        fetch("https://www.flitchcoin.com/api/dashboard", {
                            method: "PUT",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${fetchToken()}`
                            },
                            body: data
                        }).then(result => result.json()
                            .then(res => {
                                if (res.status === 200) {
                                    setShow(false);
                                }
                            })).catch(err => console.log(err))
                    }
                }
            })).catch((err) => {
                console.log(err);
            })
    };

    const change = () => {
        fetch('https://www.flitchcoin.com/api/dashboard', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                setAvt(res.avtar_im);
                setLoading(false);
                dispatch(avtarType("changed"));
            })).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        change();
    }, [show]);

    const [username, setUsername] = useState();
    const [name, setName] = useState();

    const user = () => {
        fetch("https://flitchcoin.com/api/users/me/items/", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => result.json()
            .then(res => {
                setUsername(res.username);
                setName(res.name);
                if (res.is_pool) {
                    setCheckPool(true);
                }
            })).catch((err) => {
                console.log(err);
            })
    };

    useEffect(() => {
        user();
    }, [name]);

    const changeUser = () => {
        var data = JSON.stringify({
            "name": display
        })
        fetch("https://www.flitchcoin.com/api/dashboard", {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            },
            body: data
        }).then(result => result.json()
            .then(res => {
                setShowA(true);
                setName(res.name);
            })).catch(err => console.log(err))
    };

    const [formData, setFormData] = useState({
        type: null
    });
    const { type } = formData;

    const onClick = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            type: null
        }));
        dispatch(logOutUser());
    };

    const become = (e) => {
        e.preventDefault();
        setTimeout(() => {
            const data = JSON.stringify({
                "is_pool": !checkPool
            })
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
        }, 5000);
        setShowB(true);
    };

    return (
        <div>
            {
                loading ? <>
                    <div className="for_fox">
                        <div className="fox">
                            <div className="leg-outer">
                                <div className="leg">
                                    <div className="paw">
                                        <div className="log">
                                            <div className="log-inner">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="leg-outer">
                                <div className="leg">
                                    <div className="paw">
                                        <div className="log">
                                            <div className="log-inner"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hind-leg-outer">
                                <div className="hind-leg-outer2">
                                    <div className="hind-paw">
                                        <div className="hind-log">
                                            <div className="hind-log-inner">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hind-leg-outer">
                                <div className="hind-leg-outer2">
                                    <div className="hind-paw">
                                        <div className="hind-log">
                                            <div className="hind-log-inner">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="body">
                                <div className="head">
                                    <div className="ears">
                                        <div className="ear"></div>
                                        <div className="ear"></div>
                                    </div>
                                    <div className="face"></div>
                                    <div className="snout"></div>
                                </div>
                                <div className="tail">
                                    <div className="tail">
                                        <div className="tail">
                                            <div className="tail">
                                                <div className="tail">
                                                    <div className="tail">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tail2">
                                        <div className="tail">
                                            <div className="tail">
                                                <div className="tail">
                                                    <div className="tail">
                                                        <div className="tail">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="snow"></div>
                    </div>
                </> :
                    <>
                        <div className="row mt-4">
                            <div className="col-xxl-2 col-xl-3 col-12 side_navigation">
                                <Link to="/profile" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item mt-5 selected-item"><img src={avt} style={{ height: "30px", width: "30px", borderRadius: "50%" }} /> &nbsp; Profile</i></Link>
                                <Link to="/statements" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item"><img src={statement} style={{ height: "32px", width: "32px" }} /> &nbsp; Statements</i></Link>
                                <Link to="/settings" className='link'><i className="ps-4 pe-4 pt-2 pb-2 dropdown-item"><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Settings</i></Link>
                            </div>
                            <div className="col-md-2">
                            <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Done !</small>
                            </Toast.Header>
                            <Toast.Body>Your display name has been changed.</Toast.Body>
                        </Toast>
                        <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showB} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="me-auto">Flitchcoin</strong>
                                <small>Carefull !</small>
                            </Toast.Header>
                            <Toast.Body>You will be loged out after this event. Please log in again.</Toast.Body>
                        </Toast>
                            </div>
                            <div className="col-12 col-md-6 mt-4 mb-4">
                                <p className='text-center mt-4' style={{ fontSize: "47px", fontWeight: "700" }}>Profile</p>
                                <hr />
                                <div className='mt-5'>
                                    <div className="row profile_section pt-5">
                                        <div className="col-12 text-center col-md-2">
                                            <img src={avt} className="avatar_big_2" alt="profile img" />
                                            <p className="text-muted mt-2 edit" onClick={() => setShow(true)}>Edit</p>
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="row ms-3 mt-3"><h4>{name}</h4></div>
                                            <div className="row ms-3"><h6 className='text-muted'>{username}</h6></div>
                                        </div>
                                        <div className="col-12 col-md-4 mt-4">
                                            <div className="plain_text row mb-4 mt-1">
                                                <div className="col-5 text-end">
                                                    {
                                                        checkPool ? <>Pool</> : <>Part.</>
                                                    }
                                                </div>
                                                <div className="col-2" style={{ marginTop: "-22px" }}>
                                                    <div>
                                                        <input type="checkbox" id="toggle" onClick={become} />
                                                        <label htmlFor="toggle" className="switch_toggle"></label>
                                                    </div>
                                                </div>
                                                <div className="col-5 ps-5 text-start">
                                                    {
                                                        !checkPool ? <>Pool</> : <>Part.</>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Modal
                                            show={show}
                                            onHide={() => setShow(false)}
                                            backdrop="static"
                                            keyboard={false}
                                            className="modal-dialog-login"
                                        >
                                            <div className="back p-3">
                                                <div className="row">
                                                    <div className="col-10"></div>
                                                    <div className="col-2"><button type="button" className="btn-close" aria-label="Close" onClick={() => setShow(false)}></button></div>
                                                </div>
                                                <h2>Select your Avatar !</h2>
                                                {arr ? <>
                                                    {arr.map((items) => {
                                                        return (
                                                            <img src={items} alt="" className="change_profile" onClick={() => edit(items)} />
                                                        )
                                                    })}
                                                </> : <></>
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className='profile_section mt-4'>
                                    <h2>Contact Info</h2><hr />
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item mt-3">
                                            <h2 className="accordion-header" id="flush-headingOne">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    Display Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className='reduce_bold'>{name}</span>
                                                </button>
                                            </h2>
                                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <input className='input_login txt-underline p-3 mt-3 w-100' placeholder='Display name' name="display name" value={display} onChange={(e) => setDisplay(e.target.value)} /><span className="underline"></span><br /><br />
                                                    <div className="row">
                                                        <div className="col-md-8"></div>
                                                        <div className="col-md-2 col-6"><button className='btn btn-light w-100' onClick={() => setDisplay("")} data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Cancel</button></div>
                                                        <div className="col-md-2 col-6 "><button className='btn btn-primary w-100' onClick={changeUser}>Save</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="accordion-item mb-3">
                                            <h2 className="accordion-header" id="flush-headingTwo">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                                    Email address : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className='reduce_bold'>{username}</span>
                                                </button>
                                            </h2>
                                            <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">Your email address has been set to <span className='text-muted'>{username}</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <SmallFooter/>
                    </>
            }
        </div>
    )
}

export default Profile