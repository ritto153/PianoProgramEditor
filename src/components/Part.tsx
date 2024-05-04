import { useEffect } from "react";
import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";

type Props = {
  partId: string;
};

export default function Part(props: Props) {
  const { partId } = props;

  useEffect(() => {
    console.log("Part が描画されました");
  });

  return (
    <div>
      <EntryTableTitle partId={partId} />
      <EntryTable partId={partId} />
    </div>
  );
}
