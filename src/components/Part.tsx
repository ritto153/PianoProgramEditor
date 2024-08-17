import { useMemo } from "react";
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
  const { partMap, newEntryMap } = useEntries();
  const part = partMap[partId];
  
  const selectedEntryIdsShouldRemove = ['tachibanafu', 'kazama'];
  const EntrySchedules = BuildEntrySchedules(
    selectedEntryIdsShouldRemove,
    newEntryMap,
    part.startingTime
  );

  let partEndingTime: Date | null;
  if (part.startingTime === null) {
    partEndingTime = null;
  } else if (part.entryIds.length === 0) {
    partEndingTime = new Date(part.startingTime);
  } else {
    // ToDo: 部の最後のエントリーの終了時間を取得するように変更する必要あり
    partEndingTime = EntrySchedules['tachibanafu'].endingTime;
  }

  const wrapperComponent = (
    <Wrapper>
      <EntryTableTitle partId={partId} endingTime={partEndingTime} />
      <EntryTable partId={partId} EntrySchedules={EntrySchedules} />
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
  const memoWrapperComponent = useMemo(() => {
    return wrapperComponent;
  }, [part]);

  return memoWrapperComponent;
}
