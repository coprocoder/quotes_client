export type NumericalString = `${number}` | number;

export interface IRowData {
  last: NumericalString;
  lowestAsk: NumericalString;
  highestBid: NumericalString;
  percentChange: NumericalString;
  baseVolume: NumericalString;
  quoteVolume: NumericalString;
  isFrozen: NumericalString;
  postOnly: NumericalString;
  high24hr: NumericalString;
  low24hr: NumericalString;
  id?: number;
  pairName?: string;
}
export type TRowKey = keyof IRowData;

export interface IQuotesSet {
  [key: string]: IRowData;
}
