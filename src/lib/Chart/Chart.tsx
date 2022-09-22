import React, { useMemo } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import styles from "./Chart.module.scss";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

const SERIES_COLORS = [
  styles.blue,
  styles.red,
  styles.green,
  styles.indigo,
  styles.yellow,
  styles.teal,
  styles.purple,
  styles.orange,
  styles.cyan,
  styles.pink,
];

export type SeriesPoint = {
  argument: string | number;
  value: number;
};

export type Series = {
  label: string;
  points: SeriesPoint[];
};

type Props = {
  series: Series[];
};

const Chart: React.FC<Props> = ({ series }) => {
  const dataAdapeter = useMemo(() => {
    const labels: (string | number)[] = [];
    const lblSet = series.reduce((prev, current) => {
      current.points.forEach((p) => {
        prev.add(p.argument);
      });
      return prev;
    }, new Set<string | number>());
    lblSet.forEach((lbl) => labels.push(lbl));

    const datasets = series.map((set, index) => {
      return {
        label: set.label,
        backgroundColor: SERIES_COLORS[index % SERIES_COLORS.length],
        data: set.points,
        parsing: {
          xAxisKey: "argument",
          yAxisKey: "value",
        },
      };
    });
    return {
      labels,
      datasets,
    };
  }, [series]);

  return <ReactChart type="bar" data={dataAdapeter} />;
};

export default Chart;
