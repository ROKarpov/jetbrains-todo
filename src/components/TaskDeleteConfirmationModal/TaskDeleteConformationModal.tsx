import React, { useCallback } from "react";
import { ToDoTask } from "../../api/types";
import Button from "../../lib/Button/Button";
import Modal from "../../lib/Modal/Modal";

type Props = {
  task: ToDoTask | null;
  open: boolean;
  onConfirm: () => void;
  setOpen: (open: boolean) => void;
};

const TaskDeleteConformationModal: React.FC<Props> = ({
  task,
  open,
  onConfirm,
  setOpen,
}) => {
  const handleConfirmClick = useCallback(() => {
    onConfirm();
    setOpen(false);
  }, [onConfirm, setOpen]);
  const handleCancelClick = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Delete Task"
      footer={
        <>
          <Button type="outlined" onClick={handleCancelClick}>
            No
          </Button>
          <Button onClick={handleConfirmClick}>Yes</Button>
        </>
      }
    >
      Are you sure want to delete the "{task?.description ?? "No Task"}" task?
    </Modal>
  );
};

export default TaskDeleteConformationModal;
