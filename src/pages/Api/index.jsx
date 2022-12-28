import React from "react";
import Animation from "../../Animation";
import Footer from '../../layouts/Footer/index';
import { Link, useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Api() {

  const navigate = useNavigate();
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
    <Animation/>
    <div className="back shadow">
      <div className="container">
        <section className="row pt-5"     data-aos="fade-up"
    data-aos-offset="200"
    data-aos-delay="50">
          <div className="col-sm-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center h_get_to_know">
            <div className="pt-3"> ALADDIN BY BLACKROCK</div>
            <h1 className="pt-3">
              POWER CUSTOM SOLUTIONS WITH OUR API SURFACE
            </h1>
            <div className="pt-3">
              Aladdin Studio APIs enable you to build your own solutions with
              access to the breadth and depth of Aladdin data and capabilities.
              Retrieve, write, and modify data from across the Aladdin ecosystem
              to power proprietary applications and create custom tools that
              meet your needs.
            </div>
            <div className="pt-3">
              <button
                type="button "
                className="primary"
                style={{ position: "absolute" }}
                onClick={() => navigate("/api/docs")}
              >
                Read Documentation
              </button>
            </div>
          </div>
          <div className="spacer col-lg-1"></div>
          <div className="img-block col-sm-12 col-md-6 h_get_to_know_img h_get_to_know_img">
            <img
              src="https://www.blackrock.com/blk-inst-assets/cache-1635526326000/images/media-bin/web/global/full-bleed-banners/ala-sit-action-skate-hero.webp"
              alt=""
              className="h-100 w-100"
            />
          </div>
        </section>
        <section className="my_50 col-sm-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center w-100" data-aos="fade-right">
          <p className="h2">
            What are APIs? How can I use them in Aladdin Studio?
          </p>
          <p className="py-3">
            An API, or Application Programming Interface, is a clearly defined
            set of methods used to access data. APIs allow applications to
            communicate with one another and offer flexible solutions to complex
            needs. A good API makes it easy to retrieve and manipulate data, and
            it provides you with building blocks to help construct programs.
          </p>
          <p className="">
            Aladdin REST APIs allow you to take control of your data, granting
            read and write access to Aladdin data to drive proprietary
            applications built by your development teams. Our APIs let you call
            Aladdin databases directly, empowering you to create tools and
            workflows that expand beyond native Aladdin functionality.
          </p>
        </section>
        <section className="my_50">
          <div className="row easy__integration">
            <div className="col col-sm-12 col-md-4">
              <img
                src="https://www.blackrock.com/blk-inst-assets/cache-1635533361000/images/aladdin/icons/ald-icn-flexibility-yel-rgb.webp"
                alt=""
                className="my_icon"
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
                className="my_icon"
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
                className="my_icon"
              />
              <h4>
                <b>Dynamic customization</b>
              </h4>
              <p>Flexible solutions to complex use cases.</p>
            </div>
          </div>
        </section>
        <section className="my_50 col-sm-12 col-md-6 col-lg-5 d-flex flex-column justify-content-center">
          <p className="h2">How does Aladdin Studio help me leverage APIs?</p>
          <p className="py-3">
            Aladdin APIs allow for programmatic access to Aladdin operational
            services, including trades, orders, and compliance rules. Use our
            APIs and supporting resources to construct customizable and
            innovative solutions to your business needs.
          </p>
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseOne"
                  aria-expanded="false"
                  aria-controls="flush-collapseOne"
                >
                  Dozens of Aladdin APIs available - constant new additions
                </button>
              </h2>
              <div
                id="flush-collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingOne"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Aladdin Studio already has a large universe of available APIs,
                  and we are always expanding our offerings in response to the
                  bespoke needs of our developer community.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseTwo"
                  aria-expanded="false"
                  aria-controls="flush-collapseTwo"
                >
                  Learn about our API framework
                </button>
              </h2>
              <div
                id="flush-collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingTwo"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Aladdin Studio documentation teaches you how Aladdin API
                  requests are built, authorized, and processed in our system.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseThree"
                  aria-expanded="false"
                  aria-controls="flush-collapseThree"
                >
                  Get a head start building with developer guides
                </button>
              </h2>
              <div
                id="flush-collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingThree"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Aladdin Studio documentation teaches you how Aladdin API
                  requests are built, authorized, and processed in our system.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="flush-headingFour">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#flush-collapseFour"
                  aria-expanded="false"
                  aria-controls="flush-collapseFour"
                >
                  Discover the data you need
                </button>
              </h2>
              <div
                id="flush-collapseFour"
                className="accordion-collapse collapse"
                aria-labelledby="flush-headingFour"
                data-bs-parent="#accordionFlushExample"
              >
                <div className="accordion-body">
                  Our Data Dictionary allows you to explore Aladdin data and
                  search for the field definitions you need.
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="mid-color row my_50">
        <p>
          <b>ADDITIONAL ALADDIN STUDIO RESOURCES</b>
        </p>
        <br />
        <div className="row">
          <div className="col col-4">
            <p>{">"} Aladdin Studio home</p>
            <p>{">"} Aladdin Data Cloud</p>
            <p>{">"} Aladdin Data Exchange</p>
          </div>
          <div className="col col-2">
            <div className="line"></div>
          </div>
          <div className="col col-6">
            <p>{">"} Aladdin Compute</p>
            <p>{">"} Aladdin Tools for Excel</p>
          </div>
        </div>
      </section>
      <div className="container">
        <section>
          <p className="h2">Get in touch to learn more about Aladdin</p>
          <form action="#">
            <div className="row">
              <div className="col col-sm-12 col-md-12 col-lg-12">
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="firstName"
                  id=""
                  placeholder="First Name"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="lastName"
                  id=""
                  placeholder="Last Name"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="email"
                  name="buisnessEmail"
                  id=""
                  placeholder="Buisness Email"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12 col-md-12 col-lg-12">
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="companyName"
                  id=""
                  placeholder="Company Name"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="country"
                  id=""
                  placeholder="Country"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="phoneNumber"
                  id=""
                  placeholder="Phone Number"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12 col-md-12 col-lg-12">
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="organizationType"
                  id=""
                  placeholder="Organization Type"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="interestedIn"
                  id=""
                  placeholder="Interested In"
                  required
                />
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="primaryRole"
                  id=""
                  placeholder="Primary role"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col col-sm-12 col-md-12 col-lg-12">
                <input
                  className="input p-2 shadow"
                  type="text"
                  name="requestType"
                  id=""
                  placeholder="Request Type"
                  required
                />
              </div>
            </div>
            <div className="mt-4">
              <textarea
                name="help"
                className="p-3 w-100 shadow"
                placeholder="How can we help you?"
                id=""
              ></textarea>
            </div>
            <div className="row">
              <div className="col">
                <input type="checkbox" name="check" id="" /> Please click here
                to opt-in to receiving future marketing communications from
                BlackRock
              </div>
            </div>
            <div className="row">
              <div className="float-right">
                <button
                  className="primary mb-3 mt-3"
                  style={{ float: "right" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
      <div className="mb-3"></div>
    </div>
    <Footer/>
    </>
  );
}

export default Api;
