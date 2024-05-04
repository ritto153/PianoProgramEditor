import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";

type Props = {
  partNum: number;
};

export default function Part(props: Props) {
  const { partNum } = props;

  return (
    <div>
      <EntryTableTitle
        partNum={partNum}
        title={partNum === 0 ? "全エントリー" : `第${partNum}部`}
      />
      <EntryTable partNum={partNum} />
    </div>
  );
}
