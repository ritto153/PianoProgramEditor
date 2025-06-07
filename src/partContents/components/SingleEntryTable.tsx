import { useMemo } from "react";
import styled from "styled-components";
import EntryMenu from "../entryMenu/components/EntryMenu";
import { DivideEntryForRow } from "../utils/BuildEntriesForTableRow";
import { entryAttributesInfo } from "../../constants/EntryAttributesInfo";
import { EntryForDisplay } from "../../type/Entry";
import { DividedEntryForRow } from "../../type/DividedEntryForRow";
import { useGetSavedData } from "../../hooks/useGetSavedData";

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 10px;
  td {
    border: 1px solid #dee2e6;
    padding-top: 3px;
    padding-bottom: 3px;
    letter-spacing: 1px;
    font-weight: bold;
  }
`;

const TdWithWidth = styled.td<{ $width: number }>`
  width: ${(props) => props.$width}px;
`;

// 1エントリーで1回だけ表示させる列の属性
const attributesPerEntry: (keyof EntryForDisplay)[] = [
  "playMinutes",
  "startingTime",
  "partNum",
  "index",
];

// 1エントリー内で演奏者ごとに表示させる列の属性
const attributesPerPerson: (keyof EntryForDisplay)[] = [
  "lastName",
  "firstName",
  "faculty",
  "grade",
  "composer",
  "work",
  "memo",
];

type Props = {
  draggableProvided: any;
  entryId: string;
  index: number;
  partNum: number;
  stringStartingTime: string;
};

export default function SingleEntryTable(props: Props): JSX.Element {
  const { draggableProvided, entryId, index, partNum, stringStartingTime } =
    props;
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const entryMap = savedDataInUse.entryMap;

  const entry = entryMap[entryId];

  const entriesForTableRow = useMemo(
    () =>
      DivideEntryForRow({
        entry,
        partNum,
        index,
        stringStartingTime,
      }),
    [entryId, entryMap, index, stringStartingTime]
  );

  const rowCount = entriesForTableRow.length;

  return (
    <StyledTable
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <tbody>
        {entriesForTableRow.map((entry, i) => {
          if (i === 0) {
            return (
              <tr key={i}>
                <TdWithWidth $width={50} rowSpan={rowCount}>
                  <EntryMenu entryId={entry.entryId}></EntryMenu>
                </TdWithWidth>
                {attributesPerEntry.map((attribute) => (
                  <TdWithAttribute
                    entry={entry}
                    attribute={attribute}
                    rowSpan={rowCount}
                    key={attribute}
                  />
                ))}
                {attributesPerPerson.map((attribute) => (
                  <TdWithAttribute
                    entry={entry}
                    attribute={attribute}
                    key={attribute}
                  />
                ))}
              </tr>
            );
          } else {
            return (
              <tr key={i}>
                {attributesPerPerson.map((attribute) => (
                  <TdWithAttribute
                    entry={entry}
                    attribute={attribute}
                    key={attribute}
                  />
                ))}
              </tr>
            );
          }
        })}
      </tbody>
    </StyledTable>
  );
}

type PropsForTdWithAttribute = {
  entry: DividedEntryForRow;
  attribute: keyof EntryForDisplay;
  rowSpan?: number;
};

function TdWithAttribute(props: PropsForTdWithAttribute) {
  const { entry, attribute, rowSpan } = props;

  const rowSpanNum = rowSpan ? rowSpan : 1;

  return (
    <TdWithWidth
      $width={entryAttributesInfo[attribute].columnWidthPx}
      rowSpan={rowSpanNum}
    >
      {entry[attribute]}
    </TdWithWidth>
  );
}
