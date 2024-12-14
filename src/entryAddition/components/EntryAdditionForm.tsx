import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import WorkAdditionTable from "./WorkAdditionTable";
import ParticipantAdditionTable from "./ParticipantAdditionTable";
import { blankEntry } from "../constants/blankEntry";
import { InputtingEntryToAdd } from "../../type/Entry";

const FormTitle = styled.h3`
  padding-bottom: 0.5em;
  border-bottom: 1px solid;
  border-color: lightgray;
`

const PlayTimeDiv = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  input {
    width: 80px;
    border-radius: 5px;
    padding: 0.375em 0.75em;
  }
`

const StyledTextarea = styled.textarea`
  width: 50%;
  height: 100px;
  border-radius: 5px;
  padding: 0.375em 0.75em;
`

const StyledSubmitButtonDiv = styled.div`
  text-align: right;
  button {
    background-color: white;
    color: darkgreen;
    border-radius: 5px;
    border-color: darkgreen;
    padding: 1em;
    font-size: 20px;
    font-weight: bold;
  }
  button:hover {
    background-color: darkgreen;
    color: white;
  }
`;

export default function EntryAdditionForm() {
  const methodsOfUseForm = useForm<InputtingEntryToAdd>({
    defaultValues: blankEntry,
  });
  const { register, handleSubmit } = methodsOfUseForm;

  const onSubmit: SubmitHandler<InputtingEntryToAdd> = (data) =>
    console.log(data);

  return (
    <FormProvider {...methodsOfUseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>演奏者</FormTitle>
        <ParticipantAdditionTable />

        <FormTitle>曲目</FormTitle>
        <WorkAdditionTable />

        <FormTitle>演奏時間</FormTitle>
        <PlayTimeDiv>
          <input type="number" {...register('time')}/> 分
        </PlayTimeDiv>

        <FormTitle>メモ</FormTitle>
        <StyledTextarea {...register('memo')}/>

        <StyledSubmitButtonDiv>
          <button type="submit">
            この内容でエントリーを追加
          </button>
        </StyledSubmitButtonDiv>
      </form>
    </FormProvider>
  );
}
