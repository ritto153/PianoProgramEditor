import { useForm, SubmitHandler } from "react-hook-form"
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import WorkAdditionTable from "./WorkAdditionTable";
import ParticipantAdditionTable from "./ParticipantAdditionTable";
import { InputtingEntryToAdd } from "../type/Entry";

const RightAlignedDiv = styled.div`
  text-align: right;
`

export default function EntryAdditionForm() {
  const {
    register,
    handleSubmit,
  } = useForm<InputtingEntryToAdd>();
  const onSubmit: SubmitHandler<InputtingEntryToAdd> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <b>演奏者</b>
      <ParticipantAdditionTable/>
      <b>曲目</b>
      <WorkAdditionTable/>
      <RightAlignedDiv>
      <Button variant="success" type="submit">この内容でエントリーを追加</Button>
      </RightAlignedDiv>
    </form>
  );
}
