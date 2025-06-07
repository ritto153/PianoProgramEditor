import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";
import WorkAdditionTable from "./WorkAdditionTable";
import ResetConfirmationModal from "./ResetConfirmationModal";
import ParticipantAdditionTable from "./ParticipantAdditionTable";
import ApplyAddingEntryToEntry from "../utils/ApplyAddingEntryToEntry";
import { useGetSavedData } from "../../hooks/useGetSavedData";
import { useSetSavedData } from "../../hooks/useSetSavedData";
import { blankEntry } from "../constants/blankEntry";
import { InputtingEntryToAdd } from "../../type/Entry";

const FormTitle = styled.h3`
  padding-bottom: 0.5em;
  border-bottom: 1px solid;
  border-color: lightgray;
`;

const PlayTimeDiv = styled.div`
  display: inline-block;
  margin-bottom: 20px;
  input {
    width: 80px;
    border-radius: 5px;
    padding: 0.375em 0.75em;
  }
`;

const StyledTextarea = styled.textarea`
  width: 50%;
  height: 100px;
  border-radius: 5px;
  padding: 0.375em 0.75em;
`;

const RightAlinedDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const StyledResetButtonDiv = styled.div`
  button {
    background-color: white;
    color: red;
    border-radius: 5px;
    border-color: red;
    padding: 1em;
    font-size: 20px;
    font-weight: bold;
  }
  button:hover {
    background-color: red;
    color: white;
  }
`;

const StyledSubmitButtonDiv = styled.div`
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
  const { register, handleSubmit, reset } = methodsOfUseForm;

  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { partMap, entryMap } = savedDataInUse;
  const { setEntryMapAndPartMapOfSavedDataInUse } = useSetSavedData();

  const onSubmit: SubmitHandler<InputtingEntryToAdd> = (data) => {
    const firstPart = Object.values(partMap).sort((a, b) => a.partNum - b.partNum)[0];

    const entry = ApplyAddingEntryToEntry(data, firstPart.id);
    const newEntryMap = { ...entryMap, [entry.id]: entry };
    const newPartMap = {
      ...partMap,
      [entry.partId]: {
        ...partMap[entry.partId],
        entryIds: [...partMap[entry.partId].entryIds, entry.id],
      },
    };

    setEntryMapAndPartMapOfSavedDataInUse(newEntryMap, newPartMap);

    console.log("savedDataInUse", getSavedDataInUse());
    reset();
  };

  const [shownResetModal, setShownResetModal] = useState(false);

  return (
    <FormProvider {...methodsOfUseForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTitle>演奏者</FormTitle>
        <ParticipantAdditionTable />

        <FormTitle>曲目</FormTitle>
        <WorkAdditionTable />

        <FormTitle>演奏時間</FormTitle>
        <PlayTimeDiv>
          <input type="number" {...register("time")} /> 分
        </PlayTimeDiv>

        <FormTitle>メモ</FormTitle>
        <StyledTextarea {...register("memo")} />

        <RightAlinedDiv>
          <StyledResetButtonDiv>
            <button onClick={() => setShownResetModal(true)}>リセット</button>
          </StyledResetButtonDiv>

          <StyledSubmitButtonDiv>
            <button type="submit">この内容でエントリーを追加</button>
          </StyledSubmitButtonDiv>
        </RightAlinedDiv>
      </form>

      <ResetConfirmationModal
        shownResetModal={shownResetModal}
        setShownResetModal={setShownResetModal}
      />
    </FormProvider>
  );
}
