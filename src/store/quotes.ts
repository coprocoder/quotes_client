import axios from "axios";
import {makeAutoObservable} from "mobx";
import {IQuotesSet} from "../components/table/types";

interface IQuotes {
  modalOpen: boolean;
  loading: boolean;
  error: Error | null;
  quotesObjPart1: IQuotesSet;
  quotesObjPart2: IQuotesSet;
}

class Quotes implements IQuotes {
  modalOpen = false;
  loading = false;
  error = null;
  quotesObjPart1 = {};
  quotesObjPart2 = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchQuotes() {
    const server_url = process.env.REACT_APP_SERVER_URL;
    const url = server_url + "/quotes";

    const splitQuotesHalf = (resQuotes: IQuotesSet) => {
      const entries = Object.entries(resQuotes);
      const indexToSplitBefore = Math.floor(entries.length / 2);

      const ob1 = Object.fromEntries(entries.slice(0, indexToSplitBefore));
      const ob2 = Object.fromEntries(entries.slice(indexToSplitBefore));

      this.quotesObjPart1 = {...this.quotesObjPart1, ...ob1};
      this.quotesObjPart2 = {...this.quotesObjPart2, ...ob2};
    };

    if (
      !Object.keys(this.quotesObjPart1).length ||
      !Object.keys(this.quotesObjPart2).length
    ) {
      this.loading = true;
    }

    axios
      .get(url)
      .then((res) => {
        splitQuotesHalf(res.data);
        this.error = null;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
        this.error = err;
      });
  }
}

export default new Quotes();
