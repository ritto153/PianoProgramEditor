import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import EntryEditForm from "./EntryEditForm";

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

      <Modal size="xl" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>エントリーの編集</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EntryEditForm entryId={entryId} onCloseModal={ () => setShowModal(false) }/>
        </Modal.Body>
      </Modal>
    </>
  )
}
