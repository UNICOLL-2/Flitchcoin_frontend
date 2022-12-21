import React, { useState, useEffect } from 'react';
import { fetchToken } from "../../Auth";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {

  const navigate = useNavigate();

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
  }

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
  }

  useEffect(() => {
    asset_list();
  }, [coin])

  const [sym, setSym] = useState("");

  useEffect(() => {
    setSym(coin);
    network_list();
  }, [coin !== "Select coin"]);

  const [walletData, setWalletData] = useState([]);
  const [change, setChange] = useState(false)

  const getWallet = () => {
    fetch('https://flitchcoin.com/api/user_wallet', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${fetchToken()}`,
      }
    }).then(res => res.json()
      .then((result) => {
        let tempArray = [];
        result.map((items) => {
          for (let i = 0; i < 1; i++) {
            tempArray.push(items);
          }
        });
        setWalletData([...tempArray]);
      })).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getWallet();
  }, [])

  var [withdrawData, setWithdrawData] = useState({
    WithdrawAddress: "",
    WithdrawCoin: "",
    WithdrawNetwork: "",
    WithdrawTag: ""
  });

  const [withdrawAmt, setWithdrawAmt] = useState();

  var { WithdrawAddress, WithdrawCoin, WithdrawNetwork, WithdrawTag } = withdrawData;

  const gettingWallet = (items) => {
    setWithdrawData(() => ({
      WithdrawAddress: items.wallet_add,
      WithdrawCoin: items.sym,
      WithdrawNetwork: items.network,
      WithdrawTag: Number(items.memo)
    }))
  };

  const onWithdrawChange = (e) => {
    setWithdrawAmt(e.target.value)
  }

  const onWithdraw = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      "address": WithdrawAddress,
      "amt": withdrawAmt,
      "coin": WithdrawCoin,
      "network": WithdrawNetwork,
      "tag": WithdrawTag
    });
    fetch("https://flitchcoin.com/api/withdraw", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${fetchToken()}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    }).then(res => res.json())
      .then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
  };

  return (
        <div className="container">
          <div className="row mb-5">
            <div className="col-xl-8 me-5">
              <p className="welcome_1 p-0 mt-4">I want to Withdraw :</p>
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
              <p className="welcome_1 p-0 mt-4">Select Saved Wallet :   <span className='profile_section ps-4 pe-4 pt-2 pb-2' style={{ marginLeft: "20vw", cursor: "pointer" }} onClick={() => (navigate('/add_wallet'))} >+</span></p>
              <p className="plain_text">Select your preferred wallet for withdrawing {coin} to your account or add another wallet.</p>
              {walletData.length === 0 ?
                        <>
                            <p className="profile_section">Please add a Wallet</p>
                        </> :
                        <div className='enable_scroll_3 mt-4'>
                            {walletData.map((items) => {
                                return (
                                    <>
                                        <div className='profile_section mt-4' onClick={() => gettingWallet(items)} >
                                            <>
                                            <div className='row'>
                                                <div className="col-sm-11">
                                                <div>- Name : {items.name}</div>
                                                {items.memo === null ? <></> : <><div>- Memo : {items.memo}</div></>}
                                                {items.network === null ? <></> : <><div>- Network : {items.network}</div></>}
                                                {items.memo === null ? <></> : <><div>- Coin : {items.sym}</div></>}
                                                {items.wallet_add === null ? <></> : <><div>- Wallet address : {items.wallet_add}</div></>}
                                                <div>- Transaction id : {items.tnx_id}</div>
                                                <div>- UID : {items.uid}</div>
                                                </div>
                                                <div className="col-sm-1">
                                                <input type="radio" name='wallet' />
                                                </div>
                                                </div>
                                            </>
                                        </div>
                                    </>
                                )
                            })}
                        </div>}
            </div>
            <div className="col-xl-3 card back special_card_deposit mt-4">
              <p className="welcome_1 text-center">Withdraw Here </p>
              <form onSubmit={onWithdraw}></form>
              <p className="plain_text">Choose Transfer Network :</p>
              <button
                type="button"
                className="btn btn-dark dropdown-toggle w-100 round-btn "
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <b>{network1}</b>
              </button>
              <ul className="dropdown-menu drop1 back" >
                {network === 'Select Network' ?
                  <div>
                    <li className="list-items">Please select a Coin</li>
                  </div>
                  :
                  <div>
                    {network.map(items => {
                      return (
                        <li className="list-items" onClick={() => setNetwork1(items)}>{items}</li>
                      )
                    })}
                  </div>
                }
              </ul>
              <p className="plain_text mt-5">Wallet address :</p>
              {withdrawData.WithdrawAddress === "" ?
              <div> 
                <input className='input_login p-2 w-100'/>
                 </div> : <div>
                  <input className="input_login p-2 w-100" value={withdrawData.WithdrawAddress} disabled />
                  </div>}
                  <p className="plain_text mt-4">Memo (optional) :</p>
              {withdrawData.WithdrawTag === "" ?
              <div> 
                <input className='input_login p-2 w-100'/>
                 </div> : <div>
                  <input className="input_login p-2 w-100" value={withdrawData.WithdrawTag} disabled />
                  </div>}
                  <button
                  className="ps-5 pe-5 round-btn mt-5 mb-4"
                  type='submit'
                >
                  Withdraw
                </button>
            </div>
          </div>
        </div>
  )
}

export default Withdraw
