import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useGetSavedData } from "../hooks/useGetSavedData";
import { useRemoveSavedData } from "../hooks/useRemoveSavedData";
import { FaCheckCircle, FaRegCopy } from "react-icons/fa";
import { useDuplicateSavedData } from "../hooks/useDupllicateSavedData";
import { useCreateEmptySavedData } from "../hooks/useCreateEmptySavedData";
import { useDataIdInUse } from "../DataIdInUseProvider";

export default function SaveData() {
  const { getSavedDataMap, getSavedDataInUse } = useGetSavedData();
  const { removeSavedData } = useRemoveSavedData();
  const { duplicateSavedData } = useDuplicateSavedData();
  const { createEmptySavedData } = useCreateEmptySavedData();
  const { setDataIdInUse } = useDataIdInUse();
  const savedDataMap = getSavedDataMap();
  const savedDataInUse = getSavedDataInUse();

  const [showCreateEmptySavedDataModal, setShowCreateEmptySavedDataModal] =
    useState(false);

  return (
    <>
      <div>
        <h2>セーブデータ一覧</h2>
        <p>※変更内容は自動でブラウザに保存され、ページを閉じても消えません。</p>
        <Button
          variant="primary"
          onClick={() => setShowCreateEmptySavedDataModal(true)}
        >
          空のセーブデータを作成する
        </Button>
        <Table>
          <thead>
            <tr>
              <th>セーブデータ名</th>
              <th>最終更新日時</th>
              <th>閲覧中</th>
              <th>複製</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(savedDataMap).map(([key, value]) => (
              <tr key={key}>
                <td>{value.name}</td>
                <td>{new Date(value.lastUpdated).toLocaleString()}</td>
                <td>{key === savedDataInUse.id && <FaCheckCircle />}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      duplicateSavedData(key);
                    }}
                  >
                    <FaRegCopy />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setDataIdInUse(key);
                    }}
                  >
                    ロードする
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => {
                      if (
                        window.confirm(
                          `本当にセーブデータ「${value.name}」を削除しますか？`
                        )
                      ) {
                        removeSavedData(key);
                      }
                    }}
                  >
                    削除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal
        show={showCreateEmptySavedDataModal}
        onHide={() => setShowCreateEmptySavedDataModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>空のセーブデータを作成</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const nameInput = form.elements.namedItem(
                "name"
              ) as HTMLInputElement;
              const name = nameInput.value.trim();
              createEmptySavedData(name);
              setShowCreateEmptySavedDataModal(false);
            }}
          >
            <Container>
              <Form.Group
                controlId="formBasicName"
                style={{ marginBottom: "1rem" }}
              >
                <Form.Label>セーブデータ名</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="新しいセーブデータの名前を入力"
                  name="name"
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                作成
              </Button>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowCreateEmptySavedDataModal(false)}
          >
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
