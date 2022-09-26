import React, { useCallback } from "react";
import Button from "../../lib/Button/Button";
import Modal from "../../lib/Modal/Modal";
import FilePicker from "../FilePicker/FilePicker";

import styles from "./ImportTasksModal.module.scss";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onFileSelected: (file: Blob) => void;
};

const ImportTasksModal: React.FC<Props> = ({
  open,
  setOpen,
  onFileSelected,
}) => {
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleFileSelected = useCallback(
    (file: Blob) => {
      onFileSelected(file);
      setOpen(false);
    },
    [onFileSelected, setOpen]
  );

  return (
    <Modal
      title="Import Tasks"
      open={open}
      setOpen={setOpen}
      footer={
        <Button onClick={handleCancel} containerType="no-container">
          Cancel
        </Button>
      }
      bodyClassName={styles.content}
    >
      <FilePicker onFileSelected={handleFileSelected} />
    </Modal>
  );
};

export default ImportTasksModal;
