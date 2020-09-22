import React from "react";
import { configure, shallow } from "enzyme";
import { CpuHeavyLoadList } from "./CpuHeavyLoadList";
import Adapter from "enzyme-adapter-react-16";
import { TableCell, TableRow } from "@material-ui/core";

configure({ adapter: new Adapter() });

describe("<CpuHeavyLoadList /> with props", () => {
  let data = [
    {
      startedAt: 1600778602735,
      endedAt: 1600778603285,
    },
    {
      startedAt: 1600778605223,
      endedAt: null,
    },
  ];

  it("renders one recovered lines", () => {
    const wrapper = shallow(<CpuHeavyLoadList heavyLoadHistory={data} />);
    expect(
      wrapper
        .find(TableCell)
        .filterWhere(x => x.text().includes("Recovered from heavy average load")).length
    ).toEqual(1);
  });

  it("renders two heavy load line", () => {
    const wrapper = shallow(<CpuHeavyLoadList heavyLoadHistory={data} />);
    expect(
      wrapper.find(TableCell).filterWhere(x => x.text().includes("Under heavy average load")).length
    ).toEqual(2);
  });
});
