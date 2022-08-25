import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutUser } from "../../Feature/Auth/authSlice";

function Header() {
  const { selectedType } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ms-5 me-5 mt-3 mb-3">
        <div className="container-fluid">
          <Link className="navbar-brand m_l" to="/">LLC</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-5"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
              <li className="nav-item ms-5"><Link to="/about" className="nav-link">About</Link></li>
              {selectedType === null ? (
                <>
                </>
              ) : null}
            {selectedType === "pool" || selectedType === "participant" ? (
              <>
                <li className="nav-item ms-4"><Link to="/Api" className="nav-link">API</Link></li>
                <li className="nav-item ms-4"><Link to="/Dashboard" className="nav-link">Dashboard</Link></li>
                <li className="nav-item ms-4"><Link to="/place_order" className="nav-link">Order</Link></li>
                <li className="nav-item ms-5"><Link to="/" type="button" className="btn btn-dark m_l__" onClick={onClick}>Sign Out</Link></li>
              </>
            ) : null}

          {selectedType === "accept" ? (
            <li className="nav-item ms-5"><Link to="/login" type="button" className="btn btn-dark m_l_" >Login</Link></li>
          ) : null}

          {selectedType === "decline" ? (
            <li className="nav-item ms-5"><Link to="/sign-up" type="button" className="btn btn-dark m_l_">Let's Start</Link></li>
          ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
