import {
  ToDoTask,
  ToDoTaskInsertProps,
  ToDoTaskUpdateProps,
  TaskFilterType,
} from "./types";

interface ToDoListApi {
  tasks: (filter?: TaskFilterType) => Promise<ToDoTask[]>;
  addToDoItem: (props: ToDoTaskInsertProps) => Promise<ToDoTask | null>;
  updateToDoItem: (
    id: string,
    changes: ToDoTaskUpdateProps
  ) => Promise<ToDoTask | null>;
  deleteToDoItem: (id: string) => Promise<void>;

  import: (src: Blob) => Promise<void>;
  export: () => Promise<Blob>;
}

export default ToDoListApi;
