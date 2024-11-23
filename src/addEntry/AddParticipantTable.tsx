import Table from 'react-bootstrap/Table';
import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";

export default function AddParticipantTable() {
  return (
    <Table>
      <thead>
        <tr>
          <th>姓</th>
          <th>名</th>
          <th>所属</th>
          <th>学年</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            <input type="text" />
          </th>
          <th>
            <input type="text" />
          </th>
          <th>
            <input type="text" />
          </th>
          <th>
            <input type="text" />
          </th>
          <th>
            <FaRegPlusSquare/>
          </th>
          <th>
            <FaRegCopy />
          </th>
          <th>
            <FaRegTrashAlt />
          </th>
        </tr>
      </tbody>
    </Table>
  );
}
