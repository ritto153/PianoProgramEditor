import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Entry from '../type/entry';
import EntryTableRow from './EntryTableRow';

type Props = {
  initialEntries: Entry[],
  onChangeEntry: (entry: Entry) => void
}

export default function EntryTable(props: Props){
  const {initialEntries, onChangeEntry} = props;

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(initialEntries[0]).map((key, i)=>{
            if(key != "id") { 
              return <th key={i}>{key}</th>
            }
          })}
        </tr>
      </thead>
      <tbody>
        {initialEntries.map((entry, i)=>(
          <EntryTableRow key = {i} entry={entry} onChange={onChangeEntry}/>
        ))}
      </tbody>
    </Table>
  )
}