import React from "react";
import {usefulKeysConfig} from "..";
import "./index.scss";

const TableRowForm = ({rowData}) => {
  delete rowData.id;

  const title = rowData.pairName;
  delete rowData.pairName;

  return (
    <div className="tableRowForm">
      <div className="tableRowForm-title">{title}</div>
      <table>
        <tbody>
          {Object.keys(rowData).map((x, i) => (
            <TableRow key={i} paramKey={x} rowData={rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({paramKey, rowData}) => {
  // Ограничение длины числа до 10 символов
  const rawNum = parseFloat(rowData[paramKey]);
  const normalizedNum = rawNum
    .toFixed(12)
    .replace(/\.?0+$/, "")
    .slice(0, 12);

  return (
    <tr className="tableRowForm-row">
      <td>{usefulKeysConfig[paramKey]?.label || paramKey}</td>
      <td style={{paddingLeft: "1rem"}}>{normalizedNum}</td>
    </tr>
  );
};

export default TableRowForm;
