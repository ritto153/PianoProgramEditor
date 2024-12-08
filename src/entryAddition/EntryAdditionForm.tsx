import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import WorkAdditionTable from "./WorkAdditionTable";
import ParticipantAdditionTable from "./ParticipantAdditionTable";

const RightAlignedDiv = styled.div`
  text-align: right;
`

export default function EntryAdditionForm() {
  return (
    <Form>
      <b>演奏者</b>
      <ParticipantAdditionTable/>
      <b>曲目</b>
      <WorkAdditionTable/>
      <RightAlignedDiv>
      <Button variant="success">この内容でエントリーを追加</Button>
      </RightAlignedDiv>
    </Form>
  );
}
