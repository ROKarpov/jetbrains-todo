import React, { MouseEventHandler, useCallback } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "../../../lib/Button/Button";
import { ToDoItem } from "../../../api/types";
import Icon from "../../../lib/Icon/Icon";
import styles from "./TaskRow.module.scss";
import Checkbox from "../../../lib/Checkbox/Checkbox";

type Props = {
  item: ToDoItem;
  onItemClick: (item: ToDoItem) => void;
  onItemInfoClick: (item: ToDoItem) => void;
};

const TaskRow: React.FC<Props> = ({ item, onItemClick, onItemInfoClick }) => {
  const handleRowClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onItemClick(item);
      e.stopPropagation();
    },
    [item, onItemClick]
  );
  const handleInfoClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onItemInfoClick(item);
      e.stopPropagation();
    },
    [item, onItemInfoClick]
  );
  return (
    <div className={styles.content} onClick={handleRowClick}>
      <Checkbox
        readOnly
        checked={item.isCompleted}
        ariaLabel={`Completion of ${item.description}`}
      />
      <div>
        <div>{item.description}</div>
        {item.completeDueToDate && (
          <small>{`Due to: ${item.completeDueToDate.toLocaleDateString()}`}</small>
        )}
      </div>

      <Button
        onClick={handleInfoClick}
        type="no-container"
        size="lg"
        className={styles.infoIcon}
      >
        <Icon type="info-circle" />
      </Button>
    </div>
  );
};

export default TaskRow;
