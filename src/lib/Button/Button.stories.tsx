import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Button from "./Button";
import Icon from "../Icon/Icon";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    type: { control: "select" },
    onClick: { action: "clicked" },
    children: { table: { disable: true } },
  },
  args: {
    type: "filled",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

const Default = Template.bind({});
Default.args = {
  children: "Content",
};

export const IconButton = Template.bind({});
IconButton.args = {
  children: <Icon type="info-circle" />,
};

export { Default as Button };
