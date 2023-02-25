import { Box, Flex } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';

import Cell from 'components/Cell';
import HeaderCell from './HeaderCell';

interface Props {
  initColumns: number;
  initRows: number;
}

const initHeaderValues = (rowIdx: number, colIdx: number): string => {
  if (rowIdx === 0 && colIdx === 0) return ''; // top-left corner
  if (rowIdx !== 0 && colIdx === 0) return String(rowIdx); // row header
  if (rowIdx === 0 && colIdx !== 0) return String(colIdx); // row header
  return ''; // regular cell
}

const Spreadsheet: React.FC<Props> = ({ initRows, initColumns, }) => {
  const [colCount] = useState(initColumns);
  const [rowCount] = useState(initRows);
  const [cellState, setCellState] = useState(
    _.times(rowCount, (itr1) => _.times(colCount, (itr2) => initHeaderValues(itr1, itr2))),
  );

  const cellRefs: React.RefObject<HTMLInputElement>[][] = useMemo(() => {
    return _.times(rowCount, () => _.times(colCount, () => React.createRef<HTMLInputElement>()));
  }, [rowCount, colCount])
  console.log({ cellRefs })

  const handleChange = (newValue: string, rowIdx: number, columnIdx: number) => {
    const newRow = [
      ...cellState[rowIdx].slice(0, columnIdx),
      newValue,
      ...cellState[rowIdx].slice(columnIdx + 1),
    ];
    setCellState([
      ...cellState.slice(0, rowIdx),
      newRow,
      ...cellState.slice(rowIdx + 1),
    ]);
  }

  const handleKeyDown = useCallback((ev: React.KeyboardEvent<HTMLInputElement>, rowIdx: number, columnIdx: number) => {
    switch (ev.key) {
      case 'ArrowRight':
        if (columnIdx < colCount - 1) {
          cellRefs[rowIdx][columnIdx + 1].current.focus();
        }
        break;
      case 'ArrowLeft':
        if (columnIdx > 0) {
          cellRefs[rowIdx][columnIdx - 1].current.focus();
        }
        break;
      case 'ArrowDown':
        if (rowIdx < rowCount - 1) {
          cellRefs[rowIdx + 1][columnIdx].current.focus();
        }
        break;
      case 'ArrowUp':
        if (rowIdx > 0) {
          cellRefs[rowIdx - 1][columnIdx].current.focus();
        }
        break;
      case 'Enter':
      default:
        break;
    }
  }, [cellRefs]);

  return (
    <Box width="full">
      {cellState.map((rowCells, rowIdx) => {
        return (
          <Flex key={String(rowIdx)}>
            {rowCells.map((cellValue, columnIdx) => {
              if (rowIdx === 0 || columnIdx === 0) {
                // column row
                return (
                  <HeaderCell
                    key={`${rowIdx}/${columnIdx}`}
                    disabled={rowIdx === 0 && columnIdx === 0}
                    value={cellValue}
                    onChange={(newValue: string) => handleChange(newValue, rowIdx, columnIdx)}
                    ref={cellRefs[rowIdx][columnIdx]}
                    onKeyDown={(event) => handleKeyDown(event, rowIdx, columnIdx)}
                  />
                )
              }
              return (
                <Cell
                  key={`${rowIdx}/${columnIdx}`}
                  value={cellValue}
                  onChange={(newValue: string) => handleChange(newValue, rowIdx, columnIdx)}
                  ref={cellRefs[rowIdx][columnIdx]}
                  onKeyDown={(event) => handleKeyDown(event, rowIdx, columnIdx)}
                />
              );
            })}
          </Flex>
        );
      })}
    </Box>
  );
};

export default Spreadsheet;
