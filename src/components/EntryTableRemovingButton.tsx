import Button from "react-bootstrap/Button";
import { useEntries } from "../EntryProvider";
import { RemovePart } from "../utils/RemovePart";

type Props = {
  partId: string;
};

export default function EntryTableRemovingButton(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useEntries();

  const removePart = () => {
    const newPartMap = RemovePart(partId, partMap);
    setPartMap(newPartMap);
  };

  return <Button variant="warning" onClick={removePart}>部を削除する</Button>;
}
