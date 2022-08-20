import React, { useEffect, useState } from "react";
// import CoinData from "./CoinData";
// import coinGecko from './apis/coinGecko';
import Escrow_main from "../Escrow_main";
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { useSelector } from "react-redux";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";

const PoolParticipant = () => {
  

  // const  id  = "ethereum";
  // const [coinData, setCoinData] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const { selectedCoin } = useSelector((state) => state.order);
  const [coins, setCoins] = useState('BTCUSD');

  const coin = () => {
    {selectedCoin === null ? 
    setCoins('BTCUSD') : setCoins(selectedCoin)}
  }

  useEffect(() => {
    coin();
    console.log(coins);
  },[coins]);

  // const formatData = (data) => {
  //   return data.map((el) => {
  //     return {
  //       t: el[0],
  //       y: el[1].toFixed(2),
  //     };
  //   });
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     const [day, week, year, detail] = await Promise.all([
  //       coinGecko.get(`/coins/${id}/market_chart/`, {
  //         params: {
  //           vs_currency: "usd",
  //           days: "1",
  //         },
  //       }),
  //       coinGecko.get(`/coins/${id}/market_chart/`, {
  //         params: {
  //           vs_currency: "usd",
  //           days: "7",
  //         },
  //       }),
  //       coinGecko.get(`/coins/${id}/market_chart/`, {
  //         params: {
  //           vs_currency: "usd",
  //           days: "365",
  //         },
  //       }),
  //       coinGecko.get("/coins/markets/", {
  //         params: {
  //           vs_currency: "usd",
  //           id: id,
  //         },
  //       }),
  //     ]);

  //     setCoinData({
  //       day: formatData(day.data.prices),
  //       week: formatData(week.data.prices),
  //       year: formatData(year.data.prices),
  //       detail: detail.data[0],
  //     });
  //     setIsLoading(false);
  //   };
  //   console.log("coindata from index is",coinData);
  //   fetchData();
  // }, []);

  const renderData = () => {
    return (
      <div>
        <div className="row">
          <div className="col col-md-12 col-lg-6 ps-4 mt-5">
          {/* <HistoryChart data={coinData} /> */}
          <AdvancedRealTimeChart theme="dark" autosize symbol={coins}></AdvancedRealTimeChart>
          </div>
          <div className="col col-md-12 col-lg-3 mt-5">
          {/* <CoinData data={coinData.detail} /> */}
          <SymbolInfo colorTheme="light" autosize symbol={coins} ></SymbolInfo>
          <TechnicalAnalysis colorTheme="light" height={400} width="100%" symbol={coins} ></TechnicalAnalysis>
          </div>
          <div className="col col-md-12 col-lg-3">
            <Escrow_main/>
          </div>
        </div>
        
      </div>
    );
  };

  return renderData();
};

export default PoolParticipant;
