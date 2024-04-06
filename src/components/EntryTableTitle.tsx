import { Entry } from "../type/Entry";

type Props = {
  entries: Entry[];
  title: string;
};

export default function EntryTableTitle(props: Props) {
  const { entries, title } = props;

  return (
    <div>
      <h3>{title}</h3>
      <p>
        {`総演奏時間：${entries.reduce(
          (total, entry) => total + entry.time,
          0
        )}分`}
      </p>
    </div>
  );
}
