import Table from "react-bootstrap/Table";
import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";

export default function WorkAdditionTable() {
  const works = [null];

  return (
    <Table>
      <thead>
        <tr>
          <th>作曲家</th>
          <th>曲目</th>
        </tr>
      </thead>
      <tbody>
        {works.map((_, i) => {
          return (
            <tr key={i}>
              <th>
                <input type="text"/>
              </th>
              <th>
                <input type="text"/>
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
          );
        })}
      </tbody>
    </Table>
  );
}
