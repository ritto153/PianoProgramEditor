import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

export default function PageHeader() {
  return (
    <Navbar expand="xl" bg="success" variant="dark" className="mb-3" sticky="top">
      <Container>
        <Navbar.Brand>演奏会プログラム作成ツール</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            セーブデータ: {new Date().toLocaleString()}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}