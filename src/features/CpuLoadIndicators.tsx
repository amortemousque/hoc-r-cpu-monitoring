import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  Indicator,
  IndicatorFigure,
  IndicatorFooter,
  IndicatorTitle,
} from "../shared/components/Indicator";
import { connect, useSelector } from "react-redux";
import {
  getCurrentLoad,
  getCpuOverloadPercentage,
  underHeavyCpuLoad,
  getCpuLoadTrend,
} from "../store/selectors";
import Chart from "chart.js";
import { useTheme } from "@material-ui/core/styles";
import Status from "../shared/components/Status";
import GaugeChart from "react-gauge-chart";
import { CpuLoad, CpuLoadTrend, TrendDirection } from "../store/model/CpuLoad";
import { CpuLoadState } from "../store/cpuLoadSlice";

const StyledCpuLoadIndicator = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing(2)}px;
  margin: ${props => props.theme.spacing(2)}px 0;
`;

interface Props {
  currentLoad: CpuLoad | null;
  overload: number;
  isUnderHeavyCpuLoad: boolean;
  trend: CpuLoadTrend;
}

export const CpuLoadIndicator = ({ currentLoad, overload, isUnderHeavyCpuLoad, trend }: Props) => {
  const [doughnut, setDoughnut] = useState<Chart>();
  const chartRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const initializeChart = (chartRef: any) => {
      const myChartRef = chartRef.current.getContext("2d");
      var newChart = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: [theme.palette.error.main, theme.palette.success.main],
              borderWidth: 5,
              borderColor: ["#fff"],
            },
          ],
          labels: ["Overload", "Normal use"],
        },
        options: {
          legend: { display: false },
        },
      });
      setDoughnut(newChart);
      return newChart;
    };

    if (chartRef.current === null) return;

    const newChart = doughnut ?? initializeChart(chartRef);
    if (newChart.data.datasets?.length) {
      newChart.data.datasets[0].data = [overload, 100 - overload];
      newChart.update();
    }
  }, [doughnut, overload, theme.palette.error.main, theme.palette.success.main]);

  return (
    <StyledCpuLoadIndicator>
      <Indicator>
        <IndicatorTitle>System status</IndicatorTitle>
        <IndicatorFigure>
          <Status checked={!isUnderHeavyCpuLoad}></Status>
        </IndicatorFigure>
        <IndicatorFooter>
          <span style={{ color: theme.palette.text.secondary }}>Status: </span>
          {isUnderHeavyCpuLoad ? "under heavy average CPU load" : "under normal average CPU load"}
        </IndicatorFooter>
      </Indicator>
      <Indicator>
        <IndicatorTitle>Current average CPU load</IndicatorTitle>
        <IndicatorFigure>
          <GaugeChart
            id="gauge-chart3"
            colors={[
              theme.palette.success.main,
              theme.palette.error.light,
              theme.palette.error.main,
            ]}
            percent={currentLoad ? currentLoad.value / 2 : undefined}
            arcsLength={[0.5, 0.5, 0.2]}
            textColor={theme.palette.text.primary}
            hideText={true}
            needleColor={theme.palette.secondary.main}
            formatTextValue={(value: string) => ((parseInt(value) / 100) * 2).toString()}
          />
        </IndicatorFigure>
        {trend.direction === TrendDirection.Flat ? (
          <IndicatorFooter>
            <span style={{ color: theme.palette.text.secondary }}>Trend:</span> stable
          </IndicatorFooter>
        ) : (
          <IndicatorFooter>
            Trend: {trend.direction === TrendDirection.Up ? "increase " : "decrease "}
            {trend.percentage}%
          </IndicatorFooter>
        )}
      </Indicator>
      <Indicator>
        <IndicatorTitle>Overload percentage</IndicatorTitle>
        <IndicatorFigure>
          <canvas ref={chartRef}></canvas>
        </IndicatorFigure>
        <IndicatorFooter>
          <span style={{ color: theme.palette.text.secondary }}>Overload:</span> {overload}%
        </IndicatorFooter>
      </Indicator>
    </StyledCpuLoadIndicator>
  );
};

const mapStateToProps = (state: { cpuLoads: CpuLoadState }) => ({
  currentLoad: getCurrentLoad(state),
  overload: getCpuOverloadPercentage(state),
  isUnderHeavyCpuLoad: underHeavyCpuLoad(state),
  trend: getCpuLoadTrend(state),
});

export default connect(mapStateToProps)(CpuLoadIndicator);
