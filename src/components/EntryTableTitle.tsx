import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styled from "styled-components";

import { useEntries } from "../EntryProvider";
import StartingTimeInputForm from "./StartingTimeInputForm";

type Props = {
  partId: string;
  endingTime: Date | null;
};

const Wrapper = styled.div`
  margin-bottom: 1.5em;
`;

const BoldP = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

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

export default function EntryTableTitle(props: Props) {
  const { partId, endingTime } = props;
  const { entryMap, partMap } = useEntries();
  const part = partMap[partId];
  const totalPlayTime = part.entryIds
    .map((entryId) => entryMap[entryId].time)
    .reduce((a, b) => a + b, 0);

  const sheduleString = TwoDatesToString(part.startingTime, endingTime);

  return (
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
            <p>総演奏時間：</p>
            <BoldP>{totalPlayTime}分</BoldP>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
}
