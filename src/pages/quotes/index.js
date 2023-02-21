import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";

const QuotesPage = () => {
  const {id} = useParams();

  const [tabNum, setTabNum] = useState(+id || 1);

  return (
    <div>
      <Link to="/">О приложении</Link>
      <div onClick={() => setTabNum(1)}>Goto Tab 1</div>
      <div onClick={() => setTabNum(2)}>Goto Tab 2</div>
      {tabNum === 1 ? <Tab1 /> : <Tab2 />}
    </div>
  );
};

const Tab1 = () => {
  return <div>TAB 1</div>;
};

const Tab2 = () => {
  return <div>TAB 2</div>;
};

export default QuotesPage;
