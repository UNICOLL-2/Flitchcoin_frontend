import React, { useEffect, useState } from "react";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { fetchToken } from "../../Auth";
import Fields from "./fields";
import SmallFooter from '../SmallFooter';
import dropdown from "../../Polygon 2.png";

const PoolParticipant = () => {

  const [asset, setAsset] = useState([]);
  const [coin, setCoin] = useState("Select coin");
  const [coinImg, setCoinImg] = useState("");
  
  function asset_link() {
    fetch("https://flitchcoin.com/api/asset_link", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => {
      result.json().then((res) => {
        const data = Object.values(res);
        let tmpSymbol = [];
        data.map(items => {
          tmpSymbol.push(items)
        });
        setAsset([...tmpSymbol]);
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
  
  useEffect(() => {
    coin1();
    coinNet();
  }, [coin]);


  // CryptApi

  const query = new URLSearchParams({ callback: 'https://flitchcoin.com/api/a9a7a6c3-7c30-4081-a041-dcca63046835-088bcd46-9411-576a-aec4-5ba50882e40a/JFXLIMVPSZXWHTJMQYBJ' }).toString();

  const ticker = 'btc';
  async function resp() {
    const response = await fetch(
      `https://api.cryptapi.io/${ticker}/logs/?${query}`,
      { method: 'GET' }
    );
    const data = await response.text();
    // console.log(data);
  }
  useEffect(() => {
    resp();
    asset_link();
    }, []);

  return (
    <>
      <div className="row">
        <div className=" col-xl-9 mt-5">
          <AdvancedRealTimeChart theme="light" autosize symbol={coinsNet} height={680} ></AdvancedRealTimeChart>
        </div>
        <div className="col-xl-3">
          <div className="container">
            <div className="row pt-5 pb-1">
              <div className="back card special_card_order pt-4">
                <div className="pb-2">
                  <div className="row order__body">
                    <h2 className="text-center text_design mb-3">Place Order</h2>
                    <div className="col-12 mb-3 btn-group">
                      <button
                        type="button"
                        className="btn btn-dark w-100 round-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="row">
                          <div className="col-2">
                            {
                              coinImg === "" ? 
                              <></>:
                              <>
                          <img src={coinImg} className="select_img" />
                              </>
                            }
                          </div>
                          <div className="col-8 text-center">
                        <b>{coin}</b>
                          </div>
                          <div className="col-2 text-center">
                            <img src={dropdown} alt="" />
                          </div>
                        </div>
                      </button>
                      <ul className="dropdown-menu drop">
                        {asset.map(items => {
                          return (
                            <div>
                              <li className="list-items" onClick={() => {setCoin(items.symbol); setCoinImg(items.link)}}><img src={items.link} className="select_img"/> <span className="ps-3">{items.symbol}</span></li>
                            </div>
                          )
                        })}
                      </ul>
                    </div>
                    <Fields sym={coin} />
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
    <SmallFooter/>
    </>
  );
};

export default PoolParticipant;
