import { FaRegTrashAlt } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useRemoveEntry } from "../../../hooks/useRemoveEntry";

export type Props = {
  entryId: string;
};

export default function DeleteEntryButton(props: Props): JSX.Element {
  const { entryId } = props;
  const [showModal, setShowModal] = useState(false);

  const { removeEntry } = useRemoveEntry();

  const handleDeleteConfirm = () => {
    removeEntry(entryId);
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
          <Button variant="danger" onClick={() => handleDeleteConfirm()}>
            削除
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
