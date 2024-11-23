import { useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import { PartMap } from "../../type/Part";
import { useParts } from "../../PartProvider";
import { randomStandardDate } from "../../constants/RandomStardardDate";

type Props = {
  partId: string;
};

export default function StartingTimeInputForm(props: Props) {
  const { partId } = props;
  const { partMap, setPartMap } = useParts();
  const part = partMap[partId];

  const initialStartingTime = part.startingTime
    ? `${part.startingTime.getHours()}:${part.startingTime.getMinutes()}`
    : "";

  const [localStartingTime, setLocalStartingTime] =
    useState(initialStartingTime);

  const ChangeStartingTime: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    const newTime = e.target.value;
    setLocalStartingTime(newTime);
    setPartMap(
      BuildStartingTimeUpdatedPart(partMap, partId, newTime, randomStandardDate)
    );
  };

  const formGroup = (
    <Form.Group controlId="startingTime">
      <Form.Label>開始時間</Form.Label>
      <Form.Control
        type="time"
        value={localStartingTime}
        onChange={ChangeStartingTime}
      />
    </Form.Group>
  );

  const memoFormGroup = useMemo(() => {
    return formGroup;
  }, [partMap]);

  return memoFormGroup;
}

/**
 * 開始時間を引数の開始時間に更新した partMap を返す
 * 非破壊的
 */
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
