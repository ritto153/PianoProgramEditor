import { useMemo } from "react";
import Button from "react-bootstrap/Button";
import { useEntries } from "../EntryProvider";
import { RemovePart } from "../utils/RemovePart";

type Props = {
  partId: string;
};

export default function EntryTableRemovingButton(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useEntries();
  const part = partMap[partId];

  const removePart = () => {
    const newPartMap = RemovePart(partId, partMap);
    setPartMap(newPartMap);
  };

  const buttonComponent = (
    <Button variant="warning" onClick={removePart}>
      部を削除する
    </Button>
  );
  const memoButtonComponent = useMemo(() => {
    return buttonComponent;
  }, [part]);

  return memoButtonComponent;
}
