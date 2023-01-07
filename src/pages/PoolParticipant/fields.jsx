import React, { useEffect, useState } from "react";

const Fields = (props) => {

      const [value, setValue] = useState();
      const [amount, setAmount] = useState();
      const onChangeValues = (e) => {
        if (e.target.value >= 7 && e.target.value <= 365) {
          setValue(e.target.value);
        }
      };

      const arr=[];

      useEffect(() => {
        console.log(props.val)
      })

      useEffect(() => {
        arr.push(value);
        arr.push(amount);
        props.onSubmit(arr);
      },[value,amount]);

    return (
        <div>
            <div className="row mb-0">
            </div>
                    <div className="col-12">
                      <div className="input1 w-100">
                        <input
                          type="number"
                          name="amount"
                          placeholder="Amount:  BTC"
                          className="input_login p-3 mb-3 w-100"
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <input type="range" value={value} className="form-range" min='7' max='365' onChange={onChangeValues}></input>
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