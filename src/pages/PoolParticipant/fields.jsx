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
        arr.push(value);
        arr.push(amount);
        props.onSubmit(arr);
      },[value,amount])

    return (
        <div>
            <h5 className="mb-3">Enter Amount</h5>
                    <div className="col col-12">
                      <div className="input1 w-100">
                        <input
                          type="number"
                          name="amount"
                          placeholder="Amount ($)"
                          className="input_login txt-underline p-3 mb-3 w-100"
                          value={amount}
                          onChange={e => setAmount(e.target.value)}
                        />
                        <span className="underline"></span>
                      </div>
                    </div>
                    <h5 className="mb-3">Enter Duration</h5>
                    <div className="col col-12">
                      <input type="range" value={value} className="form-range" min='7' max='365' onChange={onChangeValues}></input>
                      <div className="input1 w-100">
                        <input
                          type="number"
                          name="duration"
                          placeholder="Days ( 7 - 365 )"
                          className="input_login txt-underline p-3 mb-3 w-100"
                          value={value}
                          onChange={onChangeValues}
                        />
                        <span className="underline"></span>
                      </div>
                    </div>
        </div>
    )
}

export default Fields