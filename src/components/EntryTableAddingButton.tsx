import Button from "react-bootstrap/Button";
import { useEntries } from "../EntryProvider";
import { AddPart } from "../utils/AddPart";

type Props = {
  partId: string;
};

export default function EntryTableAddingButton(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useEntries();

  const addPart = () => {
    const newPartMap = AddPart(partId, partMap);
    setPartMap(newPartMap);
  };

  return <Button variant="secondary" onClick={addPart}>下に部を追加する</Button>;
}
