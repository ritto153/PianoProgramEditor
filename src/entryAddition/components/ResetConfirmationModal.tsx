import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

interface Props {
  shownResetModal: boolean;
  setShownResetModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResetConfirmationModal(props: Props) {
  const { shownResetModal, setShownResetModal } = props;
  const { reset } = useFormContext();

  return (
    <Modal show={shownResetModal} onHide={() => setShownResetModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>リセットの確認</Modal.Title>
      </Modal.Header>
      <Modal.Body>入力中の内容をリセットします。よろしいですか？</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShownResetModal(false)}>
          キャンセル
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            reset();
            setShownResetModal(false);
          }}
        >
          リセットする
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
