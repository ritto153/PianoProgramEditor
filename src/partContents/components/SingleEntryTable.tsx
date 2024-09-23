import { useEntries } from "../../EntryProvider";
import { useMemo } from "react";
import styled from "styled-components";
import { EntrySchedules } from "../../type/EntrySchedules";
import { BuildEntriesForTableRow } from "../utils/BuildEntriesForTableRow";

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 15px 0 15px 0;
  td {
    border: 1px solid #dee2e6;
    padding-top: 3px;
    padding-bottom: 3px;
    letter-spacing: 1px;
    font-weight: bold;
  }
  tbody tr:hover {
    background-color: #bbbbbb;
  }
`;

type Props = {
  draggableProvided: any;
  entryId: string;
  index: number;
  partNum: number;
  entrySchedules: EntrySchedules;
};

export default function SingleEntryTable(props: Props): JSX.Element {
  const { draggableProvided, entryId, index, partNum, entrySchedules } = props;

  const { entryMap } = useEntries();

  const entriesForTableRow = useMemo(
    () =>
      BuildEntriesForTableRow({
        entryIds: [entryId],
        entryMap: entryMap,
        partNum: partNum,
        entrySchedules: entrySchedules,
      }),
    [entryId, entryMap]
  );

  const rowCount = entriesForTableRow.length;

  return (
    <StyledTable
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      {entriesForTableRow.map((entry, i) => {
        if (i === 0) {
          return (
            <tr>
              <td rowSpan={rowCount}>{entry.playMinutes}</td>
              <td rowSpan={rowCount}>{entry.startingTime}</td>
              <td rowSpan={rowCount}>{partNum}</td>
              <td rowSpan={rowCount}>{index}</td>
              <td>{entry.lastName}</td>
              <td>{entry.firstName}</td>
              <td>{entry.faculty}</td>
              <td>{entry.grade}</td>
              <td>{entry.composer}</td>
              <td>{entry.work}</td>
              <td>{entry.memo}</td>
            </tr>
          );
        } else {
          return (
            <tr>
              <td>{entry.lastName}</td>
              <td>{entry.firstName}</td>
              <td>{entry.faculty}</td>
              <td>{entry.grade}</td>
              <td>{entry.composer}</td>
              <td>{entry.work}</td>
              <td>{entry.memo}</td>
            </tr>
          );
        }
      })}
    </StyledTable>
  );
}
