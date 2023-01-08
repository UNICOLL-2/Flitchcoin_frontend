import React, { useEffect, useState } from "react";
import { fetchToken } from "../../Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinType } from "../../Feature/Order/orderSlice";
import { orderType } from "../../Feature/Order/orderSlice";

const Fields = (props) => {

  const [value, setValue] = useState();
  const [amount, setAmount] = useState();
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
  };

  useEffect(() => {
    setAmountToBeConverted(amount * priceInUsd);
  },[amount]);

  useEffect(() => {
    getLimit();
    price();
  }, [props.sym]);


  return (
    <>
    <p className="api_text">Total in Account : {lt}</p>
    <div className="mt-4">
      <div className="col-12">
        <div className="row">
          <div className="col-4">
            <button className="percent_btn" onClick={() => setAmount(lt*0.1)}>10%</button>
          </div>
          <div className="col-4">
            <button className="percent_btn" onClick={() => setAmount(lt*0.5)}>50%</button>
          </div>
          <div className="col-4">
            <button className="percent_btn" onClick={() => setAmount(lt)}>100%</button>
          </div>
        </div>
        <div className="row mt-4 mb-2">
          <label for="range">
            <input type="range" name="range" id="range" min="20" max={lt} step="1" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
        </div>
        <div className="input1 w-100">
          <input
            type="number"
            name="amount"
            placeholder="Amount:"
            className="input_login p-3 mb-3 w-100"
            value={amount}
            onChange={onChangeAmount}
          />
        </div>
      </div>
      <div className="col-12">
      <div className="row mb-4">
          <div className="col-4">
            <button className="percent_btn" onClick={() => setValue(30)}>1 M</button>
          </div>
          <div className="col-4">
            <button className="percent_btn" onClick={() => setValue(180)}>6 M</button>
          </div>
          <div className="col-4">
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
            className="input_login p-3 mb-0 w-100"
            value={value}
            onChange={onChangeValues}
          />
        </div>
      </div>
      <div className="row">
        <div className="d-flex justify-content-center mb-5 ps-2 pe-2">
          <button
            className="primary mt-4 ps-5 pe-5 round-btn place_order_btn "
            style={{ position: "absolute", width: "90%" }}
            onClick={sendOrder}
          >
            Place Order  ${{ amountToBeConverted } === "NaN" ? <>0</> : <>{(amountToBeConverted).toFixed(2)}</>}
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default Fields