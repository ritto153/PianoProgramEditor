import { useEntries } from "../EntryProvider";
import { BuildEntryForDisplay } from "../utils/BuildEntryForDisplay";

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

  const entryForDisplay = BuildEntryForDisplay(entry, partNum, index, schedules.startingTime);

  // newEntryを組み立てる。最終的には br で改行させればよさそう
  const newEntryForDisplay = entryForDisplay;

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
