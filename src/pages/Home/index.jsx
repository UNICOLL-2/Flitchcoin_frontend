import React, { useState } from "react";
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { MiniChart } from "react-ts-tradingview-widgets";
import { ForexCrossRates } from "react-ts-tradingview-widgets";

function Home() {
  const [eFront, seteFront] = useState(false);
  const [clientStory, setClientStory] = useState(false);

  return (
    <>
    <Animation/>
        <div className="container">
          <section className="row pt-3">
            <div className="col-lg-5 d-flex flex-column justify-content-center h_get_to_know">
              <h1 className="pt-3 api_head">KNOW THE <span className="text-primary"> FLITCHCOIN</span> ADVANTAGE</h1>
              <div className="pt-3 api_text">
              Unleash the full potential of your cryptocurrency portfolio with Flitchcoin's lending and borrowing feature. Get access to funds for trading or generate passive income with your digital assets.
              </div>
              <div className="pt-3 h_get_to_know_button">
                <button
                  type="button"
                  className="primary ps-5 pe-5 mt-4 pt-3 pb-3"
                  style={{ position: "absolute"}}
                >
                  Learn more about
                </button>
              </div>
            </div>
            <div className="col-lg-6 mt-5 ms-5 card back">
              <SymbolOverview colorTheme="light"
                height={320}
                width="100%"
                chartType="area"
                downColor="#800080"
                borderDownColor="#800080"
                wickDownColor="#800080"
                isTransparent
                symbols={
                  [
                    ["BTC", "BTCUSDT"],
                    ["ETH", "ETHUSDT"],
                    ["MATIC", "MATICUSDT"]
                  ]
                } />
            </div>
          </section>
          <section className="mt-5 pt-5">
            <p className="text-center api_head">FLITCHCOIN as a <span className="text-primary"> One - Stop Solution </span></p>
            <p className="api_text">At Flitchcoin, we strive to make managing digital currency as simple and hassle-free as possible. Our platform serves as a one-stop-shop for all your digital currency needs, offering a range of payment, staking, and liquidity lending solutions to help you thrive. Our free and easy-to-use account services makes it easy for you to get started with managing digital currency, providing you with all the tools and resources you need.</p>
                <div className="row mt-5 pt-4">
                  <div className="col-6">
                    <p className="text-end api_head">NO MATTER</p>
                  </div>
                </div>
                <div className="row">
                <div className="col-6"></div>
                  <div className="col-6">
                    <p className="text-start api_head">WHETHER IT'S</p>
                  </div>
                </div>
          </section>
          <section className="row mt-5 ">
                <div className="col-5">
                  <p className="api_head">Flitchcoin for Pool Investors</p>
                  <p className="api_text">Maximize your returns with Flitchcoin's high yield stablecoin funds. As a pool investor, you have access to a range of investment, borrowing, and staking options that offer risk-free opportunities to grow your portfolio.</p>
                </div>
                <div className="col-2"></div>
                <div className="col-5">
                <p className="api_head">Flitchcoin for Part. Investors</p>
                  <p className="api_text">As a participant investor at Flitchcoin, you have access to a range of high yield flitch funds where you can invest, borrow, and flexibly stake your cryptocurrencies.</p>
                </div>
          </section>
          <Animation />
          {/* <section className="mt-5 pt-5">
            <div className="row">
              <div className="col-md-5 col-sm-12 mt-5 ms-2 card back">
                <SymbolInfo colorTheme="dark" autosize symbol="XRPUSDT" isTransparent></SymbolInfo>
              </div>
              <div className="col-md-6 col-sm-12 manage_margin_2 d-flex flex-column justify-content-center">
                <div className="pt-3">
                  <p className="h3">THE POWER OF ALADDIN + EFRONT</p>
                </div>
                <div className="pt-3">
                  <p>
                    Bringing together the market leading capabilities of Aladdin
                    for public markets and eFront for private markets sets a new
                    standard in investment and risk management technology.
                    Together, they enable investors to seamlessly manage
                    portfolios across public and private asset classes on a single
                    platform, providing a Whole Portfolio View.
                  </p>
                </div>
                <div className="pt-3 ">
                  <div
                    className="p-2 cta_main primary"
                    onMouseEnter={() => seteFront(true)}
                    onMouseLeave={() => seteFront(false)}
                  >
                    <p>Learn more about eFront</p>
                    <div
                      className={`${eFront ? "cta_bottom_show" : "cta_bottom_hide"
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="row">
              <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center">
                <div className="h3">
                  Client story | Microsoft Treasury and Aladdin: a twenty-year
                  partnership forged on innovation and growth
                </div>
                <div className="">
                  Microsoft Treasury’s implementation of the Aladdin® Enterprise
                  platform has streamlined its operations, automated processes,
                  and centralized investment data, allowing the team to
                  efficiently manage multi-asset portfolios within one flexible
                  end-to-end solution.
                </div>
                <div className="pt-3 pb-4">
                  <div
                    className="p-2 cta_main primary"
                    onMouseEnter={() => setClientStory(true)}
                    onMouseLeave={() => setClientStory(false)}
                  >
                    <p>Read the client story</p>
                    <div
                      className={`${clientStory ? "cta_bottom_show" : "cta_bottom_hide"
                        }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-md-5 col-sm-12 pb-5 card back">
                <MiniChart colorTheme="dark" width="100%" symbol="SOLUSDT" isTransparent></MiniChart>
              </div>
            </div>
          </section>
          <div className="card back mt-5 mb-3">
            <ForexCrossRates colorTheme="light" height={400} width="100%" isTransparent></ForexCrossRates>
          </div> */}
        </div>
      <Footer />
    </>
  );
}

export default Home;
