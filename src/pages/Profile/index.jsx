import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchToken } from "../../Auth";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { avtarType } from "../../Feature/Order/orderSlice";

const Profile = () => {

    const [avt, setAvt] = useState();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [arr, setArr] = useState();
    const [loading, setLoading] = useState(true);
    const [display, setDisplay] = useState("");
    const [pass, setPass] = useState("");

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
                            "avtar": i+1
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
                alert("Dispaly name changed successfully!!");
                setName(res.name);
            })).catch(err => console.log(err))
    };

    const closeAccount = () => {
        var data = JSON.stringify({
            "username": username,
            "password": pass
        });
        console.log(data);
        fetch("https://flitchcoin.com/api/Signup", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            },
            body: data
        }).then(result => result.json()
            .then(res => {
                console.log(res);
                if (res.status_code === 200) {
                    alert("Your account has been deleted permanently");
                    navigate("/login");
                } else {
                    alert("Wrong Password!");
                }
            })).catch(err => console.log(err))
    }

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
                        <div className="row">
                            <div className="col-xxl-2 col-lg-3 col-12 side_navigation">
                                <Link to="/profile" className='link'><i className="fa-regular fa-circle-user p-4 dropdown-item text-danger"> &nbsp; &nbsp; P r o f i l e</i></Link>
                                <Link to="/statements" className='link'><i className="fa-solid fa-list p-4 dropdown-item"> &nbsp; &nbsp; S t a t e m e n t s</i></Link>
                            </div>
                            <div className="col-md-2"></div>
                            <div className="col-12 col-md-6">
                                <h1 className='text-center mt-4'>Profile</h1>
                                <hr />
                                <div className='mt-5'>
                                    <div className="row">
                                        <div className="col-12 text-center col-md-2">
                                            <img src={avt} className="avatar_big_2" alt="profile img" />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <div className="row ms-3 mt-3"><h4>{name}</h4></div>
                                            <div className="row ms-3"><h6 className='text-muted'>{username}</h6></div>
                                        </div>
                                        <div className="col-12 col-md-4 mt-4">
                                            <button onClick={() => setShow(true)}>Edit Profile Photo</button>
                                        </div>
                                        <Modal
                                            show={show}
                                            onHide={() => setShow(false)}
                                            backdrop="static"
                                            keyboard={false}
                                            className="modal-dialog-login"
                                        >
                                            <div className="back p-3">
                                                <h2>Select your Avatar !</h2>
                                                {
                                                    arr.map((items) => {
                                                        return (
                                                            <img src={items} alt="" className="change_profile" onClick={() => edit(items)} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className='profile_section mt-4'>
                                    <h2>Contact Info</h2><hr />
                                    <div className="accordion accordion-flush" id="accordionFlushExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="flush-headingOne">
                                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                                    Display Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className='reduce_bold'>{name}</span>
                                                </button>
                                            </h2>
                                            <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                                <div className="accordion-body">
                                                    <input className='input_profile txt-underline input pressed p-3 mt-3 w-100' placeholder='Display name' name="display name" value={display} onChange={(e) => setDisplay(e.target.value)} /><span className="underline"></span><br /><br />
                                                    <div className="row">
                                                        <div className="col-md-8"></div>
                                                        <div className="col-md-2 col-6"><button className='btn btn-light w-100' onClick={() => setDisplay("")} data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">Cancel</button></div>
                                                        <div className="col-md-2 col-6 "><button className='btn btn-primary w-100' onClick={changeUser}>Save</button></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        <div className="accordion-item">
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
                                <div className='profile_section mt-3 mb-4'>
                                    <h3>Close Account</h3>
                                    <div className="row">
                                        <div className="col-md-9 col-12 text-muted">
                                            On clicking the button you will close your account permanently . Make sure you have no amount in your flitchCoin wallet otherwise it may lead to loss of that amount.
                                        </div>
                                        <div className="col-md-3 col-12"><button className='btn btn-danger' onClick={() => setShow1(true)}><b>Close Account</b></button></div>
                                        <Modal
                                            show={show1}
                                            onHide={() => setShow1(false)}
                                            backdrop="static"
                                            keyboard={false}
                                            className="modal-dialog-login"
                                        >
                                            <div className="back p-3">
                                                <h2>Enter Your Password</h2><br />
                                                <input className='txt-underline p-3 w-100 input pressed' placeholder='Password' name="Password" value={pass} onChange={(e) => setPass(e.target.value)} /><br /><br />
                                                <button
                                                    type="button"
                                                    className="primary me-4"
                                                    onClick={() => setShow1(false)}
                                                >
                                                    Cancel
                                                </button>
                                                <button type="button" className="primary" onClick={closeAccount}>
                                                    Confirm
                                                </button>
                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Profile