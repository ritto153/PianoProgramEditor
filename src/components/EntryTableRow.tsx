import Form from 'react-bootstrap/Form'
import Entry from '../type/entry';

type Props = {
  key: number
  entry: Entry
  onChange: (entry: Entry)=> void
}

export default function EntryTableRow(props: Props) {
  const {entry, onChange} = props;

  return (
    <tr>
      {Object.entries(entry).map(([key, value], i)=>{
        if (key == "id") {
          // 列に表示しない
        } else if (key == "memo"){
          return (
            <th key={i}>
              <input
                defaultValue={value} 
                onChange={e => {
                  onChange({
                  ...entry,
                  memo: e.target.value
                  });
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