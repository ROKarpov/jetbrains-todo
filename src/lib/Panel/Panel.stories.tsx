import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Panel from "./Panel";

export default {
  title: "Components/Panel",
  component: Panel,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {},
} as ComponentMeta<typeof Panel>;

const Template: ComponentStory<typeof Panel> = (args) => (
  <Panel {...args}>
    <div style={{ width: "10rem", height: "10rem" }}></div>
  </Panel>
);

const Default = Template.bind({});
export { Default as Panel };
