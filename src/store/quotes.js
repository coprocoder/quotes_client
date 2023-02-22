import {makeAutoObservable} from "mobx";

class Quotes {
  quotesObjPart1 = {};
  quotesObjPart2 = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchQuotes() {
    const server_url = process.env.REACT_APP_SERVER_URL;
    const url = server_url + "/quotes";

    const splitQuotesHalf = (resQuotes) => {
      const entries = Object.entries(resQuotes);
      const indexToSplitBefore = Math.floor(entries.length / 2);

      const ob1 = Object.fromEntries(entries.slice(0, indexToSplitBefore));
      const ob2 = Object.fromEntries(entries.slice(indexToSplitBefore));

      this.quotesObjPart1 = {...this.quotesObjPart1, ...ob1} || {};
      this.quotesObjPart2 = {...this.quotesObjPart2, ...ob2} || {};
    };

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log({res});
        splitQuotesHalf(res);
      });
  }
}

export default new Quotes();
