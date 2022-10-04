import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchToken } from "../../Auth";
import { QRCodeSVG } from 'qrcode.react';

const Order = () => {
  const { selectedCoin } = useSelector((state) => state.order);
  const { selectedOrderType } = useSelector((state) => state.order);
  const { selectedMemo } = useSelector((state) => state.order);

  const navigate = useNavigate();
  const [type, setType] = useState("otherUser");
  const [network, setNetwork] = useState("Select Network");
  const [network1, setNetwork1] = useState("Select Network");
  const [qr, setQr] = useState();
  const [trans_id, setTrans_id] = useState();
  const [memo, setMemo] = useState();
  const [state, setState] = useState();

  const [ temp, setTemp] = useState()

  useEffect(() => {
    setTemp(selectedCoin)
  },[temp === null])

  const coinHandler = (e) => {
    var data = JSON.stringify({
      "coin_name": selectedCoin,
      "network": network1
    });
    fetch("http://34.73.24.72/wallet_address/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        setQr(result.address);
        setMemo(result.tag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isRepayment, setIsRepayment] = useState(false);
  const [isMargin, setIsMargin] = useState(false);

  useEffect(() => {
    if (selectedOrderType === "repayment") {
      setIsRepayment(true);
    }
    if (selectedOrderType === "margin") {
      setIsMargin(true);
    }
  }, [coinHandler]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (selectedOrderType === "order") {
      var trans = JSON.stringify({
        "trans_id": trans_id,
        "memo": memo
      });
    } else {
      trans = JSON.stringify({
        "trans_id": trans_id,
        "memo": selectedMemo,
        "repayment": isRepayment,
        "margin": isMargin
      });
    }
    console.log(trans);
    fetch("http://34.73.24.72/validate_transaction", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: trans,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  };

  function network_list() {
    var data = JSON.stringify({
      "string": temp
    })
    fetch("http://34.73.24.72/network", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((res) => res.json()
        .then((result) => {
          let tmpArray = [];
          result.map((items) => {
            for (let i = 0; i < 1; i++) {
              tmpArray.push(items);
            }
          });
          setNetwork([...tmpArray]);
        }))
      .catch((err) => {
        console.log(err);
      });
  }

  const onChange = (e) => {
    setTrans_id(e.target.value);
  }

  useEffect(() => {
    network_list();
  }, [temp]);

  useEffect(() => {
    coinHandler();
  }, [network1 !== 'Select Network']);

  const display_card = () => {
    if (state === "add_card") {
      setState("");
    } else {
      setState("add_card");
    }
  }

  return (
    <div className="back shadow">
      <div className="container">
        <div className="row">
          <div className="col col-md-1"></div>
          {selectedOrderType === "order" || selectedOrderType === null ? (
            <div className="col col-md-6 col-xs-12">
              <div className="card back mt-5 mb-5 p-2">
                <div className="card-body" onClick={display_card}>
                  <div className="escrow__body">
                    <div className=" text-center">
                      <h6>USER</h6>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="primary mt-5 mb-2 ps-4 pe-4"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          style={{ fontSize: '12px' }}
                        >
                          CANCEL
                        </button>
                        <div
                          className="modal1 modal fade shadow"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered dialog">
                            <div className="modal-content back shadow">
                              <div className="modal-body">
                                <b>Are you sure you want to cancel?</b>
                                <br />
                                <br />
                                <button
                                  type="button"
                                  className="primary me-4 ps-4 pe-4"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button type="button" className="primary ps-4 pe-4">
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h6>Memo of Transaction</h6>
                      <button
                        className="primary mt-5 mb-2 ps-4 pe-4"
                        onClick={() => navigate("/Dashboard")}
                        style={{ fontSize: '12px' }}
                      >
                        Go to Dashboard
                      </button>
                    </div>
                    <div className="text-center">
                      <h6>POOLS</h6>
                    </div>
                  </div>
                </div>
              </div>
              {state === "add_card" ?
                <>
                  <div className="card back1 mt-5 mb-5 p-2">
                    <div className="card-body">
                      <div className="escrow__body">
                        <div className=" text-center">
                          <h6 className="text-white">USER</h6>
                          <div className="d-flex justify-content-end">
                            <button
                              type="button"
                              className="primary mt-5 mb-2 ps-4 pe-4"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              style={{ fontSize: '12px' }}
                            >
                              CANCEL
                            </button>
                            <div
                              className="modal fade shadow"
                              id="staticBackdrop"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered dialog">
                                <div className="modal-content back shadow">
                                  <div className="modal-body">
                                    <b>Are you sure you want to cancel?</b>
                                    <br />
                                    <br />
                                    <button
                                      type="button"
                                      className="primary me-4 ps-4 pe-4"
                                      data-bs-dismiss="modal"
                                    >
                                      No
                                    </button>
                                    <button type="button" className="primary ps-4 pe-4">
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="text-white">Memo of Transaction</h6>
                          <h4 className="text-white">{selectedMemo}</h4>
                          <button
                            className="primary mt-5 mb-2 ps-4 pe-4"
                            onClick={() => navigate("/Dashboard")}
                            style={{ fontSize: '12px' }}
                          >
                            Go to Dashboard
                          </button>
                        </div>
                        <div className="text-center">
                          <h6 className="text-white">POOLS</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card back2 mt-5 mb-5 p-2">
                    <div className="card-body">
                      <div className="escrow__body">
                        <div className=" text-center">
                          <h6 className="text-white">USER</h6>
                          <div className="d-flex justify-content-end">
                            <button
                              type="button"
                              className="primary mt-5 mb-2 ps-4 pe-4"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                              style={{ fontSize: '12px' }}
                            >
                              CANCEL
                            </button>
                            <div
                              className="modal fade shadow"
                              id="staticBackdrop"
                              data-bs-backdrop="static"
                              data-bs-keyboard="false"
                              tabIndex="-1"
                              aria-labelledby="staticBackdropLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog modal-dialog-centered dialog">
                                <div className="modal-content back shadow">
                                  <div className="modal-body">
                                    <b>Are you sure you want to cancel?</b>
                                    <br />
                                    <br />
                                    <button
                                      type="button"
                                      className="primary me-4 ps-4 pe-4"
                                      data-bs-dismiss="modal"
                                    >
                                      No
                                    </button>
                                    <button type="button" className="primary ps-4 pe-4">
                                      Yes
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <h6 className="text-white">Memo of Transaction</h6>
                          <h4 className="text-white">{selectedMemo}</h4>
                          <button
                            className="primary mt-5 mb-2 ps-4 pe-4"
                            onClick={() => navigate("/Dashboard")}
                            style={{ fontSize: '12px' }}
                          >
                            Go to Dashboard
                          </button>
                        </div>
                        <div className="text-center">
                          <h6 className="text-white">POOLS</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                : <></>}
            </div>
          ) : <></>}
          {selectedOrderType === "margin" ? (
            <div className="col col-md-6 col-xs-12">
              <div className="card back1 mt-5 mb-5 p-2">
                <div className="card-body">
                  <div className="escrow__body">
                    <div className=" text-center">
                      <h6 className="text-white">USER</h6>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="primary mt-5 mb-2 ps-4 pe-4"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          style={{ fontSize: '12px' }}
                        >
                          CANCEL
                        </button>
                        <div
                          className="modal fade shadow"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered dialog">
                            <div className="modal-content back shadow">
                              <div className="modal-body">
                                <b>Are you sure you want to cancel?</b>
                                <br />
                                <br />
                                <button
                                  type="button"
                                  className="primary me-4 ps-4 pe-4"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button type="button" className="primary ps-4 pe-4">
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white">Memo of Transaction</h6>
                      <h4 className="text-white">{selectedMemo}</h4>
                      <button
                        className="primary mt-5 mb-2 ps-4 pe-4"
                        onClick={() => navigate("/Dashboard")}
                        style={{ fontSize: '12px' }}
                      >
                        Go to Dashboard
                      </button>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white">POOLS</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
          {selectedOrderType === "repayment" ? (
            <div className="col col-md-6 col-xs-12">
              <div className="card back2 mt-5 mb-5 p-2">
                <div className="card-body">
                  <div className="escrow__body">
                    <div className=" text-center">
                      <h6 className="text-white">USER</h6>
                      <div className="d-flex justify-content-end">
                        <button
                          type="button"
                          className="primary mt-5 mb-2 ps-4 pe-4"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          style={{ fontSize: '12px' }}
                        >
                          CANCEL
                        </button>
                        <div
                          className="modal fade"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog modal-dialog-centered dialog">
                            <div className="modal-content back card">
                              <div className="modal-body">
                                <b>Are you sure you want to cancel?</b>
                                <br />
                                <br />
                                <button
                                  type="button"
                                  className="primary me-4 ps-4 pe-4"
                                  data-bs-dismiss="modal"
                                >
                                  No
                                </button>
                                <button type="button" className="primary ps-4 pe-4">
                                  Yes
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white">Memo of Transaction</h6>
                      <h4 className="text-white">{selectedMemo}</h4>
                      <button
                        className="primary mt-5 mb-2 ps-4 pe-4"
                        onClick={() => navigate("/Dashboard")}
                        style={{ fontSize: '12px' }}
                      >
                        Go to Dashboard
                      </button>
                    </div>
                    <div className="text-center">
                      <h6 className="text-white">POOLS</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : <></>}
          <div className="col col-md-1"></div>
          <div className="col col-md-3 col-sm-12 card mt-5 back mb-3">
            <div className="row pt-3 pb-3">
              <div className="col col-6">
                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" checked />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="success-outlined" onClick={() => setType("otherUser")}>Other User</label>
              </div>
              <div className="col col-6">
                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="danger-outlined" onClick={() => setType("binanceUser")}>Binance User</label>
              </div>
              <QRCodeSVG
                value={qr}
                className="mt-5"
                size = {150}
              />
            </div>
            {type === "otherUser" ? (
              <div>
                <div className="col col-xs-12 col-lg-7 mt-4 w-100 btn-group">
                  <button
                    type="button"
                    className="btn btn-dark dropdown-toggle w-100 "
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <b>{network1}</b>
                  </button>
                  <ul className="dropdown-menu drop1 back" >
                    {network === 'Select Network' ?
                      <div>
                        <li className="list-items">Please select a Coin</li>
                      </div>
                      :
                      <div>
                        {network.map(items => {
                          return (
                            <li className="list-items" onClick={() => setNetwork1(items)}>{items}</li>
                          )
                        })}
                      </div>
                    }
                  </ul>
                </div>
                <h6 className="mt-4 text-info"><u>Wallet address :</u></h6>
                <h5>{qr === undefined ? (<div className="text-center">-----</div>) : `${qr}`}</h5>
                <h6 className="mt-4 text-info"><u>Wallet memo :</u></h6>
                <h5>{memo === undefined ? (<div className="text-center">-----</div>) : `${memo}`}</h5>
                <h6 className="mt-4 text-info"><u>Inserted Coin :</u></h6>
                <h5 className="mb-4">{selectedCoin}</h5>
              </div>
            ) : (
              <div>
                <h6 className="mt-4 text-info"><u>Our Pay Id :</u></h6>
                <h5>h45bhjhlb4lbb4h5664hvjrk4v4kk</h5>
                <h6 className="mt-4 text-info"><u>Our Email address :</u></h6>
                <h5>logicallops@gmail.com</h5>
                <h6 className="mt-4 text-info"><u>Our Phone no. :</u></h6>
                <h5>xxx - xxxx - xxx</h5>
                <h6 className="mt-4 text-info"><u>Our Binance Id :</u></h6>
                <h5>h45bhjhlb4lbb4h5664hvjrk4v4kk</h5>
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="primary mt-3 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop2"
              >
                Confirm
              </button>
              <div
                className="modal fade"
                id="staticBackdrop2"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered dialog">
                  <div className="modal-content back">
                    <div className="modal-body">
                      <form onSubmit={submitHandler}>
                        <div className="input1 w-100">
                          <input
                            type="text"
                            className="txt-underline p-3 mb-3 w-100  input pressed"
                            placeholder="Place Transaction id"
                            onChange={onChange}
                            name="trans_id"
                            value={trans_id}
                          />
                          <span className="underline"></span>
                        </div>
                        <br />
                        <br />
                        <button
                          type="button"
                          className="primary me-4"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="primary">
                          Confirm
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-1"></div>
        </div>
      </div>
    </div>
  );
};

export default Order;
