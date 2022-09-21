import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskEditModal from "./TaskEditModal";
import { createToDoItem } from "../../api/utils";

export default {
  title: "Components/Task Edit Modal",
  component: TaskEditModal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    setOpen: { action: "setOpen called" },
    onSave: { action: "onSave called" },
  },
  args: {
    open: true,
  },
} as ComponentMeta<typeof TaskEditModal>;

const Template: ComponentStory<typeof TaskEditModal> = (args) => (
  <TaskEditModal {...args} />
);

export const EditTask = Template.bind({});
EditTask.args = {
  task: createToDoItem({
    description: `Task #1`,
    isCompleted: false,
    completeDueToDate: new Date(),
  }),
};

export const NewTask = Template.bind({});
NewTask.args = {
  task: null,
};
