import React from "react";
import { ToDoTask } from "../../api/types";
import List from "../../lib/List/List";
import Panel from "../../lib/Panel/Panel";
import TaskRow from "./TaskRow/TaskRow";
import cn from "classnames";
import styles from "./TaskList.module.scss";

type Props = {
  items: ToDoTask[];
  onItemClick: (item: ToDoTask) => void;
  onEditItemClick: (item: ToDoTask) => void;
  onDeleteItemClick: (item: ToDoTask) => void;
  className?: string;
};

const TaskList: React.FC<Props> = ({
  items,
  onItemClick,
  onEditItemClick,
  onDeleteItemClick,
  className,
}) => (
  <Panel
    borderRadius="lg"
    borderColor="light"
    shadowRadius="sm"
    borderWidth="xs"
    className={cn(styles.panel, className)}
  >
    <List
      items={items}
      rowHeight={53}
      row={(item) => (
        <TaskRow
          item={item}
          onItemClick={onItemClick}
          onEditItemClick={onEditItemClick}
          onDeleteItemClick={onDeleteItemClick}
        />
      )}
    />
  </Panel>
);

export default TaskList;
