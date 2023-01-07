import React, { useState } from "react";
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';
import { SymbolOverview } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { MiniChart } from "react-ts-tradingview-widgets";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {

  AOS.init();
  AOS.init({
    duration: 1000,
    once: false,
  });

  return (
    <>
      <Animation />
      <div className="container">
        <section className="row pt-3">
          <div className="col-lg-5 d-flex flex-column justify-content-center h_get_to_know">
            <h1 className="pt-3 api_head">KNOW THE <span className="text_design"> FLITCHCOIN</span> ADVANTAGE</h1>
            <p className="pt-3 api_text">
              <b className="text-dark"> Unleash the full potential </b>of your cryptocurrency portfolio with Flitchcoin's lending and borrowing feature. Get access to funds for trading or generate passive income with your digital assets.
            </p>
            <div className="pt-3 h_get_to_know_button">
              <button
                type="button"
                className="primary ps-5 pe-5 mt-4 pt-3 pb-3"
                style={{ position: "absolute" }}
              >
                Learn more about
              </button>
            </div>
          </div>
          <div className="col-lg-6 mt-5 card_margin card parent_card back">
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
          <p className="text-center api_head">FLITCHCOIN as a <span className="text_design"> One - Stop Solution </span></p>
          <p className="api_text">At Flitchcoin, we strive to make managing digital currency as simple and hassle-free as possible. Our platform serves as a one-stop-shop for all your digital currency needs, offering a range of payment, staking, and liquidity lending solutions to help you thrive. Our free and easy-to-use account services makes it easy for you to get started with managing digital currency, providing you with all the tools and resources you need.</p>
          <div className="row mt-5 pt-4">
            <div className="col-6">
              <p className="text-end api_head" data-aos="fade-up">NO MATTER</p>
            </div>
            <div className="col-6">
              <p className="text-start api_head" data-aos="fade-down">WHETHER IT'S</p>
            </div>
          </div>
        </section>
        <section className="row mt-5 mb-4">
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
      </div>
      <div className="mt-5 mb-5" style={{ background: "#000" }}>
        <div className="container pt-5 pb-5">
          <div className="row">
            <div className="col-xl-8">
              <div className="row">
                <div className="col-3">
                  <div className="row" style={{ fontSize: "24px", fontWeight: 600, color: "#fff" }}>
                    <p className="text-end mb-0"> Experience the</p>
                  </div>
                  <div className="row" style={{ fontSize: "24px", fontWeight: 600, color: "#fff" }}>
                    <p className="text-end"> Power of</p>
                  </div>
                </div>
                <div className="col-9">
                  <p className="text-start flitch_earn"> Flitch - EARN</p>
                </div>
              </div>
              <p className="text-white mt-3">Experience the Flitchcoin advantage and diversify your cryptocurrency portfolio with our extended earn service. Reduce your risk exposure and borrow assets to take them off the markets with our lending and borrowing feature.<br />
                At Flitchcoin, we understand the importance of risk management, which is why we offer cutting-edge solutions for stablecoin investors. With high liquidity, flexible staking and earn programs where you can choose the period that best suits your needs. Don't let risk hold you back</p>
            </div>
            <div className="col-xl-1"></div>
            <div className="col-xl-3 mt-5">
              <div class="button_special mt-5">
                <a href="#">
                  Start earning &nbsp;&nbsp;
                  <span class="shift">›</span>
                </a>
                <div class="mask"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="row pt-3 mb-5">
          <div className="col-lg-5 d-flex flex-column justify-content-center h_get_to_know">
            <h1 className="pt-5 api_head">Essence of Passive Income Is <span className="text_design"> Risk - Management</span> </h1>
            <p className="pt-4 api_text">
              At <b className="text-dark"> Flitchcoin</b>, we are committed to <b className="text-dark">transparency</b> and <b className="text-dark">stability</b> in all aspects of our business. We welcome clear regulation and value engagement with <b className="text-dark">policymakers</b> to ensure transparency and stability for our customers in order to promote a more responsible and stable future for cryptocurrency. Choose Flitchcoin and join us in building a more transparent and stable future.
            </p>
          </div>
          <div className="col-lg-6 mt-5 card_margin card parent_card back">
            {/* <SymbolInfo colorTheme="dark" autosize symbol="XRPUSDT" isTransparent></SymbolInfo> */}
            <MiniChart colorTheme="dark" width="100%" height={400} symbol="SOLUSDT" isTransparent></MiniChart>
          </div>
          <p className="mt-5 pt-5 api_text mb-5">At <b className="text-dark"> Flitchcoin</b>, we believe in building delightful user experiences that make it <b className="text-dark"> easy and intuitive</b> for people to interact with your business. Our <b className="text-dark"> Lending, Staking, and Earn</b> platforms are designed to be easy to use, and you can get started right away. With Flitchcoin, we created beautiful, intuitive ways for your entire ecosystem to engage with that helped in improving the overall user experience and driving growth.
            <br />Join us and see the difference Flitchcoin can make for you and your business.</p>
        </section>
        <div className="settings_box mt-5 pt-4 pb-4 mb-5">
          <div className="row">
          <div className="col-xl-5">

          </div>
          <div className="col-xl-7 ps-5">
              <p className="api_head pe-3"><span className="text_design">Sign Up Now</span> to get the most out of your investments.</p>
              <p className="api_text pe-5">Are you ready to take control of your investments? Look no   further than Flitchcoin. Our platform offers a range of high-yield stable coin funds, as well as the ability to invest, borrow, and stake your stable coins with immense ease and enables you to elevate your investments exponentially.</p>
              <div className="text-center pe-5 mt-4">
              <button className="w-50 btn-dark round-btn">SignUp Now</button>
              </div>
          </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
