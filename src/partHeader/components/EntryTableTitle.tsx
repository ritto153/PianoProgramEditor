import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

import StartingTimeInputForm from "./StartingTimeInputForm";
import { Part } from "../../type/Part";
import { EntryMap } from "../../type/Entry";
import { useGetSavedData } from "../../hooks/useGetSavedData";

type Props = {
  partId: string;
  endingTime: Date | null;
};

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

const PWithNoMargin = styled.p`
  margin: 0;
`;

const BoldP = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export default function EntryTableTitle(props: Props) {
  const { partId, endingTime } = props;

  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const { partMap, entryMap } = savedDataInUse;

  const part = partMap[partId];
  const totalPlayTime = MinutesBetweenTwoDates(
    part.startingTime,
    endingTime,
    part,
    entryMap
  );
  const sheduleString = TwoDatesToString(part.startingTime, endingTime);

  const wrappedComponent = (
    <Wrapper>
      <h3>
        {part.partNum === 0 ? "全エントリー" : `第${part.partNum}部`}{" "}
        {sheduleString}
      </h3>
      <Container fluid>
        <Row>
          {part.partNum !== 0 ? (
            <Col md={2}>
              <StartingTimeInputForm partId={partId} />
            </Col>
          ) : null}
          <Col md={2}>
            <PWithNoMargin>所要時間：</PWithNoMargin>
            <BoldP>{totalPlayTime}分</BoldP>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );

  const memoComponent = useMemo(() => {
    return wrappedComponent;
  }, [partMap]);

  return memoComponent;
}

/**
 * 二つの Date型の値を文字列にする
 *  example: 
 *  12:20~13:30
 * 
 * 二つの日時がnullなら空文字を返す
 */
const TwoDatesToString = (
  startingTime: Date | null,
  endingTime: Date | null
): string => {
  const timeFormatter = new Intl.DateTimeFormat("ja-jp", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (startingTime && endingTime) {
    return `${timeFormatter.format(startingTime)}~${timeFormatter.format(
      endingTime
    )}
    `;
  } else if (!startingTime && !endingTime) {
    return "";
  } else {
    throw new Error("開始時間と終了時間の片方がnullになっています");
  }
};

/**
 * 開始時間と終了時間が存在する場合
 *  -> 間の時間を返す
 * 開始時間と終了時間が共に存在しない場合
 *  -> 部のエントリーの演奏時間の合計を返す
 * 開始時間と終了時間の片方のみ存在する場合
 *  -> エラーを発火
 */
const MinutesBetweenTwoDates = (
  startingTime: Date | null,
  endingTime: Date | null,
  part: Part,
  entryMap: EntryMap
): number | null => {
  if (startingTime && endingTime) {
    return (endingTime.getTime() - startingTime.getTime()) / 60000;
  } else if (!startingTime && !endingTime) {
    return part.entryIds
      .map((entryId) => entryMap[entryId].time)
      .reduce((a, b) => a + b, 0);
  } else {
    throw new Error("開始時間と終了時間の片方がnullになっています");
  }
};
