import { useEntries } from "../EntryProvider";
import { OldBuildEntryForDisplay } from "../utils/OldBuildEntryForDisplay";

interface Props {
  partNum: number;
  key: string;
  draggableProvided: any;
  entryId: string;
  index: number;
  schedules: {
    startingTime: Date | null,
    endingTime: Date | null,
  };
}

export default function EntryTableRow(props: Props) {
  const { partNum, entryId, draggableProvided, index, schedules } = props;
  const { entryMap, newEntryMap } = useEntries();
  const entry = entryMap[entryId];
  const newEntry = newEntryMap[entryId];

  if (!entry) throw new Error(`Id ${entryId}  のエントリーが見つかりませんでした。`);

  const entryForDisplay = OldBuildEntryForDisplay(entry, partNum, index, schedules.startingTime);

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
