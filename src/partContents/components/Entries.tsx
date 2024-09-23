import { useMemo } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParts } from "../../PartProvider";
import { entryAttributesInfo } from "../../constants/EntryAttributesInfo";
import { EntrySchedules } from "../../type/EntrySchedules";
import SingleEntryTable from "./SingleEntryTable";
import styled from "styled-components";
import { StringifyDate } from "../../utils/StringifyDate";

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin: 15px 0 15px 0;
  thead th {
    padding: 5px;
    background-color: #bbbbbb;
  }
`;

type Props = {
  partId: string;
  entrySchedules: EntrySchedules;
};

export default function Entries(props: Props) {
  const { partId, entrySchedules } = props;

  const { partMap } = useParts();

  const part = partMap[partId];
  const selectedEntryIds = part.entryIds;

  const entriesComponent = (
    <div>
      <StyledTable>
        <thead>
          <tr>
            {Object.entries(entryAttributesInfo)
              .sort((a, b) => a[1]["columnIndex"] - b[1]["columnIndex"])
              .map(([_, { displayName }]) => (
                <th key={displayName}>{displayName}</th>
              ))}
          </tr>
        </thead>
      </StyledTable>
      {
        <Droppable droppableId={partId}>
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {selectedEntryIds.map((entryId, i) => {
                return (
                  <Draggable key={entryId} draggableId={entryId} index={i}>
                    {(draggableProvided) => {
                      return SingleEntryTable({
                        draggableProvided: draggableProvided,
                        entryId: entryId,
                        index: i + 1,
                        partNum: part.partNum,
                        stringStartingTime: StringifyDate(
                          entrySchedules[entryId].startingTime
                        ),
                      });
                    }}
                  </Draggable>
                );
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      }
    </div>
  );
  const memoEntriesComponent = useMemo(() => {
    return entriesComponent;
  }, [part]);

  return memoEntriesComponent;
}
