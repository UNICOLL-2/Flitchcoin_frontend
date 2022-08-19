import React, { useState } from 'react';

const Withdraw = () => {

  var [formData, setFormData] = useState({
    nick_name: "",
    sym: "",
    wallet_add: "",
    phone_no: 0,
    pay_id: "",
    network: "",
    memo: 0,
    is_binance_pay: false,
    email_id: "",
    binance_id: ""
  });

  var {nick_name, sym, wallet_add, phone_no,pay_id,network,memo,is_binance_pay,email_id,binance_id} = formData;

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const binance = () => {
    setFormData(() => ({
      is_binance_pay: true
    }))
  };

  const other = () => {
    setFormData(() => ({
      is_binance_pay: false
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col col-1"></div>
        <div className="col col-md-12 col-lg-4">
          <div className="card back">
            <form onSubmit={onSubmit}>
            <div className="row p-4">
              <div className="col col-6">
                <input type="radio" className="btn-check" name="options-outlined" id="success-outlined" autoComplete="off" />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="success-outlined" onClick={other}>Other User</label>
              </div>
              <div className="col col-6">
                <input type="radio" className="btn-check" name="options-outlined" id="danger-outlined" autoComplete="off" />
                <label className="btn btn-outline-light text-dark shadow w-100" htmlFor="danger-outlined" onClick={binance}>Binance User</label>
              </div>
              {is_binance_pay === false ? (
                <>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Full name"
                      onChange={onChange}
                      name="nick_name"
                      value={nick_name}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Crptocurrency"
                      onChange={onChange}
                      name="sym"
                      value={sym}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Wallet Address"
                      onChange={onChange}
                      name="wallet_add"
                      value={wallet_add}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="number"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Phone number"
                      onChange={onChange}
                      name="phone_no"
                      value={phone_no}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Pay Id"
                      onChange={onChange}
                      name="pay_id"
                      value={pay_id}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Network"
                      onChange={onChange}
                      name="network"
                      value={network}
                    />
                    <span className="underline"></span>
                  </div>
                  <div className="input1 w-100 mt-4">
                    <input
                      type="number"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Memo"
                      onChange={onChange}
                      name="memo"
                      value={memo}
                    />
                    <span className="underline"></span>
                  </div>
                </>
              ) : (
                <>
                <div className="input1 w-100 mt-3">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Email id"
                      onChange={onChange}
                      name="email_id"
                      value={email_id}
                    />
                    <span className="underline"></span>
                  </div>
                  <h5 className="text-center">---OR---</h5>
                  <div className="input1 w-100 mt-3">
                    <input
                      type="text"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Binance Id"
                      onChange={onChange}
                      name="binance_id"
                      value={binance_id}
                    />
                    <span className="underline"></span>
                  </div>
                  <h5 className="text-center">---OR---</h5>
                  <div className="input1 w-100 mt-3">
                    <input
                      type="number"
                      className="txt-underline p-3 mb-3 w-100  input pressed"
                      placeholder="Phone number"
                      onChange={onChange}
                      name="phone_no"
                      value={phone_no}
                    />
                    <span className="underline"></span>
                  </div> 
                </>
              )}
                <button type='submit' className='primary w-100'>Save Wallet</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw