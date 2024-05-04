import { useEntries } from "../EntryProvider";

interface Props {
  partNum: number;
  key: number;
  draggableProvided: any;
  entryId: number;
  index: number;
}

export default function EntryTableRow(props: Props) {
  const { partNum, entryId, draggableProvided, index } = props;
  const { entryMap } = useEntries();
  const entry = entryMap[entryId];

  if (!entry) throw new Error(`Entry with id ${entryId} not found`);

  const entryForDisplay = {
    part_num: partNum,
    index: index,
    last_name: entry.lastName,
    first_name: entry.firstName,
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
      <th></th>
      {Object.entries(entryForDisplay).map(([_, value], i) => (
        <th key={i}>{value}</th>
      ))}
    </tr>
  );
}
