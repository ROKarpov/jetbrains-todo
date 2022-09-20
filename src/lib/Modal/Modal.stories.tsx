import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Modal from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    setOpen: { action: "Modal closed" },
  },
  args: {
    open: true,
    title: "Test title",
    children: "Test body",
    footerActions: [
      {
        label: "Close",
        buttonType: "no-container",
        onClick: action("Close clicked"),
      },
      {
        label: "Save",
        buttonType: "filled",
        onClick: action("Save clicked"),
      },
    ],
    headerActions: [
      {
        iconType: "file-export",
        onClick: action("Save clicked"),
      },
    ],
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const Default = Template.bind({});

export { Default as Modal };
