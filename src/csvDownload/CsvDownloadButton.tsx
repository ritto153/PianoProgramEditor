import { CSVLink } from "react-csv";
import { Entry } from "../type/Entry";
import { useEntries } from "../EntryProvider";
import { useParts } from "../PartProvider";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const AlignRightDiv = styled.div`
  text-align: right;
  margin: 1em 0
`;

export default function CsvDownloadButton() {
  const { partMap } = useParts();
  const { entryMap } = useEntries();

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
        <Button variant="success">CSV形式でダウンロード</Button>
      </CSVLink>
    </AlignRightDiv>
  );
}
