import ToDoListApi from "./api";
import { ToDoItem, ToDoItemCreateProps, ToDoItemUpdateProps } from "./types";
import {
  createToDoItem,
  readToDoList,
  updateToDoItem,
  writeToDoList,
} from "./utils";

const DEFAULT_INITIAL_ITEMS: ToDoItem[] = [];

const createMockToDoListApi: (initialItems?: ToDoItem[]) => ToDoListApi = (
  initialItems = DEFAULT_INITIAL_ITEMS
) => {
  let items: ToDoItem[] = initialItems;

  return {
    list: () =>
      new Promise((resolve, reject) => {
        resolve([...items]);
      }),
    addToDoItem: (props: ToDoItemCreateProps) =>
      new Promise((resolve, reject) => {
        const newItem = createToDoItem(props);
        items.push(newItem);
        resolve(newItem);
      }),
    updateToDoItem: (id: string, changes: ToDoItemUpdateProps) =>
      new Promise((resolve, reject) => {
        const itemIndex = items.findIndex((item) => {
          return item.id === id;
        });
        if (itemIndex === -1) {
          reject("Item with the specified id is not found.");
        } else {
          const updatedItem = updateToDoItem(items[itemIndex], changes);
          items[itemIndex] = updatedItem;
          resolve();
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
