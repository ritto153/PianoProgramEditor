import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { entryAttributesInfo } from "../constants/EntryAttributesInfo";
import { useEntries } from "../EntryProvider";

type Props = {
  partNum: number;
};

export default function EntryTable(props: Props) {
  const { partNum } = props;
  const { partMap } = useEntries();
  const selectedEntryIds = partMap[partNum]["entryIds"];

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          {Object.entries(entryAttributesInfo).map(([_, value]) => {
            if (value["displayInTable"]) return <th>{value["displayName"]}</th>;
            else return null;
          })}
        </tr>
      </thead>
      {
        <Droppable droppableId={String(partNum)}>
          {(droppableProvided) => (
            <tbody
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {
                selectedEntryIds.map((entryId, i) =>
                  <Draggable
                    key={entryId}
                    draggableId={String(entryId)}
                    index={i}
                  >
                    {(draggableProvided) => (
                      <EntryTableRow
                        key={entryId}
                        draggableProvided={draggableProvided}
                        partNum={partNum}
                        entryId={entryId}
                        index={i + 1}
                      />
                    )}
                  </Draggable>
                )
              }
            </tbody>
          )}
        </Droppable>
      }
    </Table>
  );
}
