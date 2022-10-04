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
      <nav class="navbar navbar-expand-lg navbar-light bg-light ms-5 me-5 mt-3 mb-3">
        <div class="container-fluid">
          <Link className="navbar-brand m_l" to="/">LLC</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className="nav-link active ms-4" aria-current="page" to="/">Home</Link>
              </li>
              <li class="nav-item">
                <Link to="/about" className="nav-link ms-4">About</Link>
              </li>
              {selectedType === null ? (
                <>
                </>
              ) : null}
              {selectedType === "pool" || selectedType === "participant" ? (
                <>
                  <li className="nav-item ms-4"><Link to="/Api" className="nav-link">API</Link></li>
                  <li className="nav-item ms-4"><Link to="/Dashboard" className="nav-link">Dashboard</Link></li>
                  <li className="nav-item ms-4"><Link to="/place_order" className="nav-link">Order</Link></li>
                </>
              ) : null}
            </ul>
            <div class="d-flex">
              {selectedType === "pool" || selectedType === "participant" ? (
                <Link to="/" type="button" className="btn btn-dark me-5" onClick={onClick}>Sign Out</Link>
              ) : null}
              {selectedType === "accept" ? (
                <Link to="/login" type="button" className="btn btn-dark me-5" >Login</Link>
              ) : null}
              {selectedType === "decline" ? (
                <Link to="/sign-up" type="button" className="btn btn-dark me-5">Let's Start</Link>
              ) : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
