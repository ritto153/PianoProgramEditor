import { useEntries } from '../EntryProvider';
import Entry from '../type/entry';

export default function EntryTableRow(props: { key: number }) {
  const index = props.key;
  const { entries, setEntries } = useEntries();
  const entry = entries[index];

  const buildNewEntries = (oldEntries: Entry[], changedEntry: Entry) => (
    oldEntries.map((entry, i) => {
      if(i === index){
        return changedEntry
      } else {
        return entry
      }
    })
  );

  return (
    <tr>
      {Object.entries(entry).map(([key, value], i)=>{
        if (key === "id") {
          // 列に表示しない
        } else if (key === "memo"){
          return (
            <th key={i}>
              <input
                defaultValue={value} 
                onChange={e => {
                  setEntries(buildNewEntries(
                    entries,
                    {
                      ...entry,
                      memo: e.target.value
                    }
                  ))
                }}
              />
            </th>
          )
        } else {
          return <th key={i}>{value}</th>
        }
      })}
    </tr>
  )
}