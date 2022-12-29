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
import { EffectCoverflow, Pagination, Navigation } from "swiper";

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

  const [checkPool, setCheckPool] = useState(false);

  const getInfo = () => {
    fetch('https://flitchcoin.com/api/users/me/items/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
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

  useEffect(() => {
    images();
    account();
    getInfo();
    setTimeout(() => {
      setOnLoad(true);
      console.log(onLoad);
    }, 2000);
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
    },5000);
    alert("You will now signed out from this page . Please login again !");
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
              <div className="col-xl-6 welcome">Welcome <b>Tushar ,</b></div>
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
              <div className="col-md-12 my-5 mx-0">
                  <Swiper
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={2}
                    loop={true}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 300,
                      modifier: 3,
                      slideShadows: true,
                    }}
                    navigation={true}
                    pagination={true}
                    spaceBetween={-10}
                    onSlideChange={() => console.log("slide change")}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit 
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit 
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="card back parent_card m-4 ms-5 p-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Nobis, sunt. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit 
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className=" card back parent_card m-4 ms-5 p-4">
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
              <div className="col-lg-4"></div>
              <div className="col-lg-6">
                <img src={image} className="dashboard_img" />
                <p className="plain_text">Tushar Gupta</p>
              </div>
              <div className="col-lg-3"></div>
            </div>
            <div className="row">
            <div className="plain_text row mb-4 mt-3">
                    <div className="col-5 text-end">
                      {
                        checkPool?<>Pool</>:<>Part.</>
                      }
                    </div>
                    <div className="col-2" style={{ marginTop: "-22px" }}>
                      <div>
                        <input type="checkbox" id="toggle" onClick={become} />
                        <label htmlFor="toggle" className="switch_toggle"></label>
                      </div>
                    </div>
                    <div className="col-5 ps-4 text-start">
                    {
                        !checkPool?<>Pool</>:<>Part.</>
                      }
                    </div>
                  </div>
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
            <div className="row">
              <div className="col-lg-6 p-0">
                {
                  newArr.map(name => {
                    return (
                      <>
                        <hr className='mt-3' />
                        <div className="p-3 row align-items-center making_lines">
                          <div className="col-3"><img src={name[1]} className="dashboard_logo" /></div>
                          <div className="col-6">{name[0]}</div>
                        </div>
                        <hr />
                      </>
                    )
                  })
                }
              </div>
              <div className="col-lg-3 p-0">
                {arr1.map(names => {
                  return (
                    <>
                      <hr className='mt-3' />
                      <div className="row p-3">{names}</div>
                      <hr />
                    </>
                  )
                })}
              </div>
              <div className="col-lg-3 p-0">
                {arr2.map(names => {
                  return (
                    <>
                      <hr className='mt-3' />
                      <div className="row p-3 making_lines_end">{names}</div>
                      <hr />
                    </>
                  )
                })}
              </div>
            </div>
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
