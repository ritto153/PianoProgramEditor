import Form from "react-bootstrap/Form";

import { PartMap } from "../type/Part";
import { useEntries } from "../EntryProvider";
import { randomStandardDate } from "../constants/RandomStardardDate";

type Props = {
  partId: string;
};

const BuildStartingTimeUpdatedPart = (
  partMap: PartMap,
  partId: string,
  timeString: string,
  standardDate: Date
) => {
  const newDate = new Date(standardDate);
  const [hour, minute] = timeString.split(":");
  newDate.setHours(Number(hour));
  newDate.setMinutes(Number(minute));

  const newPartMap = {
    ...partMap,
    [partId]: {
      ...partMap[partId],
      startingTime: newDate,
    },
  };

  return newPartMap;
};

export default function StartingTimeInputForm(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useEntries();

  const ChangeStartingTime: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setPartMap(
      BuildStartingTimeUpdatedPart(
        partMap,
        partId,
        e.target.value,
        randomStandardDate
      )
    );
  };

  return (
    <Form.Group controlId="startingTime">
      <Form.Label>開始時間</Form.Label>
      <Form.Control type="time" onChange={ChangeStartingTime} />
    </Form.Group>
  );
}