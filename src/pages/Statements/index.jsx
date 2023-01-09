import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import statement from "./Group 87.png";
import setting from "./Group 97.png";
import { fetchToken } from "../../Auth";
import SmallFooter from '../SmallFooter';

const Statements = () => {

  const [avt, setAvt] = useState();

  const pdfGenerator = () => {
    var doc = new jsPDF('p', 'pt');
    doc.text(20, 20, "this is your statement");
    doc.save("statement.pdf");
  };

  const change = () => {
    fetch('https://www.flitchcoin.com/api/dashboard', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${fetchToken()}`
      }
    }).then((result) => result.json()
      .then(res => {
        setAvt(res.avtar_im);
      })).catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    change();
  }, []);

  return (
    <div>
      <div className="row mt-4">
        <div className="col-xxl-2 col-xl-3 col-12 side_navigation">
          <Link to="/profile" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item mt-5 "><img src={avt} style={{ height: "30px", width: "30px", borderRadius: "50%" }} /> &nbsp; Profile</i></Link>
          <Link to="/statements" className='link'><i className=" ps-4 pe-4 pt-2 pb-2 mb-3 dropdown-item selected-item"><img src={statement} style={{ height: "32px", width: "32px" }} /> &nbsp; Statements</i></Link>
          <Link to="/settings" className='link'><i className="ps-4 pe-4 pt-2 pb-2 dropdown-item"><img src={setting} style={{ height: "25px", width: "25px" }} /> &nbsp; Settings</i></Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-12 col-md-6">
          <div className='profile_section mt-3 mb-4'>
            <h3>Transactions</h3>
            <p className='text-muted mb-5'>Download all your Flitchcoin.com account activities</p>
            <div className="row align-items-center mb-3">
              <div className="col-md-9 col-12 text-muted">
                Last 30 Days
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                September 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                August 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                July 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                June 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                May 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                April 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr />
            <div className="row align-items-center mt-3 mb-3">
              <div className="col-md-9 col-12 text-muted">
                March 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
          </div>
        </div>
      </div>
      <SmallFooter/>
    </div>
  )
}

export default Statements