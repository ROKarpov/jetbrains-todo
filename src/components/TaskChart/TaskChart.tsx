import React, { useMemo } from "react";
import {
  TaskStatistics,
  TaskStatisticsType,
} from "../../pages/ToDoListPage/utils";
import Chart from "../../lib/Chart/Chart";
import SegmentedButton, {
  Segment,
} from "../../lib/SegmentedButton/SegmentedButton";
import Panel from "../../lib/Panel/Panel";
import cn from "classnames";

import styles from "./TaskChart.module.scss";

type Props = {
  statistics: TaskStatistics;
  type: TaskStatisticsType;
  setType: (type: TaskStatisticsType) => void;
  className?: string;
};

const SEGMENTS: Segment[] = [
  {
    title: "Last Week",
    value: "last-week",
  },
  {
    title: "Last Month",
    value: "last-month",
  },
  {
    title: "Last Year",
    value: "last-year",
  },
];

const TaskChart: React.FC<Props> = ({
  statistics,
  type,
  setType,
  className,
}) => {
  const series = useMemo(
    () => [
      {
        label: "Completed",
        points: statistics.completed,
      },
      {
        label: "Planned",
        points: statistics.planned,
      },
    ],
    [statistics]
  );

  return (
    <Panel
      borderRadius="lg"
      borderColor="light"
      shadowRadius="sm"
      borderWidth="xs"
      className={cn(styles.panel, className)}
    >
      <SegmentedButton
        name="statistics_selector"
        value={type}
        onChange={setType}
        segments={SEGMENTS}
        size="sm"
      />
      <div className={styles.chart}>
        <Chart series={series} />
      </div>
    </Panel>
  );
};
export default TaskChart;
