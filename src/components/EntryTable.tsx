import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
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

  const selectedEntryIdsShouldRemove = ['tachibanafu'];
  const entriesForTableRow = useMemo(
    () => BuildEntriesForTableRow({
      entryIds: selectedEntryIdsShouldRemove,
      entryMap: newEntryMap,
      partNum: part.partNum,
      entrySchedules: newEntrySchedules,
    }),
    [selectedEntryIds, entryMap]
  );
  console.log(entriesForTableRow);

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
              {selectedEntryIds.map((entryId, i) => (
                <Draggable key={entryId} draggableId={entryId} index={i}>
                  {(draggableProvided) => (
                    <EntryTableRow
                      key={entryId}
                      draggableProvided={draggableProvided}
                      partNum={part.partNum}
                      entryId={entryId}
                      index={i + 1}
                      schedules={entrySchedules[entryId]}
                    />
                  )}
                </Draggable>
              ))}
              {
                <tr>以下は複数行エントリー用の行</tr>
              }
              {
                entriesForTableRow.map((dividedEntryForTableRow, i) => {
                  return (
                    <NewEntryTableRow
                      key={String(i)}
                      draggableProvided={null}
                      partNum={dividedEntryForTableRow.partNum}
                      dividedEntryForRow={dividedEntryForTableRow}
                      index={i}
                      schedules={newEntrySchedules[dividedEntryForTableRow.id]}
                    />
                  );
                })
              }
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
