import React, { FocusEventHandler, Ref } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TooltipProvider from "./TooltipProvider";
import Button from "../Button/Button";
import Icon from "../Icon/Icon";

export default {
  title: "Components/Tooltip Provider",
  component: TooltipProvider,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  argTypes: {},
  args: {
    tooltipContent: "Test tooltip",
    position: "top",
  },
} as ComponentMeta<typeof TooltipProvider>;

const Template: ComponentStory<typeof TooltipProvider> = (args) => (
  <TooltipProvider {...args}>
    {({ ref, ...triggerHandlers }) => (
      <Button
        ref={ref}
        containerType="no-container"
        size="lg"
        onClick={() => {}}
        {...triggerHandlers}
      >
        <Icon type="file-import" />
      </Button>
    )}
  </TooltipProvider>
);

const Default = Template.bind({});
export { Default as TooltipProvider };
