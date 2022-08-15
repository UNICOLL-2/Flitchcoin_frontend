import React from "react";

const CoinData = ({ data }) => {
  const renderData = () => {
    if (data) {
      return (
        <div className="bg-white rounded border">

          <div className="row pt-3 ps-3">
            <span className="text-muted col col-6 ">Market Cap</span>
            <span className="col col-6">$ {data.market_cap}</span>
          </div>
          <hr />

          <div className="row pt-3 ps-3">
            <span className="text-muted col col-6">Total Supply</span>
            <span className="col col-6">{data.total_supply}</span>
          </div>
          <hr/>

          <div className="row pt-3 ps-3">
            <span className="text-muted col col-6">Volume(24H)</span>
            <span className="col col-6">$ {data.total_volume}</span>
          </div>
          <hr/>

          <div className="row pt-3 ps-3">
            <span className="text-muted col col-6">high 24h</span>
            <span className="col col-6">$ {data.high_24h}</span>
          </div>
          <hr/>

          <div className="row pt-3 ps-3">
            <span className="text-muted col col-6">Circulating Supply</span>
            <span className="col col-6">{data.circulating_supply}</span>
          </div>
          <hr/>

          <div className="row pt-3 ps-3 pb-4">
            <span className="text-muted col col-6">low 24h</span>
            <span className="col col-6">$ {data.low_24h}</span>
          </div>
        </div>
      );
    }
  };

  return <div>{renderData()}</div>;
};

export default CoinData;