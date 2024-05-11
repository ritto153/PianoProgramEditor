import Form from "react-bootstrap/Form";

export default function StartingTimeInputForm() {
  return (
    <Form.Group controlId="startingTime">
      <Form.Label>開始時間</Form.Label>
      <Form.Control type="time" />
    </Form.Group>
  );
}
