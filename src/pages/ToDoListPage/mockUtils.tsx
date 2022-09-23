import dayjs from "dayjs";
import { ToDoTask } from "../../api/types";
import { createToDoItem } from "../../api/utils";

export const makeData: () => ToDoTask[] = () => {
  const firstDayOfYear = dayjs(`${dayjs().year()}-01-01`);
  return Array.from({ length: 500 }, (_, i) =>
    createToDoItem({
      description: `Task #${i}`,
      completeDate: firstDayOfYear.add(i, "day").format(),
      completeDueToDate: firstDayOfYear.add(i, "day").format(),
    })
  );
};
