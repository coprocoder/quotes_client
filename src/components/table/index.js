import React, {useEffect, useRef, useState} from "react";
import CustomModal from "../modal/Simple";
import Waiter from "../waiter";
import "./index.scss";

const usefulKeysConfig = {
  last: {label: "Цена", align: "left"},
  highestBid: {label: "Наивысшее", align: "right"},
  percentChange: {label: "24ч Изменениe", align: "right"},
};

const TableWidget = ({data}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const currencyPairNames = Object.keys(data);

  const handleOpenModal = (row) => setSelectedRow(row);
  const handleCloseModal = () => setSelectedRow(null);

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

      <CustomModal open={!!selectedRow} onClose={handleCloseModal}>
        {!!selectedRow && <QuoteModal rowData={selectedRow} />}
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
        const num = parseFloat(rowData[dataKey]);
        const numVal = num
          .toFixed(12)
          .replace(/\.?0+$/, "")
          .slice(0, 12);

        // Отслеживание динамики изменений значения
        const prev = Number(prevData.current?.[dataKey]);
        const cur = num;
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
            {numVal}
          </td>
        );
      })}
    </tr>
  );
};

const QuoteModal = ({rowData}) => {
  console.log({rowData});
  return (
    <div>
      <div>Modal</div>
      {Object.keys(rowData).map((x, i) => (
        <div key={i}>{rowData[x]}</div>
      ))}
    </div>
  );
};

export default TableWidget;
