import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Timeline } from "react-ts-tradingview-widgets";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";

function Dashboard() {

  const navigate = useNavigate();
  return (
    <>
    <TickerTape colorTheme="light" symbols={[
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "BTC/USD"
            },
            {
              "proName": "BITSTAMP:ETHUSDT",
              "title": "ETH/USDT"
            },
            {
              "proName": "BINANCE:SOLUSDT",
              "title": "SOL/USDT"
            },
            {
              "proName": "BINANCE:MATICUSDT",
              "title": "MATIC/USDT"
            },
            {
              "proName": "BINANCE:AVAXUSDT",
              "title": "AVAX/USDT"
            },
            {
              "proName": "BINANCE:XRPUSDT",
              "title": "XRP/USDT"
            },
        ]} ></TickerTape>
      <div className="container">
        <div className="row mt-4">
          <div className="card back p-4">
          <p>Username / Profile <span className="ps-5"> User Id</span></p>
        </div>
        </div>
      </div>
      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col col-md-12 col-lg-7 card back mt-3 p-3">
            <div className="row">
              <div className="col col-8">
                <h3>Balance Details</h3>
              </div>
              <div className="col col-2">
                <button type='button' style={{ position: "absolute" }} className='btn btn-warning' onClick={() => navigate("/pool_participant")} >Deposit</button>
              </div>
              <div className="col col-2">
                <button type='button' className='primary' style={{ position: "absolute" }} onClick={() => (navigate('/withdraw'))} >Withdraw</button>
              </div>
            </div>
            <hr />
            <div className="row">
              <p className='text-muted'>Account Balance : </p>
              <h1>0.04487898<span className="balance ps-2">BTC</span></h1>
              <p className='text-muted'>Estimated Value : </p>
              <h3>$ 1,606.25</h3>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col col-md-6 col-lg-4 mt-3 card back" >
              <Timeline colorTheme="light" feedMode="market" displayMode="compact" market="crypto" height={300} width="100%" symbol="BTCUSD" isTransparent></Timeline>
            </div>
          </div>
          <div className="row mt-5 card back">
          <CryptoCurrencyMarket colorTheme="light" width="100%" height={400} isTransparent ></CryptoCurrencyMarket>
          </div>
        </div>
    </>
  );
}

export default Dashboard;
