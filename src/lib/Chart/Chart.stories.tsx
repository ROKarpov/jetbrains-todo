import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Chart from "./Chart";

export default {
  title: "Components/Chart",
  component: Chart,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
  argTypes: {
    className: { table: { disable: true } },
  },
  args: {
    series: [
      {
        label: "Test 1",
        points: [
          { argument: "1", value: 1 },
          { argument: "2", value: 3 },
        ],
      },
      {
        label: "Test 2",
        points: [
          { argument: "1", value: 2 },
          { argument: "2", value: 4 },
        ],
      },
      {
        label: "Test 3",
        points: [
          { argument: "1", value: 1 },
          { argument: "2", value: 3 },
        ],
      },
      {
        label: "Test 4",
        points: [
          { argument: "1", value: 2 },
          { argument: "2", value: 4 },
        ],
      },
      {
        label: "Test 5",
        points: [
          { argument: "1", value: 1 },
          { argument: "2", value: 3 },
        ],
      },
      {
        label: "Test 6",
        points: [
          { argument: "1", value: 2 },
          { argument: "2", value: 4 },
        ],
      },
      {
        label: "Test 7",
        points: [
          { argument: "1", value: 1 },
          { argument: "2", value: 3 },
        ],
      },
      {
        label: "Test 8",
        points: [
          { argument: "1", value: 2 },
          { argument: "2", value: 4 },
        ],
      },
      {
        label: "Test 9",
        points: [
          { argument: "1", value: 1 },
          { argument: "2", value: 3 },
        ],
      },
      {
        label: "Test 10",
        points: [
          { argument: "1", value: 2 },
          { argument: "2", value: 4 },
        ],
      },
    ],
  },
} as ComponentMeta<typeof Chart>;

const Template: ComponentStory<typeof Chart> = (args) => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <Chart {...args} />
  </div>
);

const Default = Template.bind({});

export { Default as Chart };
