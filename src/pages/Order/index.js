import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchToken } from "../../Auth";

const Order = () => {
  const { selectedType } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [type, setType] = useState("otherUser");
  const [currentCoin, setCurrentCoin] = useState("");
  const [formData, setFormData] = useState({
    wallet_address_ours: "",
    memo: "",
    pay_id: "",
    binance_id: "",
    email_id: "",
    phone_no: "",
    wallet_add: "",
    trans_id: "",
    amount: "",
  });
  const {
    wallet_address_ours,
    memo,
    pay_id,
    binance_id,
    email_id,
    phone_no,
    wallet_add,
    trans_id,
    amount,
  } = formData;

  const coinHandler = (e) => {
    var data = JSON.stringify({
      coin_name: currentCoin,
    });
    fetch("http://127.0.0.1:8000/wallet_address/", {
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
        console.log(result);
        setFormData({
          wallet_address_ours: result.address,
          memo: result.tag,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    var b_data = JSON.stringify({
      sym: currentCoin,
      network: "string",
      wallet_add: wallet_add,
      memo: memo,
      bin_pay: false,
      pay_id: pay_id,
      binance_id: binance_id,
      email_id: email_id,
      phone_no: phone_no,
      amount: amount,
    });
    if (selectedType === "participant") {
      fetch("http://127.0.0.1:8000/L_demand/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${fetchToken()}`,
        },
        body: b_data,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("in participant", result);
        })
        .catch((err) => console.log(err));
    } else if (selectedType === "pool") {
      fetch("http://127.0.0.1:8000/L_suppply/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${fetchToken()}`,
        },
        body: b_data,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("in pool", result);
        })
        .catch((err) => console.log(err));
    }
    var trans = JSON.stringify({
      trans_id: trans_id,
    });
    fetch("http://127.0.0.1:8000/trans_id", {
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

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    navigate("/escrow");
    setFormData({ ...formData });
  };

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
                        tabindex="-1"
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
                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" checked />
                <label className="btn btn-outline-light text-dark shadow w-100" for="success-outlined" onClick={() => setType("otherUser")}>Other User</label>
              </div>
              <div className="col col-2"></div>
              <div className="col col-5">
                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" />
                <label className="btn btn-outline-light text-dark shadow w-100" for="danger-outlined" onClick={() => setType("binanceUser")}>Binance User</label>
              </div>
            </div>
            {type === "otherUser" ? (
              <div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100 input pressed"
                    placeholder="Wallet address"
                    onChange={onChange}
                    name="pay_id"
                    value={pay_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Wallet memo"
                    onChange={onChange}
                    name="binance_id"
                    value={binance_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="email"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Inserted coin"
                    onChange={onChange}
                    name="email_id"
                    value={email_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Inserted Network"
                    onChange={onChange}
                    name="phone_no"
                    value={phone_no}
                  />
                  <span className="underline"></span>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="primary mt-3 mb-3"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop1"
                  >
                    Confirm
                  </button>
                  <div
                    className="modal fade shadow"
                    id="staticBackdrop1"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered dialog">
                      <div className="modal-content back shadow">
                        <div className="modal-body">
                          <div className="input1 w-100">
                            <input
                              type="text"
                              className="txt-underline p-3 mb-3 w-100  input pressed"
                              placeholder="Place Transaction id"
                              onChange={onChange}
                              name="phone_no"
                              value={phone_no}
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
                          <button type="button" className="primary">
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100 input pressed"
                    placeholder="Pay Id"
                    onChange={onChange}
                    name="pay_id"
                    value={pay_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Email Id"
                    onChange={onChange}
                    name="binance_id"
                    value={binance_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="email"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Phone number"
                    onChange={onChange}
                    name="email_id"
                    value={email_id}
                  />
                  <span className="underline"></span>
                </div>
                <div className="input1 w-100">
                  <input
                    type="text"
                    className="txt-underline p-3 mb-3 w-100  input pressed"
                    placeholder="Binance Id"
                    onChange={onChange}
                    name="phone_no"
                    value={phone_no}
                  />
                  <span className="underline"></span>
                </div>
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
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered dialog">
                      <div className="modal-content back shadow">
                        <div className="modal-body">
                          <div className="input1 w-100">
                            <input
                              type="text"
                              className="txt-underline p-3 mb-3 w-100  input pressed"
                              placeholder="Place Transaction id"
                              onChange={onChange}
                              name="phone_no"
                              value={phone_no}
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
                          <button type="button" className="primary">
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
