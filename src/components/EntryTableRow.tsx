import { useEntries } from "../EntryProvider";

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

  if (!entry) throw new Error(`Entry with id ${entryId} not found`);

  const entryForDisplay = {
    partNum: partNum,
    index: index,
    lastName: entry.lastName,
    firstName: entry.firstName,
    affiliation: entry.affiliation,
    grade: entry.grade,
    composer: entry.composer,
    work: entry.work,
    time: entry.time,
    memo: entry.memo,
  };

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
