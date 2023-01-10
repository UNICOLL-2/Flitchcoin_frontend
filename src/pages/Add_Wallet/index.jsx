import React, { useState, useEffect } from 'react';
import { fetchToken } from "../../Auth";
import SmallFooter from '../SmallFooter';
import dropdown from "../../Polygon 2.png";

const AddWallet = () => {

    const [walletData, setWalletData] = useState([]);
    const [change, setChange] = useState(false);

    const getWallet = () => {
        fetch('https://flitchcoin.com/api/user_wallet', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${fetchToken()}`,
            }
        }).then(res => res.json()
            .then((result) => {
                let tempArray = [];
                result.map((items) => {
                    for (let i = 0; i < 1; i++) {
                        tempArray.push(items);
                    }
                });
                setWalletData([...tempArray]);
            })).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getWallet();
        asset_link();
    }, []);

    useEffect(() => {
        getWallet();
    }, [change]);


    var [withdrawData, setWithdrawData] = useState({
        WithdrawAddress: "",
        WithdrawCoin: "",
        WithdrawNetwork: "",
        WithdrawTag: ""
    });

    const [withdrawAmt, setWithdrawAmt] = useState();

    var { WithdrawAddress, WithdrawCoin, WithdrawNetwork, WithdrawTag } = withdrawData;

    const gettingWallet = (items) => {
        setWithdrawData(() => ({
            WithdrawAddress: items.wallet_add,
            WithdrawCoin: items.sym,
            WithdrawNetwork: items.network,
            WithdrawTag: Number(items.memo)
        }))
    };

    const onDelete = (uid) => {
        var data = JSON.stringify({
            "uid": uid
        })
        fetch('https://flitchcoin.com/api/user_wallet', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${fetchToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: data
        }).then(res => res.json())
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.log(err);
            });
            if(change){
                setChange(false);
               }else{
                setChange(true);
               }
    };

    const [asset, setAsset] = useState([]);
    const [coin, setCoin] = useState("Select coin");
    const [coinImg, setCoinImg] = useState("");
  
    function asset_link() {
      fetch("https://flitchcoin.com/api/asset_link", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${fetchToken()}`
        }
      }).then((result) => {
        result.json().then((res) => {
          const data = Object.values(res);
          let tmpSymbol = [];
          data.map(items => {
            tmpSymbol.push(items)
          });
          setAsset([...tmpSymbol]);
        });
      });
    };

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
    }

    const [sym, setSym] = useState("");

    useEffect(() => {
        setSym(coin);
        network_list();
    }, [coin !== "Select coin"]);

    var [formData, setFormData] = useState({
        nick_name: "",
        wallet_add: "",
        memo: "",
    });

    var { nick_name, wallet_add, memo } = formData;

    const [net, setNet] = useState("");

    useEffect(() => {
        setNet(network1);
    }, [network1 !== "Select Network"]);

    const onChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    var data = "";

    const onSubmit = (e) => {
        e.preventDefault();
        if (nick_name === "" || sym === "Select coin" || wallet_add === "" || net === "Select Network" || memo === "") {
            alert("Please fill in the Required fields")
        } else {
            data = JSON.stringify({
                "nick_name": nick_name,
                "sym": sym,
                "wallet_add": wallet_add,
                "network": net,
                "memo": Number(memo),
            })
        }
        if (data === "" || data === undefined) {
        } else {
            fetch("https://flitchcoin.com/api/user_wallet", {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${fetchToken()}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: data
            }).then(res => res.json())
                .then((result) => {
                }).catch((err) => {
                    console.log(err);
                })
           if(change){
            setChange(false);
           }else{
            setChange(true);
           }
        }
    };

    return (
        <>
        <div className='container'>
            <div className="row mb-5">
                <div className="col-lg-8 me-5">
                    <p className="welcome_1 p-0 mt-4">Select Saved Wallet :   </p>
                    <p className="plain_text">Select your preferred wallet for withdrawing coin to your account or add another wallet.</p>
                    {walletData.length === 0 ?
                        <>
                            <p className="profile_section">Please add a Wallet</p>
                        </> :
                        <div className='enable_scroll_2 mt-5'>
                            {walletData.map((items) => {
                                return (
                                    <>
                                        <div className='profile_section mt-4' onClick={() => gettingWallet(items)} >
                                            <>
                                            <div className='row'>
                                                <div className="col-sm-11">
                                                <div>- Name : {items.name}</div>
                                                {items.memo === null ? <></> : <><div>- Memo : {items.memo}</div></>}
                                                {items.network === null ? <></> : <><div>- Network : {items.network}</div></>}
                                                {items.memo === null ? <></> : <><div>- Coin : {items.sym}</div></>}
                                                {items.wallet_add === null ? <></> : <><div>- Wallet address : {items.wallet_add}</div></>}
                                                <div>- Transaction id : {items.tnx_id}</div>
                                                <div>- UID : {items.uid}</div>
                                                </div>
                                                <div className="col-sm-1">
                                                <span style={{cursor: "pointer" }} onClick={() => onDelete(items.uid)} ><i className="fa-regular fa-trash-can"></i></span>
                                                </div>
                                                </div>
                                            </>
                                        </div>
                                    </>
                                )
                            })}
                        </div>}
                </div>
                <div className="col-lg-3 card back special_card_deposit mt-4">
                    <p className="welcome_1 text-center">Save Wallet Address </p>
                    <form onSubmit={onSubmit}>
                    <p className="plain_text">Wallet Name :</p>
                    <input className='input_login p-2 w-100' type="text"
                        onChange={onChange}
                        name="nick_name"
                        value={nick_name} />
                    <p className="plain_text mt-4 ">Choose Currency :</p>
                      <button
                        type="button"
                        className="btn btn-dark w-100 round-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div className="row">
                          <div className="col-2">
                            {
                              coinImg === "" ? 
                              <></>:
                              <>
                          <img src={coinImg} className="select_img" />
                              </>
                            }
                          </div>
                          <div className="col-8">
                        <b>{coin}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                          </div>
                          <div className="col-2 text-center">
                            <img src={dropdown} alt="" />
                          </div>
                        </div>
                      </button>
                      <ul className="dropdown-menu drop">
                        {asset.map(items => {
                          return (
                            <div>
                              <li className="list-items" onClick={() => {setCoin(items.symbol); setCoinImg(items.link)}}><img src={items.link} className="select_img"/> <span className="ps-3">{items.symbol}</span></li>
                            </div>
                          )
                        })}
                      </ul>
                    <p className="plain_text mt-4">Choose Transfer Network :</p>
                    <button
                        type="button"
                        className="btn btn-dark w-100 round-btn"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        <div className="row">
                            <div className="col-10 text-center">
                            {network1}
                          </div>
                          <div className="col-2 text-center">
                            <img src={dropdown} alt="" />
                          </div>
                        </div>
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
                    <p className="plain_text mt-4">Wallet address :</p>
                    {withdrawData.WithdrawAddress === "" ?
                        <div>
                            <input className='input_login p-2 w-100' type="text"
                                onChange={onChange}
                                name="wallet_add"
                                value={wallet_add} />
                        </div> : <div>
                            <input className="input_login p-2 w-100" value={withdrawData.WithdrawAddress} disabled />
                        </div>}
                    <p className="plain_text mt-4">Memo (optional) :</p>
                    {withdrawData.WithdrawTag === "" ?
                        <div>
                            <input className='input_login p-2 w-100' type="text"
                                onChange={onChange}
                                name="memo"
                                value={memo} />
                        </div> : <div>
                            <input className="input_login p-2 w-100" value={withdrawData.WithdrawTag} disabled />
                        </div>}
                    <button
                        className="ps-5 pe-5 round-btn mt-5 mb-4 w-100"
                        type='submit'
                    >
                        Save
                    </button>
                    </form>
                </div>
            </div>
        </div>
        <SmallFooter/>
        </>
    )
}

export default AddWallet