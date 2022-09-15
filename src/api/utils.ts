import { v4 as uuid } from "uuid";

import { ToDoItem, ToDoItemCreateProps, ToDoItemUpdateProps } from "./types";

const FILE_TYPE = "application/json";

export const createToDoItem: (props: ToDoItemCreateProps) => ToDoItem = ({
  description,
  isCompleted = false,
  comments,
  completeDueToDate,
}) => {
  return {
    id: uuid(),
    description: description,
    isCompleted: isCompleted,
    lastChangeDate: new Date(),
    comments: comments,
    completeDueToDate: completeDueToDate,
  };
};

export const updateToDoItem: (
  item: ToDoItem,
  props: ToDoItemUpdateProps
) => ToDoItem = (item, props) => {
  return { ...item, ...props, lastChangeDate: new Date() };
};

export const readToDoList: (src: Blob) => Promise<ToDoItem[]> = async (src) => {
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

export const writeToDoList: (list: ToDoItem[]) => Blob = (list) => {
  const string = JSON.stringify(list);
  return new File([string], "test", { type: FILE_TYPE });
};

export function isToDoItem(object: any): object is ToDoItem {
  const item = <ToDoItem>object;
  return (
    item.id !== undefined &&
    item.description !== undefined &&
    item.isCompleted !== undefined &&
    item.lastChangeDate !== undefined
  );
}

export function isToDoItemArray(object: any): object is ToDoItem[] {
  if (Array.isArray(object)) {
    return object.reduce((prev, obj) => prev && isToDoItem(obj), true);
  } else {
    return false;
  }
}
