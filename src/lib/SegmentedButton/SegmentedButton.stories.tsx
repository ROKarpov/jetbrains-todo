import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import SegmentedButton from "./SegmentedButton";

export default {
  title: "Components/SegmentedButton",
  component: SegmentedButton,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    className: { table: { disable: true } },
    onChange: { action: "onChange" },
  },
  args: {
    name: "radio",
    segments: [
      { title: "Test 1", value: "test1" },
      { title: "Test 2", value: "test2" },
      { title: "Test 3", value: "test3" },
    ],
    size: "md",
  },
} as ComponentMeta<typeof SegmentedButton>;

const Template: ComponentStory<typeof SegmentedButton> = (args) => (
  <SegmentedButton {...args} />
);

const Default = Template.bind({});
export { Default as SegmentedButton };
