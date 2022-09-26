import ToDoListApi from "./interfaces";
import { ToDoTask, ToDoTaskInsertProps, ToDoTaskUpdateProps } from "./types";
import {
  createToDoItem,
  getTaskFilter,
  readToDoList,
  updateToDoItem,
  writeToDoList,
} from "./utils";

const ITEMS_KEY = "to-do-items";

const createProdToDoListApi: () => ToDoListApi = () => {
  let cachedItems: ToDoTask[] | null = null;

  return {
    tasks: (filterType) =>
      new Promise((resolve, reject) => {
        if (cachedItems === null) {
          const itemsString = localStorage.getItem(ITEMS_KEY);
          cachedItems = itemsString ? JSON.parse(itemsString) : [];
        }
        const actualItems = cachedItems ?? [];
        const filter = getTaskFilter(filterType);
        const result = filter ? actualItems.filter(filter) : actualItems;
        resolve(result);
      }),
    addToDoItem: (props: ToDoTaskInsertProps) =>
      new Promise((resolve, reject) => {
        if (cachedItems != null) {
          const newItem = createToDoItem(props);
          cachedItems.push(newItem);
          localStorage.setItem(ITEMS_KEY, JSON.stringify(cachedItems));
          resolve(newItem);
        } else {
          resolve(null);
        }
      }),
    updateToDoItem: (id: string, changes: ToDoTaskUpdateProps) =>
      new Promise((resolve, reject) => {
        if (cachedItems != null) {
          const itemIndex = cachedItems.findIndex((item) => {
            return item.id === id;
          });
          if (itemIndex === -1) {
            reject("Item with the specified id is not found.");
          } else {
            const updatedItem = updateToDoItem(cachedItems[itemIndex], changes);
            cachedItems[itemIndex] = updatedItem;
            localStorage.setItem(ITEMS_KEY, JSON.stringify(cachedItems));
            resolve(updatedItem);
          }
        } else {
          resolve(null);
        }
      }),
    deleteToDoItem: (id: string) =>
      new Promise((resolve, reject) => {
        if (cachedItems !== null) {
          const itemIndex = cachedItems.findIndex((item) => {
            return item.id === id;
          });
          if (itemIndex === -1) {
            reject("Item with the specified id is not found.");
          } else {
            cachedItems.splice(itemIndex, 1);
            localStorage.setItem(ITEMS_KEY, JSON.stringify(cachedItems));
            resolve();
          }
        } else {
          resolve();
        }
      }),

    import: async (src: Blob) => {
      cachedItems = await readToDoList(src);
      localStorage.setItem(ITEMS_KEY, JSON.stringify(cachedItems));
    },
    export: () =>
      new Promise((resolve, reject) => {
        const blob = writeToDoList(cachedItems ?? []);
        resolve(blob);
      }),
  };
};

export default createProdToDoListApi;
