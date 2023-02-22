import React from "react";

const TableWidget = ({data}) => {
  const quotesKeys = Object.keys(data);
  // const dataKeys = Object.keys(data[quotesKeys[0]]);
  const usefulDataKeys = ["last", "percentChange", "quoteVolume"];

  return (
    <table>
      <thead style={{position: "sticky"}}>
        <tr>
          <th>Name</th>
          {usefulDataKeys.map((x, i) => {
            return <th key={i}>{x}</th>;
          })}
        </tr>
      </thead>

      <tbody>
        {quotesKeys.map((x, i) => {
          const quoteData = data[x];

          return (
            <tr key={i}>
              <td>{x.replace("_", " / ")}</td>
              {usefulDataKeys.map((x, i) => {
                const num = parseFloat(quoteData[x]);
                const numVal = num
                  .toFixed(10)
                  .replace(/\.?0+$/, "")
                  .slice(0, 10);
                return <td key={i}>{numVal}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableWidget;
