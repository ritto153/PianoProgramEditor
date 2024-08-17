import { CSVLink } from "react-csv";
import { Entry, NewEntry } from "../type/Entry";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

type Props = {
  csvData: NewEntry[];
  // TODO: ヘッダーの定義
  // headers: any;
};

const AlignRightDiv = styled.div`
  text-align: right;
`;

export default function CsvDownloadButton(props: Props) {
  const { csvData } = props;

  return (
    <AlignRightDiv>
      <CSVLink data={csvData} filename="program.csv">
        <Button variant="success">CSV形式でダウンロード</Button>
      </CSVLink>
    </AlignRightDiv>
  );
}
