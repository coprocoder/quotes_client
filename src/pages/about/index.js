import React from "react";
import {Link} from "react-router-dom";

import "./index.scss";

const AboutPage = () => {
  return (
    <div className="about">
      <div className="about-title">О приложении</div>
      <div className="about-links">
        <button>
          <Link to="/quotes/1">Quotes Tab 1</Link>
        </button>
        <div>
          <Link to="/quotes/2">Quotes Tab 2</Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
