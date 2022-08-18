import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchToken } from "../../Auth";
import { QRCodeSVG } from 'qrcode.react';

const Order = () => {
  const { selectedType } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [type, setType] = useState("otherUser");
  const [network, setNetwork] = useState("Select Network");
  const [network1, setNetwork1] = useState("Select Network");
  const [qr,setQr] = useState();
  const [trans_id, setTrans_id] = useState();

  const coinHandler = (e) => {
    var data = JSON.stringify({
      "coin_name": "btc",
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
        console.log("result from wallet_address", result);
        setQr(result.address)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    var trans = JSON.stringify({
      trans_id: trans_id,
    });
    fetch("http://34.73.24.72/trans_id", {
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
      "string": "btc"
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
  }, []);

  useEffect(() => {
    coinHandler();
  }, [network1 != 'Select Network'])

  return (


    <div className="back shadow">
      <div className="container">
        <div className="row">
          <div className="col col-md-8">
            <div className="card back mt-5 mb-5 p-2">
              <div className="card-body">
                <div className="escrow__body">
                  <div className=" text-center">
                    <h4>
                      <u>
                        <b>USER</b>
                      </u>
                    </h4>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="primary mt-5 mb-2"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
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
                                className="primary me-4"
                                data-bs-dismiss="modal"
                              >
                                No
                              </button>
                              <button type="button" className="primary">
                                Yes
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="vl"></div>
                  </div>
                  <div className="text-center">
                    <h4>
                      <u>
                        <b>Memo of Transaction</b>
                      </u>
                    </h4>
                    <button
                      className="primary mt-5 mb-2 "
                      onClick={() => navigate("/Dashboard")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                  <div className="">
                    <div className="vl"></div>
                  </div>
                  <div className="">
                    <h4>
                      <u>
                        <b>POOLS</b>
                      </u>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-4 card mt-5 back mb-3">
            <div className="row pt-3 pb-3">
              <div className="col col-5">
                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" checked />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="success-outlined" onClick={() => setType("otherUser")}>Other User</label>
              </div>
              <div className="col col-2"></div>
              <div className="col col-5">
                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="danger-outlined" onClick={() => setType("binanceUser")}>Binance User</label>
              </div>
              <QRCodeSVG
                value={qr}
                className="mt-5"
              />
            </div>
            {type === "otherUser" ? (
              <div>
                <h6 className="mt-4"><u>Wallet address :</u></h6>
                <h4>h45bhjhlb4lbb4h5664hvjrk4v4kk</h4>
                <h6 className="mt-4"><u>Wallet memo :</u></h6>
                <h4>h45bhjhlb4lbb4h5664hvjrk4v4kk</h4>
                <h6 className="mt-4"><u>Inserted Coin :</u></h6>
                <h4>BTC</h4>
                <div className="col col-xs-12 col-lg-7 mb-5 mt-4 btn-group">
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
              </div>
            ) : (
              <div>
                <h6 className="mt-4"><u>Our Pay Id :</u></h6>
                <h4>h45bhjhlb4lbb4h5664hvjrk4v4kk</h4>
                <h6 className="mt-4"><u>Our Email address :</u></h6>
                <h4>logicallops@gmail.com</h4>
                <h6 className="mt-4"><u>Our Phone no. :</u></h6>
                <h4>xxx - xxxx - xxx</h4>
                <h6 className="mt-4"><u>Our Binance Id :</u></h6>
                <h4>h45bhjhlb4lbb4h5664hvjrk4v4kk</h4>
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
                    className="modal fade shadow"
                    id="staticBackdrop2"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered dialog">
                      <div className="modal-content back shadow">
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
        </div>
      </div>
    </div>
  );
};

export default Order;
