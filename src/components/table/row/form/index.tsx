import React from "react";
import {normalizeNum} from "..";
import {usefulKeysConfig} from "../..";
import {IQuotesSet, IRowData, NumericalString, TRowKey} from "../../types";
import "./index.scss";

interface ITableRow {
  paramKey: TRowKey;
  rowData: IRowData;
}

const TableRowForm = ({rowData}: IQuotesSet) => {
  delete rowData.id;

  const title = rowData.pairName;
  delete rowData.pairName;

  return (
    <div className="tableRowForm">
      <div className="tableRowForm-title">{title}</div>
      <table>
        <tbody>
          {Object.keys(rowData).map((x, i) => (
            <TableRow key={i} paramKey={x as TRowKey} rowData={rowData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = ({paramKey, rowData}: ITableRow) => {
  const param = rowData[paramKey];
  const {normalizedNum} = normalizeNum(param as NumericalString);
  return (
    <tr className="tableRowForm-row">
      <td>{usefulKeysConfig[paramKey]?.label || paramKey}</td>
      <td style={{paddingLeft: "1rem"}}>{normalizedNum}</td>
    </tr>
  );
};

export default TableRowForm;
