import { DividedEntryForRow } from "../type/DividedEntryForRow";
import { BuildEntryForDisplay } from "../utils/BuildEntryForDisplay";

interface Props {
  partNum: number;
  key: string;
  draggableProvided: any;
  dividedEntryForRow: DividedEntryForRow; 
  index: number;
  schedules: {
    startingTime: Date | null,
    endingTime: Date | null,
  };
}

export default function EntryTableRow(props: Props) {
  const { partNum, dividedEntryForRow, draggableProvided, index, schedules } = props;

  const entryForDisplay = BuildEntryForDisplay(dividedEntryForRow, partNum, index, schedules.startingTime);

  return (
    <tr
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      {Object.entries(entryForDisplay).map(([_, value], i) => (
        <th key={i}>{value}</th>
      ))}
    </tr>
  );
}
