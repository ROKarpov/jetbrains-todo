import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import dayOfYear from "dayjs/plugin/dayOfYear";

import { ToDoItem } from "../../api/types";

export type TaskStatisticsType = "last-week" | "last-month" | "last-year";

dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

const DATE_VALUE_GETTER: {
  [id: string]: (date: Date | string) => number;
} = {
  "last-week": (date) => dayjs(date).isoWeek(),
  "last-month": (date) => dayjs(date).month(),
  "last-year": (date) => dayjs(date).year(),
};

const DATE_AGGREGATE_VALUE_GETTER: {
  [id: string]: (date: Date | string) => number;
} = {
  "last-week": (date) => dayjs(date).isoWeekday() - 1,
  "last-month": (date) => dayjs(date).date(),
  "last-year": (date) => dayjs(date).month(),
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

type TaskStatisticsRelevantDates = {
  completeDates: Date[];
  plannedDates: Date[];
};

function getOrThrow<T>(value: T | undefined | null) {
  if (value) {
    return value;
  } else {
    throw "Impossible case";
  }
}

export const getRelevantItems: (
  day: string,
  items: ToDoItem[],
  statisticsType: TaskStatisticsType
) => TaskStatisticsRelevantDates = (day, items, statisticsType) => {
  const valueGetter = DATE_VALUE_GETTER[statisticsType];
  if (valueGetter === undefined) {
    throw `DATE_VALUE_GETTER does not contain a proper value for the '${statisticsType}'`;
  }
  const targetValue = valueGetter(day);
  return {
    completeDates: items
      .filter(
        (item) =>
          item.completeDate && valueGetter(item.completeDate) == targetValue
      )
      .map((item) => getOrThrow(item.completeDate)),
    plannedDates: items
      .filter(
        (item) =>
          item.completeDueToDate &&
          valueGetter(item.completeDueToDate) == targetValue
      )
      .map((item) => getOrThrow(item.completeDueToDate)),
  };
};

export const aggregateDates: (
  dates: Date[],
  statisticsType: TaskStatisticsType
) => { argument: string | number; value: number }[] = (
  dates,
  statisticsType
) => {
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
