import Button from "react-bootstrap/Button";
import { useParts } from "../../PartProvider";
import { AddPart } from "../utils/AddPart";

type Props = {
  partId: string;
};

export default function EntryTableAddingButton(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useParts();

  const addPart = () => {
    const newPartMap = AddPart(partId, partMap);
    setPartMap(newPartMap);
  };

  return (
    <Button variant="secondary" onClick={addPart}>
      下に部を追加する
    </Button>
  );
}
