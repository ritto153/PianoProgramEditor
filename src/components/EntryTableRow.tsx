import { useEntries } from "../EntryProvider";
import { OldEntry } from "../type/Entry";

interface Props {
  key: number;
  draggableProvided: any;
  entryId: number;
  index: number;
}

export default function EntryTableRow(props: Props) {
  const { entryId, draggableProvided, index } = props;
  const { entries, setEntries } = useEntries();
  const entry = entries.find((entry) => entry.id === entryId);

  if (!entry) return null;

  const entryForDisplay = {
    part_num: entry.part_num,
    index: index,
    last_name: entry.last_name,
    first_name: entry.first_name,
    affiliation: entry.affiliation,
    grade: entry.grade,
    composer: entry.composer,
    work: entry.work,
    time: entry.time,
    memo: entry.memo,
  };

  const buildNewEntries = (oldEntries: OldEntry[], changedEntry: OldEntry) => {
    return oldEntries.map((entry) => {
      if (entry.id === entryId) {
        return changedEntry;
      } else {
        return entry;
      }
    });
  };

  return (
    <tr
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <th></th>
      {Object.entries(entryForDisplay).map(([key, value], i) => {
        if (key !== "memo") return <th key={i}>{value}</th>;
        else {
          return (
            <th key={i}>
              <input
                defaultValue={value === null ? "" : value}
                onChange={(e) => {
                  setEntries(
                    buildNewEntries(entries, {
                      ...entry,
                      memo: e.target.value,
                    })
                  );
                }}
              />
            </th>
          );
        }
      })}
    </tr>
  );
}
