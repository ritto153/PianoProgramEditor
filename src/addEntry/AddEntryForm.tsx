import Form from "react-bootstrap/Form";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import AddWorkTable from "./AddWorkTable";
import AddParticipantTable from "./AddParticipantTable";

const RightAlignedDiv = styled.div`
  text-align: right;
`

export default function AddEntryForm() {
  return (
    <Form>
      <b>演奏者</b>
      <AddParticipantTable/>
      <b>曲目</b>
      <AddWorkTable/>
      <RightAlignedDiv>
      <Button variant="success">この内容でエントリーを追加</Button>
      </RightAlignedDiv>
    </Form>
  );
}
