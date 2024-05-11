import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { useEntries } from "../EntryProvider";
import { BuildEntryForDisplay } from "../utils/BuildEntryForDisplay";
import { entryAttributesInfo } from "../constants/EntryAttributesInfo";
import { minutesBetweenSolo, minutesBeforOrAfterDuet } from "../constants/MinutesBetweenEntries";
import { EntryForDisplay } from "../type/Entry";

type Props = {
  partId: string;
};

export default function EntryTable(props: Props) {
  const { partId } = props;
  const { partMap, entryMap } = useEntries();
  const part = partMap[partId];
  const selectedEntryIds = part.entryIds;
  const randomEntry = Object.values(entryMap)[0];
  const keysOfEntryForDisplay = Object.keys(
    BuildEntryForDisplay(randomEntry, 0, 0, null)
  ) as (keyof EntryForDisplay)[];

  return (
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
                    />
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </tbody>
          )}
        </Droppable>
      }
    </Table>
  );
}
