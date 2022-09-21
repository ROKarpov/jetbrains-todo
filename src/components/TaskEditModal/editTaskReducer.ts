import { ToDoItem, ToDoItemCreateProps } from "../../api/types";
import { isEmpty } from "../../utils/utils";

export type EditTaskState = ToDoItemCreateProps & {
  hasDescriptionErrors: boolean;
  shouldShowDescriptionErrors: boolean;
  changed: boolean;
};

type EditTaskActionType =
  | "CHANGE_DESCRIPTION"
  | "CHANGE_DUE_TO_DATE"
  | "CHANGE_COMMENTS"
  | "BLUR_DESCRIPTION";

export type EditTaskAction = {
  type: EditTaskActionType;
  payload?: string;
};

export const mapTaskToEditTaskState: (item: ToDoItem | null) => EditTaskState =
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
) => ToDoItemCreateProps = (state) => {
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
      result = {
        ...state,
        description: payload ? payload : "",
        hasDescriptionErrors: isEmpty(payload),
        changed: true,
      };
      break;
    case "CHANGE_DUE_TO_DATE":
      result = {
        ...state,
        completeDueToDate: payload ? new Date(payload) : undefined,
        changed: true,
      };
      break;
    case "CHANGE_COMMENTS":
      result = { ...state, comments: payload, changed: true };
      break;
    case "BLUR_DESCRIPTION":
      result = {
        ...state,
        shouldShowDescriptionErrors: true,
      };
      break;
    default:
      result = state;
      break;
  }
  return result;
};

export default editTaskReducer;
