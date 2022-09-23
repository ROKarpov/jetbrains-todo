import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskList from "./TaskList";
import { createToDoItem } from "../../api/utils";
import dayjs from "dayjs";

export default {
  title: "Components/Task List",
  component: TaskList,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    onItemClick: { action: "item clicked" },
    onEditItemClick: { action: "item info clicked" },
  },
  args: {
    items: Array.from({ length: 1000 }, (_, i) =>
      createToDoItem({
        description: `Task #${i + 1}`,
        completeDate: i % 2 === 0 ? dayjs().format() : null,
        completeDueToDate: i % 2 === 0 ? dayjs().format() : undefined,
      })
    ),
  },
} as ComponentMeta<typeof TaskList>;

const Template: ComponentStory<typeof TaskList> = (args) => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <TaskList {...args} />
  </div>
);

const Default = Template.bind({});

export { Default as TaskList };
