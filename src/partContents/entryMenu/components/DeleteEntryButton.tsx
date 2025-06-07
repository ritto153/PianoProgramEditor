import { FaRegTrashAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";

export type Props = {
  entryId: string;
};

export default function DeleteEntryButton(props: Props): JSX.Element {
  const { entryId } = props;
  const [showModal, setShowModal] = useState(false);

  const deleteEntry = (entryId: string) => {
    // Logic to delete the entry goes here
    console.log(`Deleting entry with ID: ${entryId}`);
    setShowModal(false);
  };

  return (
    <>
      <div onClick={() => setShowModal(true)} style={{ cursor: "pointer" }}>
        <FaRegTrashAlt />
        <span> 削除</span>
      </div>

      <Modal show={showModal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>削除の確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>本当に削除しますか？</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            キャンセル
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteEntry(entryId)}
          >
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
