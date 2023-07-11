import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  CartesianGrid,
  YAxis,
  Brush,
  Tooltip,
} from "recharts";

const CustomizedAxisTick = (props: any) => {
  const { x, y, stroke, payload } = props;
  var str = String(payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#666"
        transform="rotate(0)"
      >
        {`${str.substring(0, 10)}, ${str.substring(11, 16)}`}
      </text>
    </g>
  );
};

export default function DataLineChart(values: any) {
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={200}
          height={200}
          data={values.values}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis />
          <XAxis dataKey="from" tick={CustomizedAxisTick} height={40} />
          <Line
            type="monotone"
            dataKey="intensity.forecast"
            stroke="#bf4f51"
            strokeWidth={3}
          />
          <Tooltip />
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
