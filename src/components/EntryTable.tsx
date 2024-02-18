import React from 'react';
import { useCallback } from 'react';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Entry from '../type/entry';

export default function EntryTable(props: {entries: Entry[]}){
  const initialState = props.entries;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(initialState[0]).map((key)=>(
            <th>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
          {
            initialState.map((entry)=>(
              <tr>
                {Object.values(entry).map((value)=>(
                  <th>{value}</th>
                  ))}
              </tr>
            ))
          }
      </tbody>
    </Table>
  )
}