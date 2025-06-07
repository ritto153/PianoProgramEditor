import Button from "react-bootstrap/Button";
import { RemovePart } from "../utils/RemovePart";
import { useGetSavedData } from "../../hooks/useGetSavedData";
import { useSetSavedData } from "../../hooks/useSetSavedData";

type Props = {
  partId: string;
};

export default function EntryTableRemovingButton(props: Props) {
  const { partId } = props;
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { partMap } = savedDataInUse;
  const { setPartMapOfSavedDataInUse } = useSetSavedData();

  const removePart = () => {
    const newPartMap = RemovePart(partId, partMap);
    setPartMapOfSavedDataInUse(newPartMap);
  };

  return (
    <Button variant="warning" onClick={removePart}>
      部を削除する
    </Button>
  );
}
