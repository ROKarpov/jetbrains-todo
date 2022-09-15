export type ToDoItem = {
  id: string;
  description: string;
  isCompleted: boolean;
  lastChangeDate: Date;
  comments?: string;
  completeDueToDate?: Date;
};

export type ToDoItemCreateProps = Pick<ToDoItem, "description"> &
  Partial<Omit<ToDoItem, "id" | "lastChangeDate" | "description">>;

export type ToDoItemUpdateProps = Partial<ToDoItemCreateProps>;
