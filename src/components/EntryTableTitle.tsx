import { useEntries } from "../EntryProvider";

type Props = {
  part_num: number;
  title: string;
};

export default function EntryTableTitle(props: Props) {
  const { part_num, title } = props;
  const { entryMap, partMap } = useEntries();
  const totalPlayTime = partMap[part_num]["entryIds"].map((entryId) => {

  });
  // const selectedEntries = entries.filter((entry) => entry.partNum === part_num);

  return (
    <div>
      <h3>{title}</h3>
      <p>
        {`総演奏時間：${totalPlayTime}分`}
      </p>
    </div>
  );
}
