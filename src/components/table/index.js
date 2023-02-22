import React from "react";
import Waiter from "../waiter";
import "./index.scss";

const usefulKeysConfig = {
  last: {label: "Цена", align: "left"},
  highestBid: {label: "Наивысшее", align: "right"},
  percentChange: {label: "24ч Изменениe", align: "right"},
};

const TableWidget = ({data}) => {
  const currencyPairNames = Object.keys(data);
  // const dataKeys = Object.keys(data[quotesKeys[0]]);
  const usefulDataKeys = Object.keys(usefulKeysConfig);

  return (
    <table className="tableWidget">
      <thead className="tableWidget-head">
        <tr>
          <th style={{textAlign: "left"}}>Название</th>
          {usefulDataKeys.map((x, i) => {
            const keyConf = usefulKeysConfig[x];
            return (
              <th key={i} style={{textAlign: keyConf.align}}>
                {keyConf.label}
              </th>
            );
          })}
        </tr>
      </thead>

      {data ? (
        <tbody className="tableWidget-body">
          {currencyPairNames.map((x, i) => {
            const quoteData = data[x];

            return (
              <tr key={i}>
                <td>{x.replace("_", " / ")}</td>
                {usefulDataKeys.map((x, i) => {
                  const keyConf = usefulKeysConfig[x];
                  const num = parseFloat(quoteData[x]);
                  const numVal = num
                    .toFixed(10)
                    .replace(/\.?0+$/, "")
                    .slice(0, 10);

                  return (
                    <td key={i} style={{textAlign: keyConf.align}}>
                      {numVal}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      ) : (
        <Waiter />
      )}
    </table>
  );
};

export default TableWidget;
