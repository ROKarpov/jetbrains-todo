import dayjs from "dayjs";
import createMockToDoListApi from "./mockApi";
import { createToDoItem } from "./utils";

const api =
  //process.env.NODE_ENV === "development"
  /*? */ createMockToDoListApi([]);
//: null;

export default api;
