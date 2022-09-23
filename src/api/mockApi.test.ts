import { describe, expect, test } from "@jest/globals";
import createMockToDoListApi from "./mockApi";
import { ToDoTask } from "./types";
import { createToDoItem } from "./utils";

describe("mock api", () => {
  describe("list", () => {
    test("returns items", async () => {
      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);
      const list = await api.tasks();
      expect(list.length).toBe(1);
    });
  });

  describe("addToDoItem", () => {
    test("adds an item to existing items", async () => {
      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);

      const initList = await api.tasks();
      expect(initList.length).toBe(1);

      api.addToDoItem({ description: "New Test" });
      const resultList = await api.tasks();
      expect(resultList.length).toBe(2);
    });
  });

  describe("updateToDoItem", () => {
    test("updates an existing items", async () => {
      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);
      const initList: ToDoTask[] = await api.tasks();
      expect(initList.length).toBe(1);

      await api.updateToDoItem(initList[0].id, { description: "New Test" });
      const resultList = await api.tasks();
      expect(resultList[0].description).not.toEqual(initList[0].description);
    });

    test("throws an error if id not found", async () => {
      expect.assertions(2);

      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);
      const initList: ToDoTask[] = await api.tasks();

      expect(initList.length).toBe(1);
      try {
        await api.updateToDoItem("incorrect-id", { description: "New Test" });
      } catch (e) {
        expect(e).toBeTruthy();
      }
    });
  });

  describe("deleteToDoItem", () => {
    test("deletes an existing items", async () => {
      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);
      const initList: ToDoTask[] = await api.tasks();
      expect(initList.length).toBe(1);

      await api.deleteToDoItem(initList[0].id);
      const resultList = await api.tasks();
      expect(resultList.length).toBe(0);
    });

    test("deletes an existing items", async () => {
      expect.assertions(2);

      const api = createMockToDoListApi([
        createToDoItem({ description: "Test" }),
      ]);
      const initList: ToDoTask[] = await api.tasks();

      expect(initList.length).toBe(1);
      try {
        await api.deleteToDoItem("incorrect-id");
      } catch (e) {
        expect(e).toBeTruthy();
      }
    });
  });
});
