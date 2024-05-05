import { useEntries } from "../EntryProvider";

type Props = {
  partId: string;
};

const TwoDatesToString = (
  startingTime: Date | null,
  endingTime: Date | null
): string => {
  const RjustNumber = (num: number) => String(num).padStart(2, '0')

  if (startingTime && endingTime) {
    return `${RjustNumber(startingTime.getHours())}:${RjustNumber(startingTime.getMinutes())}~${RjustNumber(endingTime.getHours())}:${RjustNumber(endingTime.getMinutes())}`;
  } else if (!startingTime && !endingTime) {
    return "";
  } else {
    throw new Error("開始時間と終了時間の片方がnullになっています");
  }
};

export default function EntryTableTitle(props: Props) {
  const { partId } = props;
  const { entryMap, partMap } = useEntries();
  const part = partMap[partId];
  const totalPlayTime = part.entryIds
    .map((entryId) => entryMap[entryId].time)
    .reduce((a, b) => a + b, 0);

  const startingTime = part.startingTime;

  const endingTime = startingTime ? new Date(startingTime.getTime()) : null;
  endingTime?.setMinutes(endingTime.getMinutes() + totalPlayTime);

  const sheduleString = TwoDatesToString(startingTime, endingTime);

  return (
    <div>
      <h3>{part.partNum === 0 ? "全エントリー" : `第${part.partNum}部`}</h3>
      <p>{sheduleString}</p>
      <p>{`総演奏時間：${totalPlayTime}分`}</p>
    </div>
  );
}
