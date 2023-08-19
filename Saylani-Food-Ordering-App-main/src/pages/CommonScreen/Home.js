import React from "react";
import Logo from "../../assests/img/Logo.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="homePage">
      <div className="container">
        <div>
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div>
          <h2 className="first">SAYLANI WELFARE</h2>
          <h4 className="second">ONLINE DISCOUNT STORE</h4>
        </div>
        <div>
          <Link to="/signup">
            <button className="btn first-button">
              <p className="button-para">Get Started</p>
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
