import React, { useState, useEffect } from 'react';
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

  const onramper = () => {
    fetch("https://onramper.tech/gateways", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Basic pk_test_DQtHHoa8pHVaHhhDMfIz_PikmIq_yoQmKQ40LovstdU0"
      },
    }).then((res) => res.json()
      .then((result => {
        console.log(result);
      }))).catch(err => console.log(err))
  }

  useEffect(() => {
    onramper();
  }, [])

  return (
    // <div className='container'>
    //   <div className="row">
    //     <div className="col-lg-2"></div>
    //     <div className="col-12 col-lg-8 card back ps-4 mb-3 mt-3">
    //       <div className="row">
    //         <div className="col-lg-6 col-12">
    //           <p className="text-muted pt-5">Coin</p>
    // <div className="col col-12 mb-3 mt-1 btn-group">
    //   <button
    //     type="button"
    //     className="btn btn-dark dropdown-toggle w-100"
    //     data-bs-toggle="dropdown"
    //     aria-expanded="false"
    //   >
    //     <b>{coin}</b>
    //   </button>
    //   <ul className="dropdown-menu drop">
    //     {asset.map(items => {
    //       return (
    //         <div>
    //           <li className="list-items" onClick={() => setCoin(items)}>{items}</li>
    //         </div>
    //       )
    //     })}
    //   </ul>
    // </div>
    //           <p><span className="text-muted">Total Balance: </span> <b> 0.000123 BTC</b></p>
    //           <p><span className="text-muted">Available Balance: </span> <b> 0.00252 BTC</b></p>
    //           <br />
    //           <p className="text-muted">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsam dolores eius magnam illo eveniet maxime nulla nesciunt ullam perspiciatis.</p>
    //           <p className="text-muted">2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsam dolores eius magnam illo eveniet maxime nulla nesciunt ullam perspiciatis.</p>
    //         </div>
    //         <div className="col-lg-6 col-12 p-4">
    //           <div className="card border_to_card back p-4">
    //             <p className="text-muted">Recipient's BTC address</p>
    //             <div className="input1 w-100">
    //               <input
    //                 type="text"
    //                 className="txt-underline p-3 mb-3 w-100  input pressed"
    //                 placeholder="Address"
    //               // onChange={onChange}
    //               // name="nick_name"
    //               // value={nick_name}
    //               />
    //               <span className="underline"></span>
    //             </div>
    //             <p className="text-muted">Transfer Network</p>
    //             <div className="col col-xs-12 col-lg-7 mb-3 w-100 btn-group">
    //               <button
    //                 type="button"
    //                 className="btn btn-dark dropdown-toggle w-100 "
    //                 data-bs-toggle="dropdown"
    //                 aria-expanded="false"
    //               >
    //                 <b>{network1}</b>
    //               </button>
    //               <ul className="dropdown-menu drop1 back" >
    //                 {network === 'Select Network' ?
    //                   <div>
    //                     <li className="list-items">Please select a Coin</li>
    //                   </div>
    //                   :
    //                   <div>
    //                     {network.map(items => {
    //                       return (
    //                         <li className="list-items" onClick={() => setNetwork1(items)}>{items}</li>
    //                       )
    //                     })}
    //                   </div>
    //                 }
    //               </ul>
    //             </div>
    //             <p>Amount</p>
    //             <div className="input1 w-100">
    //               <input
    //                 type="text"
    //                 className="txt-underline p-3 mb-3 w-100  input pressed"
    //                 placeholder="Minimum Withdrawal of 0.001BTC"
    //               // onChange={onChange}
    //               // name="nick_name"
    //               // value={nick_name}
    //               />
    //               <span className="underline"></span>
    //             </div>
    //             <p><span className="text-muted">Available Balance: </span> <b> 0.00252 BTC</b></p>
    //             <p><span className="text-muted ms-5">Transaction Fee: </span> <b> 0.0005 BTC</b></p>
    //             <button type='submit' className='red button w-100'>Submit</button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div>
    //     <div className="onramper">
    //       <iframe
    //         src="https://widget.onramper.com?color=266677&apiKey=pk_test_x5M_5fdXzn1fxK04seu0JgFjGsu7CH8lOvS9xZWzuSM0"
    //         height="660px"
    //         width="482px"
    //         title="Onramper widget"
    //         frameborder="0"
    //         allow="accelerometer; autoplay; camera; gyroscope; payment"
    //       >
    //       </iframe>
    //     </div>
    //   </div>
    // </div>

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
              <img src={coingate_img} className="gateway_img" />&nbsp;&nbsp;&nbsp;&nbsp; COINGATE &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="gateway" value="coingate" />
            </button><br /><br />
            <button
              className="ps-5 pe-5 round-btn"
            >
              <img src={crypt_img} className="gateway_img" />&nbsp;&nbsp;&nbsp;&nbsp; CRPYT API &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="gateway" value="crypt" />
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