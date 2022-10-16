import React, { useEffect, useState } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinType } from "../../Feature/Order/orderSlice";
import { orderType } from "../../Feature/Order/orderSlice";
import { fetchToken } from "../../Auth";

const PoolParticipant = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [asset, setAsset] = useState([]);
  const [coin, setCoin] = useState("Select coin");
  const [value, setValue] = useState();
  const [amount, setAmount] = useState();


  const [load, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false)
    }, 5000)
  }, [])


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

  function sendOrder() {
    var data = JSON.stringify({
      "coin": coin,
      "amount": amount,
      "duration": value
    })
    fetch('https://flitchcoin.com/api/place_order', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: data,
    })
      .then((res) => res.json()
        .then((result) => {
          if (result.status === 200) {
            dispatch(coinType(coin));
            dispatch(orderType("order"));
            navigate("/order");
          }
        }))
      .catch((err) => {
        console.log(err);
      })
  }

  const nextHanlder = () => {
    sendOrder();
  };

  useEffect(() => {
    asset_list();
  }, []);

  const [coins, setCoins] = useState('');
  const [coinsNet, setCoinsNet] = useState('');

  const coin1 = () => {
    {
      coin === "Select coin" ?
        setCoins('BTC') : setCoins(coin)
    }
  }

  const coinNet = () => {
    {
      coin === "Select coin" ?
        setCoinsNet(`BTCUSDT`) : setCoinsNet(`${coin}USDT`)
    }
  }

  useEffect(() => {
    coin1();
  }, [coin]);

  useEffect(() => {
    coinNet();
  }, [coin]);

  const onChangeValues = (e) => {
    if (e.target.value >= 7 && e.target.value <= 365) {
      setValue(e.target.value);
    }
  }

  return (
    <div>
      {load === true ?
        <>
        <div className="for_fox">
          <div className="fox">
            <div className="leg-outer">
              <div className="leg">
                <div className="paw">
                  <div className="log">
                    <div className="log-inner">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="leg-outer">
              <div className="leg">
                <div className="paw">
                  <div className="log">
                    <div className="log-inner"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hind-leg-outer">
              <div className="hind-leg-outer2">
                <div className="hind-paw">
                  <div className="hind-log">
                    <div className="hind-log-inner">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hind-leg-outer">
              <div className="hind-leg-outer2">
                <div className="hind-paw">
                  <div className="hind-log">
                    <div className="hind-log-inner">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="body">
              <div className="head">
                <div className="ears">
                  <div className="ear"></div>
                  <div className="ear"></div>
                </div>
                <div className="face"></div>
                <div className="snout"></div>
              </div>
              <div className="tail">
                <div className="tail">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail">
                        <div className="tail">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tail2">
                  <div className="tail">
                    <div className="tail">
                      <div className="tail">
                        <div className="tail">
                          <div className="tail">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="snow"></div>
          </div>
        </> : <>
          <div className="row">
            <div className="col col-xs-12 col-lg-9 ps-4 mt-5 card back">
              <AdvancedRealTimeChart theme="light" autosize symbol={coinsNet} ></AdvancedRealTimeChart>
            </div>
            <div className="col col-md-12 col-lg-3">
              <div className="container">
                <div className="row pt-5 pb-5">
                  <div className="back card">
                    <div className="container pt-5 pb-5">
                      <div className="row order__body mt-4">
                        <h2 className="text-center mb-5">Place Order</h2>
                        <h5 className="mb-3">Select a Coin</h5>
                        <div className="col col-12 mb-5 btn-group">
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
                        <h5 className="mb-3">Enter Amount</h5>
                        <div className="col col-12">
                          <div className="input1 w-100">
                            <input
                              type="number"
                              name="amount"
                              placeholder="Amount ($)"
                              className="pressed txt-underline p-3 mb-3 w-100"
                              value={amount}
                              onChange={e => setAmount(e.target.value)}
                            />
                            <span className="underline"></span>
                          </div>
                        </div>
                        <h5 className="mb-3">Enter Duration</h5>
                        <div className="col col-12">
                          <input type="range" value={value} className="form-range" min='7' max='365' onChange={onChangeValues}></input>
                          <div className="input1 w-100">
                            <input
                              type="number"
                              name="duration"
                              placeholder="Days ( 7 - 365 )"
                              className="pressed txt-underline p-3 mb-3 w-100"
                              value={value}
                              onChange={onChangeValues}
                            />
                            <span className="underline"></span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="d-flex justify-content-center mb-5">
                          <button
                            className="primary mt-4 ps-5 pe-5"
                            style={{ position: "absolute" }}
                            onClick={nextHanlder}
                          >
                            NEXT
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-7 col-xs-12 ms-5">
              <div className="card back mt-5">
                <CryptoCurrencyMarket colorTheme="light" width="100%" height={654} isTransparent ></CryptoCurrencyMarket>
              </div>
            </div>
            <div className="col col-lg-4 col-md-12 mt-5">
              <div className="card back">
                <SymbolInfo colorTheme="light" height={100} width={500} symbol={coins} isTransparent ></SymbolInfo>
              </div>
              <div className="card back technical-analysis mt-3">
                <TechnicalAnalysis colorTheme="light" height={380} width="100%" symbol={coinsNet} isTransparent></TechnicalAnalysis>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default PoolParticipant;
