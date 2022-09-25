import React, { useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  ToDoTask,
  ToDoTaskInsertProps,
  ToDoTaskUpdateProps,
} from "../../api/types";
import ImportTasksModal from "../../components/ImportTasksModal/ImportTasksModal";
import TaskChart from "../../components/TaskChart/TaskChart";
import TaskEditModal from "../../components/TaskEditModal/TaskEditModal";
import TaskList from "../../components/TaskList/TaskList";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import AppBar, { TabDescription } from "../../lib/AppBar/AppBar";
import useToDoListState from "./useToDoListState";
import { TaskInsert } from "./utils";
import styles from "./ToDoListPage.module.scss";
import Container from "../../lib/Container/Container";
import TaskDeleteConformationModal from "../../components/TaskDeleteConfirmationModal/TaskDeleteConformationModal";
import Button from "../../lib/Button/Button";
import Icon from "../../lib/Icon/Icon";
import FileExporter from "../../components/FileExporter/FileExporter";
import WaitIndicator from "../../lib/WaitIndicator/WaitIndicator";
import dayjs from "dayjs";
import { useMainLayoutContext } from "../../layouts/MainLayout/MainLayoutContext";

const TABS: TabDescription[] = [
  {
    id: "all_tasks",
    title: "All Tasks",
  },
  {
    id: "uncompleted_tasks",
    title: "Uncompleted Tasks",
  },
  {
    id: "completed_tasks",
    title: "Completed Tasks",
  },
];

const client = new QueryClient();

const ToDoListPageContent: React.FC = () => {
  const { setAlert } = useMainLayoutContext();

  const {
    tasks,
    statistics,
    filterType,
    statisticsType,
    isLoading,
    isImporting,
    upsertTask,
    deleteTask,
    importTasks,
    exportTasks,
    setFilterType,
    setStatisticsType,
  } = useToDoListState(setAlert);

  const [taskToEdit, setTaskToEdit] = useState<ToDoTask | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSaveClicked = useCallback(
    (changes: ToDoTaskInsertProps | ToDoTaskUpdateProps) => {
      if (taskToEdit) {
        upsertTask({ id: taskToEdit.id, changes });
      } else if (taskToEdit == null) {
        upsertTask({ changes } as TaskInsert);
      }
    },
    [taskToEdit, upsertTask]
  );

  const handleDeleteConfirmed = useCallback(() => {
    if (taskToEdit) {
      deleteTask(taskToEdit.id);
    }
  }, [taskToEdit, deleteTask]);

  const handleRowClick = useCallback(
    (item: ToDoTask) => {
      upsertTask({
        id: item.id,
        changes: { completeDate: item.completeDate ? null : dayjs().format() },
      });
    },
    [upsertTask]
  );
  const handleEditItemClick = useCallback(
    (item: ToDoTask) => {
      setTaskToEdit(item);
      setEditModalOpen(true);
    },
    [setTaskToEdit, setEditModalOpen]
  );
  const handleDeleteItemClick = useCallback(
    (item: ToDoTask) => {
      setTaskToEdit(item);
      setDeleteModalOpen(true);
    },
    [setTaskToEdit, setDeleteModalOpen]
  );

  return (
    <>
      <MainLayout.Header>
        <AppBar
          tabs={TABS}
          selectedTabId={filterType}
          setSelectedTabId={setFilterType}
        >
          <AppBar.Actions>
            <Button
              type="no-container"
              size="lg"
              className={styles.action}
              onClick={() => {
                setTaskToEdit(null);
                setEditModalOpen(true);
              }}
            >
              <Icon type="plus" />
            </Button>
            <Button
              type="no-container"
              size="lg"
              className={styles.action}
              onClick={() => {
                setImportModalOpen(true);
              }}
            >
              {isImporting ? (
                <WaitIndicator size="sm" className={styles.onplaceWait} />
              ) : (
                <Icon type="file-import" />
              )}
            </Button>
            <FileExporter getFile={exportTasks}>
              {(isExporting, exportCallback) => (
                <Button
                  type="no-container"
                  size="lg"
                  className={styles.action}
                  onClick={exportCallback}
                  disabled={isExporting}
                >
                  {isExporting ? (
                    <WaitIndicator size="sm" className={styles.onplaceWait} />
                  ) : (
                    <Icon type="file-export" />
                  )}
                </Button>
              )}
            </FileExporter>
          </AppBar.Actions>
        </AppBar>
      </MainLayout.Header>
      <MainLayout.Content className={styles.content}>
        <Container className={styles.container}>
          {filterType === "completed_tasks" && (
            <TaskChart
              className={styles.chart}
              statistics={statistics ?? { completed: [], planned: [] }}
              type={statisticsType}
              setType={setStatisticsType}
            />
          )}
          <TaskList
            className={styles.list}
            items={tasks ?? []}
            onItemClick={handleRowClick}
            onEditItemClick={handleEditItemClick}
            onDeleteItemClick={handleDeleteItemClick}
          />
        </Container>
        <TaskEditModal
          open={editModalOpen}
          setOpen={setEditModalOpen}
          task={taskToEdit}
          onSave={handleSaveClicked}
        />
        <TaskDeleteConformationModal
          task={taskToEdit}
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onConfirm={handleDeleteConfirmed}
        />
        <ImportTasksModal
          open={importModalOpen}
          setOpen={setImportModalOpen}
          onFileSelected={(file) => {
            setTaskToEdit(null);
            importTasks(file);
          }}
        />
      </MainLayout.Content>
    </>
  );
};

const ToDoListPage: React.FC = () => (
  <QueryClientProvider client={client}>
    <MainLayout>
      <ToDoListPageContent />
    </MainLayout>
  </QueryClientProvider>
);

export default ToDoListPage;
