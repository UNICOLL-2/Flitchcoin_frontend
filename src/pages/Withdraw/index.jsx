import React, { useState, useEffect } from 'react';
import { fetchToken } from "../../Auth";

const Withdraw = () => {


  // var [withdrawData, setWithdrawData] = useState({
  //   address: "",
  //   amt: 0,
  //   coin: "",
  //   network1: "",
  //   tag: 0
  // });

  // var { address, amt, coin, network1, tag } = withdrawData;

  // const onWalletChange = (e) => {
  //   setWithdrawData((prevData) => ({
  //     ...prevData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const onWithdraw = (e) => {
    e.preventDefault();
    // var data = JSON.stringify({
    //   "address": address,
    //   "amt": amt,
    //   "coin": coin,
    //   "network": network1,
    //   "tag": tag
    // });
    // fetch("http://34.73.24.72/withdraw", {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${fetchToken()}`,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: data
    // }).then(res => res.json())
    //   .then((result) => {
    //     console.log(result);
    //   }).catch((err) => {
    //     console.log(err);
    //   });
  }

  var [formData, setFormData] = useState({
    nick_name: "",
    wallet_add: "",
    phone_no: 0,
    pay_id: "",
    memo: 0,
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
    fetch("http://34.73.24.72/asset_list", {
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
    fetch("http://34.73.24.72/network", {
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
  },[coin])

  useEffect(() => {
    network_list();
  }, [coin!="Select coin"]);

  const [sym, setSym] = useState("");

  useEffect(() => {
    setSym(coin);
  },[coin!=="Select coin"]);

  const [net, setNet] = useState("");

  useEffect(() => {
    setNet(network1);
  },[network1!=="Select Network"]);

  const onSubmit = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      "nick_name": nick_name,
      "sym": sym ,
      "wallet_add": wallet_add,
      "phone_no": phone_no,
      "pay_id": pay_id,
      "network": net,
      "memo": memo,
      "is_binance_pay": is_binance_pay,
      "email_id": email_id,
      "binance_id": binance_id
    })
    fetch("http://34.73.24.72/insert_wallet", {
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
      })
  };

  const [walletData, setWalletData] = useState([]);

  const getWallet = () => {
    fetch('http://34.73.24.72/get_wallets',{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${fetchToken()}`,
      }
    }).then(res => res.json()
    .then((result) => {
      let tempArray =[] ;
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

  const gettingWallet = (items) => {
    console.log("clicked");
    console.log("wallet",items);
  }

  useEffect(() => {
    getWallet();
  },[onSubmit])

  useEffect(() => {
    getWallet();
  },[])

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
                        type="number"
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
                    <h5 className="text-center">---OR---</h5>
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
                    <h5 className="text-center">---OR---</h5>
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
                    <h5 className="text-center">---OR---</h5>
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
              <div className='back card mt-4 p-3' onClick={()=> gettingWallet(items)} >
                {is_binance_pay === true ? <>
                </> : 
                <>
              <div>- Name : {items.name}</div>
              <div>- Memo : {items.memo}</div>
              <div>- Network : {items.network}</div>
              <div>- Coin : {items.sym}</div>
              <div>- Wallet address : {items.wallet_add}</div> 
              <div>- Transaction id : {items.tnx_id}</div> 
              </>
                }
              </div>
            )
          })}
         </div>
        </div>
        <div className="col col-sm-12 col-md-3">

 {/* <form onSubmit={onWithdraw}>
            <div className="row p-4">
              <div className="card back pb-4">
                <div className="input1 w-100 mt-4">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Address"
                    onChange={onWalletChange}
                    name="address"
                    value={address}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100 mt-4">
                  <input
                    type="number"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Amount ($)"
                    onChange={onWalletChange}
                    name="amt"
                    value={amt}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100 mt-4">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Coin"
                    onChange={onWalletChange}
                    name="coin"
                    value={coin}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100 mt-4">
                  <input
                    type="number"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Network"
                    onChange={onWalletChange}
                    name="network1"
                    value={network1}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100 mt-4">
                  <input
                    type="number"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Tag"
                    onChange={onWalletChange}
                    name="tag"
                    value={tag}
                  />
                  <span className="underline"></span>
                </div>
                <button type='submit' className='primary w-100'>Withdraw</button>
              </div>
            </div>
          </form> */}
        </div>
      </div>
    </div>
  )
}

export default Withdraw
