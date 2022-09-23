import React, { MouseEventHandler, useCallback } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "../../../lib/Button/Button";
import { ToDoTask } from "../../../api/types";
import Icon from "../../../lib/Icon/Icon";
import styles from "./TaskRow.module.scss";
import Checkbox from "../../../lib/Checkbox/Checkbox";
import dayjs from "dayjs";
import Typography from "../../../lib/Typography/Typography";

type Props = {
  item: ToDoTask;
  onItemClick: (item: ToDoTask) => void;
  onEditItemClick: (item: ToDoTask) => void;
  onDeleteItemClick: (item: ToDoTask) => void;
};

const TaskRow: React.FC<Props> = ({
  item,
  onItemClick,
  onEditItemClick,
  onDeleteItemClick,
}) => {
  const handleRowClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onItemClick(item);
      e.stopPropagation();
    },
    [item, onItemClick]
  );
  const handleEditClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onEditItemClick(item);
      e.stopPropagation();
    },
    [item, onEditItemClick]
  );
  const handleDeleteClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onDeleteItemClick(item);
      e.stopPropagation();
    },
    [item, onDeleteItemClick]
  );
  return (
    <div className={styles.content} onClick={handleRowClick}>
      <Checkbox
        readOnly
        checked={item.completeDate != null}
        ariaLabel={`Completion of ${item.description}`}
      />
      <div>
        <Typography>{item.description}</Typography>
        {item.completeDueToDate && (
          <Typography small muted>
            {`Due to: ${dayjs(item.completeDueToDate).format()}`}
          </Typography>
        )}
      </div>

      <div className={styles.actionContainer}>
        <Button onClick={handleEditClick} type="no-container" size="lg">
          <Icon type="pencil" />
        </Button>
        <Button onClick={handleDeleteClick} type="no-container" size="lg">
          <Icon type="trash" />
        </Button>
      </div>
    </div>
  );
};

export default TaskRow;
