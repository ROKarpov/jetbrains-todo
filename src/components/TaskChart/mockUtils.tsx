import dayjs from "dayjs";
import { ToDoItem } from "../../api/types";
import { createToDoItem } from "../../api/utils";

export const makeData: () => ToDoItem[] = () => {
  const firstDayOfYear = dayjs(`${dayjs().year()}-01-01`);
  return Array.from({ length: 500 }, (_, i) =>
    createToDoItem({
      description: `Task #${i}`,
      completeDate: new Date(firstDayOfYear.add(i, "day").format()),
      completeDueToDate: new Date(firstDayOfYear.add(i, "day").format()),
    })
  );
};
