import React from 'react';
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';

const Statements = () => {

  const pdfGenerator = () => {
    var doc = new jsPDF('p','pt');
    doc.text(20,20,"this is your statement");
    doc.save("statement.pdf");
  }

  return (
    <div>
      <div className="row">
        <div className="col-xxl-2 col-xl-3 col-12 side_navigation">
          <Link to="/profile" className='link'><i class="fa-regular fa-circle-user p-4 dropdown-item"> &nbsp; &nbsp; P r o f i l e</i></Link>
          <Link to="/statements" className='link'><i class="fa-solid fa-list p-4 dropdown-item text-danger"> &nbsp; &nbsp; S t a t e m e n t s</i></Link>
        </div>
        <div className="col-md-2"></div>
        <div className="col-12 col-md-6">
          <div className='profile_section mt-3 mb-4'>
            <h3>Transactions</h3>
            <p className='text-muted mb-5'>Download all your Flitchcoin.com account activities</p>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                Last 30 Days
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                September 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                August 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                July 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                June 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                May 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                April 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
            <hr/>
            <div className="row align-items-center">
              <div className="col-md-9 col-12 text-muted">
                March 2022
              </div>
              <div className="col-md-3 col-12"><button className='btn btn-primary w-100' onClick={pdfGenerator}><b>PDF</b></button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statements