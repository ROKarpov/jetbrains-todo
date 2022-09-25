import React, { MouseEventHandler, useCallback, useMemo } from "react";
import Button from "../../../lib/Button/Button";
import { ToDoTask } from "../../../api/types";
import Icon from "../../../lib/Icon/Icon";
import styles from "./TaskRow.module.scss";
import Checkbox from "../../../lib/Checkbox/Checkbox";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import Typography from "../../../lib/Typography/Typography";

dayjs.extend(calendar);

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
  const formattedDueToDate = useMemo(() => {
    return item.completeDueToDate
      ? dayjs(item.completeDueToDate).calendar(null, {
          sameDay: "[Today at] h:mm A",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "[Last] dddd",
          sameElse: "DD/MM/YYYY",
        })
      : null;
  }, [item.completeDueToDate]);

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
      <div className={styles.textContainer}>
        <Typography multiline={false}>{item.description}</Typography>
        {formattedDueToDate && (
          <Typography small muted multiline={false}>
            Due to: {formattedDueToDate}
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
