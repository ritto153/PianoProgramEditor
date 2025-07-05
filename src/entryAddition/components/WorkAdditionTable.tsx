import { useFormContext, useFieldArray } from "react-hook-form";
import { StyledTable, ThWithWidth } from "../styled/StyledTable";
import WorkAdditionTableRow from "./WorkAdditionTableRow";
import { InputtingEntry } from "../../type/Entry";

export default function WorkAdditionTable() {
  const { control } = useFormContext<InputtingEntry>();
  const { fields, remove, insert } = useFieldArray<InputtingEntry>({
    control,
    name: "works",
  });

  return (
    <StyledTable>
      <thead>
        <tr>
          <ThWithWidth $width={20}>作曲家</ThWithWidth>
          <ThWithWidth $width={50}>曲目</ThWithWidth>
          <ThWithWidth $width={10}>追加</ThWithWidth>
          <ThWithWidth $width={10}>複製</ThWithWidth>
          <ThWithWidth $width={10}>削除</ThWithWidth>
        </tr>
      </thead>
      <tbody>
        {fields.map((item, index) => (
          <WorkAdditionTableRow
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
