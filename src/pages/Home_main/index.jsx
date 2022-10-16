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
      <div className="back shadow pb-3">
        <div className="container">
          <section className="row pt-3">
            <div className="col-sm-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center h_get_to_know">
              <div className="pt-3"> ALADDIN BY BLACKROCK</div>
              <h1 className="pt-3">GET TO KNOW THE ALADDIN ADVANTAGE</h1>
              <div className="pt-3">
                See why BlackRock and hundreds of other investment professionals
                turn to the power of Aladdin to work smarter, not harder.
              </div>
              <div className="pt-3 h_get_to_know_button">
                <button
                  type="button"
                  className="primary"
                  style={{ position: "absolute", marginBottom: "10px" }}
                >
                  Learn more about
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 mt-5 manage_margin_2 card back">
              <SymbolOverview colorTheme="light"
                height={300}
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
          <section className="my_50">
            <p className="h2">The clarity to act in a complex world</p>
            <p className="py-3">
              More than investment software, Aladdin technology brings clarity and
              connectivity to the world’s financial ecosystem.
            </p>
            <p className="">
              Everything we do is guided by the conviction that investors need
              this clarity at every point in the investment process in order to
              make more informed decisions, scale efficiently and achieve better
              investment outcomes. In pursuit of this goal, we are relentlessly
              innovating and constantly evolving Aladdin technology.
            </p>
          </section>
          <section className="my_50">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-10 col-sm-12">
                    <div className="h4">Aladdin for institutional investors</div>
                    <div className="">
                      Aladdin Enterprise is a flexible, end-to-end operating
                      system that brings clarity to investment professionals.
                    </div>
                    <div className="pt-3 h_get_to_know_button">
                      <button
                        type="button h_get_to_know_button "
                        className="primary"
                        style={{ position: "absolute" }}
                      >
                        Learn more about
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12 aladdin_for_wealth_managers">
                <div className="row">
                  <div className="col-lg-10 col-sm-12">
                    <div className="h4">Aladdin for wealth managers</div>
                    <div className="">
                      Aladdin Wealth is an industry-leading platform powering the
                      future of wealth management.
                    </div>
                    <div className="pt-3 mb-5">
                      <button
                        type="button"
                        className="primary"
                        style={{ position: "absolute" }}
                      >
                        Learn about Aladdin Wealth
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Animation />
          <section className="my_50">
            <div className="row">
              <div className="col-md-5 col-sm-12 mt-5 ms-2 card back">
                <SymbolInfo colorTheme="dark" autosize symbol="BTC" isTransparent></SymbolInfo>
              </div>
              {/* <div className="col-md-1"></div> */}
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
