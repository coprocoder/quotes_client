import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import TableWidget from "../../components/table";
import quotes from "../../store/quotes";

import "./index.scss";

const QuotesPage = observer(() => {
  const {id} = useParams();
  const [tabNum, setTabNum] = useState(+id || 1);

  useEffect(() => {
    quotes.fetchQuotes();
    setInterval(() => quotes.fetchQuotes(), 5000);
  }, []);

  return (
    <div className="quotesPage">
      <div className="quotesPage-header">
        <Link className="quotesPage-backBtn" to="/">
          О приложении
        </Link>
        <div className="quotesPage-animIndicator" to="/">
          {quotes.loading ? (
            <ClockLoader size={30} />
          ) : !(quotes.quotesObjPart1 && quotes.quotesObjPart2) ? (
            "Ошибка"
          ) : null}
        </div>
      </div>
      <div className="quotesPage-tabSelector">
        <div
          className={`quotesPage-tabSelection ${
            tabNum == 1 ? "quotesPage-tabSelection-active" : ""
          }`}
          onClick={() => setTabNum(1)}
        >
          Котировки 1
        </div>
        <div
          className={`quotesPage-tabSelection ${
            tabNum == 2 ? "quotesPage-tabSelection-active" : ""
          }`}
          onClick={() => setTabNum(2)}
        >
          Котировки 2
        </div>
      </div>
      {tabNum === 1 ? (
        <Tab1 data={quotes.quotesObjPart1} />
      ) : (
        <Tab2 data={quotes.quotesObjPart2} />
      )}
    </div>
  );
});

const Tab1 = ({data}) => {
  return (
    <div className="quotesPage-tab">
      <TableWidget data={data} />
    </div>
  );
};

const Tab2 = ({data}) => {
  return (
    <div className="quotesPage-tab">
      <TableWidget data={data} />
    </div>
  );
};

export default QuotesPage;
