import { React } from "react";
import { Chart } from "react-google-charts";
import { useSelector } from "react-redux";

export default function PieCharts() {
  const data = useSelector((state) => state.Products.PieCharts);
  return (
    <Chart
      width={"100%"}
      height={"100%"}
      chartType="PieChart"
      loader={<div className="text-center mt-5">Loading Chart</div>}
      data={data}
      options={{
        title: "",
        pieHole: 0.7,
      }}
      rootProps={{ "data-testid": "3" }}
    />
  );
}
