import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FilePicker from "./FilePicker";

export default {
  title: "Components/File Picker",
  component: FilePicker,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    onFileSelected: { action: "onFileSelected" },
    className: { table: { disable: true } },
  },
} as ComponentMeta<typeof FilePicker>;

const Template: ComponentStory<typeof FilePicker> = (args) => (
  <FilePicker {...args} />
);

const Default = Template.bind({});

export { Default as FilePicker };
