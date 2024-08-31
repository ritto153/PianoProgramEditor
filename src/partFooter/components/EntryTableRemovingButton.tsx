import { useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useParts } from "../../PartProvider";
import { RemovePart } from "../utils/RemovePart";

type Props = {
  partId: string;
};

export default function EntryTableRemovingButton(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useParts();

  const removePart = () => {
    const newPartMap = RemovePart(partId, partMap);
    setPartMap(newPartMap);
  };

  return (
    <Button variant="warning" onClick={removePart}>
      部を削除する
    </Button>
  );
}
