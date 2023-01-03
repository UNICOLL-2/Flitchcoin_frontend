import React, { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

      </>
    );
  }
}

export default Footer;
