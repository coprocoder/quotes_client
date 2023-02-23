import React, {useEffect, useRef} from "react";
import {usefulKeysConfig} from "..";
import {IRowData, NumericalString, TRowKey} from "../types";

interface TableRowProps {
  pairName: string;
  rowData: IRowData;
  // onClick?: (params: any) => any;
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

  useEffect(() => {
    prevData.current = rowData;
  }, [rowData]);

  return (
    <tr onClick={onClick}>
      <td>{pairName.replace("_", " / ")}</td>
      {Object.keys(usefulKeysConfig).map((paramKey, i) => {
        const keyConf = usefulKeysConfig[paramKey];

        const param = rowData[paramKey as TRowKey];
        const {rawNum, normalizedNum} = normalizeNum(param as NumericalString);

        // Отслеживание динамики изменений значения
        const prev = Number(prevData.current?.[paramKey as TRowKey]);
        const cur = rawNum;
        const changedUp = cur > prev;
        const changeDown = cur < prev;

        return (
          <td
            key={i}
            style={
              {
                textAlign: keyConf.align,
                background: changedUp
                  ? "hsl(120deg, 100%, 25%, 0.1)"
                  : changeDown
                  ? "hsl(0deg, 100%, 50%, 0.1)"
                  : "transparent",
              } as React.CSSProperties
            }
          >
            {normalizedNum}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
