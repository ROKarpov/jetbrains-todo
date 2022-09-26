import { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
} from "react-query";
import api from "../../api/api";
import { TaskFilterType, ToDoTask } from "../../api/types";
import {
  collectStatistics,
  isTaskInsert,
  isTaskUpdate,
  TaskStatistics,
  TaskStatisticsType,
  TaskUpsert,
} from "./utils";

const LIST_QUERY_KEY = "tasks";
const STATISTICS_QUERY_KEY = "task-statistics";

const invalidateQueries: (client: QueryClient) => void = (client) => {
  client.invalidateQueries([LIST_QUERY_KEY]);
  client.invalidateQueries([STATISTICS_QUERY_KEY]);
};

const useToDoListState = (
  filterType: TaskFilterType,
  setAlert: (alert: string) => void
) => {
  const client = useQueryClient();

  const [statisticsType, setStatisticsType] =
    useState<TaskStatisticsType>("last-week");

  const tasksQuery = useQuery<ToDoTask[]>(
    [LIST_QUERY_KEY, filterType],
    () => api.tasks(filterType),
    {
      initialData: [],
      keepPreviousData: true,
      onSuccess: () => {
        statisticsQuery.refetch();
      },
    }
  );
  const statisticsQuery = useQuery<TaskStatistics>(
    [STATISTICS_QUERY_KEY, statisticsType],
    () =>
      api
        .tasks()
        .then((tasks) => collectStatistics(tasks ?? [], statisticsType)),
    {
      enabled: filterType === "completed_tasks",
      keepPreviousData: true,
    }
  );

  const upsertItemMutation = useMutation(
    async (upsert: TaskUpsert) => {
      if (isTaskUpdate(upsert)) {
        return await api.updateToDoItem(upsert.id, upsert.changes);
      } else if (isTaskInsert(upsert)) {
        return await api.addToDoItem(upsert.changes);
      } else {
        throw new Error("TaskUpsert has broken data.");
      }
    },
    {
      onSuccess: () => invalidateQueries(client),
    }
  );
  const deleteItemMutation = useMutation(
    (id: string) => api.deleteToDoItem(id),
    {
      onSuccess: () => invalidateQueries(client),
    }
  );
  const importMutation = useMutation(
    (file: Blob) => {
      return api.import(file);
    },
    {
      onSuccess: () => invalidateQueries(client),
      onError: (e: Error) => {
        setAlert(e.message);
      },
    }
  );

  return {
    tasks: tasksQuery.data,
    statistics: statisticsQuery.data,
    filterType,
    statisticsType,
    isLoading:
      tasksQuery.isLoading ||
      upsertItemMutation.isLoading ||
      deleteItemMutation.isLoading,
    isImporting: importMutation.isLoading,
    upsertTask: upsertItemMutation.mutate,
    deleteTask: deleteItemMutation.mutate,
    importTasks: importMutation.mutate,
    exportTasks: api.export,
    setStatisticsType,
  };
};

export default useToDoListState;
