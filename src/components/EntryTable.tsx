import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import EntryTableRow from './EntryTableRow';
import { useEntries } from '../EntryProvider';

export default function EntryTable(){
  const { entries } = useEntries();

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {Object.keys(entries[0]).map((key, i) => {
            if(key !== "id") { 
              return <th key={i}>{key}</th>
            }
          })}
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, i)=>(
          <EntryTableRow key = {i} index = {i}/>
        ))}
      </tbody>
    </Table>
  )
}