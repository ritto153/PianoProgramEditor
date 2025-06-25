import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";

type Props = {
  entryId: string;
};


export default function EditEntryButton(props: Props): JSX.Element {
  const { entryId } = props;
  const [showModal, setShowModal] = useState(false);
  
  return (
    <>
      <div onClick={() => {setShowModal(true)}}>
        <FaPencilAlt />
        <span> 編集</span>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>エントリーの編集</Modal.Title>
        </Modal.Header>
        <Modal.Body>フォーム未実装</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            キャンセル
          </Button>
          <Button variant="danger" onClick={() => {}}>
            保存
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
