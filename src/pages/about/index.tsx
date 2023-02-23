import React from "react";
import {Link} from "react-router-dom";

import "./index.scss";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="about-title">О приложении</div>
      <div className="about-links">
        <Link to="/quotes/1" className="about-linkBtn">
          Котировки А
        </Link>
        <Link to="/quotes/2" className="about-linkBtn">
          Котировки Б
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
