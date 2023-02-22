import React, {useEffect, useRef, useState} from "react";
import quotes from "../../store/quotes";
import CustomModal from "../modal";
import Waiter from "../waiter";
import TableRowForm from "./rowForm";
import "./index.scss";

export const usefulKeysConfig = {
  last: {label: "Цена", align: "left"},
  highestBid: {label: "Наивысшее", align: "right"},
  percentChange: {label: "24ч Изменениe", align: "right"},
};

const TableWidget = ({data}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const currencyPairNames = Object.keys(data);

  const handleOpenModal = (row) => {
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
                <th key={i} style={{textAlign: keyConf.align}}>
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
        {quotes.modalOpen && <TableRowForm rowData={selectedRow} />}
      </CustomModal>
    </>
  );
};

const TableRow = ({pairName, rowData, onClick}) => {
  const prevData = useRef(rowData || {});

  useEffect(() => {
    prevData.current = rowData;
  }, [rowData]);

  return (
    <tr onClick={onClick}>
      <td>{pairName.replace("_", " / ")}</td>
      {Object.keys(usefulKeysConfig).map((dataKey, i) => {
        const keyConf = usefulKeysConfig[dataKey];

        // Ограничение длины числа до 10 символов
        const rawNum = parseFloat(rowData[dataKey]);
        const normalizedNum = rawNum
          .toFixed(12)
          .replace(/\.?0+$/, "")
          .slice(0, 12);

        // Отслеживание динамики изменений значения
        const prev = Number(prevData.current?.[dataKey]);
        const cur = rawNum;
        const changedUp = cur > prev;
        const changeDown = cur < prev;

        return (
          <td
            key={i}
            style={{
              textAlign: keyConf.align,
              background: changedUp
                ? "hsl(120deg, 100%, 25%, 0.1)"
                : changeDown
                ? "hsl(0deg, 100%, 50%, 0.1)"
                : null,
            }}
          >
            {normalizedNum}
          </td>
        );
      })}
    </tr>
  );
};

export default TableWidget;
