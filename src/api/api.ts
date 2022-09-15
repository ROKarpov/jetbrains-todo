import { ToDoItem, ToDoItemCreateProps, ToDoItemUpdateProps } from "./types";

interface ToDoListApi {
  list: () => Promise<ToDoItem[]>;
  addToDoItem: (props: ToDoItemCreateProps) => Promise<ToDoItem>;
  updateToDoItem: (id: string, changes: ToDoItemUpdateProps) => Promise<void>;
  deleteToDoItem: (id: string) => Promise<void>;

  import: (src: Blob) => Promise<void>;
  export: () => Promise<Blob>;
}

export default ToDoListApi;
