import React,{ useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Timeline } from "react-ts-tradingview-widgets";
import { TickerTape } from "react-ts-tradingview-widgets";
import { fetchToken } from "../../Auth";

function Dashboard() {

  const [item, setItem] = useState();

  useEffect(() => {
    const account = () => {
      fetch("http://34.73.24.72/account", {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${fetchToken()}`
        }
      })
        .then((result) => result.json()
          .then(res => {

            // if we have to convert object to array we have to use Object.keys or Object.entries 
            // Object.keys will return keys of object 
            // Object.entries will return array of key with value
            // Object.values will return array of values of all keys

            const data = Object.entries(res);
            let tempArray = [];
            data.map((items) => {
              for(let i = 0 ; i < 1 ; i++){
                tempArray.push(items);
              }
            })
            setItem([...tempArray])
          })
        ).catch((err) => {
          console.log(err);
        })
    };
    account();
  }, []);

  const [arr,setArr] = useState([]);
  const [arr1,setArr1] = useState([]);
  const [arr2,setArr2] = useState([]);
  const [arr3,setArr3] = useState([]);

  const table = () => {
    const out = [];
    const out1 = [];
    const out2 = [];
    const out3 = [];
    for (let index = 3; index < 24; index++) {
      out.push((item[index])[0]); 
      out1.push((item[index])[1].total);
      out2.push((item[index])[1].used);
      out3.push((item[index])[1].yield);
    }
    setArr([...out]);
    setArr1([...out1]);
    setArr2([...out2]);
    setArr3([...out3]);
  }

  useEffect(() => {
  item && table();
  },[item]);

  const navigate = useNavigate();
  return (
    <>
    <TickerTape colorTheme="light" symbols={[
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "BTC/USD"
            },
            {
              "proName": "BITSTAMP:ETHUSDT",
              "title": "ETH/USDT"
            },
            {
              "proName": "BINANCE:SOLUSDT",
              "title": "SOL/USDT"
            },
            {
              "proName": "BINANCE:MATICUSDT",
              "title": "MATIC/USDT"
            },
            {
              "proName": "BINANCE:AVAXUSDT",
              "title": "AVAX/USDT"
            },
            {
              "proName": "BINANCE:XRPUSDT",
              "title": "XRP/USDT"
            },
        ]} ></TickerTape>
      <div className="container">
        <div className="row mt-4">
          <div className="card back p-4">
          <p>Username / Profile <span className="ps-5"> User Id</span></p>
        </div>
        </div>
      </div>
      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col col-md-12 col-lg-7 card back mt-3 p-3">
            <div className="row">
              <div className="col col-8">
                <h3>Balance Details</h3>
              </div>
              <div className="col col-2">
                <button type='button' style={{ position: "absolute" }} className='btn btn-warning' onClick={() => navigate("/pool_participant")} >Deposit</button>
              </div>
              <div className="col col-2">
                <button type='button' className='primary' style={{ position: "absolute" }} onClick={() => (navigate('/withdraw'))} >Withdraw</button>
              </div>
            </div>
            <hr />
            <div className="row">
              <p className='text-muted'>Account Balance : </p>
              <h1>0.04487898<span className="balance ps-2">BTC</span></h1>
              <p className='text-muted'>Estimated Value : </p>
              <h3>$ 1,606.25</h3>
            </div>
          </div>
          <div className="col-lg-1"></div>
          <div className="col col-md-6 col-lg-4 mt-3 card back" >
              <Timeline colorTheme="light" feedMode="market" displayMode="compact" market="crypto" height={300} width="100%" symbol="BTCUSD" isTransparent></Timeline>
            </div>
          </div>
          <div className="container card back mt-5">
            <div className="row">
              <div className="col-6 text-muted account p-3">Name</div>
              <div className="col-2 text-muted account p-3">Total</div>
              <div className="col-2 text-muted account p-3">Used</div>
              <div className="col-2 text-muted account p-3">Yield</div>
            </div>
            <div className="row">
                <div className="col col-md-6 p-3">
              {arr.map(names => {
                return(
                  <>
                 <div className="row p-3">{names}</div>
                 <hr/>
                 </>
                )
              })}
              </div>
              <div className="col col md-2 p-3">
              {arr1.map(names => {
                return(
                  <>
                 <div className="row p-3">{names}</div>
                 <hr/>
                 </>
                )
              })}
              </div>
              <div className="col col md-2 p-3">
              {arr2.map(names => {
                return(
                  <>
                 <div className="row p-3">{names}</div>
                 <hr/>
                 </>
                )
              })}
              </div>
              <div className="col col md-2 p-3">
              {arr3.map(names => {
                return(
                  <>
                 <div className="row p-3">{names}</div>
                 <hr/>
                 </>
                )
              })}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Dashboard;
