import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Order from "../../pages/Order";
import Verification from "../../pages/Verification";
import PoolParticipant from "../../pages/PoolParticipant";
import Api from "../../pages/Api";
import Dashboard from "../../pages/Dashboard";
import Invalid from "../../pages/Invalid";
import About from "../../pages/About";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import { RequireToken } from "../../Auth";
import Home_main from "../../pages/Home_main";
import Sign_verify from "../../pages/Sign_verify";
import QRVerify from "../../pages/QRVerify";
import Forgot_Pass from "../../pages/Forgot_Pass";
import Pass_verify from "../../pages/Pass_verify";
import ProtectedRoutes from "../../pages/ProtectedRoutes";

function Content() {
  return (
    <div >
      <Routes>
        <Route path="/home" element={<RequireToken><Home_main /></RequireToken>} />
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/place_order" element={<PoolParticipant />} />
        <Route path="/Api" element={<Api />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign_verify" element={<Sign_verify />} />
        <Route path="/qr_verify" element={<QRVerify />} />
        <Route path="/forgot_password" element={<Forgot_Pass />} />
        <Route path="/pass_verify" element={<Pass_verify />} />
        <Route path="*" element={<Invalid />} />
      </Routes>
    </div>
  );
}

export default Content;
