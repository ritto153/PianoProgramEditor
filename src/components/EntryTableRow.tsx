import { useEntries } from "../EntryProvider";
import { displayColumns } from "./EntryTableDisplayColumns";
import { Entry } from "../type/Entry";

interface Props {
  key: number;
  draggableProvided: any;
  entryId: number;
}

export default function EntryTableRow(props: Props) {
  const { entryId, draggableProvided } = props;
  const { entries, setEntries } = useEntries();
  const entry = entries.find((entry) => entry.id === entryId);

  const buildNewEntries = (oldEntries: Entry[], changedEntry: Entry) => {
    return oldEntries.map((entry) => {
      if (entry.id === entryId) {
        return changedEntry;
      } else {
        return entry;
      }
    });
  };

  if (!entry) {
    // entry が undefined になることが基本的にあり得ないが、型対策
    return <tr></tr>;
  }

  return (
    <tr
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <th></th>
      {Object.entries(entry).map(([key, value], i) => {
        if (!displayColumns[key as keyof Entry]) {
          // 列に表示しない
        } else if (key === "memo") {
          return (
            <th key={i}>
              <input
                defaultValue={value}
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
        } else {
          return <th key={i}>{value}</th>;
        }
      })}
    </tr>
  );
}
