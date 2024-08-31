import { DividedEntryForRow } from "../../type/DividedEntryForRow";
import { BuildEntryForDisplay } from "../utils/BuildEntryForDisplay";
import styled from "styled-components";

const StyledRow = styled.tr<{shownGray: boolean}>`
  background-color: ${(props) => props.shownGray && "#E6FFE9"};
`

interface Props {
  partNum: number;
  key: string;
  draggableProvided: any;
  dividedEntryForRow: DividedEntryForRow;
  schedules: {
    startingTime: Date | null;
    endingTime: Date | null;
  };
}

export default function EntryTableRow(props: Props) {
  const { partNum, dividedEntryForRow, draggableProvided, schedules } =
    props;

  const entryForDisplay = BuildEntryForDisplay(
    dividedEntryForRow,
    partNum,
    schedules.startingTime,
  );

  // エントリーが偶数番目なら灰色で表示する
  const shownGray = entryForDisplay.index % 2 === 0;

  return (
    <StyledRow
      shownGray={shownGray}
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      {Object.entries(entryForDisplay).map(([_, value], i) => (
        <td key={i}>{value}</td>
      ))}
    </StyledRow>
  );
}
