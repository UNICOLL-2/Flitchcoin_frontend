import React, { useState, useEffect } from 'react';
import { fetchToken } from "../../Auth";

const Deposit = () => {

    const [asset, setAsset] = useState([]);
    const [coin, setCoin] = useState("Select coin");

    function asset_list() {
        fetch("https://flitchcoin.com/api/asset_list", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                Authorization: `Bearer ${fetchToken()}`
            }
        }).then((result) => {
            result.json().then((res) => {
                let tmpArray = [];
                res.map((items) => {
                    for (let i = 0; i < 1; i++) {
                        tmpArray.push(items);
                    }
                });
                setAsset([...tmpArray]);
            });
        });
    };

    useEffect(() => {
        asset_list();
    }, []);

    useEffect(() => {
        asset_list();
    }, [coin]);

    const [network, setNetwork] = useState("Select Network");
    const [network1, setNetwork1] = useState("Select Network");
  
    function network_list() {
      var data = JSON.stringify({
        "string": coin
      })
      fetch("https://flitchcoin.com/api/network", {
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
    };

    useEffect(() => {
        network_list();
      }, [coin !== "Select coin"]);
  

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-2"></div>
                <div className="col-12 col-lg-8 card back ps-4 mb-3 mt-3">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <p className="text-muted pt-5">Coin</p>
                            <div className="col col-12 mb-3 mt-1 btn-group">
                                <button
                                    type="button"
                                    className="btn btn-dark dropdown-toggle w-100"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <b>{coin}</b>
                                </button>
                                <ul className="dropdown-menu drop">
                                    {asset.map(items => {
                                        return (
                                            <div>
                                                <li className="list-items" onClick={() => setCoin(items)}>{items}</li>
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                            <p><span className="text-muted">Total Balance: </span> <b> 0.000123 BTC</b></p>
                            <p><span className="text-muted">Available Balance: </span> <b> 0.00252 BTC</b></p>
                            <br />
                            <p className="text-muted">1. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsam dolores eius magnam illo eveniet maxime nulla nesciunt ullam perspiciatis.</p>
                            <p className="text-muted">2. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, ipsam dolores eius magnam illo eveniet maxime nulla nesciunt ullam perspiciatis.</p>
                        </div>
                        <div className="col-lg-6 col-12 p-4">
                            <div className="card border_to_card back p-4">
                            <p className="text-muted">Recipient's BTC address</p>
                            <div className="input1 w-100">
                                <input
                                    type="text"
                                    className="txt-underline p-3 mb-3 w-100  input pressed"
                                    placeholder="Address"
                                // onChange={onChange}
                                // name="nick_name"
                                // value={nick_name}
                                />
                                <span className="underline"></span>
                            </div>
                            <p className="text-muted">Transfer Network</p>
                            <div className="col col-xs-12 col-lg-7 mb-3 w-100 btn-group">
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
                    <p>Amount</p>
                    <div className="input1 w-100">
                                <input
                                    type="text"
                                    className="txt-underline p-3 mb-3 w-100  input pressed"
                                    placeholder="Minimum Withdrawal of 0.001BTC"
                                // onChange={onChange}
                                // name="nick_name"
                                // value={nick_name}
                                />
                                <span className="underline"></span>
                            </div>
                            <p><span className="text-muted">Available Balance: </span> <b> 0.00252 BTC</b></p>
                            <p><span className="text-muted ms-5">Transaction Fee: </span> <b> 0.0005 BTC</b></p>
                            <button type='submit' className='red button w-100'>Submit</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deposit