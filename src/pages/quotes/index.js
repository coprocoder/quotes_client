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
          {quotes.error ? (
            "Ошибка"
          ) : quotes.loading ? (
            <ClockLoader size={30} />
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

      <div className="quotesPage-tab">
        {tabNum === 1 ? (
          <TableWidget data={quotes.quotesObjPart1} />
        ) : (
          <TableWidget data={quotes.quotesObjPart2} />
        )}
      </div>
    </div>
  );
});

export default QuotesPage;
