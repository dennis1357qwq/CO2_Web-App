import { Tooltip } from "react-leaflet";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
  Brush,
} from "recharts";

export default function DataLineChart(values: any) {
  console.log(values);
  return (
    <>
      <ResponsiveContainer width={900} height={400}>
        <LineChart
          width={300}
          height={300}
          data={values.values}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis dataKey="to" />
          <Line
            type="monotone"
            dataKey="intensity.forecast"
            stroke="#89cff0"
            strokeWidth={3}
          />
          <Tooltip />
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
