import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import dayOfYear from "dayjs/plugin/dayOfYear";

import {
  ToDoTask,
  ToDoTaskInsertProps,
  ToDoTaskUpdateProps,
} from "../../api/types";

dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

export type TaskUpdate = {
  id: string;
  changes: ToDoTaskUpdateProps;
};
export type TaskInsert = {
  changes: ToDoTaskInsertProps;
};
export type TaskUpsert = TaskInsert | TaskUpdate;

export type TaskStatisticsType = "last-week" | "last-month" | "last-year";

export type TaskStatisticsRelevantDates = {
  completeDates: Dayjs[];
  plannedDates: Dayjs[];
};

export type TaskStatisticsValue = { argument: string | number; value: number };

export type TaskStatistics = {
  completed: TaskStatisticsValue[];
  planned: TaskStatisticsValue[];
};

const DATE_VALUE_GETTER: {
  [id: string]: (date: Dayjs) => number;
} = {
  "last-week": (date) => date.isoWeek(),
  "last-month": (date) => date.month(),
  "last-year": (date) => date.year(),
};

const DATE_AGGREGATE_VALUE_GETTER: {
  [id: string]: (date: Dayjs) => number;
} = {
  "last-week": (date) => date.isoWeekday() - 1,
  "last-month": (date) => date.date(),
  "last-year": (date) => date.month(),
};

const DAY_OF_WEEK_NAME = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const MONTH_NAME = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const INDEX_TO_LABEL_MAPPER: {
  [id: string]: (index: number) => string | number;
} = {
  "last-week": (index) => DAY_OF_WEEK_NAME[index],
  "last-month": (index) => index,
  "last-year": (index) => MONTH_NAME[index],
};

export const getRelevantItems: (
  day: string,
  items: ToDoTask[],
  statisticsType: TaskStatisticsType
) => TaskStatisticsRelevantDates = (day, items, statisticsType) => {
  const valueGetter = DATE_VALUE_GETTER[statisticsType];
  if (valueGetter === undefined) {
    throw `DATE_VALUE_GETTER does not contain a proper value for the '${statisticsType}'`;
  }
  const targetValue = valueGetter(dayjs(day));
  return {
    completeDates: items
      .map((item) => (item.completeDate ? dayjs(item.completeDate) : null))
      .filter((date) => date && valueGetter(date) == targetValue)
      .map((date) => getOrThrow(date)),
    plannedDates: items
      .map((item) =>
        item.completeDueToDate ? dayjs(item.completeDueToDate) : null
      )
      .filter((date) => date && valueGetter(date) == targetValue)
      .map((date) => getOrThrow(date)),
  };
};

export const aggregateDates: (
  dates: Dayjs[],
  statisticsType: TaskStatisticsType
) => TaskStatisticsValue[] = (dates, statisticsType) => {
  const valueGetter = DATE_AGGREGATE_VALUE_GETTER[statisticsType];
  if (valueGetter === undefined) {
    throw `DATE_AGGREGATE_VALUE_GETTER does not contain a proper value for the '${statisticsType}'`;
  }
  const indexMapper = INDEX_TO_LABEL_MAPPER[statisticsType];
  if (indexMapper === undefined) {
    throw `INDEX_TO_LABEL_MAPPER does not contain a proper value for the '${statisticsType}'`;
  }

  const aggregates = new Map<number, number>();
  dates.forEach((date) => {
    const value = valueGetter(date);
    const aggregate = aggregates.get(value);
    aggregates.set(value, aggregate ? aggregate + 1 : 1);
  });
  return Array.from(aggregates, ([index, value]) => ({
    index,
    value,
  }))
    .sort((pointA, pointB) => pointA.index - pointB.index)
    .map(({ index, value }) => ({
      argument: indexMapper(index),
      value,
    }));
};

export const collectStatistics: (
  tasks: ToDoTask[],
  type: TaskStatisticsType
) => TaskStatistics = (tasks, type) => {
  const relevantItems = getRelevantItems(
    dayjs().format("YYYY-MM-DD"),
    tasks,
    type
  );
  return {
    completed: aggregateDates(relevantItems.completeDates, type),
    planned: aggregateDates(relevantItems.plannedDates, type),
  };
};

export function isTaskUpdate(change: TaskUpsert): change is TaskUpdate {
  return (change as TaskUpdate).id !== undefined;
}

export function isTaskInsert(change: TaskUpsert): change is TaskInsert {
  return (change as TaskInsert).changes?.description !== undefined;
}

function getOrThrow<T>(value: T | undefined | null) {
  if (value) {
    return value;
  } else {
    throw "Impossible case";
  }
}
