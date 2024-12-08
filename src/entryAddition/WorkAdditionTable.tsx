import Table from "react-bootstrap/Table";
import { useEntryToAddContext } from "./EntryToAddProvider";
import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";

export default function WorkAdditionTable() {
  const { entry } = useEntryToAddContext();
  const { works } = entry;

  return (
    <Table>
      <thead>
        <tr>
          <th>作曲家</th>
          <th>曲目</th>
        </tr>
      </thead>
      <tbody>
        {works.map((work, i) => {
          return (
            <tr key={i}>
              <th>
                <input type="text" value={String(work.composer)} />
              </th>
              <th>
                <input type="text" value={String(work.name)} />
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
