import { useEntries } from "../EntryProvider";

type Props = {
  partNum: number;
  title: string;
};

export default function EntryTableTitle(props: Props) {
  const { partNum, title } = props;
  const { entryMap, partMap } = useEntries();
  const totalPlayTime = partMap[partNum]["entryIds"].map(entry =>
    entryMap[entry]["time"]
  ).reduce((a, b) => a + b, 0);

  return (
    <div>
      <h3>{title}</h3>
      <p>
        {`総演奏時間：${totalPlayTime}分`}
      </p>
    </div>
  );
}
