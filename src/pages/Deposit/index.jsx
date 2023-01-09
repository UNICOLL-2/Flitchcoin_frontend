import React, { useState, useEffect, useRef } from 'react';
import { fetchToken } from "../../Auth";
import { QRCodeSVG } from 'qrcode.react';
import statement from "./Group 87.png";
import setting from "./Group 97.png";
import line from "./Line 18.png";
import SmallFooter from '../SmallFooter';

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
    <p className="mt-4 p-2 ps-4 pe-4 text-center" style={{background: "#D9D9D9"}}>Conducting operations with non-deliverable over-the-counter instruments do not entail the transfer of ownership and other rights to the underlying assets. The size of the potential loss is limited to the size of the deposit. Past profits do not guarantee future profits.</p>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-xl-3 pt-5 mt-5">
            <i className='ps-4 pe-4 pt-2 mt-1 dropdown-qr'><img src={statement} style={{ height: "32px", width: "32px" }} /> &nbsp; Choose</i>
            <img src={line} alt="line" className='link_deposit ps-4 ms-2' />
            <i className='ps-4 pe-4 pt-2 mt-1 dropdown-qr'><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Setup Auth</i>
            <img src={line} alt="line" className='link_deposit ps-4 ms-2' />
            <i className='ps-4 pe-4 pt-2 mt-1 dropdown-qr'><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Verify QR code</i>
            <img src={line} alt="line" className='link_deposit ps-4 ms-2' />
            <i className='ps-4 pe-4 pt-2 mt-1 dropdown-qr'><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Verify QR code</i>
          </div>
          <div className="col-xl-5 pe-5">
            <p className="api_head">I want to <span className="text_design">Deposit :</span></p>
            <div className="text-center">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn dropdown-toggle ps-5 pe-5 round-btn"
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
            </div>
            <p className="api_text pt-4">Select your preferred coin for depositing your cryptocurrencies to your account.</p>
            <div className="row">
              <div className="col-8">
                <button
                  className="primary mt-4 ps-5 pe-5 round-btn place_order_btn "
                >
                  Confirm & Proceed&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;›
                </button><br />
              </div>
              <div className="col-4">
                <p className="text_design mt-4 pt-2" style={{fontSize: "20px"}}>Proceed here -›</p>
              </div>
            </div>
            <p className="text-muted mt-4">
              Cryptocurrency transactions are complex, and it's important to take certain <b className='text-dark'> precautions</b> to ensure the security of your funds. Here are some things that you must consider :<br /><br />
              <b className='text-dark'> Network selection</b> : Different cryptocurrencies operate on different networks, and each network has its own fees and processing times. Carefully consider which network is the most appropriate for your transaction.<br /><br />
              <b className='text-dark'> Crypto address</b> : Make sure to double-check the recipient's address before sending a transaction. Cryptocurrency transactions are irreversible, so it's crucial to ensure that you are sending funds to the correct address.<br /><br />
              <b className='text-dark'> Gas fees </b> : Some networks, such as Ethereum, require the use of "gas" to process transactions. Gas fees can vary depending on network demand and the complexity of the transaction. Make sure to consider the gas fees when conducting a transaction.<br /><br />
              <b className='text-dark'> Few cryptocurrencies require Memo</b> : Make sure to carefully review the information in the memo field before sending the transaction. Incorrect or missing information in the memo field could result in the transaction being delayed, rejected or even loss of assets.<br /><br />
            </p>
          </div>
          <div className="col-xl-3 card back special_card_deposit pt-4 ms-5 mt-2 mb-2 me-2">
            <p className="api_head text-center text_design">Pay Here</p>
            <div className="text-center">
              <QRCodeSVG
                value="jhbfjdbhzjdsffbhj"
                className="mt-5"
                size={150}
              />
              </div>
          </div>
        </div>
      </div>
      <p className='text-center ps-5 pe-5 mb-3' style={{fontSize: "10px"}}>**Filtchcoin by any means is not responsible in case of any failure of the above provided third-party services and in any case of human error flitchcoin.com doesn’t posses any liability to the user or consumers of flitchcoin or cryptapi.</p>
      <SmallFooter/>
    </>
  )
}

export default Deposit