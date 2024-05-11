import { useEntries } from "../EntryProvider";
import { BuildEntryForDisplay } from "../utils/BuildEntryForDisplay";

interface Props {
  partNum: number;
  key: string;
  draggableProvided: any;
  entryId: string;
  index: number;
}

export default function EntryTableRow(props: Props) {
  const { partNum, entryId, draggableProvided, index } = props;
  const { entryMap } = useEntries();
  const entry = entryMap[entryId];

  if (!entry) throw new Error(`Id ${entryId}  のエントリーが見つかりませんでした。`);

  const entryForDisplay = BuildEntryForDisplay(entry, partNum, index, null);

  return (
    <tr
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      {Object.entries(entryForDisplay).map(([_, value], i) => (
        <th key={i}>{String(value)}</th>
      ))}
    </tr>
  );
}
