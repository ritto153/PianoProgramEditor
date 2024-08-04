import { DividedEntryForRow } from "../type/DividedEntryForRow";

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

export default function NewEntryTableRow(props: Props) {
  const { partNum, dividedEntryForRow, draggableProvided, index, schedules } = props;
  // 作業中
  // dividedEntryForRow を列に分けて表示できるようにする必要

  // const entryForDisplay = NewBuildEntryForDisplay(entry, partNum, index, schedules.startingTime);

  return (
    <tr
      // ref={draggableProvided.innerRef}
      // {...draggableProvided.draggableProps}
      // {...draggableProvided.dragHandleProps}
    >
      {Object.entries(dividedEntryForRow).map(([_, value], i) => (
        <th key={i}>{value}</th>
      ))}
    </tr>
  );
}
