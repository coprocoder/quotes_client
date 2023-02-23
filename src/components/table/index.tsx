import React, {useState} from "react";
import quotes from "../../store/quotes";
import CustomModal from "../modal";
import Waiter from "../waiter";
import TableRowForm from "./row/form";
import "./index.scss";
import {IQuotesSet, IRowData} from "./types";
import TableRow from "./row";

export interface IKeyConf {
  [key: string]: {
    label: string;
    align: string;
  };
}

export const usefulKeysConfig: IKeyConf = {
  last: {label: "Цена", align: "left"},
  highestBid: {label: "Наивысшее", align: "right"},
  percentChange: {label: "24ч Изменениe", align: "right"},
};

interface TableProps {
  data: IQuotesSet;
}

const TableWidget = ({data}: TableProps) => {
  const [selectedRow, setSelectedRow] = useState<IRowData | null>(null);
  const currencyPairNames = Object.keys(data);

  const handleOpenModal = (row: IRowData) => {
    quotes.modalOpen = true;
    setSelectedRow(row);
  };
  const handleCloseModal = () => {
    quotes.modalOpen = false;
    setSelectedRow(null);
  };

  return (
    <>
      <table className="tableWidget">
        <thead className="tableWidget-head">
          <tr>
            <th style={{textAlign: "left"}}>Название</th>
            {Object.keys(usefulKeysConfig).map((x, i) => {
              const keyConf = usefulKeysConfig[x];
              return (
                <th
                  key={i}
                  style={{textAlign: keyConf.align} as React.CSSProperties}
                >
                  {keyConf.label}
                </th>
              );
            })}
          </tr>
        </thead>

        {data ? (
          <tbody className="tableWidget-body">
            {currencyPairNames.map((pairName, i) => {
              const rowData = data[pairName];
              return (
                <TableRow
                  key={i}
                  pairName={pairName}
                  rowData={rowData}
                  onClick={() => handleOpenModal({...rowData, pairName})}
                />
              );
            })}
          </tbody>
        ) : (
          <Waiter />
        )}
      </table>

      <CustomModal open={quotes.modalOpen} onClose={handleCloseModal}>
        {selectedRow && <TableRowForm rowData={selectedRow} />}
      </CustomModal>
    </>
  );
};

export default TableWidget;
