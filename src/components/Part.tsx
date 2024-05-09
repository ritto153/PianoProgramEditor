import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";
import EntryTableAddingButton from "./EntryTableAddingButton";
import EntryTableRemovingButton from "./EntryTableRemovingButton";
import { useEntries } from "../EntryProvider";
import styled from "styled-components";

type Props = {
  partId: string;
};

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

export default function Part(props: Props) {
  const { partId } = props;
  const { partMap } = useEntries();
  const part = partMap[partId];

  return (
    <Wrapper>
      <EntryTableTitle partId={partId} />
      <EntryTable partId={partId} />
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
