import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { CpuLoadIndicator } from "./CpuLoadIndicators";
import { TrendDirection } from "../store/model/CpuLoad";
import { IndicatorFooter } from "../shared/components/Indicator";

configure({ adapter: new Adapter() });

describe("<CpuLoadIndicator /> with props", () => {
  const currentLoad = {
    recordedAt: 1600780634336,
    value: 0.27,
  };
  const overload = 20;
  const isUnderHeavyCpuLoad = true;
  const trend = { percentage: 40, direction: TrendDirection.Down };
  const wrapper = shallow(
    <CpuLoadIndicator
      currentLoad={currentLoad}
      overload={overload}
      isUnderHeavyCpuLoad={isUnderHeavyCpuLoad}
      trend={trend}
    />
  );
  
  test("renders current load status", () => {
    expect(wrapper.find("Status").prop("checked")).toBe(false);
  });

  test("renders overload", () => {
    expect(wrapper.find(IndicatorFooter).find("span").last().prop("style")).toStrictEqual({
      color: "rgba(0, 0, 0, 0.54)",
    });
  });

  test("renders decreased trend", () => {
    expect(
      wrapper
        .find(IndicatorFooter)
        .filterWhere(i => i.text().includes("Trend:"))
        .first()
        .text()
    ).toEqual("Trend: decrease 40%");
  });
});
