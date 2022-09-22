import { describe, expect, test } from "@jest/globals";
import { aggregateDates, getRelevantItems } from "./utils";
import dayjs from "dayjs";
import isLeapYear from "dayjs/plugin/isLeapYear";
import { makeData } from "./mockUtils";

dayjs.extend(isLeapYear);

describe("TaskChart utils", () => {
  describe("getRelevantItems", () => {
    test("returns proper count of values for 'last-week'", () => {
      const data = makeData();
      const today = dayjs();

      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-week"
      );

      expect(items.completeDates.length).toBe(7);
      expect(items.plannedDates.length).toBe(7);
    });
    test("returns proper count of values for 'last-month'", () => {
      const data = makeData();
      const today = dayjs();

      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-month"
      );

      const daysInMonth = today.daysInMonth();
      expect(items.completeDates.length).toBe(daysInMonth);
      expect(items.plannedDates.length).toBe(daysInMonth);
    });
    test("returns proper count of values for 'last-year'", () => {
      const data = makeData();
      const today = dayjs();

      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-year"
      );

      const daysInYear = today.isLeapYear() ? 366 : 365;
      expect(items.completeDates.length).toBe(daysInYear);
      expect(items.plannedDates.length).toBe(daysInYear);
    });
  });

  describe("aggregateDates", () => {
    test("returns proper aggregates for 'last-week'", () => {
      const data = makeData();
      const today = dayjs();
      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-week"
      );

      const aggregates = aggregateDates(items.completeDates, "last-week");

      expect(aggregates.length).toBe(7);
      aggregates.forEach((agg) => {
        expect(agg.value).toBe(1);
      });
    });
    test("returns proper aggregates for 'last-month'", () => {
      const data = makeData();
      const today = dayjs();
      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-month"
      );

      const aggregates = aggregateDates(items.completeDates, "last-month");

      const daysInMonth = today.daysInMonth();
      expect(aggregates.length).toBe(daysInMonth);
      aggregates.forEach((agg) => {
        expect(agg.value).toBe(1);
      });
    });
    test("returns proper aggregates for 'last-year'", () => {
      const data = makeData();
      const today = dayjs();
      const items = getRelevantItems(
        today.format("YYYY-MM-DD"),
        data,
        "last-year"
      );

      const aggregates = aggregateDates(items.completeDates, "last-year");

      expect(aggregates.length).toBe(12);
      aggregates.forEach((agg, index) => {
        expect(agg.value).toBe(
          dayjs(`${today.year()}-${index + 1}-01`).daysInMonth()
        );
      });
    });
  });
});
