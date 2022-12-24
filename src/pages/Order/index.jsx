import React, { useState, useEffect } from "react";

const Order = () => {

  const [type,setType] = useState("Open Orders");

  return (
    <div className="container">
      <div className="row  mt-5 mb-5">
        <div className="col-xl-8">
          <div className="row">
            <div className="col-xl-4">
              <input type="radio" className="btn-check" name="options-outlined" id="Open Orders" autoComplete="off" onClick={() => setType("Open Orders")} />
              <label className="btn special_btn" htmlFor="Open Orders">Open Orders</label>
            </div>
            <div className="col-xl-4">
              <input type="radio" className="btn-check" name="options-outlined" id="Open Positions" autoComplete="off" onClick={() => setType("Open Positions")} />
              <label className="btn special_btn" htmlFor="Open Positions">Open Positions</label>
            </div>
            <div className="col-xl-4">
              <input type="radio" className="btn-check" name="options-outlined" id="History" autoComplete="off" onClick={() => setType("History")}/>
              <label className="btn special_btn" htmlFor="History">History</label>
            </div>
          </div>
          <div className="row">

          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
