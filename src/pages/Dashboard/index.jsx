import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Timeline } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";
import { fetchToken } from "../../Auth";
import { orderType } from "../../Feature/Order/orderSlice";
import { memoType } from "../../Feature/Order/orderSlice";
import { Link, useNavigate } from "react-router-dom";
import image from "./Rectangle 53.png";
import { logOutUser } from "../../Feature/Auth/authSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectCoverflow, Pagination, Autoplay, Navigation } from "swiper";
import Toast from 'react-bootstrap/Toast';

function Dashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [tableInfo, setTableInfo] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);

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
          var tempArr = [];
          var count = 0;
          const data = (Object.values(res));
          for (let i = 0; i < data.length; i++) {
            tempArr.push(data[i]);
            count += data[i].total;
          }
          setTableInfo([...tempArr]);
          setTotalBalance(count);
        })
      ).catch((err) => {
        console.log(err);
      })
  };

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

  const [checkPool, setCheckPool] = useState(false);
  const [fullName, setFullName] = useState("");

  const getInfo = () => {
    fetch('https://flitchcoin.com/api/users/me/items/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        setFullName(res.name);
        if (res.is_pool) {
          setCheckPool(true);
        }
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

  const [avt, setAvt] = useState();

  const getAvt = () => {
    fetch('https://www.flitchcoin.com/api/dashboard', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        setAvt(res.avtar_im);
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    account();
    getInfo();
    setTimeout(() => {
      setOnLoad(true);
    }, 2000);
    getAvt();
  }, []);

  useEffect(() => {
    checkUser();
  }, [username]);

  const [onLoad, setOnLoad] = useState(false);

  const [formData, setFormData] = useState({
    type: null
  });
  const { type } = formData;

  const onClick = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      type: null
    }));
    dispatch(logOutUser());
  };

  const [showA, setShowA] = useState(false);

  const become = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const data = JSON.stringify({
        "is_pool": !checkPool
      })
      fetch('https://flitchcoin.com/api/mode', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${fetchToken()}`,
          'Content-Type': 'application/json'
        },
        body: data
      }).then((result) => result.json()
        .then(res => {
          navigate("/login");
          onClick();
        })).catch(err => console.log(err));
    }, 3000);
    setShowA(true);
  };

  return (
    <>
      <div className="container card back parent_card mt-4">
        {onLoad ?
          <>
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
          </> :
          <>
            <div className="p-5">

            </div>
          </>}

        <div className="row ps-5 pb-4">
          <div className="col-xl-7 me-5">
            <div className="row pb-4">
              <div className="col-xl-6 welcome">Welcome <b>
                { 
                fullName.indexOf(" ") === -1 ? 
                <>
                {fullName}
                </>:
                <>
                {(fullName).substring(0,fullName.indexOf(" "))}
                </>
                },</b></div>
              <div className="col-xl-3">
                <button
                  className="ps-5 pe-5 round-btn"
                  onClick={() => navigate("/deposit")}
                >
                  Deposit
                </button>
              </div>
              <div className="col-xl-3">
                <button
                  className="ps-5 pe-5 round-btn"
                  onClick={() => (navigate('/withdraw'))}
                >
                  Withdraw
                </button>
              </div>
            </div>
            <div className="row card back special_card_account">
              <p className="welcome_1">Account Summary : $ {totalBalance}</p>
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
                <div className="col-md-12 my-5 mx-0">
                  <Swiper
                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: true,
                    }}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    loop={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 300,
                      modifier: 1,
                      slideShadows: true,
                    }}
                    pagination={true}
                    spaceBetween={-20}
                  >
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card back parent_card m-4 ms-5 p-4 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4 py-5">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 card back special_card_profile">
            <div className="row">
                <Toast onClose={() => setShowA(false)} className="position-absolute" style={{ zIndex: "11", marginTop: "5rem" }} position="top-center" show={showA} delay={3000} autohide>
                  <Toast.Header>
                    <strong className="me-auto">Flitchcoin</strong>
                    <small>Error !</small>
                  </Toast.Header>
                  <Toast.Body>Please enter details to proceed for Login.</Toast.Body>
                </Toast>
                <div className="row mt-4">
                  <div className="col-5"></div>
                  <div className="col-2">
                  <img src={avt} className="dashboard_img" />
                  </div>
                  <div className="col-5"></div>
                </div>
                <p className="plain_text text-center mt-4">{fullName}</p>
            </div>
            <div className="row">
              <div className="plain_text row mb-4 mt-3">
                <div className="col-5 text-end">
                  {checkPool ? (
                    <>
                      <div className="ud-tooltip">
                        <p
                          className="tool"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Tooltip on bottom"
                        >
                          Pool
                        </p>
                        <div className="tip-content1">
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ud-tooltip">
                        <p
                          className="tool"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Tooltip on bottom"
                        >
                          Part.
                        </p>
                        <div className="tip-content1">
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="col-2" style={{ marginTop: "-22px" }}>
                  <div>
                    <input type="checkbox" id="toggle" onClick={become} />
                    <label htmlFor="toggle" className="switch_toggle"></label>
                  </div>
                </div>
                <div className="col-5 ps-4 text-start">
                  {!checkPool ? (
                    <>
                      <div className="ud-tooltip">
                        <p
                          className="tool"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Tooltip on bottom"
                        >
                          Pool
                        </p>
                        <div className="tip-content2">
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="ud-tooltip">
                        <p
                          className="tool"
                          data-bs-toggle="tooltip"
                          data-bs-placement="bottom"
                          title="Tooltip on bottom"
                        >
                          Part.
                        </p>
                        <div className="tip-content2">
                          <p>Lorem ipsum dolor sit amet.</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="col-xl-4">
                <button className="swap round-btn">Swap</button>
              </div>
              <div className="col-xl-4">
                <button className="deposit_btn round-btn">Deposit</button>
              </div>
              <div className="col-xl-4">
                <button className="buy round-btn">Buy</button>
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
          <div className="col-xl-7  me-5">
            <div className="row table_section">
            <div className="col-6">
            <p className="text-muted ps-5 ms-4">Coin</p>
          </div>
          <div className="col-3">
            <p className="text-muted ps-5">Total</p>
          </div>
          <div className="col-3">
            <p className="text-muted ps-4">Yield</p>
          </div>
            </div>
            <div className="row ps-5 pe-2 enable_scroll">
            {
              tableInfo.map(i => {
                return (
                  <div className="row table_section mt-3">
                    <div className="col-1">
                      <img className='table_coin' src={i.link} alt="coin_img" style={{borderRadius: "50%"}} />
                    </div>
                    <div className="col-5 pt-1">
                      <p>{i.asset}</p>
                    </div>
                    <div className="col-3 pt-1">
                      <p className='text-center'>{i.total}</p>
                    </div>
                    <div className="col-3 pt-1">
                      <p className='text-center'>{i.yield}</p>
                    </div>
                  </div>
                )
              })
            }
            </div>
          </div>
          <div className="col-xl-4">
            <Timeline colorTheme="light" feedMode="market" market="crypto" height={670} width="120%"></Timeline>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
