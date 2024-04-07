import { useEntries } from "../EntryProvider";

type Props = {
  part_num: number | null;
  title: string;
};

export default function EntryTableTitle(props: Props) {
  const { part_num, title } = props;
  const { entries } = useEntries();
  const selectedEntries = entries.filter((entry) => entry.part_num === part_num);

  return (
    <div>
      <h3>{title}</h3>
      <p>
        {`総演奏時間：${selectedEntries.reduce(
          (total, entry) => total + entry.time,
          0
        )}分`}
      </p>
    </div>
  );
}
