import Table from "react-bootstrap/Table";
import WorkAdditionTableRow from "./WorkAdditionTableRow";

export default function WorkAdditionTable() {
  const workNum = 1; // 変動させる必要あり

  return (
    <Table>
      <thead>
        <tr>
          <th>作曲家</th>
          <th>曲目</th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: workNum }).map((_, i) => (
          <WorkAdditionTableRow key={i} index={i}/>
        ))}
      </tbody>
    </Table>
  );
}
