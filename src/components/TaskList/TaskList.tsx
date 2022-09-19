import React from "react";
import { ToDoItem } from "../../api/types";
import List from "../../lib/List/List";
import TaskRow from "./TaskRow/TaskRow";

type Props = {
  items: ToDoItem[];
  onItemClick: (item: ToDoItem) => void;
  onItemInfoClick: (item: ToDoItem) => void;
};

const TaskList: React.FC<Props> = ({ items, onItemClick, onItemInfoClick }) => (
  <List
    className="list"
    items={items}
    rowHeight={53}
    row={(item) => (
      <TaskRow
        item={item}
        onItemClick={onItemClick}
        onItemInfoClick={onItemInfoClick}
      />
    )}
  />
);

export default TaskList;
