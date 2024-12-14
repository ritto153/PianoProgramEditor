import { useFormContext, useFieldArray } from "react-hook-form";
import ParticipantAdditionTableRow from "./ParticipantAdditionTableRow";
import { StyledTable, ThWithWidth } from "../styled/StyledTable";
import { InputtingEntryToAdd } from "../../type/Entry";

export default function ParticipantAdditionTable() {
  const { control } = useFormContext<InputtingEntryToAdd>();
  const { fields, remove, insert } = useFieldArray<InputtingEntryToAdd>({
    control,
    name: "participants",
  });

  return (
    <StyledTable>
      <thead>
        <tr>
          <ThWithWidth $width={25}>姓</ThWithWidth>
          <ThWithWidth $width={25}>名</ThWithWidth>
          <ThWithWidth $width={10}>所属</ThWithWidth>
          <ThWithWidth $width={10}>学年</ThWithWidth>
          <ThWithWidth $width={10}>追加</ThWithWidth>
          <ThWithWidth $width={10}>複製</ThWithWidth>
          <ThWithWidth $width={10}>削除</ThWithWidth>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, index) => (
          <ParticipantAdditionTableRow
            key={item.id}
            index={index}
            count={fields.length}
            remove={remove}
            insert={insert}
          />
        ))}
      </tbody>
    </StyledTable>
  );
}
