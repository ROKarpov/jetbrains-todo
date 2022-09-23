import {
  ToDoTask,
  ToDoTaskInsertProps,
  ToDoTaskUpdateProps,
  TaskFilterType,
} from "./types";

interface ToDoListApi {
  tasks: (filter?: TaskFilterType) => Promise<ToDoTask[]>;
  addToDoItem: (props: ToDoTaskInsertProps) => Promise<ToDoTask>;
  updateToDoItem: (
    id: string,
    changes: ToDoTaskUpdateProps
  ) => Promise<ToDoTask>;
  deleteToDoItem: (id: string) => Promise<void>;

  import: (src: Blob) => Promise<void>;
  export: () => Promise<Blob>;
}

export default ToDoListApi;
