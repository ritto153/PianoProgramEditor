import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { useEntries } from "../EntryProvider";
import { Entry } from "../type/Entry";
import { DropResult } from "../type/DropResult";

export default function EntryTable() {
  const { entries, setEntries } = useEntries();

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/reorder.js#L6
  const reorderEntry = (
    list: Entry[],
    startIndex: number,
    endIndex: number
  ): Entry[] => {
    let result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    result = result.map((entry, i) => ({
      ...entry,
      sort: i + 1,
    }));

    return result;
  };

  // https://github.com/atlassian/react-beautiful-dnd/blob/013bfceac04ff48548c33cdc468dd2927446fc1b/stories/src/table/with-fixed-columns.jsx#L107
  const onDragEnd = (result: DropResult) => {
    // 表の外にドロップされた場合
    if (!result.destination) {
      return;
    }

    // 同じ場所にドロップされた場合
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedEntries = reorderEntry(
      entries,
      result.source.index,
      result.destination.index
    );
    setEntries(reorderedEntries);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Table striped bordered hover>
        <thead>
          <tr>
            {Object.keys(entries[0]).map((key, i) => {
              if (key !== "id") {
                return <th key={i}>{key}</th>;
              }
            })}
          </tr>
        </thead>
        <Droppable droppableId="table">
          {(droppableProvided) => (
            <tbody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {entries.map((entry, i) => (
                <Draggable
                  key={entry.id}
                  draggableId={String(entry.id)}
                  index={i}
                >
                  {(draggableProvided) => (
                    <EntryTableRow
                      key={entry.id}
                      draggableProvided={draggableProvided}
                      entryId={entry.id}
                    />
                  )}
                </Draggable>
              ))}
            </tbody>
          )}
        </Droppable>
      </Table>
    </DragDropContext>
  );
}
