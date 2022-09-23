import { v4 as uuid } from "uuid";

import {
  TaskFilterType,
  ToDoTask,
  ToDoTaskInsertProps,
  ToDoTaskUpdateProps,
} from "./types";

const FILE_TYPE = "application/json";

const DEFAULT_TASK_FILTER = () => true;
const TASK_FILTERS: { [id: string]: (task: ToDoTask) => boolean } = {
  uncompleted_tasks: (task) => task.completeDate === null,
  completed_tasks: (task) => task.completeDate !== null,
};

export const createToDoItem: (props: ToDoTaskInsertProps) => ToDoTask = ({
  description,
  completeDate = null,
  comments,
  completeDueToDate,
}) => {
  return {
    id: uuid(),
    description: description,
    completeDate: completeDate,
    lastChangeDate: new Date(),
    comments: comments,
    completeDueToDate: completeDueToDate,
  };
};

export const updateToDoItem: (
  item: ToDoTask,
  props: ToDoTaskUpdateProps
) => ToDoTask = (item, props) => {
  return { ...item, ...props, lastChangeDate: new Date() };
};

export const readToDoList: (src: Blob) => Promise<ToDoTask[]> = async (src) => {
  if (src.type !== FILE_TYPE) {
    throw "Cannot read non-json files.";
  }
  const json = await src.text();
  const object = JSON.parse(json);
  if (!isToDoItemArray(object)) {
    throw "Cannot read a JSON-file that not stores ToDo items.";
  }
  return object;
};

export const writeToDoList: (list: ToDoTask[]) => Blob = (list) => {
  const string = JSON.stringify(list);
  return new File([string], "test", { type: FILE_TYPE });
};

export function isToDoItem(object: any): object is ToDoTask {
  const item = <ToDoTask>object;
  return (
    item.id !== undefined &&
    item.description !== undefined &&
    item.completeDate !== undefined &&
    item.lastChangeDate !== undefined
  );
}

export function isToDoItemArray(object: any): object is ToDoTask[] {
  if (Array.isArray(object)) {
    return object.reduce((prev, obj) => prev && isToDoItem(obj), true);
  } else {
    return false;
  }
}

export const getTaskFilter: (
  filterType?: TaskFilterType
) => (task: ToDoTask) => boolean = (filterType) => {
  return filterType
    ? TASK_FILTERS[filterType] ?? DEFAULT_TASK_FILTER
    : DEFAULT_TASK_FILTER;
};
