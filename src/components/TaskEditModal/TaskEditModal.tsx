import React, { useCallback, useReducer } from "react";
import { ToDoItem, ToDoItemCreateProps } from "../../api/types";
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
  onSave: (changes: ToDoItemCreateProps) => void;
  task: ToDoItem | null;
};

const TaskEditModal: React.FC<Props> = ({ open, setOpen, onSave, task }) => {
  const [state, dispatch] = useReducer(
    editTaskReducer,
    mapTaskToEditTaskState(task)
  );
  const handleSave = useCallback(() => {
    onSave(mapEditTaskStateToChange(state));
    setOpen(false);
  }, [state, onSave, setOpen]);
  const handleCancel = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <Modal
      title={task ? "Edit Task" : "New Task"}
      open={open}
      setOpen={setOpen}
      footer={
        <>
          <Button onClick={handleCancel} type="no-container">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            type="filled"
            disabled={!state.changed || state.hasDescriptionErrors}
          >
            Save
          </Button>
        </>
      }
      header={
        <Button onClick={handleSave} type="no-container" size="lg">
          <Icon type="file-export" />
        </Button>
      }
    >
      <TaskEditForm state={state} dispatch={dispatch} />
    </Modal>
  );
};

export default TaskEditModal;
