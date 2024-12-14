import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import { FaRegPlusSquare } from "react-icons/fa";
import EntryAdditionForm from "./EntryAdditionForm";

const Wrapper = styled.div`
  margin: 1em 0;
`;

const StyledAccordionHeader = styled.div`
  font-weight: bold;
  font-size: 1.2em;
  padding: 0.7em 2.5em;
  color: #ffffff;
  background-color: #006666;
  border-radius: 10px;
`

export default function EntryAdditionAccordion() {
  return (
    <Wrapper>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <StyledAccordionHeader>
              <FaRegPlusSquare />
              エントリーの追加
            </StyledAccordionHeader>
          </Accordion.Header>
          <Accordion.Body>
            <EntryAdditionForm/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Wrapper>
  );
}
