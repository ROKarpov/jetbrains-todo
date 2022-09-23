import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskChart from "./TaskChart";
import { makeData } from "../../pages/ToDoListPage/mockUtils";
import { collectStatistics } from "../../pages/ToDoListPage/utils";

export default {
  title: "Components/Task Chart",
  component: TaskChart,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    setType: { action: "setType called" },
  },
  args: {
    type: "last-week",
    statistics: collectStatistics(makeData(), "last-week"),
  },
} as ComponentMeta<typeof TaskChart>;

const Template: ComponentStory<typeof TaskChart> = (args) => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <TaskChart {...args} />
  </div>
);

const Default = Template.bind({});

export { Default as TaskChart };
