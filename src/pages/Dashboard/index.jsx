import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchToken } from "../../Auth";

function Dashboard() {

  const navigate = useNavigate();

  const [asset, setAsset] = useState([]);
  const [currentCoin, setCurrentCoin] = useState("");
  const [formData, setFormData] = useState({
    memo: "",
    pay_id: "",
    binance_id: "",
    email_id: "",
    phone_no: "",
    wallet_add: "",
    network:""
  });
  const { memo, pay_id, binance_id, email_id, phone_no, wallet_add, network} = formData;

  useEffect(() => {
    asset_list();
  }, [currentCoin]);

  function asset_list() {
    fetch("http://127.0.0.1:8000/asset_list").then((result) => {
      result.json().then((res) => {
        console.log(res);
        let tmpArray = [];
        res.map((items) => {
          for (let i = 0; i < 1; i++) {
            tmpArray.push(items);
          }
        });
        setAsset([...tmpArray]);
      })
    });
  };

  const submitHandler = (e) => {
    var b_data = JSON.stringify({
      "sym": currentCoin,
      "network": network,
      "wallet_add": wallet_add,
      "memo": memo,
      "is_binance_pay": false,
      "pay_id": pay_id,
      "binance_id": binance_id,
      "email_id": email_id,
      "phone_no": phone_no
    });
      fetch("http://127.0.0.1:8000/insert_wallet", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${fetchToken()}`,
        },
        body: b_data
      }).then(res => res.json())
        .then((result) => {
          console.log(result);
        }).catch((err) => console.log(err));
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (e) => {
    setFormData({ ...formData });
  };

  return (
    <div className="back shadow">
      <div className="container pt-5 pb-5">
        <div className="row dashboard__body">
          <div className="col col-sm-12 col-lg-8 dashboard__pending">
            <div className="card">
              <div className="card-body">
                <div className="card-title">Pending ...</div>
                <div className="d-flex justify-content-end">
                  <button className="primary">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-lg-4 col-sm-12 card">
              <div className="row ">
                <p className="annexure p-3 mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur saepe est assumenda dolores vero officiis voluptas eveniet accusamus, architecto nam cupiditate, quos ratione ea incidunt?
                  <div className="d-flex justify-content-end">
                    <button className=" pressed" onClick={() => navigate("/escrow_account")} >Go to Escrow account status</button>
                  </div>
                </p>
              </div>
              <div className="row">
                <p className="annexure p-3 mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur saepe est assumenda dolores vero officiis voluptas eveniet accusamus, architecto nam cupiditate, quos ratione ea incidunt?
                  <div className="d-flex justify-content-end">
                    <button className="pressed">Pay Now</button>
                  </div>
                </p>
              </div>
              <div className="row">
                <p className="annexure p-3 mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur saepe est assumenda dolores vero officiis voluptas eveniet accusamus, architecto nam cupiditate, quos ratione ea incidunt?
                  <div className="d-flex justify-content-end">
                    <button className="pressed me-4">Pay Now</button>
                    <button className="pressed">Pay Now</button>
                  </div>
                </p>
              </div>
          </div>
        </div>
      </div>
      <div className="container pt-5 pb-5">
        <form onSubmit={submitHandler}>
          <div className="row dashboard__second__part">
            <div className="col col-xs-12 col-lg-7 h-100 card">
              <button type="button" className="btn btn-dark w-100 mt-3" data-bs-toggle="dropdown" aria-expanded="false">
              <b>Select Coin </b><span className='dropdown-toggle coin'/>
              </button>
              <ul className="dropdown-menu drop">
                {
                  asset.map((items) => {
                    return (
                      <div>
                        <li><a className="dropdown-item back shadow pt-2 pb-2" key={items} onClick={() => {setCurrentCoin(items) }}>{items}</a></li>
                      </div>
                    )
                  })
                }
              </ul>
              <h3 className='mb-4 mt-4'>Other USER</h3>
              <input type="text" placeholder='Network' className="inp w-100 p-3 mb-3" onChange={onChange} name="network" value={network} />
              <input type="text" placeholder='Wallet address of user' className="inp w-100 p-3 mb-3" name="wallet_add" onChange={onChange} value={wallet_add} />
              <input type="number" placeholder='memo if available' className="inp w-100 p-3 mb-3" onChange={onChange} name="memo" value={memo} />
            </div>
            <div className="col col-xs-12 col-lg-1 slash text-center dashboard__devision">/</div>
            <div className="col col-xs-12 col-lg-4  mt-0 card">
              <h3 className='mb-4 mt-3'>Binance USER</h3>
              <input type="text" className="inp p-3  w-100" placeholder="PAY ID" onChange={onChange} name="pay_id" value={pay_id} />
              <p className="text-center text-bold"><b>-- OR --</b></p>
              <input type="text" className="inp p-3  w-100" placeholder="BINANCE ID" onChange={onChange} name="binance_id" value={binance_id} />
              <p className="text-center text-bold"><b>-- OR --</b></p>
              <input type="email" className="inp p-3 w-100" placeholder="EMAIL ID" onChange={onChange} name="email_id" value={email_id} />
              <p className="text-center text-bold"><b>-- OR --</b></p>
              <input type="number" className="inp p-3 mb-3 w-100" placeholder="PHONE NO." onChange={onChange} name="phone_no" value={phone_no} />
            </div>
          </div>
          <div className="row">
            {/* <div className="d-flex justify-content-end">
              <button type='submit' className="btn btn-dark mt-4 ps-5 pe-5" onClick={() => { onClick(); submitHandler(); }}>NEXT</button>
            </div> */}
            <div className="d-flex justify-content-end mb-5">
              <button type='submit' className="primary mt-4 ps-5 pe-5 " onClick={() => { onClick(); submitHandler(); }} style={{position: "absolute"}} >NEXT</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
