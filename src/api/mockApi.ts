import ToDoListApi from "./interfaces";
import { ToDoTask, ToDoTaskInsertProps, ToDoTaskUpdateProps } from "./types";
import {
  createToDoItem,
  getTaskFilter,
  readToDoList,
  updateToDoItem,
  writeToDoList,
} from "./utils";

const DEFAULT_INITIAL_ITEMS: ToDoTask[] = [];

const createMockToDoListApi: (initialItems?: ToDoTask[]) => ToDoListApi = (
  initialItems = DEFAULT_INITIAL_ITEMS
) => {
  let items: ToDoTask[] = initialItems;

  return {
    tasks: (filterType) =>
      new Promise((resolve, reject) => {
        const filter = getTaskFilter(filterType);
        const result = filter ? items.filter(filter) : [...items];
        resolve(result);
      }),
    addToDoItem: (props: ToDoTaskInsertProps) =>
      new Promise((resolve, reject) => {
        const newItem = createToDoItem(props);
        items.push(newItem);
        resolve(newItem);
      }),
    updateToDoItem: (id: string, changes: ToDoTaskUpdateProps) =>
      new Promise((resolve, reject) => {
        const itemIndex = items.findIndex((item) => {
          return item.id === id;
        });
        if (itemIndex === -1) {
          reject("Item with the specified id is not found.");
        } else {
          const updatedItem = updateToDoItem(items[itemIndex], changes);
          items[itemIndex] = updatedItem;
          resolve(updatedItem);
        }
      }),
    deleteToDoItem: (id: string) =>
      new Promise((resolve, reject) => {
        const itemIndex = items.findIndex((item) => {
          return item.id === id;
        });
        if (itemIndex === -1) {
          reject("Item with the specified id is not found.");
        } else {
          items.splice(itemIndex, 1);
          resolve();
        }
      }),

    import: async (src: Blob) => {
      items = await readToDoList(src);
    },
    export: () =>
      new Promise((resolve, reject) => {
        const blob = writeToDoList(items);
        resolve(blob);
      }),
  };
};

export default createMockToDoListApi;
