import { useEntries } from "../EntryProvider";

type Props = {
  partId: string;
};

export default function EntryTableTitle(props: Props) {
  const { partId } = props;
  const { entryMap, partMap } = useEntries();
  const part = partMap[partId];
  const totalPlayTime = part.entryIds
    .map((entry) => entryMap[entry].time)
    .reduce((a, b) => a + b, 0);

  return (
    <div>
      <h3>{part.partNum === 0 ? "全エントリー" : `第${part.partNum}部`}</h3>
      <p>{`総演奏時間：${totalPlayTime}分`}</p>
    </div>
  );
}
