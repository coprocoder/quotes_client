import React from "react";
import ClockLoader from "react-spinners/ClockLoader";

import "./index.scss";

const Waiter = () => {
  return (
    <div className="waiter">
      <ClockLoader
        color={"black"}
        size={100}
      />
    </div>
  );
};

export default Waiter;
