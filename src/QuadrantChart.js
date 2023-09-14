import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import csvData from './data.csv';

const QuadrantChart = () => {
  const quadrantChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = quadrantChartRef.current.getContext("2d");

    const fetchDataAndRenderChart = async () => {
      try {
        const response = await fetch(csvData);
        const data = await response.text();
        const dataArr = data.trim().split('\n').map(row => row.replace('\r', '').split(',')).slice(1);

        const store_name = dataArr.map(row => row[7]);
        const Cycle_Achievement = dataArr.map(row => parseFloat(row[27].split('%')[0]));
        const four_Cycle_Achievement = dataArr.map(row => parseFloat(row[24].split('%')[0]));

        const data_x_y = Cycle_Achievement.map((value, index) => ({
          x: value,
          y: four_Cycle_Achievement[index]
        }));

        // ... rest of the chart configuration and rendering logic

        chartInstanceRef.current = new Chart(ctx, {
          // ... chart configuration
        });
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchDataAndRenderChart();

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="h-[500px] pt-10 flex justify-center items-center">
      <canvas ref={quadrantChartRef}></canvas>
    </div>
  );
};

export default QuadrantChart;
