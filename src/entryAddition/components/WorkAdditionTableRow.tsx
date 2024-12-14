import styled from "styled-components";
import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";
import {
  useFormContext,
  UseFieldArrayRemove,
  UseFieldArrayInsert,
} from "react-hook-form";
import { InputtingEntryToAdd } from "../../type/Entry";

const StyledInput = styled.input`
  width: 90%
`
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
        <StyledInput {...register(`works.${index}.composer`, { required: true })} />
      </td>
      <td>
        {/** 曲名 */}
        <StyledInput {...register(`works.${index}.name`, { required: true })} />
      </td>
      <td>
        {/** 空の行を下に追加するボタン */}
        <button
          type="button"
          onClick={() => insert(index + 1, { composer: "", name: "" })}
        >
          <FaRegPlusSquare />
        </button>
      </td>
      <td>
        {/** 現在の行をコピーして下に挿入するボタン */}
        <button type="button" onClick={() => insertCopiedRow()}>
          <FaRegCopy />
        </button>
      </td>
      <td>
        {/** 現在の行を削除するボタン */}
        {count > 1 && (
          <button type="button" onClick={() => remove(index)}>
            <FaRegTrashAlt />
          </button>
        )}
      </td>
    </tr>
  );
}
