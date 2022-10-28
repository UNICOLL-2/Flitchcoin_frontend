import React from 'react';
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <div className="row">
                <div className="col-lg-2 side_navigation">
                <Link to="/profile" className='link'><i class="fa-regular fa-circle-user p-4 dropdown-item text-danger"> &nbsp; &nbsp; P r o f i l e</i></Link>
                <Link to="/statements" className='link'><i class="fa-solid fa-list p-4 dropdown-item"> &nbsp; &nbsp; S t a t e m e n t s</i></Link>
                </div>
                <div className="col-md-2"></div>
                <div className="col-12 col-md-6">
                    <h1 className='text-center mt-4'>Profile</h1>
                    <hr />
                    <div className='mt-5'>
                        <div className="row">
                            <div className="col-12 text-center col-md-2">
                                <img src="https://th.bing.com/th/id/OIP.cjOvUxt_6TVBz93oqpUa1gHaHa?pid=ImgDet&rs=1" className="avatar_big_2" />
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="row ms-3 mt-3"><h4>Tushar gupta</h4></div>
                                <div className="row ms-3"><h6 className='text-muted'>tushargupta2k3@gmail.com</h6></div>
                            </div>
                            <div className="col-12 col-md-4 mt-4">
                                <button>Edit Profile Photo</button>
                            </div>
                        </div>
                    </div>
                    <div className='profile_section mt-4'>
                        <h2>Contact Info</h2><hr />
                        <div class="accordion accordion-flush" id="accordionFlushExample">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Display Name : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className='reduce_bold'>Tushar gupta</span>
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">
                                        <input className='input_profile w-100' placeholder='Display name'/><br/><br/>
                                        <div className="row">
                                            <div className="col-md-8"></div>
                                            <div className="col-md-2 col-6"><button className='btn btn-light w-100'>Cancel</button></div>
                                            <div className="col-md-2 col-6 "><button className='btn btn-primary w-100'>Save</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-headingTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                        Email address : &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <span className='reduce_bold'>tushargupta2k3@gmail.com</span>
                                    </button>
                                </h2>
                                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                    <div class="accordion-body">Your email address has been set to <span className='text-muted'>tushargupta2k3@gmail.com</span></div>
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
                            <div className="col-md-3 col-12"><button className='btn btn-danger'><b>Close Account</b></button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile