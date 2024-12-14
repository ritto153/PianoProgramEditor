import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";
import { StyledInput, StyledTd, StyledButton } from "../styled/StyledTd";

import {
  useFormContext,
  UseFieldArrayRemove,
  UseFieldArrayInsert,
} from "react-hook-form";
import { InputtingEntryToAdd } from "../../type/Entry";

interface Props {
  index: number;
  count: number;
  remove: UseFieldArrayRemove;
  insert: UseFieldArrayInsert<InputtingEntryToAdd>;
}

export default function ParticipantAdditionTableRow(props: Props) {
  const { index, count, remove, insert } = props;
  const { register, getValues } = useFormContext<InputtingEntryToAdd>();

  const insertBlankParticipant = () => {
    insert(index + 1, {
      lastName: "",
      firstName: "",
      faculty: "",
      grade: null,
    });
  };

  const insertCopiedRow = () => {
    const participant = getValues().participants[index];

    insert(index + 1, participant);
  };

  return (
    <tr>
      <td>
        {/** 姓 */}
        <StyledInput
          {...register(`participants.${index}.lastName`, { required: true })}
        />
      </td>
      <td>
        {/** 名 */}
        <StyledInput
          {...register(`participants.${index}.firstName`, { required: true })}
        />
      </td>
      <td>
        {/** 所属 */}
        <StyledInput
          {...register(`participants.${index}.faculty`, { required: true })}
        />
      </td>
      <td>
        {/** 学年 */}
        <StyledInput
          type="number"
          {...register(`participants.${index}.grade`, { required: true })}
        />
      </td>
      <StyledTd>
        {/** 空の行を下に追加するボタン */}
        <StyledButton type="button" onClick={() => insertBlankParticipant()}>
          <FaRegPlusSquare />
        </StyledButton>
      </StyledTd>
      <StyledTd>
        {/** 現在の行をコピーして下に挿入するボタン */}
        <StyledButton type="button" onClick={() => insertCopiedRow()}>
          <FaRegCopy />
        </StyledButton>
      </StyledTd>
      <StyledTd>
        {/** 現在の行を削除するボタン */}
        {count > 1 && (
          <StyledButton type="button" onClick={() => remove(index)}>
            <FaRegTrashAlt />
          </StyledButton>
        )}
      </StyledTd>
    </tr>
  );
}
