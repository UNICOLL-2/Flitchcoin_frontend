import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Order from "../../pages/Order";
import PoolParticipant from "../../pages/PoolParticipant";
import Api from "../../pages/Api";
import Dashboard from "../../pages/Dashboard";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import QRVerify from "../../pages/QRVerify";
import ForgotPass from "../../pages/Forgot_Pass";
import ProtectedRoutes from "../../pages/ProtectedRoutes";
import Withdraw from "../../pages/Withdraw";
import Profile from "../../pages/Profile";
import Statements from "../../pages/Statements";
import Settings from "../../pages/Settings";
import Protection from "../../pages/Protection";
import Deposit from "../../pages/Deposit";
import AddWallet from "../../pages/Add_Wallet";

function Content() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ProtectedRoutes><Login /></ProtectedRoutes>} />
          <Route path="/Dashboard" element={<Protection Cmp={Dashboard}/>} />
          <Route path="/place_order" element={<Protection Cmp={PoolParticipant}/>} />
          <Route path="/Api" element={<Protection Cmp={Api}/>} />
          <Route path="/order" element={<Protection Cmp={Order}/>} />
          <Route path="/profile" element={<Protection Cmp={Profile}/>} />
          <Route path="/statements" element={<Protection Cmp={Statements}/>} />
          <Route path="/settings" element={<Protection Cmp={Settings}/>} />
          <Route path="/withdraw" element={<Protection Cmp={Withdraw}/>} />
          <Route path="/deposit" element={<Protection Cmp={Deposit}/>} />
          <Route path="/qr_verify" element={<Protection Cmp={QRVerify} />} />
          <Route path="/add_wallet" element={<Protection Cmp={AddWallet} />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPass />} />
      </Routes>
    </div>
  );
}

export default Content;
