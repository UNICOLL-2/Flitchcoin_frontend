import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Timeline } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";
import { fetchToken } from "../../Auth";
import { orderType } from "../../Feature/Order/orderSlice";
import { memoType } from "../../Feature/Order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import image from "./Rectangle 53.png";

function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [item, setItem] = useState();
  const [username, setUsername] = useState('');

  const account = () => {
    fetch("https://flitchcoin.com/api/account", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    })
      .then((result) => result.json()
        .then(res => {

          // if we have to convert object to array we have to use Object.keys or Object.entries 
          // Object.keys will return keys of object 
          // Object.entries will return array of key with value
          // Object.values will return array of values of all keys

          const data = Object.entries(res.acc);
          let tempArray = [];
          data.map((items) => {
            for (let i = 0; i < 1; i++) {
              tempArray.push(items);
            }
          })
          setItem([...tempArray])
        })
      ).catch((err) => {
        console.log(err);
      })
  };
  const [temp, setTemp] = useState();

  useEffect(() => {
    if (item === undefined) {
      setTemp(false)
    } else {
      setTemp(true)
    }
  }, [item])

  const [arr, setArr] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);

  const table = () => {
    const out = [];
    const out1 = [];
    const out2 = [];
    const out3 = [];
    for (let index = 3; index < 24; index++) {
      out.push((item[index])[0]);
      out1.push((item[index])[1].total);
      out2.push((item[index])[1].used);
      out3.push((item[index])[1].yield);
    }
    setArr([...out]);
    setArr1([...out1]);
    setArr2([...out2]);
    setArr3([...out3]);
  }

  useEffect(() => {
    item && table();
  }, [temp === true], item, table);

  const onRepayment = () => {
    dispatch(orderType("repayment"));
    dispatch(memoType("memoRepayment"));
    navigate("/order");
  };

  const onMargin = () => {
    dispatch(orderType("margin"));
    dispatch(memoType("memoMargin"));
    navigate("/order");
  };

  const [newArr, setNewArr] = useState([]);

  const images = () => {
    fetch("https://flitchcoin.com/api/logo", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
      },
    }).then(result => result.json().
      then(res => {
        const data = Object.entries(res);
        let tempArray = [];
        data.map((items) => {
          for (let i = 0; i < 1; i++) {
            tempArray.push(items);
          }
        })
        setNewArr([...tempArray]);
      })).catch(err => console.log(err))
  };

  const getInfo = () => {
    fetch('https://flitchcoin.com/api/users/me/items/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        setUsername(res.username);
      })).catch((err) => {
        console.log(err);
      })
  };

  const [fa2, setfa2] = useState(false);

  const checkUser = (e) => {
    const data = JSON.stringify({
      "emailid": username
    })
    fetch('https://flitchcoin.com/api/userchrono_info', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: data
    }).then(res => res.json())
      .then((data) => {
        if (data.fa2 === null) {
          setfa2(true);
        }
      }).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    images();
    account();
    getInfo();
  }, []);

  useEffect(() => {
    checkUser();
  }, [username])

  return (
    <>
      {/* 
     
      <div className="container mt-4">
        <div className="row ms-1 mb-3">
          <div className="col-12 me-2 col-lg-7 card back mt-3 p-3">
            <div className="row">
              <div className="col-12 col-md-8">
                <h3>Balance Details</h3>
              </div>
              <div className="col-6 col-lg-2 mb-3">
                <button type='button' style={{ position: "relative" }} className='btn deposit btn-warning' onClick={() => navigate("/deposit")} >Deposit</button>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <button type='button' className='primary' style={{ position: "relative" }} onClick={() => (navigate('/withdraw'))} >Withdraw</button>
              </div>
              <hr />
            </div>
            <div className="row">
              <p className='text-muted'>Account Balance : </p>
              <h1>0.04487898<span className="balance ps-2">BTC</span></h1>
              <p className='text-muted'>Estimated Value : </p>
              <h3>$ 1,606.25</h3>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 me-2 card back manage_margin_2" >
            <Timeline colorTheme="light" feedMode="market" displayMode="compact" market="crypto" height={300} width="100%" symbol="BTCUSD" isTransparent></Timeline>
          </div>
        </div>
      </div>
      <div className="container card back mt-5 mb-3">
        <div className="row">
          <div className="col-2 text-muted account text-center p-3">Name</div>
          <div className="col-2 text-muted account text-center p-3">Liquidate</div>
          <div className="col-2 text-muted account text-center p-3">Total</div>
          <div className="col-2 text-muted account text-center p-3">Used</div>
          <div className="col-2 text-muted account text-center p-3">Yield</div>
          <div className="col-2 text-muted account text-center p-3">Duration</div>
        </div>
        <div className="row dashboard_table">
          <div className="col col-md-2 p-3">
          {
              newArr.map(name => {
                return (
                  <>
                  <div className="p-3 row align-items-center">
                    <div className="col-3"><img src={name[1]} className="dashboard_logo"/></div>
                    <div className="col-6">{name[0]}</div>
                  </div>
                  <hr/>
                  </>
                )
              })
            }
          </div>
          <div className='col col-md-2 p-3'>
            <div className='row ps-3 pb-1 memo_margin'>memoMargin</div>
            <button type='button' className='btn btn-dark margin-btn btn-sm' onClick={onMargin}>Add Margin</button>
            <hr />
          </div>
          <div className="col col-md-2 p-3">
            {arr1.map(names => {
              return (
                <>
                  <div className="row p-3">{names}</div>
                  <hr />
                </>
              )
            })}
            
          </div>
          <div className="col col-md-2 p-3">
            {arr2.map(names => {
              return (
                <>
                  <div className="row p-3">{names}</div>
                  <hr />
                </>
              )
            })}
          </div>
          <div className="col col-md-2 p-3">
            {arr3.map(names => {
              return (
                <>
                  <div className="row p-3">{names}</div>
                  <hr />
                </>
              )
            })}
          </div>
          <div className='col col-md-2 p-3'>
            <div className='row ps-3 pb-1 margin'>memoRepayment</div>
            <button type='button' className='btn btn-dark margin-btn btn-sm' onClick={onRepayment}>Repayment</button>
            <hr />
          </div>
        </div>
      </div> */}

      <div className="container card back parent_card">
        <div className="row mt-3 ticker">
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
        </div>
        <div className="row ps-5 pb-4">
          <div className="col-xl-7 me-5">
            <div className="row pb-4">
              <div className="col-xl-6 welcome">Welcome <b>Tushar ,</b></div>
              <div className="col-xl-3">
                <button
                  className="ps-5 pe-5 round-btn"
                >
                  Deposit
                </button>
              </div>
              <div className="col-xl-3">
                <button
                  className="ps-5 pe-5 round-btn"
                >
                  Withdraw
                </button>
              </div>
            </div>
            <div className="row card back special_card">
              <p className="welcome_1">Account Summary : $ 4500000</p>
              {
                fa2 ?
                  <>
                    <div className="url position-relative">
                      <b>Complete 2 - Factor Authentication to enhace your security</b><Link to="/qr_verify" className='link_to_fa2'>Activate Now</Link>
                    </div>
                  </> :
                  <></>
              }
              <div className="row">
                <div className="col-lg-3 card back parent_card m-4 ms-5 p-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, sunt.</div>
                <div className="col-lg-3 card back parent_card m-4 p-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, voluptas?</div>
                <div className="col-lg-3 card back parent_card m-4 p-4">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, ipsam.</div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 card back special_card">
            <div className="row">
              <div className="col-lg-4"></div>
              <div className="col-lg-6">
                <img src={image} className="dashboard_img" />
                <p style={{ fontSize: "20px", fontWeight: 200 }}>Tushar Gupta</p>
              </div>
              <div className="col-lg-3"></div>
            </div>
            <div className="row">
              <div className="col-xl-4">
                <button
                  className="swap round-btn"
                >
                  Swap
                </button>
              </div>
              <div className="col-xl-4">
                <button
                  className="deposit_btn round-btn"
                >
                  Deposit
                </button>
              </div>
              <div className="col-xl-4">
                <button
                  className="buy round-btn"
                >
                  Buy
                </button>
              </div>
            </div>
            <div className="row mt-5">
              <label className="label">
                <input
                  className="input_login p-2"
                />
              </label>
              <label className="label">
                <input
                  className="input_login p-2"
                />
              </label>
            </div>
            <div className="row mt-4">
              <div className="col-xl-6">
                <button
                  className="round-btn ps-5 pe-5 ms-3"
                >
                  Deposit
                </button>
              </div>
              <div className="col-xl-6">
                <button
                  className="round-btn ps-5 pe-5 ms-3"
                >
                  Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5 pb-5">
        <div className="row">
          <div className="col-xl-7 enable_scroll me-5">
            <div className="card p-4 parent_card mt-3 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
            <div className="card p-4 parent_card mt-4 back"></div>
          </div>
          <div className="col-xl-4">
            <Timeline colorTheme="light" feedMode="market" market="crypto" height={600} width="120%"></Timeline>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
