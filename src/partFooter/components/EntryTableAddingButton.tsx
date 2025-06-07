import Button from "react-bootstrap/Button";
import { AddPart } from "../utils/AddPart";
import { useGetSavedData } from "../../hooks/useGetSavedData";
import { useSetSavedData } from "../../hooks/useSetSavedData";

type Props = {
  partId: string;
};

export default function EntryTableAddingButton(props: Props) {
  const { partId } = props;
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { partMap } = savedDataInUse;
  const { setPartMapOfSavedDataInUse } = useSetSavedData();

  const addPart = () => {
    const newPartMap = AddPart(partId, partMap);
    setPartMapOfSavedDataInUse(newPartMap);
  };

  return (
    <Button variant="secondary" onClick={addPart}>
      下に部を追加する
    </Button>
  );
}
