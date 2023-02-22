import {observer} from "mobx-react-lite";
import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import TableWidget from "../../components/table";
import quotes from "../../store/quotes";

const QuotesPage = observer(() => {
  const {id} = useParams();
  const [tabNum, setTabNum] = useState(+id || 1);

  useEffect(() => {
    quotes.fetchQuotes();
    // setInterval(() => quotes.fetchQuotes(), 5000);
  }, []);

  return (
    <div>
      <Link to="/">О приложении</Link>
      <div>
        <div onClick={() => setTabNum(1)}>Goto Tab 1</div>
        <div onClick={() => setTabNum(2)}>Goto Tab 2</div>
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
  return <TableWidget data={data} />;
};

const Tab2 = ({data}) => {
  return <TableWidget data={data} />;
};

export default QuotesPage;
