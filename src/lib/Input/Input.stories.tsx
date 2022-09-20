import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Input from "./Input";

export default {
  title: "Components/Input",
  component: Input,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {
    className: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    id: "test",
    label: "Test Label",
    helperText: "Test Helper Text",
    multiline: false,
    readonly: false,
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const Default = Template.bind({});
export { Default as Input };
