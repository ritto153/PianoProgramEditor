import React from 'react';
import Entry from '../type/entry';

export default function EntryTable(props: {entries: Entry[]}){
  const entries = props.entries;

  return (
    <table>
      {
        entries.map((entry)=>(
          <tr>
            {Object.values(entry).map((value)=>(
              <th>{value}</th>
            ))}
          </tr>
        ))
      }
    </table>
  )
}