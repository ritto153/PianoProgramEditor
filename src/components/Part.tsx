import { useMemo } from "react";
import EntryTableTitle from "../partHeader/components/EntryTableTitle";
import Entries from "../partContents/components/Entries";
import EntryTableAddingButton from "../partFooter/components/EntryTableAddingButton";
import EntryTableRemovingButton from "../partFooter/components/EntryTableRemovingButton";
import { BuildEntrySchedules } from "../partHeader/utils/BuildEntrySchedules";
import styled from "styled-components";
import { useGetSavedData } from "../hooks/useGetSavedData";

type Props = {
  partId: string;
};

const Wrapper = styled.div`
  margin-top: 2em;
  margin-bottom: 1.5em;
`;

const Footer = styled.div`
  margin-top: 10px;
  display: flex;
  gap: 0.5em;
`;

export default function Part(props: Props) {
  const { partId } = props;

  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();

  const partMap = savedDataInUse.partMap;
  const entryMap = savedDataInUse.entryMap;

  const part = partMap[partId];

  const entrySchedules = BuildEntrySchedules(
    part.entryIds,
    entryMap,
    part.startingTime
  );

  let partEndingTime: Date | null;
  if (part.startingTime === null) {
    partEndingTime = null;
  } else if (part.entryIds.length === 0) {
    partEndingTime = new Date(part.startingTime);
  } else {
    partEndingTime =
      entrySchedules[part.entryIds[part.entryIds.length - 1]].endingTime;
  }

  const wrapperComponent = (
    <Wrapper>
      <EntryTableTitle partId={partId} endingTime={partEndingTime} />
      <Entries partId={partId} entrySchedules={entrySchedules} />
      <Footer>
        <EntryTableAddingButton partId={partId} />
        {
          // エントリー数が0件の部は削除ボタンを表示する
          // 配置前のエントリーを格納するテーブルには削除ボタンは表示しない
          part.entryIds.length === 0 && part.partNum !== 0 ? (
            <EntryTableRemovingButton partId={partId} />
          ) : null
        }
      </Footer>
    </Wrapper>
  );
  const memoWrapperComponent = useMemo(() => {
    return wrapperComponent;
  }, [partMap]);

  return memoWrapperComponent;
}
