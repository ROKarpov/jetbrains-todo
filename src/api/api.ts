import dayjs from "dayjs";
import createMockToDoListApi from "./mockApi";
import createProdToDoListApi from "./prodApi";
import { createToDoItem } from "./utils";

const api = createProdToDoListApi();
// process.env.NODE_ENV === "development"
//   ? createMockToDoListApi([])
//   : createProdToDoListApi();

export default api;
