import styled from "styled-components";
import EntryAdditionForm from "./EntryAdditionForm";

const StyledDetails = styled.details`
  margin: 10px 0;
  border: 1px solid;
  border-color: lightgray;
  summary {
    padding: 20px;
    background-color: lightgray;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    border: 1px solid;
    border-color: lightgray;
  }
  summary:hover {
    background-color: gray;
    color: black;
  }
  form {
    margin: 10px;
  }
`

export default function EntryAdditionAccordion() {
  return (
    <StyledDetails>
      <summary>
        エントリーの追加
      </summary>
      <EntryAdditionForm />
    </StyledDetails>
  )
}
