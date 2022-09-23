import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TaskDeleteConformationModal from "./TaskDeleteConformationModal";
import { createToDoItem } from "../../api/utils";

export default {
  title: "Components/Task Delete Conformation Modal",
  component: TaskDeleteConformationModal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    setOpen: { action: "setOpen called" },
    onConfirm: { action: "onConfirm called" },
  },
  args: {
    task: createToDoItem({ description: "Test Task" }),
  },
} as ComponentMeta<typeof TaskDeleteConformationModal>;

const Template: ComponentStory<typeof TaskDeleteConformationModal> = (args) => (
  <TaskDeleteConformationModal {...args} />
);

const Default = Template.bind({});

export { Default as TaskDeleteConformationModal };
