import React, {
  ChangeEventHandler,
  FocusEventHandler,
  useCallback,
} from "react";
import Form from "../../../lib/Form/Form";
import Input from "../../../lib/Input/Input";

import styles from "./TaskEditForm.module.scss";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { EditTaskAction, EditTaskState } from "../editTaskReducer";

dayjs.extend(relativeTime);

type Props = {
  state: EditTaskState;
  dispatch: (action: EditTaskAction) => void;
};

const TaskEditForm: React.FC<Props> = ({ state, dispatch }) => {
  const handleDescriptionChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        dispatch({ type: "CHANGE_DESCRIPTION", payload: e.target.value });
      },
      [dispatch]
    );
  const handleDescriptionBlur: FocusEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        dispatch({ type: "BLUR_DESCRIPTION" });
      },
      [dispatch]
    );
  const handleDueToDateChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        dispatch({ type: "CHANGE_DUE_TO_DATE", payload: e.target.value });
      },
      [dispatch]
    );
  const handleCommentsChange: ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        dispatch({ type: "CHANGE_COMMENTS", payload: e.target.value });
      },
      [dispatch]
    );

  return (
    <Form>
      <Input
        id="description"
        label="Description"
        value={state.description}
        helperText="Required"
        hasError={
          state.hasDescriptionErrors && state.shouldShowDescriptionErrors
        }
        className={styles.input}
        onChange={handleDescriptionChange}
        onBlur={handleDescriptionBlur}
      />
      <Input
        id="due-to-date"
        label="Due To Date"
        value={
          state.completeDueToDate
            ? dayjs(state.completeDueToDate).format("YYYY-MM-DDTHH:mm")
            : ""
        }
        type="datetime-local"
        className={styles.input}
        onChange={handleDueToDateChange}
      />
      <Input
        id="comments"
        label="Comments"
        value={state.comments ?? ""}
        multiline
        className={styles.input}
        editClassName={styles.comments}
        onChange={handleCommentsChange}
      />
      {state.lastChangeDate && (
        <div>Last Update: {dayjs().from(state.lastChangeDate)}</div>
      )}
    </Form>
  );
};
export default TaskEditForm;
