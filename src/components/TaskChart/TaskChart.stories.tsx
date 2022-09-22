import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Chart from "./TaskChart";
import TaskChart from "./TaskChart";
import { makeData } from "./mockUtils";

export default {
  title: "Components/Task Chart",
  component: Chart,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {},
  args: {
    items: makeData(),
    type: "last-week",
  },
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <TaskChart {...args} />
  </div>
);

const Default = Template.bind({});

export { Default as Chart };
