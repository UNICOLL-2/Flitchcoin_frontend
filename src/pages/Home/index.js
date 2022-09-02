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
            <div className="spacer col-lg-1"></div>
            <div className="col-sm-12 col-md-6 mt-5 card back">
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
              <div className="col-md-5 col-sm-12 mt-5 card back">
                <SymbolInfo colorTheme="dark" autosize symbol="XRPUSDT" isTransparent></SymbolInfo>
              </div>
              <div className="col-md-1"></div>
              <div className="col-md-6 col-sm-12 d-flex flex-column justify-content-center">
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
              <div className="col-md-6 col-sm-12 pb-5 card back">
                <MiniChart colorTheme="dark" width="100%" symbol="SOLUSDT" isTransparent></MiniChart>
              </div>
            </div>
          </section>
          <div className="card back mt-5">
            <ForexCrossRates colorTheme="light" height={400} width="100%" isTransparent></ForexCrossRates>
          </div>
        </div>
      </div>
      {/* <svg width="63" height="99" viewBox="0 0 63 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_2_19)">
<circle cx="30" cy="47.9996" r="13.2156" fill="white"/>
<path d="M49.6242 74.2203C53.4902 74.2203 56.6242 71.0863 56.6242 67.2203V4.82263C56.6242 4.27035 56.1765 3.82263 55.6242 3.82263C55.0719 3.82263 54.6242 4.27035 54.6242 4.82263V67.2203C54.6242 69.9817 52.3856 72.2203 49.6242 72.2203H16.7843C16.232 72.2203 15.7843 72.668 15.7843 73.2203C15.7843 73.7726 16.232 74.2203 16.7843 74.2203H49.6242Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.37576 28.7789C3.37576 24.9129 6.50977 21.7789 10.3758 21.7789H43.2156C43.7679 21.7789 44.2156 22.2266 44.2156 22.7789C44.2156 23.3312 43.7679 23.7789 43.2156 23.7789H10.3758C7.61434 23.7789 5.37576 26.0175 5.37576 28.7789V91.1774C5.37576 91.7297 4.92805 92.1774 4.37576 92.1774C3.82348 92.1774 3.37576 91.7297 3.37576 91.1774V28.7789Z" fill="white"/>
</g>
<defs>
<filter id="filter0_dd_2_19" x="0.375763" y="0.822632" width="62.2484" height="97.3548" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feGaussianBlur stdDeviation="2"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_19"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-1" dy="-1"/>
<feGaussianBlur stdDeviation="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.18 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_2_19" result="effect2_dropShadow_2_19"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_2_19" result="shape"/>
</filter>
</defs>
</svg> */}
      <Footer />
    </>
  );
}

export default Home;
