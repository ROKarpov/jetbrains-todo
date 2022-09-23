import createMockToDoListApi from "./mockApi";
import { createToDoItem } from "./utils";

const api =
  //process.env.NODE_ENV === "development"
  /*? */ createMockToDoListApi(
    Array.from({ length: 1000 }, (_, i) =>
      createToDoItem({
        description: `Task #${i + 1}`,
        completeDate: i % 2 ? new Date() : null,
        completeDueToDate: i % 3 ? new Date() : undefined,
      })
    )
  );
//: null;

export default api;
