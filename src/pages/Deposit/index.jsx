import React, { useState, useEffect,useRef } from 'react';
import { fetchToken } from "../../Auth";
import coingate_img from "./image 2.png";
import crypt_img from "./image 1.png";
import { QRCodeSVG } from 'qrcode.react';

const Deposit = () => {

  const [asset, setAsset] = useState([]);
  const [coin, setCoin] = useState("Select coin");

  function asset_list() {
    fetch("https://flitchcoin.com/api/asset_list", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => {
      result.json().then((res) => {
        let tmpArray = [];
        res.map((items) => {
          for (let i = 0; i < 1; i++) {
            tmpArray.push(items);
          }
        });
        setAsset([...tmpArray]);
      });
    });
  };

  useEffect(() => {
    asset_list();
  }, []);

  useEffect(() => {
    asset_list();
  }, [coin]);

  const [network, setNetwork] = useState("Select Network");
  const [network1, setNetwork1] = useState("Select Network");

  function network_list() {
    var data = JSON.stringify({
      "string": coin
    })
    fetch("https://flitchcoin.com/api/network", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json()
        .then((result) => {
          let tmpArray = [];
          result.map((items) => {
            for (let i = 0; i < 1; i++) {
              tmpArray.push(items);
            }
          });
          setNetwork([...tmpArray]);
        }))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    network_list();
  }, [coin !== "Select coin"]);

  return (
    <>
      <div className="container">
        <div className="row mb-5">
          <div className="col-xl-8 me-5">
            <p className="welcome_1 p-0 mt-4">I want to Deposit :</p>
            <p className="plain_text">Select your preferred coin for depositing your cryptocurrencies to your account.</p>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-dark dropdown-toggle ps-5 pe-5 round-btn"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <b>{coin}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
              </button>
              <ul className="dropdown-menu drop">
                {asset.map(items => {
                  return (
                    <div>
                      <li className="list-items" onClick={() => setCoin(items)}>{items}</li>
                    </div>
                  )
                })}
              </ul>
            </div>
            <p className="welcome_1 p-0 mt-4">Select Processor :</p>
            <p className="plain_text">Select your preferred gateway for depositing {coin} to your account.</p>
            <button
              className="ps-5 pe-5 round-btn"
            >
              <img src={coingate_img} className="gateway_img" />&nbsp;&nbsp;&nbsp;&nbsp; COINGATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="gateway" value="coingate" className='deposit_radio' />
            </button><br /><br />
            <button
              className="ps-5 pe-5 round-btn"
            >
              <img src={crypt_img} className="gateway_img" />&nbsp;&nbsp;&nbsp;&nbsp; CRPYT API &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="gateway" value="crypt" className='deposit_radio' />
            </button>
          </div>
          <div className="col-xl-3 card back special_card_deposit mt-4">
            <p className="welcome_1 text-center">Pay Here
              <QRCodeSVG
                value="jhbfjdbhzjdsffbhj"
                className="mt-5"
                size={150}
              />
            </p>
                <p className="plain_text">Txn_id :&nbsp;&nbsp;&nbsp;&nbsp; <span style={{fontSize: "15px"}}> jkkfmhfdhrjfrnhembf</span></p>
                <p className="plain_text">Alt_id :&nbsp;&nbsp;&nbsp;&nbsp; <span style={{fontSize: "15px"}}> jkkfmhfdhrjfrnhembf</span></p>
          </div>
        </div>
      </div>
    </>

  )
}

export default Deposit