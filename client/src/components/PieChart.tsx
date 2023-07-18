import { ChangeEvent, useState, useRef } from "react";
import { render } from "react-dom";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

export default function DataPieChart(values: any) {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  let scale = windowSize.current[0] <= 800 ? 0.5 : 1;
  const COLORS = [
    "#0088FE",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#f0dc82",
    "#bfff00",
    "#89cff0",
    "#bf4f51",
    "#00C49F",
  ];
  const [activeIndex, setActiveIndex] = useState();
  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 20;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.fuel}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 4 * scale}
          outerRadius={outerRadius + 15 * scale}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${payload.fuel}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    );
  };
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            paddingAngle={0.5}
            data={values.values}
            isAnimationActive={true}
            dataKey="perc"
            nameKey="fuel"
            fill="#8884d8"
            innerRadius={110 * scale}
            outerRadius={180 * scale}
            onMouseEnter={onPieEnter}
          >
            {values.values.map((entry: any, index: any) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}
