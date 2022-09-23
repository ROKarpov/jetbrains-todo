export type TaskFilterType =
  | "all_tasks"
  | "uncompleted_tasks"
  | "completed_tasks";

export type ToDoTask = {
  id: string;
  description: string;
  completeDate: string | null;
  lastChangeDate: string;
  comments?: string;
  completeDueToDate?: string;
};

export type ToDoTaskInsertProps = Pick<ToDoTask, "description"> &
  Partial<Omit<ToDoTask, "id" | "lastChangeDate" | "description">>;

export type ToDoTaskUpdateProps = Partial<ToDoTaskInsertProps>;
