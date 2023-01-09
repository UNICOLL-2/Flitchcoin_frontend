import React, { useEffect, useState } from "react";
import { fetchToken } from "../../Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinType } from "../../Feature/Order/orderSlice";
import { orderType } from "../../Feature/Order/orderSlice";
import Toast from 'react-bootstrap/Toast';
import { Modal } from "react-bootstrap";
import wave from "./66615-wave-blue-lines.gif";

const Fields = (props) => {

  const [value, setValue] = useState();
  const [amount, setAmount] = useState();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeValues = (e) => {
    if (e.target.value >= 7 && e.target.value <= 365) {
      setValue(e.target.value);
    }
  };

  const onChangeAmount = (e) => {
    if (e.target.value > 20) {
      setAmount(e.target.value);
    }
  };

  const [lt, setLt] = useState(0);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(false);

  const [priceInUsd, setPriceInUsd] = useState(0);

  const price = () => {
    const sym = (props.sym).toUpperCase();
    fetch(`https://flitchcoin.com/api/prices/${sym}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json()
        .then((result) => {
          setPriceInUsd(result[0]);
        }))
      .catch((err) => {
        console.log(err);
      })
  };

  const [amountToBeConverted, setAmountToBeConverted] = useState(0);

  const getLimit = () => {
    fetch('https://flitchcoin.com/api/account', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      },
    })
      .then((res) => res.json()
        .then((result) => {
          const data = (Object.values(result));
          for (let i = 0; i < data.length; i++) {
            if (data[i].asset === props.sym) {
              setLt(data[i].total);
            }
          }
        }))
      .catch((err) => {
        console.log(err);
      })
  };

  function sendOrder() {
    fetch("https://flitchcoin.com/api/agreement/", {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      }
    }).then((res) => res.json()
      .then((result) => {
        if (result.agreement) {
          if (amountToBeConverted <= 20) {
            setShowA(true);
          } else {
            var data = JSON.stringify({
              "coin": (props.sym).toLowerCase(),
              "amount": amount,
              "duration": value
            });
            fetch('https://flitchcoin.com/api/order', {
              method: 'POST',
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${fetchToken()}`,
              },
              body: data,
            })
              .then((res) => res.json()
                .then((result) => {
                  if (result.status === 200) {
                    dispatch(coinType(props.sym));
                    dispatch(orderType("order"));
                    navigate("/order");
                  }
                }))
              .catch((err) => {
                console.log(err);
              })
          }
        } else {
          setShow(true);
        }
      }))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setAmountToBeConverted(amount * priceInUsd);
  }, [amount]);

  const [repDate, setRepDate] = useState();
  var date = new Date();
  useEffect(() => {
    date.setDate(date.getDate() + value - 72);
    setRepDate(date.toLocaleDateString());
  }, [value]);

  useEffect(() => {
    getLimit();
    price();
  }, [props.sym]);

  const termAccept = () => {
    const data = JSON.stringify({
      "agreement": true
    });
    fetch('https://flitchcoin.com/api/agreement/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${fetchToken()}`,
      },
      body: data,
    })
      .then((res) => res.json()
        .then((result) => {
          sendOrder();
        }))
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <Toast onClose={() => setShowA(false)} className="text-center position-absolute" style={{ zIndex: "11" }} position="top-center" show={showA} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Flitchcoin</strong>
          <small>Amount Barrier !</small>
        </Toast.Header>
        <Toast.Body>Please enter an amount greater than $ 20 to proceed with order.</Toast.Body>
      </Toast>
      <Toast onClose={() => setShowB(false)} className="text-center position-absolute" style={{ zIndex: "11" }} position="top-center" show={showB} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Flitchcoin</strong>
          <small>Terms Declined !</small>
        </Toast.Header>
        <Toast.Body>Please accept the terms to proceed with order.</Toast.Body>
      </Toast>
      <p className="text-muted">Total in Account : {lt}</p>
        <div className="col-12">
          <div className="row">
            <div className="col-3">
              <button className="percent_btn" onClick={() => setAmount(lt * 0.1)}>10%</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setAmount(lt * 0.25)}>25%</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setAmount(lt * 0.5)}>50%</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setAmount(lt)}>100%</button>
            </div>
          </div>
          <div className="row mt-3 mb-2">
            <label for="range">
              <input type="range" name="range" id="range" min="0" max={lt} step={0.01 * amount} value={amount} onChange={(e) => setAmount(e.target.value)} />
            </label>
          </div>
          <div className="input1 w-100">
            <input
              type="number"
              name="amount"
              placeholder="Amount:"
              className="input_order w-100"
              value={amount}
              onChange={onChangeAmount}
            />
          </div>
          <div className="row text-center text-muted"  style={{fontSize: "14px"}}>
            <p>Borrow/Lend : {(amountToBeConverted).toFixed(2)} USD eq.</p>
          </div>
        </div>
        <div className="col-12">
          <div className="row mb-3">
            <div className="col-3">
              <button className="percent_btn" onClick={() => setValue(30)}>1 M</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setValue(90)}>3 M</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setValue(180)}>6 M</button>
            </div>
            <div className="col-3">
              <button className="percent_btn" onClick={() => setValue(365)}>1 Yr</button>
            </div>
          </div>
          <label for="range">
            <input type="range" name="range" id="range" value={value} min='7' max='365' onChange={onChangeValues} />
          </label>
          <div className="input1 w-100 mt-2">
            <input
              type="number"
              name="duration"
              placeholder="Duration:  Days"
              className="input_order w-100"
              value={value}
              onChange={onChangeValues}
            />
          </div>
          <div className="row text-center text-muted" style={{fontSize: "14px"}}>
            <p>Repayment Date : {repDate}</p>
          </div>
        </div>
        <div className="row text-center">
          <div className="d-flex justify-content-center mb-4 ps-2 pe-2">
            <button
              className="primary mt-1 ps-5 pe-5 round-btn place_order_btn "
              style={{ position: "absolute", width: "90%" }}
              onClick={sendOrder}
            >
              Place Order  ${(amountToBeConverted).toFixed(2)}
            </button>
          </div>
          <div className="row text-center text-muted mt-4 pt-4"  style={{fontSize: "14px"}}>
            <p>Total Payble Cost : {amount} {props.sym}</p>
            <p>Total Received : {(amountToBeConverted * 0.75).toFixed(2)} USD eq. Tentative</p>
          </div>
        </div>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <div className="row back">
          <div className="col-4 p_50 fs-2 fw-bold back__animation ">
            <p className="text-dark">Flitch Coin</p>
            <img src={wave} height="350px" width="200px" alt="wave" />
          </div>
          <div className="col-8 welcome__dialog">
            <div className="content_oveflow">
              <div className="modal__header">
                <h1 className="fw-bold modal-title">
                  Welcome to the Flitch Coin site
                </h1>
              </div>
              <div className="modal__body pressed">
                <p className="h6">
                  Please read this page before proceeding, as it explains
                  certain restrictions imposed by law on the distribution of
                  this information and the jurisdictions in which our products
                  and services are authorised to be offered or sold. It is
                  your responsibility to be aware of and to observe all
                  applicable laws and regulations of any relevant
                  jurisdiction.
                </p>
                <p>
                  By entering this site you are agreeing that you have
                  reviewed and agreed to the terms contained herein, including
                  any legal or regulatory restrictions, the Client and Vendor
                  Privacy Notice, which explains how we collect, use, and
                  disclose your personal information and how it is protected,
                  and the Cookie Notice, which explains how we use cookies on
                  our sites.
                </p>
                <p className="h5">Additional Information</p>
                <p>
                  Investment involves risks. Past performance is not a guide
                  to future performance.
                </p>
              </div>
              <div className="modal__footer">
                <Modal.Footer>
                  <button
                    variant="dark"
                    onClick={() => { setShowB(true); setShow(false); }}
                    className="primary"
                  >
                    Decline
                  </button>
                  <button
                    onClick={termAccept}
                    className="primary bg-dark text-white accept"
                  >
                    Accept
                  </button>
                </Modal.Footer>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Fields