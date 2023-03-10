import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ClockLoader from "react-spinners/ClockLoader";
import TableWidget from "../../components/table";
import quotes from "../../store/quotes";

import "./index.scss";

type PageParams = {
  id: string | undefined;
};

const QuotesPage = observer(() => {
  const {id} = useParams<PageParams>();
  const [tabNum, setTabNum] = useState<Number | undefined>(Number(id) || 1);

  useEffect(() => {
    quotes.fetchQuotes();
  }, []);

  useEffect(() => {
    const updateInterval = setInterval(() => quotes.fetchQuotes(), 5000);
    if (quotes.modalOpen) {
      clearInterval(updateInterval);
    }
    return () => clearInterval(updateInterval);
  }, [quotes.modalOpen]);

  return (
    <div className="quotesPage">
      <div className="quotesPage-header">
        <Link className="quotesPage-backBtn" to="/">
          О приложении
        </Link>
        <div className="quotesPage-animIndicator">
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
          Котировки А
        </div>
        <div
          className={`quotesPage-tabSelection ${
            tabNum == 2 ? "quotesPage-tabSelection-active" : ""
          }`}
          onClick={() => setTabNum(2)}
        >
          Котировки Б
        </div>
      </div>

      <div className="quotesPage-tab">
        <TableWidget
          data={tabNum === 1 ? quotes.quotesObjPart1 : quotes.quotesObjPart2}
        />
      </div>
    </div>
  );
});

export default QuotesPage;
