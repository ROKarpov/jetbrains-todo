import React, { useCallback, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  TaskFilterType,
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
import { TaskInsert, TaskStatisticsType } from "./utils";
import styles from "./ToDoListPage.module.scss";
import Container from "../../lib/Container/Container";
import TaskDeleteConformationModal from "../../components/TaskDeleteConfirmationModal/TaskDeleteConformationModal";
import Button from "../../lib/Button/Button";
import Icon from "../../lib/Icon/Icon";
import FileExporter from "../../components/FileExporter/FileExporter";
import WaitIndicator from "../../lib/WaitIndicator/WaitIndicator";
import dayjs from "dayjs";
import { useMainLayoutContext } from "../../layouts/MainLayout/MainLayoutContext";
import { useParams, useNavigate } from "react-router-dom";
import TooltipProvider from "../../lib/TooltipProvider/TooltipProvider";

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

  const { filterType } = useParams<{ filterType: TaskFilterType }>();
  const navigate = useNavigate();

  const {
    tasks,
    statistics,
    statisticsType,
    isImporting,
    upsertTask,
    deleteTask,
    importTasks,
    exportTasks,
    setStatisticsType,
  } = useToDoListState(filterType ?? "all_tasks", setAlert);

  const [taskToEdit, setTaskToEdit] = useState<ToDoTask | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleSaveClicked = useCallback(
    (changes: ToDoTaskInsertProps | ToDoTaskUpdateProps) => {
      if (taskToEdit) {
        upsertTask({ id: taskToEdit.id, changes });
      } else if (taskToEdit === null) {
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
  const handleSelectedTabIdChanged = useCallback(
    (id: TaskStatisticsType) => {
      navigate(`/${id}`);
    },
    [navigate]
  );

  return (
    <>
      <MainLayout.Header>
        <AppBar
          tabs={TABS}
          selectedTabId={filterType}
          setSelectedTabId={handleSelectedTabIdChanged}
        >
          <AppBar.Actions>
            <Button
              containerType="no-container"
              size="lg"
              className={styles.action}
              onClick={() => {
                setTaskToEdit(null);
                setEditModalOpen(true);
              }}
            >
              <Icon type="plus" />
            </Button>
            <TooltipProvider tooltipContent="Import List" position="bottom">
              {({ ref, ...triggers }) => (
                <Button
                  ref={ref}
                  containerType="no-container"
                  size="lg"
                  className={styles.action}
                  onClick={() => {
                    setImportModalOpen(true);
                  }}
                  {...triggers}
                >
                  {isImporting ? (
                    <WaitIndicator size="sm" className={styles.onplaceWait} />
                  ) : (
                    <Icon type="file-import" />
                  )}
                </Button>
              )}
            </TooltipProvider>
            <TooltipProvider tooltipContent="Export List" position="bottom">
              {({ ref, ...triggers }) => (
                <FileExporter getFile={exportTasks}>
                  {(isExporting, exportCallback) => (
                    <Button
                      ref={ref}
                      containerType="no-container"
                      size="lg"
                      className={styles.action}
                      onClick={exportCallback}
                      disabled={isExporting}
                      {...triggers}
                    >
                      {isExporting ? (
                        <WaitIndicator
                          size="sm"
                          className={styles.onplaceWait}
                        />
                      ) : (
                        <Icon type="file-export" />
                      )}
                    </Button>
                  )}
                </FileExporter>
              )}
            </TooltipProvider>
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
