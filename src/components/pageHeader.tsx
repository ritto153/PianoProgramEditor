import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { useGetSavedData } from "../hooks/useGetSavedData";

export default function PageHeader() {
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();

  return (
    <Navbar expand="xl" bg="success" variant="dark" className="mb-3" sticky="top">
      <Container>
        <Navbar.Brand>演奏会プログラム作成ツール</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            編集中のセーブデータ名: {savedDataInUse.name}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}