import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ImportTasksModal from "./ImportTasksModal";

export default {
  title: "Components/Import Tasks Modal",
  component: ImportTasksModal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    setOpen: { action: "setOpen called" },
  },
} as ComponentMeta<typeof ImportTasksModal>;

const Template: ComponentStory<typeof ImportTasksModal> = (args) => (
  <ImportTasksModal {...args} />
);

const Default = Template.bind({});

export { Default as ImportTasksModal };
