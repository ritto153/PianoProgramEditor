import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import OldEntryTableRow from "./OldEntryTableRow";
import NewEntryTableRow from "./NewEntryTableRow";
import { useEntries } from "../EntryProvider";
import { OldBuildEntryForDisplay } from "../utils/OldBuildEntryForDisplay";
import { BuildEntriesForTableRow } from "../utils/BuildEntriesForTableRow";
import { entryAttributesInfo } from "../constants/EntryAttributesInfo";
import { EntryForDisplay } from "../type/Entry";
import { EntrySchedules } from "../type/EntrySchedules";

type Props = {
  partId: string;
  entrySchedules: EntrySchedules;
  newEntrySchedules: EntrySchedules;
};

export default function EntryTable(props: Props) {
  const { partId, entrySchedules, newEntrySchedules } = props;
  const { partMap, entryMap, newEntryMap } = useEntries();

  const part = partMap[partId];
  const selectedEntryIds = part.entryIds;

  const selectedEntryIdsShouldRemove = ["tachibanafu"];
  const entriesForTableRow = useMemo(
    () =>
      BuildEntriesForTableRow({
        entryIds: selectedEntryIdsShouldRemove,
        entryMap: newEntryMap,
        partNum: part.partNum,
        entrySchedules: newEntrySchedules,
      }),
    [selectedEntryIds, entryMap]
  );

  const keysOfEntryForDisplay = Object.keys(
    OldBuildEntryForDisplay(Object.values(entryMap)[0], 0, 0, null)
  ) as (keyof EntryForDisplay)[];

  const tableComponent = (
    <Table striped bordered hover>
      <thead>
        <tr>
          {keysOfEntryForDisplay.map((entryKey, i) => {
            if (!Object.keys(entryAttributesInfo).includes(entryKey)) {
              throw new Error(
                `Entry のキー ${entryKey} が entryArrtibutesInfo に含まれていません`
              );
            }

            const attributeInfo = entryAttributesInfo[entryKey];
            return <th key={i}>{attributeInfo.displayName}</th>;
          })}
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
                      <NewEntryTableRow
                        key={rowId}
                        draggableProvided={draggableProvided}
                        partNum={dividedEntryForTableRow.partNum}
                        dividedEntryForRow={dividedEntryForTableRow}
                        index={i}
                        schedules={
                          newEntrySchedules[dividedEntryForTableRow.id]
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
