import React, { useMemo } from "react";
import { ToDoItem } from "../../api/types";
import dayjs from "dayjs";
import { aggregateDates, getRelevantItems, TaskStatisticsType } from "./utils";
import Chart, { Series } from "../../lib/Chart/Chart";

type Props = {
  items: ToDoItem[];
  type: TaskStatisticsType;
};

const TaskChart: React.FC<Props> = ({ items, type }) => {
  const today = dayjs().format("YYYY-MM-DD");
  const series = useMemo(() => {
    const data = getRelevantItems(today, items, type);
    return [
      {
        label: "Completed",
        points: aggregateDates(data.completeDates, type),
      },
      {
        label: "Planned",
        points: aggregateDates(data.plannedDates, type),
      },
    ];
  }, [today, items, type]);

  return <Chart series={series} />;
};
export default TaskChart;
