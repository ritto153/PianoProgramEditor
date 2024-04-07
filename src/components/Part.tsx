import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";

type Props = {
  part_num: number | null;
};

export default function Part(props: Props) {
  const { part_num } = props;

  return (
    <div>
      <EntryTableTitle
        part_num={part_num}
        title={part_num === null ? "全エントリー" : `第${part_num}部`}
      />
      <EntryTable part_num={part_num} />
    </div>
  );
}
