import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styled from "styled-components";

const StyledFormGroup = styled(Form.Group)`
  margin: 10px 0;
`

export default function AddEntryForm() {
  return (
    <Form>
      <StyledFormGroup>
        <Row>
          <Col sm={1}>
            <Form.Label column>作曲家</Form.Label>
          </Col>
          <Col sm={2}>
            <Form.Control type="text"></Form.Control>
          </Col>
        </Row>
      </StyledFormGroup>
      <StyledFormGroup>
        <Row>
          <Col sm={1}>
            <Form.Label column>曲目</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control type="text"></Form.Control>
          </Col>
        </Row>
      </StyledFormGroup>
    </Form>
  );
}
