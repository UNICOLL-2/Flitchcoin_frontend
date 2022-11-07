import React, { useState, useEffect } from 'react';
import { fetchToken } from "../../Auth";

const Withdraw = () => {

  var [formData, setFormData] = useState({
    nick_name: "",
    wallet_add: "",
    phone_no: 0,
    pay_id: "",
    memo: "",
    is_binance_pay: false,
    email_id: "",
    binance_id: ""
  });

  var { nick_name, wallet_add, phone_no, pay_id, memo, is_binance_pay, email_id, binance_id } = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const binance = () => {
    setFormData(() => ({
      is_binance_pay: true
    }))
  };

  const other = () => {
    setFormData(() => ({
      is_binance_pay: false
    }))
  };

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

  const [net, setNet] = useState("");

  useEffect(() => {
    setNet(network1);
  }, [network1 !== "Select Network"]);

  const toGetData = () => {
    const data2 = JSON.stringify({
      "nick_name": nick_name,
      "phone_no": phone_no,
      "pay_id": pay_id,
      "is_binance_pay": is_binance_pay,
      "email_id": email_id,
      "binance_id": binance_id
    })
    return data2;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    var data1 = "";
    var data = "";
    if (is_binance_pay) {
      if (nick_name === undefined || nick_name === "") {
        alert("Please fill in the Required fields")
      } else {
        if (pref === "From which you want to continue ?") {
          alert("Please select a method to continue")
        } else {
          data1 = toGetData();
        }
      }
      console.log(data1)
      data = data1
    } else {
      if (nick_name === "" || sym === "Select coin" || wallet_add === "" || net === "Select Network" || memo === 0) {
        alert("Please fill in the Required fields from else")
      } else {
        data = JSON.stringify({
          "nick_name": nick_name,
          "sym": sym,
          "wallet_add": wallet_add,
          "network": net,
          "memo": Number(memo),
          "is_binance_pay": is_binance_pay
        })
      }
    }
    if (data === "" || data === undefined) {
    } else {
      fetch("https://flitchcoin.com/api/user_wallet", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${fetchToken()}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: data
      }).then(res => res.json())
        .then((result) => {
        }).catch((err) => {
          console.log(err);
        })
      setChange(true)
    }

  };

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
  }, [change])

  useEffect(() => {
    getWallet();
  }, [])


  var [withdrawData, setWithdrawData] = useState({
    WithdrawAddress: "",
    WithdrawCoin: "",
    WithdrawNetwork: "",
    WithdrawTag: 0
  });

  const [withdrawAmt, setWithdrawAmt] = useState();

  var { WithdrawAddress, WithdrawCoin, WithdrawNetwork, WithdrawTag } = withdrawData;

  const gettingWallet = (items) => {
    setWithdrawData(() => ({
      WithdrawAddress: items.wallet_add,
      WithdrawCoin: items.sym,
      WithdrawNetwork: items.network,
      WithdrawTag: items.memo
    }))
    console.log(withdrawData)
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

  const onDelete = (uid) => {
    var data = JSON.stringify({
      "uid": uid
    })
    fetch('https://flitchcoin.com/api/user_wallet', {
      method: 'DELETE',
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
    setChange(false)
  };

  const [pref, setPref] = useState("From which you want to continue ?");

  return (
    <div className='container'>
      <div className='row'>
        <div className="col col-md-1"></div>
        <div className="col col-sm-12 col-md-4">
          <div className="card back">
            <form onSubmit={onSubmit}>
              <div className="row p-4">
                <h3 className='mb-4 text-center'>Insert Wallet</h3>
                <div className="col col-6">
                  <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" />
                  <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="success-outlined" onClick={other}>Other User</label>
                </div>
                <div className="col col-6">
                  <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
                  <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="danger-outlined" onClick={binance}>Binance User</label>
                </div>
                {is_binance_pay === false ? (
                  <>
                    <div className="input1 w-100 mt-4">
                      <input
                        type="text"
                        className="txt-underline p-3 mb-3 w-100  input pressed"
                        placeholder="Full name"
                        onChange={onChange}
                        name="nick_name"
                        value={nick_name}
                      />
                      <span className="underline"></span>
                    </div>
                    <div className="col col-12 mb-3 mt-4 btn-group">
                      <button
                        type="button"
                        className="btn btn-dark dropdown-toggle w-100"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <b>{coin}</b>
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
                    <div className="input1 w-100 mt-4">
                      <input
                        type="text"
                        className="txt-underline p-3 mb-3 w-100  input pressed"
                        placeholder="Wallet Address"
                        onChange={onChange}
                        name="wallet_add"
                        value={wallet_add}
                      />
                      <span className="underline"></span>
                    </div>
                    <div className="col col-xs-12 col-lg-7 mt-4 mb-3 w-100 btn-group">
                      <button
                        type="button"
                        className="btn btn-dark dropdown-toggle w-100 "
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
                    </div>
                    <div className="input1 w-100 mt-4">
                      <input
                        type="text"
                        className="txt-underline p-3 mb-3 w-100  input pressed"
                        placeholder="Memo"
                        onChange={onChange}
                        name="memo"
                        value={memo}
                      />
                      <span className="underline"></span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="input1 w-100 mt-4">
                      <input
                        type="text"
                        className="txt-underline p-3 mb-3 w-100  input pressed"
                        placeholder="Full name"
                        onChange={onChange}
                        name="nick_name"
                        value={nick_name}
                      />
                      <span className="underline"></span>
                    </div>
                    <div className="col col-12 mb-3 mt-4 btn-group">
                      <button
                        type="button"
                        className="btn btn-dark dropdown-toggle w-100"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <b>{pref}</b>
                      </button>
                      <ul className="dropdown-menu drop">
                        <div>
                          <li className="list-items" onClick={() => setPref("emial_id")}>Email id</li>
                          <li className="list-items" onClick={() => setPref("binance_id")}>Binance id</li>
                          <li className="list-items" onClick={() => setPref("phone_no")}>Phone number</li>
                          <li className="list-items" onClick={() => setPref("pay_id")}>Pay id</li>
                        </div>
                      </ul>
                    </div>
                    {
                      pref === "email_id" ?
                        <>
                          <div className="input1 w-100 mt-3">
                            <input
                              type="text"
                              className="txt-underline p-3 mb-3 w-100  input pressed"
                              placeholder="Email id"
                              onChange={onChange}
                              name="email_id"
                              value={email_id}
                            />
                            <span className="underline"></span>
                          </div>
                        </>
                        :
                        <>
                          {
                            pref === "binance_id" ?
                              <>
                                <div className="input1 w-100 mt-3">
                                  <input
                                    type="text"
                                    className="txt-underline p-3 mb-3 w-100  input pressed"
                                    placeholder="Binance Id"
                                    onChange={onChange}
                                    name="binance_id"
                                    value={binance_id}
                                  />
                                  <span className="underline"></span>
                                </div>
                              </>
                              :
                              <>
                                {
                                  pref === "phone_no" ?
                                    <>
                                      <div className="input1 w-100 mt-3">
                                        <input
                                          type="number"
                                          className="txt-underline p-3 mb-3 w-100  input pressed"
                                          placeholder="Phone number"
                                          onChange={onChange}
                                          name="phone_no"
                                          value={phone_no}
                                        />
                                        <span className="underline"></span>
                                      </div>
                                    </>
                                    :
                                    <>
                                      {
                                        pref === "pay_id" ?
                                          <>
                                            <div className="input1 w-100 mt-4">
                                              <input
                                                type="text"
                                                className="txt-underline p-3 mb-3 w-100  input pressed"
                                                placeholder="Pay Id"
                                                onChange={onChange}
                                                name="pay_id"
                                                value={pay_id}
                                              />
                                              <span className="underline"></span>
                                            </div>
                                          </>
                                          :
                                          <>

                                          </>
                                      }
                                    </>
                                }
                              </>
                          }
                        </>
                    }
                  </>
                )}
                <button type='submit' className='primary w-100'>Save Wallet</button>
              </div>
            </form>
          </div>
        </div>
        <div className="col col-sm-12 col-md-4">
          <div className="row">
            <h3 className="text-center mb-4">Select Wallet</h3>
          </div>
          <div className='container save_wallet card back p-3'>
            {walletData.map((items) => {
              return (
                <>
                  <div className='back card mt-4 p-3' onClick={() => gettingWallet(items)} >
                    <>
                      {items.name === "Binance Pay Universal" ?
                        <>
                          <div>- Name : {items.name}</div>
                          {items.pay_id === "string" ? <></> : <><div>- Pay Id : {items.pay_id}</div></>}
                          {items.binance_id === "string" ? <></> : <><div>- Binance Id : {items.binance_id}</div></>}
                          {items.phone_no === 0 ? <></> : <><div>- Phone no. : {items.phone_no}</div></>}
                          {items.email_id === "string" ? <></> : <><div>- Email id : {items.email_id}</div></>}
                          <div>- Transaction id : {items.tnx_id}</div>
                          <div>- UID : {items.uid}</div>
                        </>
                        :
                        <>
                          <div>- Name : {items.name}</div>
                          {items.memo === null ? <></> : <><div>- Memo : {items.memo}</div></>}
                          {items.network === null ? <></> : <><div>- Network : {items.network}</div></>}
                          {items.memo === null ? <></> : <><div>- Coin : {items.sym}</div></>}
                          {items.wallet_add === null ? <></> : <><div>- Wallet address : {items.wallet_add}</div></>}
                          <div>- Transaction id : {items.tnx_id}</div>
                          <div>- UID : {items.uid}</div>
                        </>}

                    </>
                  </div>
                  <button type='button' className='btn btn-dark mt-3' onClick={() => onDelete(items.uid)}>Delete</button>
                </>
              )
            })}
          </div>
        </div>
        <div className="col col-sm-12 col-md-3">
          <form onSubmit={onWithdraw}>
            <div className="row p-4">
              <div className="card back pb-4">
                <div className="text-muted">Wallet Address :</div>
                <h5>{withdrawData.WithdrawAddress === "" ?
                  <div> Please Select a Wallet </div> : <div>{withdrawData.WithdrawAddress}</div>}</h5>
                <div className="text-muted">Coin :</div>
                <h5>{withdrawData.WithdrawCoin === "" ?
                  <div> Please Select a Wallet </div> : <div>{withdrawData.WithdrawCoin}</div>}</h5>
                <div className="text-muted">Network :</div>
                <h5>{withdrawData.WithdrawNetwork === "" ?
                  <div> Please Select a Wallet </div> : <div>{withdrawData.WithdrawNetwork}</div>}</h5>
                <div className="text-muted">Tag :</div>
                <h5>{withdrawData.WithdrawTag === "" ?
                  <div> Please Select a Wallet </div> : <div>{withdrawData.WithdrawTag}</div>}</h5>
                <div className="input1 w-100 mt-4">
                  <input
                    type="number"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Amount ($)"
                    onChange={onWithdrawChange}
                    name="withdrawAmt"
                    value={withdrawAmt}
                  />
                  <span className="underline"></span>
                </div>
                <button type='submit' className='primary w-100'>Withdraw</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Withdraw
