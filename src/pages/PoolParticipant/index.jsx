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
import Fields from "./fields";

const PoolParticipant = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const [priceInUsd,setPriceInUsd] = useState(0);

  const price = () => {
    const sym = coin.toUpperCase();
    fetch(`https://flitchcoin.com/api/prices/${sym}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json()
        .then((result) => {
          setPriceInUsd(result[0]);
        }))
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    coin1();
    coinNet();
    price();
  }, [coin]);

  const [amountToBeConverted, setAmountToBeConverted] = useState(0);

  var dur = 0;
  var userAmt = 0;
  const getData = (data) => {
    dur = (Number(data[0]));
    userAmt = (Number(data[1]));
    const getValue = () => {
      setAmountToBeConverted(userAmt*priceInUsd);
    };
    getValue();
  };

  function sendOrder() {
    var data = JSON.stringify({
      "coin": coin.toLowerCase(),
      "amount": userAmt,
      "duration": dur
    });
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
  // CryptApi

  const query = new URLSearchParams({ callback: 'https://flitchcoin.com/api/a9a7a6c3-7c30-4081-a041-dcca63046835-088bcd46-9411-576a-aec4-5ba50882e40a/JFXLIMVPSZXWHTJMQYBJ' }).toString();

  const ticker = 'btc';
  async function resp() {
    const response = await fetch(
      `https://api.cryptapi.io/${ticker}/logs/?${query}`,
      { method: 'GET' }
    );
    const data = await response.text();
    console.log(data);
  }
  useEffect(() => {
    asset_list();
    resp();
  }, []);

  return (
    <div className="mb-5">
      <div className="row">
        <div className=" col-xl-8 ms-5 mt-5">
          <AdvancedRealTimeChart theme="light" autosize symbol={coinsNet} ></AdvancedRealTimeChart>
        </div>
        <div className="col-xl-3">
          <div className="container">
            <div className="row pt-5 pb-1">
              <div className="back card special_card_order pt-4">
                <div className="pb-5">
                  <div className="row order__body">
                    <h2 className="text-center mb-5">Place Order</h2>
                    <div className="col-12 mb-5 btn-group">
                      <button
                        type="button"
                        className="btn btn-dark dropdown-toggle w-100 round-btn"
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
                    <Fields onSubmit={getData} />
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-center mb-5 ps-2 pe-2">
                      <button
                        className="primary mt-4 ps-5 pe-5 round-btn place_order_btn"
                        style={{ position: "absolute", width: "90%" }}
                        onClick={sendOrder}
                      >
                        Place Order  ${amountToBeConverted}
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
        <div className="col-lg-4 card back special_card_deposit ms-5 mt-4">
          <TechnicalAnalysis colorTheme="light" height={450} width="100%" symbol={coinsNet} isTransparent></TechnicalAnalysis>
        </div>
        <div className="col-lg-4 card back special_card_deposit ms-5 mt-4">
          <SymbolInfo colorTheme="light" height="100%" width="100%" symbol={coins} isTransparent ></SymbolInfo>
        </div>
      </div>
      <div className="row card back parent_card mt-4 mb-4 ms-5 me-5">
        <CryptoCurrencyMarket colorTheme="light" width="100%" height={654} isTransparent ></CryptoCurrencyMarket>
      </div>
    </div>
  );
};

export default PoolParticipant;
