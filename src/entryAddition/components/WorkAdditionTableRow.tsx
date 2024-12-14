import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";
import {
  useFormContext,
  UseFieldArrayRemove,
  UseFieldArrayInsert,
} from "react-hook-form";
import { StyledInput, StyledTd, StyledButton } from "../styled/StyledTd";
import { InputtingEntryToAdd } from "../../type/Entry";

interface Props {
  index: number;
  count: number;
  remove: UseFieldArrayRemove;
  insert: UseFieldArrayInsert<InputtingEntryToAdd>;
}

export default function WorkAdditionTableRow(props: Props) {
  const { index, count, remove, insert } = props;
  const { register, getValues } = useFormContext<InputtingEntryToAdd>();

  const insertCopiedRow = () => {
    const work = getValues().works[index];

    insert(index + 1, work);
  };

  return (
    <tr>
      <td>
        {/** 作曲家 */}
        <StyledInput
          {...register(`works.${index}.composer`, { required: true })}
        />
      </td>
      <td>
        {/** 曲名 */}
        <StyledInput {...register(`works.${index}.name`, { required: true })} />
      </td>
      <StyledTd>
        {/** 空の行を下に追加するボタン */}
        <StyledButton
          type="button"
          onClick={() => insert(index + 1, { composer: "", name: "" })}
        >
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
