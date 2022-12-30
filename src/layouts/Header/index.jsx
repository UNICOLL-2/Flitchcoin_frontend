import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Feature/Auth/authSlice";
import { fetchToken } from "../../Auth";

function Header() {
  const { selectedType } = useSelector((state) => state.auth);
  const { selectedAvtar } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const [avt, setAvt] = useState();

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
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getInfo();
  }, [selectedType]);

  useEffect(() => {
    change();
  }, [getInfo]);

  const [isActive, setIsActive] = useState(false);

  function open() {
    if (isActive) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }

  return (
    <div className="ending_margin">
      <nav className="navbar mt-4" id="navb">
        <div className="container">
          <div className="containerinner ">
            {
              selectedType === "accept" ?
                <>
                  <Link to="/" className="text-dark ms-4 p-1" >Flitch Coin</Link>
                  <Link to="/login" type="button" className=" me-4" ><i className="fa-solid fa-right-to-bracket icons_login">&nbsp; Login</i></Link>
                </> :
                <>
                  {
                    selectedType === "decline" ?
                      <>
                        <Link to="/" className="text-dark ms-4 p-1" >Flitch Coin</Link>
                        <Link to="/sign-up" className="me-4"><i className="fa-regular fa-face-smile-wink icons_login">&nbsp;&nbsp;Let's Start</i></Link>
                      </> :
                      <>
                      </>
                  }
                </>
            }
          </div>
          <div className="contain" id="mainlist">
          {
            selectedType === "pool" || selectedType === "participant" ?
              <>
                <div className="brand ms-4" onClick={() => navigate(-1)}>&#x2190;</div>
                <img src={avt} alt="avatar" className="logo" id="menubtn" onClick={open}/>
                <div className="headinglist">
                <Link to="/Api" className="margin_start ">Api</Link>
                <Link to="/Dashboard" className="margin_bw ">Dashboard</Link>
                <Link to="/" className="margin_bw " >Flitch Coin</Link>
                <Link to="/place_order" className="margin_bw ">Order</Link>
                <Link to="/order" className="margin_bw ">History</Link></div>
              </> :
              <>
              </>
          }
          </div>
        </div>

        <div className={isActive ? "menu display_block" : "menu display_none"} id="menu-box">
          <div className="subcontainer">
            <div className="hamburger">
            <div className="containerinner ">
            {
              selectedType === "accept" ?
                <>
                  <Link to="/" className="text_dark ms-4 p-1" >Flitch Coin</Link>
                  <Link to="/login" type="button" className=" me-4" ><i className="fa-solid fa-right-to-bracket icons_login">&nbsp; Login</i></Link>
                </> :
                <>
                  {
                    selectedType === "decline" ?
                      <>
                        <Link to="/" className="text-dark ms-4 p-1" >Flitch Coin</Link>
                        <Link to="/sign-up" className="me-4"><i className="fa-regular fa-face-smile-wink icons_login">&nbsp;&nbsp;Let's Start</i></Link>
                      </> :
                      <>
                      </>
                  }
                </>
            }
            </div>
            <div className="contain" id="mainmenu">
          {
            selectedType === "pool" || selectedType === "participant" ?
              <>
                <div className="brand ms-4" onClick={() => navigate(-1)}>&#x2190;</div>
                <img src={avt} alt="avatar" className="logo" id="menubtn" onClick={open}/>
                <ul className="firstlist">
                <Link to="/Api" className="margin_start " onClick={open}><br></br>&nbsp;&nbsp;&nbsp;Api</Link><br></br>
                <Link to="/Dashboard" className="margin_bw " onClick={open}>Dashboard</Link><br></br>
                <Link to="/" className="margin_bw " onClick={open} >Flitch Coin</Link><br></br>
                <Link to="/place_order" className="margin_bw " onClick={open}>Order</Link><br></br>
                <Link to="/order" className="margin_bw" onClick={open}>History</Link></ul>
              </> :
              <>
              </>
          }
          </div>
            </div> 
            <br></br>
            <img className="btc" src={avt}></img><br></br>
            <br></br>
            <p className="para">{username}</p>
            <br></br>
            <button className="manage ps-5 pe-5" onClick={() => {
              navigate("/profile");
              open(); }}>Manage your Profile</button>
            <br></br><br></br>

            <ul className="submenu">
              <li><Link to="/settings" className="text-dark"onClick={open}>Settings</Link></li>
              <li><Link to="/" className="text-dark"onClick={open}>Reports</Link></li>
              <li><Link to="/" className="text-dark"onClick={open}>Help</Link></li>
              <li><Link to="/" className="text-dark" onClick={onClick}><i className="fa-solid fa-right-from-bracket icon_signout"> Sign Out</i></Link></li>
            </ul>
          </div> 
        </div>


      </nav>

    </div>
  );
}

export default Header;