import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
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

  function rel_login(e) {
    fetch("http://127.0.0.1:8000/rel_login").then((result) => {
      result.json().then((res) => {
        console.log("result", res);
      })
    });
    setFormData((prevData) => ({
      ...prevData,
      type: null
    }));
    console.log(selectedType);
  };

  const onClick = (e) => {
    rel_login();
    dispatch(logOutUser());
  }

  return (
    <div>
      <Navbar bg="light" expand="lg" className="shadow" >
        <Link className="logo" to="/">LLC</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="d-flex flex-column flex-lg-row justify-content-between"
        >
          <Nav className="me-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            {
              selectedType === null ? (
                <>
                </>
              ) : null
            }
            {selectedType === "pool" || selectedType === "participant" ? (
              <>
                <Link to="/api" className="nav-link">
                  API
                </Link>
                <Link to="/Dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/place_order" className="nav-link">
                  Place order
                </Link>
                <Link to="/" type="button" className="btn btn-dark m_l_" onClick={onClick}>
                  Sign Out
                </Link>
              </>
            ) : null}
          </Nav>

          {/* accept */}
          {selectedType === "accept" ? (
            <Link to="/login" type="button" className="btn btn-dark m_r" >
              Login
            </Link>
          ) : null}

          {/* decline */}
          {selectedType === "decline" ? (
            <Link to="/sign-up" type="button" className="btn btn-dark m_r">
              Let's Start
            </Link>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
