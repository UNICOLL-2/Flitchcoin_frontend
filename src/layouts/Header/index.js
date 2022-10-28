import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Feature/Auth/authSlice";
import { fetchToken } from "../../Auth";

function Header() {
  const { selectedType } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);
  // const [show1, setShow1] = useState(false);

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
  }
  const [username, setUsername] = useState('');

  const getInfo = () => {
    fetch('https://flitchcoin.com/api/users/me/items/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        setUsername(res.username);
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getInfo();
  }, [selectedType]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light  manage_margin">
        <div className="container-fluid">
          <Link className="navbar-brand m_l" to="/"><u>Flitch Coin</u></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link ms-4" aria-current="page" to="/"><i className="fa-solid fa-house icons"> Home</i></Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link ms-4"><i className="fa-solid fa-circle-info icons"> About</i></Link>
              </li>
              {selectedType === null ? (
                <>
                </>
              ) : null}
              {selectedType === "pool" || selectedType === "participant" ? (
                <>
                  <li className="nav-item ms-4"><Link to="/Api" className="nav-link"><i className="fa-solid fa-paperclip icons"> API</i></Link></li>
                  <li className="nav-item ms-4"><Link to="/Dashboard" className="nav-link"><i className="fa-solid fa-user icons"> Dashboard</i></Link></li>
                  <li className="nav-item ms-4"><Link to="/place_order" className="nav-link"><i className="fa-solid fa-money-check-dollar icons"> Order</i></Link></li>
                </>
              ) : null}
            </ul>
            <div className="d-flex">
              {selectedType === "pool" || selectedType === "participant" ? (
                <>
                  <ul id="MiniRightNav">
                    <li>
                      <div className="navtext"><i>
                        <div className="dropdown">
                          <button className="no_button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="avatar">
                              <img src="https://th.bing.com/th/id/OIP.cjOvUxt_6TVBz93oqpUa1gHaHa?pid=ImgDet&rs=1" className="avatar_img" />&nbsp;&nbsp;&nbsp;&#9660;
                            </div>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                            <li><div className="set_margins"><img src="https://th.bing.com/th/id/OIP.cjOvUxt_6TVBz93oqpUa1gHaHa?pid=ImgDet&rs=1" className="avatar_big" /></div></li>
                            <li><div className="small-text text-muted mb-4">{username}</div></li>
                            <li><Link to="/profile" className="manage_profile">Manage your Profile</Link></li>
                            <li><Link to="/settings" className="dropdown-item mt-3">Settings</Link></li>
                            <li><div className="dropdown-item">Reports</div></li>
                            <li><div className="dropdown-item">Help</div></li>
                            <li><Link to="/" className="dropdown-item" onClick={onClick}><i className="fa-solid fa-right-from-bracket icon_signout"> Sign Out</i></Link></li>
                            {/* <li><div className="dropdown-item" onClick={() => setShow(true)}>Become {checkPool ? <>Participant</> : <>Pool</>}</div></li>
                            <li><div className="dropdown-item" onClick={() => setShow1(true)}>{fa2 ? <>Deactivate</> : <>Activate</>} 2-FA</div></li> */}
                          </ul>
                        </div>
                      </i></div>
                    </li>
                  </ul>
                  {/* <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    backdrop="static"
                    keyboard={false}
                    className="modal-dialog-login"
                  >
                    <div className="back p-3">
                      <h2>Confirm !!!</h2>
                      <b>Do you want to continue to become {checkPool ? <>Participant</> : <>Pool</>}</b>
                      <p>Notice: On clicking Confirm You will be taken back to login page.</p>
                      <button
                        type="button"
                        className="primary me-4"
                        onClick={() => setShow(false)}
                      >
                        Cancel
                      </button>
                      <button type="button" className="primary" onClick={become}>
                        Confirm
                      </button>
                    </div>
                  </Modal> */}
                  {/* <Modal
                    show={show1}
                    onHide={() => setShow1(false)}
                    backdrop="static"
                    keyboard={false}
                    className="modal-dialog-login"
                  >
                    <div className="back p-3">
                      <h2>Confirm !!!</h2>
                      <b>Do you want to continue to {fa2 ? <>Deactivate</> : <>Activate</>} 2-Factor Authentication</b>
                      <p>Notice: On clicking Confirm You will be taken back to login page.</p>
                      <button
                        type="button"
                        className="primary me-4"
                        onClick={() => setShow1(false)}
                      >
                        Cancel
                      </button>
                      <button type="button" className="primary" onClick={manageFa2}>
                        Confirm
                      </button>
                    </div>
                  </Modal> */}
                </>
              ) : null}
              {selectedType === "accept" ? (
                <Link to="/login" type="button" className="btn btn-dark me-5" ><i className="fa-solid fa-right-to-bracket icons_login">&nbsp; Login</i></Link>
              ) : null}
              {selectedType === "decline" ? (
                <Link to="/sign-up" type="button" className="btn btn-dark me-5"><i class="fa-regular fa-face-smile-wink icons_login">&nbsp;&nbsp;Let's Start</i></Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
