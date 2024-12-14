import { useFormContext, useFieldArray } from "react-hook-form";
import styled from "styled-components";
import WorkAdditionTableRow from "./WorkAdditionTableRow";
import { InputtingEntryToAdd } from "../../type/Entry";

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 10px;
  td {
    height: 3em;
    border: 1px solid #dee2e6;
    padding-top: 3px;
    padding-bottom: 3px;
    letter-spacing: 1px;
  }
`;

const ThWithWidth = styled.th<{ $width: number }>`
  width: ${(props) => props.$width}%;
`;

export default function WorkAdditionTable() {
  const { control } = useFormContext<InputtingEntryToAdd>();
  const { fields, remove, insert } = useFieldArray<InputtingEntryToAdd>({
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
