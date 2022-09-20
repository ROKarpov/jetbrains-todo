import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import List from "./List";

export default {
  title: "Components/List",
  component: List,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {},
  args: {
    items: Array.from({ length: 1000 }, (_, i) => `Row #${i + 1}`),
    rowHeight: 49,
    row: (item) => (
      <div style={{ flex: "1 1 0", alignItems: "center", display: "flex" }}>
        <span>{item}</span>
      </div>
    ),
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <List {...args} />
  </div>
);

const Default = Template.bind({});

export { Default as List };
