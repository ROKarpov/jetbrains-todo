import React from "react";
import ToDoListPage from "./pages/ToDoListPage/ToDoListPage";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/:filterType",
    element: <ToDoListPage />,
  },
  {
    path: "*",
    element: <Navigate to="/all_tasks" replace />,
  },
]);

const App: React.FC = () => <RouterProvider router={router} />;

export default App;
