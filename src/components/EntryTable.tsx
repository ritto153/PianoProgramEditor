import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { useEntries } from "../EntryProvider";
import { BuildEntriesForTableRow } from "../utils/BuildEntriesForTableRow";
import { entryAttributesInfo } from "../constants/EntryAttributesInfo";
import { EntrySchedules } from "../type/EntrySchedules";

type Props = {
  partId: string;
  EntrySchedules: EntrySchedules;
};

export default function EntryTable(props: Props) {
  const { partId, EntrySchedules } = props;
  const { newPartMap, entryMap } = useEntries();

  const part = newPartMap[partId];
  const selectedEntryIds = part.entryIds;

  const entriesForTableRow = useMemo(
    () =>
      BuildEntriesForTableRow({
        entryIds: selectedEntryIds,
        entryMap: entryMap,
        partNum: part.partNum,
        entrySchedules: EntrySchedules,
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
              <th>{displayName}</th>
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
                const rowId = dividedEntryForTableRow["id"] + "-" + i;

                return (
                  <Draggable key={rowId} draggableId={rowId} index={i}>
                    {(draggableProvided) => (
                      <EntryTableRow
                        key={rowId}
                        draggableProvided={draggableProvided}
                        partNum={dividedEntryForTableRow.partNum}
                        dividedEntryForRow={dividedEntryForTableRow}
                        index={i}
                        schedules={EntrySchedules[dividedEntryForTableRow.id]}
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
