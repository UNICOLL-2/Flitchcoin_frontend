import React, { useEffect, useState } from "react";
import { fetchToken } from "../../Auth";

const Fields = (props) => {

  const [value, setValue] = useState();
  const [amount, setAmount] = useState();
  const onChangeValues = (e) => {
    if (e.target.value >= 7 && e.target.value <= 365) {
      setValue(e.target.value);
    }
  };

  const onChangeAmount = (e) => {
    if(e.target.value >20){
      setAmount(e.target.value)
    }
  };

  const arr = [];
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    setLimit(props.limit);
  },[]);

  useEffect(() => {
    arr.push(value);
    arr.push(amount);
    props.onSubmit(arr);
  }, [value, amount]);

  return (
    <div className="mt-4">
      <div className="col-12">
        <div className="row mb-3">
          <div className="col-4">
            <button className="percent_btn">10%</button>
          </div>
          <div className="col-4">
            <button className="percent_btn">50%</button>
          </div>
          <div className="col-4">
            <button className="percent_btn">100%</button>
          </div>
        </div>
        <div className="row mt-5 mb-5">
        {/* <label for="range">
          <input type="range" name="range" id="range" min="20" max={limit} step="1" value={amount} onChange={onChangeAmount} />
        </label> */}
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
        {/* <input type="range" value={value} className="form-range" min='7' max='365' onChange={onChangeValues}></input> */}
        <div className="input1 w-100">
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
    </div>
  )
}

export default Fields