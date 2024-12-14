import styled from "styled-components";

export const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 20px;
  td {
    height: 3em;
    border: 1px solid #dee2e6;
    padding-top: 3px;
    padding-bottom: 3px;
    letter-spacing: 1px;
  }
`;

export const ThWithWidth = styled.th<{ $width: number }>`
  width: ${(props) => props.$width}%;
`;