import { Draggable, Droppable } from "react-beautiful-dnd";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import EntryTableRow from "./EntryTableRow";
import { entryAttributesInfo } from "../constants/EntryAttributesInfo";
import { useEntries } from "../EntryProvider";

type Props = {
  part_num: number;
};

export default function EntryTable(props: Props) {
  const { part_num } = props;
  const { entries } = useEntries();
  const selectedEntries = entries.filter(
    (entry) => entry.part_num === part_num
  );

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
      <Droppable droppableId={String(part_num)}>
        {(droppableProvided) => (
          <tbody
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {selectedEntries.map((entry, i) => (
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
  );
}
