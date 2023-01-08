import Layout from "./layouts";
import { Modal } from "react-bootstrap";
import "./app.css";
import wave from "./66615-wave-blue-lines.gif";

const App = () => {
  return (
    <div>
      <Layout />
      {/* {selectedType === undefined && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          backdrop="static"
          keyboard={false}
        >
          <div className="row back">
            <div className="col-4 p_50 fs-2 fw-bold back__animation ">
              <p className="text-dark">Flitch Coin</p>
              <img src={wave} height="350px" width="200px" alt="wave"/>
            </div>
            <div className="col-8 welcome__dialog">
              <div className="content_oveflow">
                <div className="modal__header">
                  <h1 className="fw-bold modal-title">
                    Welcome to the Flitch Coin site
                  </h1>
                </div>
                <div className="modal__body pressed">
                  <p className="h6">
                    Please read this page before proceeding, as it explains
                    certain restrictions imposed by law on the distribution of
                    this information and the jurisdictions in which our products
                    and services are authorised to be offered or sold. It is
                    your responsibility to be aware of and to observe all
                    applicable laws and regulations of any relevant
                    jurisdiction.
                  </p>
                  <p>
                    By entering this site you are agreeing that you have
                    reviewed and agreed to the terms contained herein, including
                    any legal or regulatory restrictions, the Client and Vendor
                    Privacy Notice, which explains how we collect, use, and
                    disclose your personal information and how it is protected,
                    and the Cookie Notice, which explains how we use cookies on
                    our sites.
                  </p>
                  <p className="h5">Additional Information</p>
                  <p>
                    Investment involves risks. Past performance is not a guide
                    to future performance.
                  </p>
                </div>
                <div className="modal__footer">
                  <Modal.Footer>
                    <button
                      variant="dark"
                      onClick={() => typeSelector("decline")}
                      className="primary"
                    >
                      Decline
                    </button>
                    <button
                      onClick={() => typeSelector("accept")}
                      className="primary bg-dark text-white accept"
                    >
                      Accept
                    </button>
                  </Modal.Footer>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        )} */}
    </div>
  );
};

export default App;
