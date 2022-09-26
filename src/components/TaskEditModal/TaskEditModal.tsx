import React, { useCallback, useEffect, useReducer } from "react";
import { ToDoTask, ToDoTaskInsertProps } from "../../api/types";
import Button from "../../lib/Button/Button";
import Icon from "../../lib/Icon/Icon";
import Modal from "../../lib/Modal/Modal";
import editTaskReducer, {
  mapEditTaskStateToChange,
  mapTaskToEditTaskState,
} from "./editTaskReducer";
import TaskEditForm from "./TaskEditForm/TaskEditForm";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (changes: ToDoTaskInsertProps) => void;
  task: ToDoTask | null;
};

const TaskEditModal: React.FC<Props> = ({ open, setOpen, onSave, task }) => {
  const [state, dispatch] = useReducer(
    editTaskReducer,
    task,
    mapTaskToEditTaskState
  );
  const handleSave = useCallback(() => {
    onSave(mapEditTaskStateToChange(state));
    setOpen(false);
  }, [state, onSave, setOpen]);
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  useEffect(() => {
    if (open) {
      dispatch({ type: "RESET", payload: task });
    }
  }, [task, open]);

  return (
    <Modal
      title={task ? "Edit Task" : "New Task"}
      open={open}
      setOpen={setOpen}
      footer={
        <>
          <Button onClick={handleCancel} containerType="no-container">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            containerType="filled"
            disabled={!state.changed || state.hasDescriptionErrors}
          >
            Save
          </Button>
        </>
      }
      header={
        <Button onClick={handleSave} containerType="no-container" size="lg">
          <Icon type="save" />
        </Button>
      }
    >
      <TaskEditForm state={state} dispatch={dispatch} />
    </Modal>
  );
};

export default TaskEditModal;
