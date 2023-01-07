import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";


function Footer() {
  const { selectedType } = useSelector((state) => state.auth);

  if (selectedType === "decline") {
    return (
      <div className="back shadow">
        <ul className="py-3 d-flex list-unstyled border border-dark footer_decline flex-wrap">
          <li className="mx-2" role="button">
            Terms & Condition
          </li>
          <li className="mx-2" role="button">
            Privacy Policy
          </li>
          <li className="mx-2" role="button">
            Business Continuity
          </li>
          <li className="mx-2" role="button">
            Finra Brook Check
          </li>
          <li className="mx-2" role="button">
            Manage Cookies
          </li>
        </ul>
        <p>&copy; 2022 BlackRock, Inc. All rights reserved.</p>
        <p>
          This material is provided for informational purposes only and is not
          intended to be relied upon as a forecast, research or investment
          advice, and is not a recommendation, offer or solicitation to buy or
          sell any securities or to adopt any investment strategy. The opinions
          expressed are subject to change at any time without notice. References
          to specific securities, asset classes and financial markets are for
          illustrative purposes only and are not intended to be and should not
          be interpreted as recommendations.
        </p>
        <p>
          This material may contain “forward-looking” information that is not
          purely historical in nature. Such information may include, among other
          things, projections, forecasts, estimates of yields or returns, and
          proposed or expected portfolio composition. Moreover, any historical
          performance information of other investment vehicles or composite
          accounts managed by BlackRock, Inc. and/or its subsidiaries (together,
          “BlackRock”) included in this material is presented by way of example
          only. No representation is made that any performance presented will be
          achieved, or that every assumption made in achieving, calculating or
          presenting either the forward-looking information or the historical
          performance information herein has been considered or stated in
          preparing this material. Any changes to assumptions that may have been
          made in preparing this material could have a material impact on the
          investment returns that are presented herein by way of example. Past
          performance is no guarantee of future results.
        </p>
        <p>
          The information and opinions contained in this material are derived
          from proprietary and nonproprietary sources deemed by BlackRock to be
          reliable, are not necessarily all-inclusive and are not guaranteed as
          to accuracy.
        </p>
      </div>
    );
  }
  if (selectedType === "participant" || selectedType === "pool") {
    return (
      <>
        <div className="footer-bg1 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="footer-top">
                  <div className="social-links d-md-flex  align-items-center justify-content-between">
                    <div className="gradient-heading">
                      <h3>YOUR WEALTH OUR WORTH</h3>
                    </div>
                    <div className="line1"></div>
                    <div className="socialMedia-icons">
                      <ul className="d-flex align-items-center">
                        <li>
                          <a href="#">
                            <BsLinkedin />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BsTwitter />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BsInstagram />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <BsFacebook />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="startusing d-flex flex-column flex-md-row  align-items-center justify-content-between">
                    <div className="content1">
                      <h2>Start using FlichCoin today</h2>
                      <div className="flitchcoin-img">
                        <img src="../../../footerimg.svg" alt="" />
                      </div>
                    </div>
                    <div className="content2 d-flex align-items-center gap-5">
                      <div className="sub-content1">
                        <ul>
                          <li>
                            <div className="gradient-hover">
                              <div className="footer-toplinks">
                                <a href="#">About</a>
                              </div>
                            </div>
                          </li>
                          <li>
                            <a href="#">Home</a>
                          </li>
                          <li>
                            <a href="#">SignUp</a>
                          </li>
                          <li>
                            <a href="#">Blog</a>
                          </li>
                        </ul>
                      </div>
                      <div className="sub-content2">
                        <ul>
                          <li>
                            <a href="#">The 7% club</a>
                          </li>
                          <li>
                            <a href="#">Earn</a>
                          </li>
                          <li>
                            <a href="#">Referral</a>
                          </li>
                          <li>
                            <a href="#">Glossary</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerbottom footer-bg2">
          <div className="container pt-5">
            <div className="row d-flex  flex-column-reverse flex-md-row ">
              <div className="col-md-9">
                <div className="content1">
                  <p>
                    At Flitchcoin, we want to make sure our customers are aware
                    of the risks associated with investing in digital assets,
                    including price volatility. Transacting in digital assets
                    could result in significant losses and may not be suitable
                    for all consumers. The digital asset markets and exchanges
                    we operate on are not regulated with the same controls or
                    customer protections as other forms of financial products
                    and are subject to an evolving regulatory environment.
                    Digital assets do not typically have legal tender status and
                    are not covered by deposit protection insurance. Past
                    performance of a digital asset is not a guide to future
                    performance and should not be relied upon as a reliable
                    indicator of future results or performance.
                  </p>
                  <p>
                    Please be aware that investing in digital assets carries a
                    number of risks and should be carefully considered. For more
                    information on the risks associated with investing in
                    digital assets, please see our Legal and Privacy page.
                  </p>
                  <p>
                    At Flitchcoin, we are committed to providing our customers
                    with transparent and reliable information. The materials and
                    opinions we offer are for informational purposes only and
                    are not intended to be relied upon as a forecast, research,
                    or investment advice. We do not make any recommendations,
                    offers, or solicitations to buy or sell any securities or to
                    adopt any investment strategy. Our opinions are subject to
                    change at any time without notice and may contain
                    forward-looking information that is not purely historical in
                    nature. Past performance is no guarantee of future results.
                  </p>
                  <p>
                    Please note that any historical performance information of
                    other investment vehicles or composite accounts presented in
                    our materials is for illustrative purposes only. No
                    representation is made that any performance presented will
                    be achieved, or that every assumption made in achieving,
                    calculating, or presenting either the forward-looking
                    information or the historical performance information has
                    been considered or stated in preparing our materials. Any
                    changes to assumptions that may have been made in preparing
                    our materials could have a material impact on the investment
                    returns presented.
                  </p>
                  <p>
                    We derive the information and opinions contained in our
                    materials from proprietary and nonproprietary sources that
                    we consider to be reliable, but we cannot guarantee the
                    accuracy of all such information. We reserve all rights to
                    the materials we provide, and any unauthorized use is
                    strictly prohibited.
                  </p>
                  <div className="line2"></div>
                  <p>© 2022 Flitchcoin. All rights reserved.</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="content2">
                  <div className="privacy-links">
                    <ul>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                      <li>
                        <a href="#">Legal Notice</a>
                      </li>
                      <li>
                        <a href="#">Terms of Use</a>
                      </li>
                      <li>
                        <a href="#">Terms and Conditions</a>
                      </li>
                    </ul>
                  </div>
                  <div className="chat">
                    <h3>Let's chat</h3>
                    <a href="#">support@flitchcoin.com</a>
                  </div>
                </div>
              </div>
              <div className="pattern">
                <img src="../../../pattern.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
