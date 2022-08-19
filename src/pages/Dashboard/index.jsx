import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [cryptoNews, setCryptoNews] = useState([]);

  const fetchNews = async () => {
    const url = 'https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=5a4d5991089d406e8117d408dc2cfead';
    let data = await fetch(url);
    let response = await data.json();
    setCryptoNews(response.articles);
  }
  useEffect(() => {
    fetchNews();
  }, []);

  const defaultImage = 'https://i.morioh.com/200702/b3154d32.jpg';

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="card back p-4">
          <p>Username / Profile <span className="ps-5"> User Id</span></p>
        </div>
        </div>
      </div>
      <div className="container mt-4 mb-5">
        <div className="row">
          <div className="col col-md-12 col-lg-8 card back mt-3 p-3">
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
          <div className="col col md-6 col lg-4 mt-3 pt-2 card back ms-3 news" >
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                <div class="carousel-item active">
      <img height={300} src="https://tokenplace.com/wp-content/uploads/2019/09/cryptonews-digest-16-26-September.jpeg" class="d-block w-100" alt="news"/>
    </div>
              {cryptoNews.map((news) => {
                return (
                  <div className="carousel-item " >
                  <img height={240} src={news?.urlToImage || defaultImage} className="d-block w-100" alt="news"/>
                    <div>
                      <h5 className="mt-2">{news.title}</h5>
                    </div>
                </div>
                )
              })}
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Dashboard;
