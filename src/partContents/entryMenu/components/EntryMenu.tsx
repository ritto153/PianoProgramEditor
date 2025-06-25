import Dropdown from "react-bootstrap/Dropdown";
import DeleteEntryButton from "./DeleteEntryButton";
import EditEntryButton from "./EditEntryButton";

type Props = {
  entryId: string;
};

export default function EntryMenu(props: Props): JSX.Element {
  const { entryId } = props;

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" size="sm"></Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>
          <EditEntryButton entryId={entryId} />
          <DeleteEntryButton entryId={entryId} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
