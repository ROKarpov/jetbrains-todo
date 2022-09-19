import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import AppBar, { ActionDescription, TabDescription } from "./AppBar";

const TABS: TabDescription[] = [
  {
    id: "all_tasks",
    title: "All Tasks",
  },
  {
    id: "uncompleted_tasks",
    title: "Uncompleted Tasks",
  },
  {
    id: "completed_tasks",
    title: "Completed Tasks",
  },
];

const ACTIONS: ActionDescription[] = [
  {
    iconType: "file-import",
    action: () => {},
  },
  {
    iconType: "file-export",
    action: () => {},
  },
];

export default {
  title: "Components/App Bar",
  component: AppBar,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  args: {
    tabs: TABS,
    actions: ACTIONS,
    selectedTabId: TABS[1].id,
    setSelectedTabId: () => {},
  },
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = (args) => <AppBar {...args} />;

const Default = Template.bind({});
export { Default as AppBar };
