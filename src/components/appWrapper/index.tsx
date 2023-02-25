import React from "react";
import "./index.scss";

type CustomModalProps = React.PropsWithChildren<any>;

const AppWrapper = ({children}: CustomModalProps) => {
  return <div className="appWrapper">{children}</div>;
};

export default AppWrapper;
