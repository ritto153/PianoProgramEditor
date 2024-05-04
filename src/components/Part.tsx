import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";

type Props = {
  partId: number;
};

export default function Part(props: Props) {
  const { partId } = props;

  return (
    <div>
      <EntryTableTitle
        partId={partId}
      />
      <EntryTable partId={partId} />
    </div>
  );
}
