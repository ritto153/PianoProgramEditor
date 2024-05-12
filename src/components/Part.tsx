import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";
import EntryTableAddingButton from "./EntryTableAddingButton";
import EntryTableRemovingButton from "./EntryTableRemovingButton";
import { useEntries } from "../EntryProvider";
import { BuildEntrySchedules } from "../utils/BuildEntrySchedules";
import styled from "styled-components";

type Props = {
  partId: string;
};

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

export default function Part(props: Props) {
  const { partId } = props;
  const { partMap, entryMap } = useEntries();
  const part = partMap[partId];
  const entrySchedules = BuildEntrySchedules(
    part.entryIds,
    entryMap,
    part.startingTime
  );
  const partEndingTime =
    part.entryIds.length > 0
      ? entrySchedules[part.entryIds[part.entryIds.length - 1]].endingTime
      : null;

  return (
    <Wrapper>
      <EntryTableTitle partId={partId} endingTime={partEndingTime} />
      <EntryTable partId={partId} entrySchedules={entrySchedules} />
      <EntryTableAddingButton partId={partId} />
      {
        // エントリー数が0件の部は削除ボタンを表示する
        // 配置前のエントリーを格納するテーブルには削除ボタンは表示しない
        part.entryIds.length === 0 && part.partNum !== 0 ? (
          <EntryTableRemovingButton partId={partId} />
        ) : null
      }
    </Wrapper>
  );
}
