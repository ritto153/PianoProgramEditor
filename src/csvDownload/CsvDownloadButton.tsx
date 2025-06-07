import { CSVLink } from "react-csv";
import Button from "react-bootstrap/Button";
import styled from "styled-components";
import { useGetSavedData } from "../hooks/useGetSavedData";
import { DivideEntryForRow } from "../partContents/utils/BuildEntriesForTableRow";
import { BuildEntrySchedules } from "../partHeader/utils/BuildEntrySchedules";
import { StringifyDate } from "../utils/StringifyDate";
import { Part, PartMap } from "../type/Part";
import { EntryMap } from "../type/Entry";


const AlignRightDiv = styled.div`
  text-align: center;
  margin: 1em 0
`;

export default function CsvDownloadButton() {
  const { getSavedDataInUse } = useGetSavedData();

  const savedDataInUse = getSavedDataInUse();
  const partMap = savedDataInUse.partMap;
  const entryMap = savedDataInUse.entryMap;

  const csvHeader = BuildCsvHeader();
  const csvData = BuildCsvData(partMap, entryMap);

  console.log("CSV Data:", csvData);

  return (
    <AlignRightDiv>
      <CSVLink headers={csvHeader} data={csvData} filename="program.csv">
        <Button variant="primary">CSV形式でダウンロード</Button>
      </CSVLink>
    </AlignRightDiv>
  );
}

const BuildCsvHeader = () => (
  [
    { label: "部", key: "partNum" },
    { label: "番", key: "index" },
    { label: "姓", key: "lastName" },
    { label: "名", key: "firstName" },
    { label: "所属", key: "faculty" },
    { label: "学年", key: "grade" },
    { label: "作曲者", key: "composer" },
    { label: "曲名", key: "work" },
    { label: "演奏時間", key: "playMinutes" },
    { label: "開始時間", key: "startingTime" },
    { label: "メモ", key: "memo" }
  ]
)

const BuildCsvData = (partMap: PartMap, entryMap: EntryMap) => {
  
  const sortedParts: Part[] = Object.values(partMap).sort(
    (a, b) => a.partNum - b.partNum
  );

  const DividedData = sortedParts.flatMap((part) => {
    const entrySchedules = BuildEntrySchedules(part.entryIds, entryMap, part.startingTime);
    return part.entryIds.map((entryId, index) => {
      const entry = entryMap[entryId];
      return DivideEntryForRow({
        entry,
        partNum: part.partNum,
        index: index + 1, // 1-based index
        stringStartingTime: StringifyDate(entrySchedules[entryId].startingTime),
      });
    }).flat();
  });

  const csvData = DividedData.map((row) => ({
    partNum: row.partNum,
    index: row.index,
    lastName: row.lastName,
    firstName: row.firstName,
    faculty: row.faculty,
    grade: row.grade,
    composer: row.composer,
    work: row.work,
    playMinutes: row.playMinutes || "",
    startingTime: row.startingTime || "",
    memo: row.memo || "",
  }));

  return csvData;
}