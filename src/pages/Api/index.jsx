import React from "react";
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Api() {

  AOS.init();
  AOS.init({
    // offset: 1020, // offset (in px) from the original trigger point
    // delay: 0, // values from 0 to 3000, with step 50ms
    duration: 1000, // values from 0 to 3000, with step 50ms
    // easing: 'ease', // default easing for AOS animations
    once: true, // whether animation should happen only once - while scrolling down
    // mirror: false, // whether elements should animate out while scrolling past them
    // anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
  });


  return (
    <>
      <Animation />
      <div className="container">
        <section className="row pt-5" data-aos="fade-up" data-aos-offset="200" data-aos-delay="50">
          <div className="col-lg-6 d-flex flex-column justify-content-center h_get_to_know">
            <p className="pt-3 api_head">POWER CUSTOM SOLUTIONS WITH <span className="text-primary"> FLITCHCOIN'S API SURFACE</span> </p>
            <p className="pt-3 api_text">
              Experience the power of Flitchcoin's custom solutions and take your portfolio management to the next level. Our API surface enables you to build your own solutions with access to the depth of crypto market. You can build your own solutions and access a range of data and capabilities to power proprietary applications and create custom tools that meet your needs.
            </p>
            <div className="pt-3">
              <a href="https://flitchcoin.com/api/redoc" target="_blank">
                <button
                  type="button"
                  className="primary ps-5 pe-5"
                  style={{ position: "absolute" }}
                >
                  Read Documentation
                </button>
              </a>
            </div>
          </div>
          <div className="img-block col-sm-12 col-md-6 h_get_to_know_img h_get_to_know_img">
            <img
              src="https://www.blackrock.com/blk-inst-assets/cache-1635526326000/images/media-bin/web/global/full-bleed-banners/ala-sit-action-skate-hero.webp"
              alt=""
              className="h-100 w-100"
            />
          </div>
        </section>
        <section className="my_50 mt-5 pt-5 col-lg-5 d-flex flex-column justify-content-center w-100">
          <p className="api_head">
            What are APIs? How can I use them in Flitchcoin ?
          </p>
          <p className="py-3 api_text">
            An API, or Application Programming Interface, is a clearly defined set of methods used to access data. APIs allow applications to communicate with one another and offer flexible solutions to complex needs. A good API makes it easy to retrieve and manipulate data, and it provides you with building blocks to help construct programs. Flitchcoin’s REST APIs allow you to take control of your data, granting read and write access to Aladdin data to drive proprietary applications built by your development teams, Our APIs let you call Flitchcoin’s databases directly, empowering you to create tools and workflows that resonates Flitchcoin’s  functionality.
          </p>
        </section>
        <section className="my_50">
          <div className="row easy__integration">
            <div className="col col-sm-12 col-md-4">
              <img
                src="https://www.blackrock.com/blk-inst-assets/cache-1635533361000/images/aladdin/icons/ald-icn-flexibility-yel-rgb.webp"
                alt=""
                className="my_icon mb-4"
              />
              <h4>
                <b>Easy integration</b>
              </h4>
              <p>Seamless connection between Aladdin and your ecosystem.</p>
            </div>
            <div className="col col-sm-12 col-md-4">
              <img
                src="https://www.blackrock.com/blk-inst-assets/cache-1635533361000/images/aladdin/icons/ald-icn-scale-blu-rgb.webp"
                alt=""
                className="my_icon mb-4"
              />
              <h4>
                <b>Enhanced processes</b>
              </h4>
              <p>Scalable ways to automate workflows and analysis.</p>
            </div>
            <div className="col col-sm-12 col-md-4">
              <img
                src="https://www.blackrock.com/blk-inst-assets/cache-1635533361000/images/aladdin/icons/ald-icn-integrated-yel-rgb.webp"
                alt=""
                className="my_icon mb-4"
              />
              <h4>
                <b>Dynamic customization</b>
              </h4>
              <p>Flexible solutions to complex use cases.</p>
            </div>
          </div>
        </section>
        <p className="mt-5 pt-5 api_text ">
          Maximize your returns with Flitchcoin's custom solutions and powerful APIs. An API, or Application Programming Interface, is a clearly defined set of methods used to access data and allow applications to communicate with one another. Our APIs offer flexible solutions to complex needs, providing you with building blocks to help construct programs and granting read and write access to Flitchcoin data to drive proprietary applications built by your development team.Our APIs let you call Flitchcoin's databases directly, empowering you to create tools and workflows that resonates native Flitchcoin functionality.
        </p>
        <p className="mt-5 api_text">
          Our APIs offer programmatic access to Flitchcoin's operational services, including trades, orders, and compliance rules, allowing you to leverage these resources to construct customizable and innovative solutions to your business needs. As a pool investor or participant at Flitchcoin, you have access to a range of high yield stablecoin funds and flexible investment, borrowing, and staking options that can take you beyond the horizon of risk-management.
        </p>
      

      <div className="row settings_box p-4 mt-5 mb-4">
        <div className="col-lg-8">
          <p className="api_head">How does Flitchcoin help me leverage APIs ?</p>
          <p className="api_text">Our APIs offer tactical access to Flitchcoin's functional services, including trades, orders, and compliance rules, allowing you to leverage these resources to construct personalised and innovative solutions to your business needs.</p>
        </div>
        <div className="col-lg-1"></div>
        <div className="col-lg-3 mt-5 pt-4">
          <button className="w-100 btn-dark round-btn">Get API Keys</button>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Api;
