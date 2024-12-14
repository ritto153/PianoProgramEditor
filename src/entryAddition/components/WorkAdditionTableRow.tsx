import { FaRegPlusSquare, FaRegTrashAlt, FaRegCopy } from "react-icons/fa";
import { InputtingEntryToAdd } from "../../type/Entry";
import { useFormContext } from "react-hook-form";

interface Props {
  index: number;
}

export default function WorkAdditionTableRow(props: Props) {
  const { index } = props;
  const { register } = useFormContext<InputtingEntryToAdd>();

  return (
    <tr>
      <th>
        <input
          type="text"
          {...register(`works.${index}.composer`, { required: true })}
        />
      </th>
      <th>
        <input
          type="text"
          {...register(`works.${index}.name`, { required: true })}
        />
      </th>
      <th>
        <FaRegPlusSquare />
      </th>
      <th>
        <FaRegCopy />
      </th>
      <th>
        <FaRegTrashAlt />
      </th>
    </tr>
  );
}
