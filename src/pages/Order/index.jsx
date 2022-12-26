import React, { useState, useEffect } from "react";
import { fetchToken } from "../../Auth";

const Order = () => {

  const [type, setType] = useState("Open Orders");

  const [checkPool, setCheckPool] = useState(false);

  const getInfo = () => {
    fetch('https://flitchcoin.com/api/users/me/items/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        if (res.is_pool) {
          setCheckPool(true);
        }
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getInfo();
    order();
  }, []);

  const [openOrderDataPool, setOpenOrderDataPool] = useState([]);
  const [openOrderDataParticipant, setOpenOrderDataParticipant] = useState([]);
  const [openPositionDataPool, setOpenPositionDataPool] = useState([]);
  const [openPositionDataParticipant, setOpenPositionDataParticipant] = useState([]);

  const order = () => {
    fetch("https://flitchcoin.com/api/order", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(resp => {
        const res = (Object.values(resp));
        var tempArr_1 = [];
        var tempArr_2 = [];
        var tempArr_3 = [];
        var tempArr_4 = [];
        if (res[0].margin) {
          for (let i = 0; i < res.length; i++) {

            if (res[i].is_in_escrow_ac) {
              tempArr_1.push(res[i]);
            } else {
              tempArr_2.push(res[i]);
            }
          }
          setOpenPositionDataParticipant([...tempArr_1]);
          setOpenOrderDataParticipant([...tempArr_2]);
        } else {
          for (let i = 0; i <= res.length(); i++) {
            if (res[i].used_amt_usd) {
              tempArr_3.push(res[i]);
            } else {
              tempArr_4.push(res[i]);
            }
          }
          setOpenPositionDataPool([...tempArr_3]);
          setOpenOrderDataPool([...tempArr_4]);
        }
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    console.log("openPositionDataParticipant", openPositionDataParticipant);
    work();
  }, [openPositionDataParticipant, openPositionDataPool, openOrderDataParticipant, openOrderDataPool]);

  const work = () => {
    // console.log(openPositionDataParticipant[0].memo);
  }

  return (
    <div className="container">
      <div className="row  mt-5 mb-5">
        <div className="col-xl-7 me-5">
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
              <input type="radio" className="btn-check" name="options-outlined" id="History" autoComplete="off" onClick={() => setType("History")} />
              <label className="btn special_btn" htmlFor="History">History</label>
            </div>
          </div>
          <div className="row">
            {
              type === "Open Positions" ?
                <>
                  {
                    openPositionDataParticipant.map(i => {
                      return (
                        <>
                        <div className="card back mt-3 mb-4">
                          <p>- Date and time : {i.time_duration} </p>
                          <p>- Total amount : {i.current_price}</p>
                          <p>- Memo : {i.memo}</p>
                          <p>- Colateralized Asset : {i.sym}</p>
                          <p>- Liq. Price : {i.settlement_price}</p>
                          <p>- % ROE : {i.current_price/i.settlement_price}</p>
                          </div>
                        </>
                      )

                    })
                  }
                </> :
                <>

                </>
            }
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card back special_card_order">
            <p className="welcome_1 text-center">Manage Position</p>
            <div className="row">
              <div className="col-8">
                <p className="plain_text">Withdrawable Hedge :</p>
                <p className="plain_text">Entry Price :</p>
                <p className="plain_text">Mark Price :</p>
                <p className="plain_text">ONL ( % ROE ) :</p>
                <p className="plain_text">Liquation Price :</p>
                <p className="plain_text">Colateralized Asset :</p>
                <p className="plain_text">Allocated Margin :</p>
                <p className="plain_text">Total Amount USD :</p>
                <p className="plain_text">Alt_id :</p>
                <p className="plain_text">Memo :</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
