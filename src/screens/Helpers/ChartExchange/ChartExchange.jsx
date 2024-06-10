// import "./styles.css";
import React from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
} from "recharts";

const data2 = [
  { date: "2021-07-05", name: "test", value: 1, oil: 2 },
  {
    date: "2021-08-05",
    name: "test",
    value: 2,
    oil: 2,
  },
  {
    date: "2021-09-05",
    name: "test",
    value: 3,
    oil: 2,
  },
  {
    date: "2021-10-05",
    name: "test",
    value: 4,
    oil: 2,
  },
  {
    date: "2021-11-05",
    name: "test",
    value: 5,
    oil: 2,
  },
  {
    date: "2021-12-05",
    name: "test",
    value: 6,
    oil: 2,
  },
  {
    date: "2021-07-05",
    name: "valueOilGas",
    value: 1,
    oil: 2,
    gas: 3,
  },
  {
    date: "2021-08-05",
    name: "valueOilGas",
    value: 2,
    oil: 2,
    gas: 3,
  },
  {
    date: "2021-09-05",
    name: "valueOilGas",
    value: 3,
    oil: 2,
    gas: 3,
  },
  {
    date: "2021-10-05",
    name: "valueOilGas",
    value: 4,
    oil: 2,
    gas: 3,
  },
  {
    date: "2021-11-05",
    name: "valueOilGas",
    value: 5,
    oil: 2,
    gas: 3,
  },
  {
    date: "2021-12-05",
    name: "valueOilGas",
    value: 6,
    oil: 2,
    gas: 3,
  },
];

const getRandomColor = () => {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
};

const lines = () => {
  const entries = data2.map((option) => {
    const keys = Object.keys(option);
    return keys;
  });
  const flattened = entries.reduce((prev, current) => {
    prev = prev.concat(current);
    return prev;
  }, []);
  const filtered = flattened.filter((key) => key !== "date");
  const uniqueKeys = [...new Set(filtered)];
  return uniqueKeys.map((key) => {
    return <Line type="monotone" stroke={getRandomColor()} dataKey={key} />;
  });
};

export default function ChartExchange() {
  return (
    <LineChart
      width={500}
      height={400}
      data={data2}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      {lines()}
    </LineChart>
  );
}
