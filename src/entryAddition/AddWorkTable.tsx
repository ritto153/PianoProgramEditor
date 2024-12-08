import Table from "react-bootstrap/Table";
import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";

export default function AddWorkTable() {
  return (
    <Table>
      <thead>
        <tr>
          <th>作曲家</th>
          <th>曲目</th>
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
            <FaRegPlusSquare />
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
