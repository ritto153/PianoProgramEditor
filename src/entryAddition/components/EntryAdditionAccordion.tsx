import EntryAdditionForm from "./EntryAdditionForm";
import Accordion from 'react-bootstrap/Accordion';

export default function EntryAdditionAccordion() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>エントリー追加フォーム</Accordion.Header>
        <Accordion.Body>
          <EntryAdditionForm />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
