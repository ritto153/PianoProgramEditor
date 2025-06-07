import { CSVLink } from "react-csv";
import { Entry } from "../type/Entry";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useGetSavedData } from "../hooks/useGetSavedData";

const AlignRightDiv = styled.div`
  text-align: center;
  margin: 1em 0
`;

export default function CsvDownloadButton() {
  const { getSavedDataInUse } = useGetSavedData();

  const savedDataInUse = getSavedDataInUse();
  const partMap = savedDataInUse.partMap;
  const entryMap = savedDataInUse.entryMap;

  const sortedParts = Object.values(partMap).sort(
    (a, b) => a.partNum - b.partNum
  );

  const csvData: Entry[] = sortedParts
  .map((entry) =>
    Object.values(entry.entryIds).map((entryId) => entryMap[entryId])
  )
  .flat();

  return (
    <AlignRightDiv>
      <CSVLink data={csvData} filename="program.csv">
        <Button variant="primary">CSV形式でダウンロード</Button>
      </CSVLink>
    </AlignRightDiv>
  );
}
