import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { useEntries } from "../../EntryProvider";
import { useParts } from "../../PartProvider";
import { BuildEntriesForTableRow } from "../utils/BuildEntriesForTableRow";
import { entryAttributesInfo } from "../../constants/EntryAttributesInfo";
import { EntrySchedules } from "../../type/EntrySchedules";

type Props = {
  partId: string;
  entrySchedules: EntrySchedules;
};

export default function EntryTable(props: Props) {
  const { partId, entrySchedules } = props;

  const { partMap } = useParts();
  const { entryMap } = useEntries();

  const part = partMap[partId];
  const selectedEntryIds = part.entryIds;

  const entriesForTableRow = useMemo(
    () =>
      BuildEntriesForTableRow({
        entryIds: selectedEntryIds,
        entryMap: entryMap,
        partNum: part.partNum,
        entrySchedules: entrySchedules,
      }),
    [selectedEntryIds, entryMap]
  );

  const tableComponent = (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.entries(entryAttributesInfo)
            .sort((a, b) => a[1]["columnIndex"] - b[1]["columnIndex"])
            .map(([_, { displayName }]) => (
              <th key={displayName}>{displayName}</th>
            ))}
        </tr>
      </thead>
      {
        <Droppable droppableId={partId}>
          {(droppableProvided) => (
            <tbody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {entriesForTableRow.map((dividedEntryForTableRow, i) => {
                /**
                 * `&{entryId}+&{rowIndexInEntry}` を列のIDとする
                 * よって、entryId には + が入らないように作成部分で防止する必要あり
                 */
                const rowId =
                  dividedEntryForTableRow.entryId +
                  "+" +
                  dividedEntryForTableRow.rowIndexInEntry;

                return (
                  <Draggable key={rowId} draggableId={rowId} index={i}>
                    {(draggableProvided) => (
                      <EntryTableRow
                        key={rowId}
                        draggableProvided={draggableProvided}
                        partNum={dividedEntryForTableRow.partNum}
                        dividedEntryForRow={dividedEntryForTableRow}
                        index={i}
                        schedules={
                          entrySchedules[dividedEntryForTableRow.entryId]
                        }
                      />
                    )}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </tbody>
          )}
        </Droppable>
      }
    </Table>
  );
  const memoTableComponent = useMemo(() => {
    return tableComponent;
  }, [part]);

  return memoTableComponent;
}