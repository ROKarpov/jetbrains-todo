import { ToDoTask, ToDoTaskInsertProps } from "../../api/types";
import { isToDoItem } from "../../api/utils";
import { isEmpty } from "../../utils/utils";

export type EditTaskState = ToDoTaskInsertProps & {
  hasDescriptionErrors: boolean;
  shouldShowDescriptionErrors: boolean;
  changed: boolean;
  lastChangeDate?: Date;
};

type EditTaskActionType =
  | "CHANGE_DESCRIPTION"
  | "CHANGE_DUE_TO_DATE"
  | "CHANGE_COMMENTS"
  | "BLUR_DESCRIPTION"
  | "RESET";

export type EditTaskAction = {
  type: EditTaskActionType;
  payload?: string | ToDoTask | null;
};

export const mapTaskToEditTaskState: (item: ToDoTask | null) => EditTaskState =
  (item) => {
    const result: EditTaskState =
      item !== null
        ? {
            description: item.description,
            completeDueToDate: item.completeDueToDate,
            comments: item.comments,
            shouldShowDescriptionErrors: true,
            hasDescriptionErrors: isEmpty(item.description),
            changed: false,
            lastChangeDate: item.lastChangeDate,
          }
        : {
            description: "",
            shouldShowDescriptionErrors: false,
            hasDescriptionErrors: true,
            changed: false,
          };
    return result;
  };

export const mapEditTaskStateToChange: (
  state: EditTaskState
) => ToDoTaskInsertProps = (state) => {
  return {
    description: state.description,
    completeDueToDate: state.completeDueToDate,
    comments: state.comments,
  };
};

const editTaskReducer: (
  state: EditTaskState,
  action: EditTaskAction
) => EditTaskState = (state, action) => {
  const { type, payload } = action;
  let result: EditTaskState;
  switch (type) {
    case "CHANGE_DESCRIPTION":
      const newDescription = typeof payload === "string" ? payload : "";
      result = {
        ...state,
        description: newDescription,
        hasDescriptionErrors: isEmpty(newDescription),
        changed: true,
      };
      break;
    case "CHANGE_DUE_TO_DATE":
      const newDueToDate = typeof payload === "string" ? payload : "";
      result = {
        ...state,
        completeDueToDate: payload ? new Date(newDueToDate) : undefined,
        changed: true,
      };
      break;
    case "CHANGE_COMMENTS":
      const newComments = typeof payload === "string" ? payload : "";
      result = { ...state, comments: newComments, changed: true };
      break;
    case "BLUR_DESCRIPTION":
      result = {
        ...state,
        shouldShowDescriptionErrors: true,
      };
      break;
    case "RESET":
      return payload === null || isToDoItem(payload)
        ? mapTaskToEditTaskState(payload)
        : state;
    default:
      result = state;
      break;
  }
  return result;
};

export default editTaskReducer;
