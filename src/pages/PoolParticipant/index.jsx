import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HistoryChart from "./Charts/HistoryChart";
import CoinData from "./CoinData";
import coinGecko from './apis/coinGecko';
import Escrow_main from "../Escrow_main";

const PoolParticipant = () => {
  const  id  = "ethereum";
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinGecko.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinGecko.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            id: id,
          },
        }),
      ]);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };
    console.log("coindata from index is",coinData);
    fetchData();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div>
        <div className="row">
          <div className="col col-md-12 col-lg-6 ps-4 mt-5">
          <HistoryChart data={coinData} />
          </div>
          <div className="col col-md-12 col-lg-3 mt-5">
          <CoinData data={coinData.detail} />
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