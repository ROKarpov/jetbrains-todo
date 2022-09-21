import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskEditForm from "./TaskEditForm";
import { createToDoItem } from "../../../api/utils";
import { mapTaskToEditTaskState } from "../editTaskReducer";

export default {
  title: "Components/Task Edit Modal/Form",
  component: TaskEditForm,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    dispatch: { action: "dispatched" },
  },
} as ComponentMeta<typeof TaskEditForm>;

const Template: ComponentStory<typeof TaskEditForm> = (args) => (
  <TaskEditForm {...args} />
);

export const EditTask = Template.bind({});
EditTask.args = {
  state: mapTaskToEditTaskState(createToDoItem({ description: "Task #1" })),
};

export const NewTask = Template.bind({});
NewTask.args = {
  state: mapTaskToEditTaskState(null),
};
