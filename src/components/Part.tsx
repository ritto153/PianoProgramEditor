import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";
import EntryTableAddingButton from "./EntryTableAddingButton";
import EntryTableRemovingButton from "./EntryTableRemovingButton";
import { useEntries } from "../EntryProvider";
import styled from "styled-components";

type Props = {
  partId: string;
};

export default function Part(props: Props) {
  const Wrapper = styled.div`
    margin-bottom: 1.5em;
  `;

  const { partId } = props;
  const { partMap } = useEntries();

  return (
    <Wrapper>
      <EntryTableTitle partId={partId} />
      <EntryTable partId={partId} />
      <EntryTableAddingButton partId={partId} />
      {partMap[partId].entryIds.length === 0 ? (
        <EntryTableRemovingButton partId={partId} />
      ) : null}
    </Wrapper>
  );
}
