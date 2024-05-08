import EntryTableTitle from "./EntryTableTitle";
import EntryTable from "./EntryTable";
import EntryTableAddingButton from "./EntryTableAddingButton";
import styled from "styled-components";

type Props = {
  partId: string;
};

export default function Part(props: Props) {
  const Wrapper = styled.section`
    margin-bottom: 1.5em;
  `;

  const { partId } = props;

  return (
    <Wrapper>
      <EntryTableTitle partId={partId} />
      <EntryTable partId={partId} />
      <EntryTableAddingButton partId={partId} />
    </Wrapper>
  );
}
