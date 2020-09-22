import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import { Box, Paper, Typography, useTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getCpuLoads } from "../store/selectors";
import { CpuLoad } from "../store/model/CpuLoad";
import styled from "styled-components";

const StyledCluLoadTimeline = styled(Paper)`
  padding: ${(props) => props.theme.spacing(2)}px;
  max-width: calc(100vw - 80px);

  @media (min-width:600px) {
    max-width: calc(100vw - 96px);
  }
  
`;

const CpuLoadTimeline = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [chart, setChart] = useState<Chart>();
  const cpuLoads = useSelector(getCpuLoads);
  const theme = useTheme();
  const labels = cpuLoads.map((l: CpuLoad) => {
    const date = new Date(l.recordedAt);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  });
  const data = cpuLoads.map((l: CpuLoad) => ({ x: l.recordedAt, y: l.value }));

  

  useEffect(() => {
    const initializeChart = (chartRef: any): Chart => {
      const myChartRef = chartRef.current.getContext("2d");
      const newChart = new Chart(myChartRef as CanvasRenderingContext2D, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Loads",
              data: [],
              borderColor: theme.palette.primary.light,
              pointBackgroundColor: theme.palette.primary.main,
              pointBorderColor: theme.palette.primary.main,
              hoverBackgroundColor: theme.palette.secondary.main,
              pointHoverBorderWidth: 4,
              fill: false
            },
          ],
        },
        options: {
          responsive: true, 
          scales: {
            yAxes: [
              {
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 1,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
          legend: { display: false },
        },
      });
      setChart(newChart);
      return newChart;
    };

    if (chartRef.current === null) return;

    const newChart = chart ?? initializeChart(chartRef);

    if (newChart.data.datasets?.length && newChart.data.datasets[0].data) {
      newChart.data.labels = labels;
      newChart.data.datasets[0].data = data;
    }

    newChart.update();
  }, [chartRef, cpuLoads, chart, labels, data, theme.palette.primary.light, theme.palette.primary.main, theme.palette.secondary.main]);

  return (
    <StyledCluLoadTimeline>
      <Box mb={4}>
        <Typography variant="subtitle1" color="textSecondary">
          Average CPU load over time
        </Typography>
        <Typography variant="body2">
          Average CPU load over the last ten minutes
        </Typography>
      </Box>
      <canvas id="myChart" ref={chartRef}></canvas>
    </StyledCluLoadTimeline>
  );
};

export default CpuLoadTimeline;
