import { useEntries } from "../../EntryProvider";
import { useMemo } from "react";
import styled from "styled-components";
import { DivideEntryForRow } from "../utils/BuildEntriesForTableRow";
import { entryAttributesInfo } from "../../constants/EntryAttributesInfo";
import { EntryForDisplay } from "../../type/Entry";
import { DividedEntryForRow } from "../../type/DividedEntryForRow";

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

  const { entryMap } = useEntries();
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
              <tr>
                <TdWithAttribute
                  entry={entry}
                  attribute="playMinutes"
                  rowSpan={rowCount}
                />
                <TdWithAttribute
                  entry={entry}
                  attribute="startingTime"
                  rowSpan={rowCount}
                />
                <TdWithAttribute
                  entry={entry}
                  attribute="partNum"
                  rowSpan={rowCount}
                />
                <TdWithAttribute
                  entry={entry}
                  attribute="index"
                  rowSpan={rowCount}
                />
                <TdWithAttribute entry={entry} attribute="lastName" />
                <TdWithAttribute entry={entry} attribute="firstName" />
                <TdWithAttribute entry={entry} attribute="faculty" />
                <TdWithAttribute entry={entry} attribute="grade" />
                <TdWithAttribute entry={entry} attribute="composer" />
                <TdWithAttribute entry={entry} attribute="work" />
                <TdWithAttribute entry={entry} attribute="memo" />
              </tr>
            );
          } else {
            return (
              <tr>
                <TdWithAttribute entry={entry} attribute="lastName" />
                <TdWithAttribute entry={entry} attribute="firstName" />
                <TdWithAttribute entry={entry} attribute="faculty" />
                <TdWithAttribute entry={entry} attribute="grade" />
                <TdWithAttribute entry={entry} attribute="composer" />
                <TdWithAttribute entry={entry} attribute="work" />
                <TdWithAttribute entry={entry} attribute="memo" />
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
