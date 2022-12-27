import React, { useState, useEffect } from "react";
import { fetchToken } from "../../Auth";
import bit_img from "./image 4.png";

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
    asset_list();
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
        console.log(res);
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
          for (let i = 0; i < res.length; i++) {
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

  var [cardDataParticipant, setCardDataParticipant] = useState({
    withdrawableHedge: "",
    entryPrice: "",
    markPrice: "",
    roe: "",
    liquationPrice: "",
    colateralizedAsset: "",
    allocatedMargin: "",
    totalAmount: "",
    alt_id: "",
    memo: "",
  });

  var [cardDataPool, setCardDataPool] = useState({
    _liquationPrice: "",
    _colateralizedAsset: "",
    _totalAmount: "",
    _alt_id: "",
    _memo: "",
  });

  var { withdrawableHedge, entryPrice, markPrice, roe, liquationPrice, colateralizedAsset, allocatedMargin, totalAmount, alt_id, memo } = cardDataParticipant;
  var { _liquationPrice, _colateralizedAsset, _totalAmount, _alt_id, _memo } = cardDataPool;


  const gettingData = (item) => {
    if (checkPool) {
      setCardDataPool(() => ({
        _liquationPrice: item.post_price,
        _colateralizedAsset: item.sym,
        _totalAmount: item.amt,
        _alt_id: (item.alt_id).substring(0, 15),
        _memo: (item.memo).substring(0, 12)
      }));
    } else {
      setCardDataParticipant(() => ({
        withdrawableHedge: item.hedge,
        entryPrice: item.init_price,
        markPrice: item.current_price,
        roe: (item.current_price / item.settlement_price).toFixed(2),
        liquationPrice: (item.settlement_price).toFixed(2),
        colateralizedAsset: item.sym,
        allocatedMargin: item.init_amt,
        totalAmount: item.current_price,
        alt_id: (item.alt_id).substring(0, 15),
        memo: (item.memo).substring(0, 12)
      }));
    }
  };

  const [asset, setAsset] = useState([]);
  const [coin, setCoin] = useState("Select coin");

  function asset_list() {
    fetch("https://flitchcoin.com/api/asset_list", {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => {
      result.json().then((res) => {
        let tmpArray = [];
        res.map((items) => {
          for (let i = 0; i < 1; i++) {
            tmpArray.push(items);
          }
        });
        setAsset([...tmpArray]);
      });
    });
  };

  const [amount, setAmount] = useState("");

  const closeOrder = () => {
    var data = JSON.stringify({
      "memo": cardDataParticipant.memo
    })
    fetch("https://flitchcoin.com/api/order", {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
        'Content-Type': 'application/json'
      },
      body: data
    }).then((result) => {
      result.json().then((res) => {
        console.log(res)
      });
    }).catch(err => console.log(err));
  };

  const addMargin = () => {
    var data = JSON.stringify({
      "memo": cardDataParticipant.memo,
      "amount": Number(amount),
      "hedge": cardDataParticipant.withdrawableHedge
    })
    fetch("https://flitchcoin.com/api/add/margin", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
        'Content-Type': 'application/json'
      },
      body: data
    }).then((result) => {
      result.json().then((res) => {
        console.log(res)
      });
    }).catch(err => console.log(err));
  };

  const removeMargin = () => {
    var data = JSON.stringify({
      "memo": cardDataParticipant.memo,
      "amount": Number(amount),
      "hedge": cardDataParticipant.withdrawableHedge
    })
    fetch("https://flitchcoin.com/api/remove/margin", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`,
        'Content-Type': 'application/json'
      },
      body: data
    }).then((result) => {
      result.json().then((res) => {
        console.log(res)
      });
    }).catch(err => console.log(err));
  };

  return (
    <div className="container">
      <div className="row  mt-5 mb-5">
        <div className="col-xl-7 me-5">
          <div className="row mb-5">
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
          <div className="row enable_scroll_4 ps-3 pe-3">
            {
              type === "Open Positions" ?
                <>
                  {
                    openPositionDataParticipant.map(i => {
                      return (
                        <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                          <div className="row">
                            <div className="text-end">
                              <input type="radio" name='data' className='data_radio' />
                            </div>
                            <div className="col-xl-6 col-12">
                              <p>- Date and time :&nbsp;&nbsp; {(i.time_duration).replace("T", "    ")} </p>
                              <p>- Total amount :&nbsp;&nbsp;&nbsp; {i.current_price}</p>
                              <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                              <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                            </div>
                            <div className="col-xl-2">
                              <img src={bit_img} className="bit_img" />
                              <div className="v_line"></div>
                            </div>
                            <div className="col-xl-4 col-12">
                              <p>- Liq. Price : &nbsp;&nbsp;{(i.settlement_price).toFixed(2)}</p>
                              <p>- % ROE : &nbsp;&nbsp;&nbsp;{(i.current_price / i.settlement_price).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  {
                    openPositionDataPool.map(i => {
                      return (
                        <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                          <div className="row">
                            <div className="text-end">
                              <input type="radio" name='data' className='data_radio' />
                            </div>
                            <div className="col-xl-6 col-12">
                              <p>- Date and time :&nbsp;&nbsp; {i.time_duration} </p>
                              <p>- Total amount :&nbsp;&nbsp;&nbsp; {i.amt}</p>
                              <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                            </div>
                            <div className="col-xl-2">
                              <img src={bit_img} className="bit_img" />
                              <div className="v_line"></div>
                            </div>
                            <div className="col-xl-4 col-12">
                              <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                              <p>- Liq. Price : &nbsp;&nbsp;{(i.post_price).toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </> :
                <>
                  {
                    type === "Open Orders" ?
                      <>
                        {
                          openOrderDataParticipant.map(i => {
                            return (
                              <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                <div className="row">
                                  <div className="text-end">
                                    <input type="radio" name='data' className='data_radio' />
                                  </div>
                                  <div className="col-xl-6 col-12">
                                    <p>- Date and time : &nbsp;&nbsp;{(i.time_duration).replace("T", "    ")} </p>
                                    <p>- Total amount : &nbsp;&nbsp;&nbsp;{i.current_price}</p>
                                    <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                    <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                  </div>
                                  <div className="col-xl-2">
                                    <img src={bit_img} className="bit_img" />
                                    <div className="v_line"></div>
                                  </div>
                                  <div className="col-xl-4 col-12">
                                    <p>- Liq. Price : &nbsp;&nbsp;{(i.settlement_price).toFixed(2)}</p>
                                    <p>- % ROE : &nbsp;&nbsp;&nbsp;{(i.current_price / i.settlement_price).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                        {
                          openOrderDataPool.map(i => {
                            return (
                              <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                <div className="row">
                                  <div className="text-end">
                                    <input type="radio" name='data' className='data_radio' />
                                  </div>
                                  <div className="col-xl-6 col-12">
                                    <p>- Date and time :&nbsp;&nbsp; {i.time_duration} </p>
                                    <p>- Total amount :&nbsp;&nbsp;&nbsp; {i.amt}</p>
                                    <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                  </div>
                                  <div className="col-xl-2">
                                    <img src={bit_img} className="bit_img" />
                                    <div className="v_line"></div>
                                  </div>
                                  <div className="col-xl-4 col-12">
                                    <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                    <p>- Liq. Price : &nbsp;&nbsp;{(i.post_price).toFixed(2)}</p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </> :
                      <>
                        {
                          type === "History" ?
                            <>
                              {
                                openPositionDataParticipant.map(i => {
                                  return (
                                    <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                      <div className="row">
                                        <div className="text-end">
                                          <input type="radio" name='data' className='data_radio' />
                                        </div>
                                        <div className="col-xl-6 col-12">
                                          <p>- Date and time : &nbsp;&nbsp;{(i.time_duration).replace("T", "    ")} </p>
                                          <p>- Total amount : &nbsp;&nbsp;&nbsp;{i.current_price}</p>
                                          <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                          <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                        </div>
                                        <div className="col-xl-2">
                                          <img src={bit_img} className="bit_img" />
                                          <div className="v_line"></div>
                                        </div>
                                        <div className="col-xl-4 col-12">
                                          <p>- Liq. Price : &nbsp;&nbsp;{(i.settlement_price).toFixed(2)}</p>
                                          <p>- % ROE : &nbsp;&nbsp;&nbsp;{(i.current_price / i.settlement_price).toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              {
                                openPositionDataPool.map(i => {
                                  return (
                                    <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                      <div className="row">
                                        <div className="text-end">
                                          <input type="radio" name='data' className='data_radio' />
                                        </div>
                                        <div className="col-xl-6 col-12">
                                          <p>- Date and time :&nbsp;&nbsp; {i.time_duration} </p>
                                          <p>- Total amount :&nbsp;&nbsp;&nbsp; {i.amt}</p>
                                          <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                        </div>
                                        <div className="col-xl-2">
                                          <img src={bit_img} className="bit_img" />
                                          <div className="v_line"></div>
                                        </div>
                                        <div className="col-xl-4 col-12">
                                          <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                          <p>- Liq. Price : &nbsp;&nbsp;{(i.post_price).toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              {
                                openOrderDataParticipant.map(i => {
                                  return (
                                    <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                      <div className="row">
                                        <div className="text-end">
                                          <input type="radio" name='data' className='data_radio' />
                                        </div>
                                        <div className="col-xl-6 col-12">
                                          <p>- Date and time : &nbsp;&nbsp;{(i.time_duration).replace("T", "    ")} </p>
                                          <p>- Total amount : &nbsp;&nbsp;&nbsp;{i.current_price}</p>
                                          <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                          <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                        </div>
                                        <div className="col-xl-2">
                                          <img src={bit_img} className="bit_img" />
                                          <div className="v_line"></div>
                                        </div>
                                        <div className="col-xl-4 col-12">
                                          <p>- Liq. Price : &nbsp;&nbsp;{(i.settlement_price).toFixed(2)}</p>
                                          <p>- % ROE : &nbsp;&nbsp;&nbsp;{(i.current_price / i.settlement_price).toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                              {
                                openOrderDataPool.map(i => {
                                  return (
                                    <div className="card back mt-3 mb-4 text_for_order parent_card p-4" onClick={() => gettingData(i)}>
                                      <div className="row">
                                        <div className="text-end">
                                          <input type="radio" name='data' className='data_radio' />
                                        </div>
                                        <div className="col-xl-6 col-12">
                                          <p>- Date and time :&nbsp;&nbsp; {i.time_duration} </p>
                                          <p>- Total amount :&nbsp;&nbsp;&nbsp; {i.amt}</p>
                                          <p>- Memo :&nbsp;&nbsp;&nbsp; {i.memo}</p>
                                        </div>
                                        <div className="col-xl-2">
                                          <img src={bit_img} className="bit_img" />
                                          <div className="v_line"></div>
                                        </div>
                                        <div className="col-xl-4 col-12">
                                          <p>- Colateralized Asset : &nbsp;&nbsp;&nbsp;{i.sym}</p>
                                          <p>- Liq. Price : &nbsp;&nbsp;{(i.post_price).toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </> :
                            <></>
                        }
                      </>
                  }
                </>
            }
          </div>
        </div>
        <div className="col-xl-4">
          <div className="text-end">
            <button className="close_btn mb-5 p-2 ps-5 pe-5">
              Close all orders
            </button>
          </div>
          {
            type === "Open Positions" ?
              <>
                <div className="card back special_card_account">
                  <p className="welcome_1 text-center">Manage Position</p>
                  {
                    checkPool ?
                      <>
                        {
                          cardDataPool._memo === "" ?
                            <>
                              <p className="plain_text text-center">Select from orders to proceed.</p>
                            </> :
                            <>
                              <div className="row text_for_order">
                                <div className="col-7 ps-5">
                                  <p >Liquation Price : </p>
                                  <p >Colateralized Asset : </p>
                                  <p >Total Amount USD : </p>
                                  <p >Alt_id : </p>
                                  <p >Memo : </p>
                                </div>
                                <div className="col-5">
                                  <p >{cardDataPool._liquationPrice}</p>
                                  <p >{cardDataPool._colateralizedAsset}</p>
                                  <p >{cardDataPool._totalAmount}</p>
                                  <p >{cardDataPool._alt_id} ...</p>
                                  <p >{cardDataPool._memo} ...</p>
                                </div>
                              </div>
                            </>
                        }
                      </> :
                      <>
                        {
                          cardDataParticipant.withdrawableHedge === "" ?
                            <>
                              <p className="plain_text text-center">Select from orders to proceed.</p>
                            </> :
                            <>
                              <div className="row text_for_order">
                                <div className="col-7 ps-5">
                                  <p >Withdrawable Hedge : </p>
                                  <p >Entry Price : </p>
                                  <p >Mark Price : </p>
                                  <p >PNL ( % ROE ) : </p>
                                  <p >Liquation Price : </p>
                                  <p >Colateralized Asset : </p>
                                  <p >Allocated Margin : </p>
                                  <p >Total Amount USD : </p>
                                  <p >Alt_id : </p>
                                  <p >Memo : </p>
                                </div>
                                <div className="col-5">
                                  <p >{cardDataParticipant.withdrawableHedge}</p>
                                  <p >{cardDataParticipant.entryPrice}</p>
                                  <p >{cardDataParticipant.markPrice}</p>
                                  <p >{cardDataParticipant.roe}</p>
                                  <p >{cardDataParticipant.liquationPrice}</p>
                                  <p >{cardDataParticipant.colateralizedAsset}</p>
                                  <p >{cardDataParticipant.allocatedMargin}</p>
                                  <p >{cardDataParticipant.totalAmount}</p>
                                  <p >{cardDataParticipant.alt_id} ...</p>
                                  <p >{cardDataParticipant.memo} ...</p>
                                </div>
                              </div>
                              <div className="row p-4">
                                <p className="welcome_1 text-center">Adjust Margin</p>
                                <p className="">Select currency :&nbsp; &nbsp; &nbsp;
                                  <div className="btn-group">
                                    <button
                                      type="button"
                                      className="btn btn-dark dropdown-toggle ps-4 round-btn w-50"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <b>{coin}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                                    </button>
                                    <ul className="dropdown-menu drop">
                                      {asset.map(items => {
                                        return (
                                          <div>
                                            <li className="list-items" onClick={() => setCoin(items)}>{items}</li>
                                          </div>
                                        )
                                      })}
                                    </ul>
                                  </div>
                                </p>
                                <div className="row mb-4">
                                  <div className="col-3">
                                    <button className="round-btn ps-3 pe-3">10%</button>
                                  </div>
                                  <div className="col-3">
                                    <button className="round-btn ps-3 pe-3">25%</button>
                                  </div>
                                  <div className="col-3">
                                    <button className="round-btn ps-3 pe-3">50%</button>
                                  </div>
                                  <div className="col-3">
                                    <button className="round-btn ps-3 pe-2">100%</button>
                                  </div>
                                </div>
                                <div className="col-12">
                                  <div className="input1 w-100">
                                    <input
                                      type="number"
                                      name="amount"
                                      placeholder="Margin Amount:             "
                                      className="input_login txt-underline p-3 mb-3"
                                      value={amount}
                                      onChange={e => setAmount(e.target.value)}
                                      style={{ width: "80%" }}
                                    />&nbsp;&nbsp;&nbsp;<span className="plain_text">
                                      {
                                        coin === "Select coin" ?
                                          <>coin</> : <>{coin}</>
                                      }</span>
                                    <span className="underline"></span>
                                  </div>
                                </div>
                                <div className="col-6">
                                  <button className="round-btn margin_btn" onClick={addMargin}>
                                    Add Margin
                                  </button>
                                </div>
                                <div className="col-6">
                                  <button className="round-btn margin_btn" onClick={removeMargin}>
                                    Remove Margin
                                  </button>
                                </div>
                              </div>
                            </>
                        }
                      </>
                  }

                </div>
              </> :
              <>
                {
                  type == "Open Orders" ?
                    <>
                      <div className="card back special_card_account">
                        <p className="welcome_1 text-center">Manage Order</p>
                        {
                          checkPool ?
                            <>
                              {
                                cardDataPool._memo === "" ?
                                  <>
                                    <p className="plain_text text-center">Select from orders to proceed.</p>
                                  </> :
                                  <>
                                    <div className="row text_for_order">
                                      <div className="col-7 ps-5">
                                        <p >Liquation Price : </p>
                                        <p >Colateralized Asset : </p>
                                        <p >Total Amount USD : </p>
                                        <p >Alt_id : </p>
                                        <p >Memo : </p>
                                      </div>
                                      <div className="col-5">
                                        <p >{cardDataPool._liquationPrice}</p>
                                        <p >{cardDataPool._colateralizedAsset}</p>
                                        <p >{cardDataPool._totalAmount}</p>
                                        <p >{cardDataPool._alt_id} ...</p>
                                        <p >{cardDataPool._memo} ...</p>
                                      </div>
                                    </div>
                                  </>
                              }
                            </> :
                            <>
                              {
                                cardDataParticipant.withdrawableHedge === "" ?
                                  <>
                                    <p className="plain_text text-center">Select from orders to proceed.</p>
                                  </> :
                                  <>
                                    <div className="row text_for_order">
                                      <div className="col-7 ps-5">
                                        <p >Withdrawable Hedge : </p>
                                        <p >Entry Price : </p>
                                        <p >Mark Price : </p>
                                        <p >PNL ( % ROE ) : </p>
                                        <p >Liquation Price : </p>
                                        <p >Colateralized Asset : </p>
                                        <p >Allocated Margin : </p>
                                        <p >Total Amount USD : </p>
                                        <p >Alt_id : </p>
                                        <p >Memo : </p>
                                      </div>
                                      <div className="col-5">
                                        <p >{cardDataParticipant.withdrawableHedge}</p>
                                        <p >{cardDataParticipant.entryPrice}</p>
                                        <p >{cardDataParticipant.markPrice}</p>
                                        <p >{cardDataParticipant.roe}</p>
                                        <p >{cardDataParticipant.liquationPrice}</p>
                                        <p >{cardDataParticipant.colateralizedAsset}</p>
                                        <p >{cardDataParticipant.allocatedMargin}</p>
                                        <p >{cardDataParticipant.totalAmount}</p>
                                        <p >{cardDataParticipant.alt_id} ...</p>
                                        <p >{cardDataParticipant.memo} ...</p>
                                      </div>
                                    </div>
                                  </>
                              }
                            </>
                        }
                        <div className="text-center mt-5 mb-5">
                          <buttton className="close_btn w-50 p-2 ps-5 pe-5" onClick={closeOrder}>
                            Close this order
                          </buttton>
                        </div>
                      </div>
                    </> :
                    <>
                      {
                        type == "History" ?
                          <>
                            <div className="card back special_card_account">
                              <p className="welcome_1 text-center">History</p>
                              {
                                checkPool ?
                                  <>
                                    {
                                      cardDataPool._memo === "" ?
                                        <>
                                          <p className="plain_text text-center">Select from orders to proceed.</p>
                                        </> :
                                        <>
                                          <div className="row text_for_order">
                                            <div className="col-7 ps-5">
                                              <p >Liquation Price : </p>
                                              <p >Colateralized Asset : </p>
                                              <p >Total Amount USD : </p>
                                              <p >Alt_id : </p>
                                              <p >Memo : </p>
                                            </div>
                                            <div className="col-5">
                                              <p >{cardDataPool._liquationPrice}</p>
                                              <p >{cardDataPool._colateralizedAsset}</p>
                                              <p >{cardDataPool._totalAmount}</p>
                                              <p >{cardDataPool._alt_id} ...</p>
                                              <p >{cardDataPool._memo} ...</p>
                                            </div>
                                          </div>
                                        </>
                                    }
                                  </> :
                                  <>
                                    {
                                      cardDataParticipant.withdrawableHedge === "" ?
                                        <>
                                          <p className="plain_text text-center">Select from orders to proceed.</p>
                                        </> :
                                        <>
                                          <div className="row text_for_order">
                                            <div className="col-7 ps-5">
                                              <p >Withdrawable Hedge : </p>
                                              <p >Entry Price : </p>
                                              <p >Mark Price : </p>
                                              <p >PNL ( % ROE ) : </p>
                                              <p >Liquation Price : </p>
                                              <p >Colateralized Asset : </p>
                                              <p >Allocated Margin : </p>
                                              <p >Total Amount USD : </p>
                                              <p >Alt_id : </p>
                                              <p >Memo : </p>
                                            </div>
                                            <div className="col-5">
                                              <p >{cardDataParticipant.withdrawableHedge}</p>
                                              <p >{cardDataParticipant.entryPrice}</p>
                                              <p >{cardDataParticipant.markPrice}</p>
                                              <p >{cardDataParticipant.roe}</p>
                                              <p >{cardDataParticipant.liquationPrice}</p>
                                              <p >{cardDataParticipant.colateralizedAsset}</p>
                                              <p >{cardDataParticipant.allocatedMargin}</p>
                                              <p >{cardDataParticipant.totalAmount}</p>
                                              <p >{cardDataParticipant.alt_id} ...</p>
                                              <p >{cardDataParticipant.memo} ...</p>
                                            </div>
                                          </div>
                                        </>
                                    }
                                  </>
                              }
                            </div>
                          </> :
                          <></>
                      }
                    </>
                }
              </>
          }
        </div>
      </div>
    </div>
  );
};

export default Order;
