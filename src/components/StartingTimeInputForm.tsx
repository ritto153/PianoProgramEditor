import { Form, Row, Col } from "react-bootstrap";

export default function StartingTimeInputForm() {
  return (
    <Form.Group controlId="startingTime">
      <Row>
        <Col md={1}>
          <Form.Label>開始時間</Form.Label>
        </Col>
        <Col md={4}>
          <Form.Control type="time" />
        </Col>
      </Row>
    </Form.Group>
  );
}
