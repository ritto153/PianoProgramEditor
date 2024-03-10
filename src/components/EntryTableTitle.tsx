import { useEntries } from "../EntryProvider";

export default function EntryTableTitle(props: { title: String }) {
  const { entries } = useEntries();

  return (
    <div>
      <h3>{props.title}</h3>
      <p>
        {`総演奏時間：${entries.reduce(
          (total, entry) => total + entry.time,
          0
        )}分`}
      </p>
    </div>
  );
}
