import React from 'react';
import Entry from '../type/entry';

export default function EntryTableTitle(props: {title: String; entries: Entry[];}){
  return (
    <div>
      <h3>{props.title}</h3>
      <p>
        {`総演奏時間：${props.entries.reduce((total, entry) => total + entry.time, 0)}分`}
      </p>
    </div>
  )
}