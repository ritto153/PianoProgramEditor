import Dropdown from "react-bootstrap/Dropdown";
import { FaRegTrashAlt } from "react-icons/fa";

export default function EntryMenu(): JSX.Element {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" size="sm"></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <DeleteEntryButton />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

function DeleteEntryButton(): JSX.Element {
  return (
    <div onClick={() => alert("削除機能は未実装です")}>
      <FaRegTrashAlt />
      <span> 削除</span>
    </div>
  );
}
