import React, {useEffect, useRef} from "react";
import {usefulKeysConfig} from "..";
import {IRowData, NumericalString, TRowKey} from "../types";

interface TableRowProps {
  pairName: string;
  rowData: IRowData;
  onClick?: () => void;
}

export const normalizeNum = (param: NumericalString) => {
  // Ограничение длины числа до 10 символов
  const rawNum = parseFloat(param as string);
  const normalizedNum = rawNum
    .toFixed(12)
    .replace(/\.?0+$/, "")
    .slice(0, 12);
  return {rawNum, normalizedNum};
};

const TableRow = ({pairName, rowData, onClick}: TableRowProps) => {
  const prevData = useRef(rowData || {});
  const prevPair = useRef(pairName);

  useEffect(() => {
    prevData.current = rowData;
    prevPair.current = pairName;
  }, [rowData]);

  return (
    <tr onClick={onClick}>
      <td>{pairName.replace("_", " / ")}</td>
      {Object.keys(usefulKeysConfig).map((paramKey, i) => {
        const keyConf = usefulKeysConfig[paramKey];

        const param = rowData[paramKey as TRowKey];
        const {rawNum, normalizedNum} = normalizeNum(param as NumericalString);

        const getBgColor = () => {
          let background = "transparent";
          if (prevPair.current == pairName) {
            // Отслеживание динамики изменений значения
            const prev = Number(prevData.current?.[paramKey as TRowKey]);
            const cur = rawNum;
            const changedUp = cur > prev;
            const changeDown = cur < prev;
            background = changedUp
              ? "hsl(120deg, 100%, 25%, 0.1)"
              : changeDown
              ? "hsl(0deg, 100%, 50%, 0.1)"
              : "transparent";
          }
          return background;
        };
        return (
          <td
            key={i}
            style={
              {
                textAlign: keyConf.align,
                background: getBgColor(),
              } as React.CSSProperties
            }
          >
            {normalizedNum}
            {keyConf?.postfix}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
