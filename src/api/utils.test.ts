import { describe, expect, test } from "@jest/globals";
import {
  createToDoItem,
  isToDoItem,
  isToDoItemArray,
  updateToDoItem,
} from "./utils";

const sleep: (ms: number) => Promise<void> = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

describe("api utils", () => {
  describe("createToDoItem", () => {
    test("specifies unique id", () => {
      const firstItem = createToDoItem({ description: "Description 1" });
      const secondItem = createToDoItem({ description: "Description 2" });
      expect(firstItem.id).not.toEqual(secondItem.id);
    });

    test("creates item uncompleted by default", () => {
      const item = createToDoItem({ description: "Description" });
      expect(item.completeDate).toBeFalsy();
    });

    test("specifies last update date", () => {
      const item = createToDoItem({ description: "Description" });
      expect(item.lastChangeDate).toBeTruthy();
    });

    test("not fills unspecified fields", () => {
      const item = createToDoItem({ description: "Description" });
      expect(item.comments).toBeUndefined();
      expect(item.completeDueToDate).toBeUndefined();
    });
  });

  describe("updateToDoItem", () => {
    test("do not change id", () => {
      const item = createToDoItem({ description: "Description" });
      const updatedItem = updateToDoItem(item, {
        description: "Changed Description",
      });
      expect(item.id).toEqual(updatedItem.id);
    });

    test("changes 'lastChangeDate' if there is changes", async () => {
      const item = createToDoItem({ description: "Description" });
      await sleep(1000);
      const updatedItem = updateToDoItem(item, {
        description: "Changed Description",
      });
      expect(item.lastChangeDate).not.toEqual(updatedItem.lastChangeDate);
    });

    test("does not change item if changes object is empty", () => {
      const item = createToDoItem({ description: "Description" });
      const updatedItem = updateToDoItem(item, {});
      expect(item.lastChangeDate).toEqual(updatedItem.lastChangeDate);
    });

    test("does not change properties not specified in change object", () => {
      const item = createToDoItem({ description: "Description" });
      const updatedItem = updateToDoItem(item, {
        comments: "New Comments",
      });
      expect(item.description).toEqual(updatedItem.description);
    });
  });

  describe("isToDoItem", () => {
    test("returns 'true' for ToDoItem-s", () => {
      expect(isToDoItem(createToDoItem({ description: "Test" }))).toBeTruthy();
    });

    test("returns 'false' for an empty object", () => {
      expect(isToDoItem({})).toBeFalsy();
    });

    test("returns 'false' for an incomplete item", () => {
      expect(isToDoItem({ id: "test", description: "test" })).toBeFalsy();
    });
  });

  describe("isToDoItemArray", () => {
    test("returns 'true' for a ToDoItem array", () => {
      expect(
        isToDoItemArray([
          createToDoItem({ description: "Test 1" }),
          createToDoItem({ description: "Test 2" }),
        ])
      ).toBeTruthy();
    });

    test("returns 'false' for an object", () => {
      expect(isToDoItemArray({ description: "Test" })).toBeFalsy();
    });

    test("returns 'false' if any object is incomplete", () => {
      expect(
        isToDoItemArray([
          createToDoItem({ description: "Test 1" }),
          { description: "Test 2" },
        ])
      ).toBeFalsy();
    });
  });

  // [TODO]: check why the test Blob is created without the 'text' method.
  // This is the reason of test failing.
  /*
  describe("readToDoList", () => {
    const makeBlob: () => Blob = () => {
      return writeToDoList([
        createToDoItem({ description: "Test 1" }),
        createToDoItem({ description: "Test 2" }),
      ]);
    };

    test("reads proper blob", async () => {
      const blob = makeBlob();
      const items = await readToDoList(blob);
      expect(items.length).toBe(2);
    });
  });
  */
});
