import React, { useState,useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { coinType } from "../../Feature/Order/orderSlice";

const Escrow_main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [asset, setAsset] = useState([]);
  const [coin, setCoin] = useState("Select coin");

  function asset_list() {
    fetch("http://34.73.24.72/asset_list").then((result) => {
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
  }

  const nextHanlder = () => {
    dispatch(coinType(coin));
    navigate("/order");
  };

  useEffect(() => {
    asset_list();
  }, []);

  return (
      <div className="container">
        <div className="row pt-5 pb-5">
          <div className="back card">
            <div className="container pt-5 pb-5">
              <div className="row order__body mt-4">
                <h2 className="text-center mb-5">Place Order</h2>
                <h5 className="mb-3">Select a Coin</h5>
                <div className="col col-12 mb-5 btn-group">
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
                <h5 className="mb-3">Enter Amount</h5>
                <div className="col col-12">
                <div className="input1 w-100">
                      <input
                        type="text"
                        name="amount"
                        placeholder="Amount ($)"
                        className="pressed txt-underline p-3 mb-3 w-100"
                      />
                      <span class="underline"></span>
                    </div>
                    </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-center mb-5">
                  {/* <Link
                    className="primary mt-4 ps-5 pe-5"
                    style={{ position: "absolute" }}
                    to="/order"
                  >
                    NEXT
                  </Link> */}
                  <button
                    className="primary mt-4 ps-5 pe-5"
                    style={{ position: "absolute" }}
                    onClick={nextHanlder}
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Escrow_main;
