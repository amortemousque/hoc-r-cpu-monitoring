import { createSlice } from "@reduxjs/toolkit";
import { CpuLoad, CpuLoadHistoryItem } from "./model/CpuLoad";

export type CpuLoadState = {
  isLoading: boolean;
  data: CpuLoad[];
  heavyCpuLoadHistory: CpuLoadHistoryItem[];
};

export const slice = createSlice({
  name: "cpuLoads",
  initialState: {
    isLoading: false,
    data: [],
    heavyCpuLoadHistory: [],
  } as CpuLoadState,
  reducers: {
    fetchLoad: (state) => {
      state.isLoading = true;
    },
    fetchCpuLoadSucceeded: (state, action) => {
      state.isLoading = false;
      state.data = [
        ...state.data,
        { recordedAt: action.payload.recordedAt, value: action.payload.value },
      ];
    },
    addLoad: (state, action) => {
      state.data.push(action.payload);
    },
    addLoads: (state, action) => {
      state.data = action.payload;
    },
    fetchCpuLoadFailed: (state, action) => {},
    clearCpuLoad: (state) => {
      state.data = [];
    },
    calculateHeavyCpuLoad: (state) => {
      const cpuLoads = state.data;
      let status = false;
      let overloads: CpuLoad[] = [];
      let normalLoads: CpuLoad[] = [];

      for (const cpuLoad of cpuLoads) {
        if (cpuLoad.value > 1) {
          overloads.push(cpuLoad);
          normalLoads = [];

          if (
            overloads[overloads.length - 1].recordedAt -
              overloads[0].recordedAt >
            120000
          ) {
            status = true;
          }
        } else {
          normalLoads.push(cpuLoad);
          overloads = [];

          if (
            normalLoads[normalLoads.length - 1].recordedAt -
              normalLoads[0].recordedAt >
            120000
          ) {
            status = false;
          }
        }
      }

      const underHeavyCpuLoad =
        state.heavyCpuLoadHistory.length > 0 &&
        !state.heavyCpuLoadHistory[state.heavyCpuLoadHistory.length - 1].endedAt
          ? true
          : false;
      const lastCpuLoad = state.data[state.data.length - 1];

      if (!underHeavyCpuLoad && status) {
        state.heavyCpuLoadHistory.push({
          startedAt: lastCpuLoad.recordedAt
        });
      } else if (underHeavyCpuLoad && !status) {
        const heavyLoad =
          state.heavyCpuLoadHistory[state.heavyCpuLoadHistory.length - 1];
        heavyLoad.endedAt = lastCpuLoad.recordedAt;
      }
    },
  },
});

export const {
  fetchLoad,
  fetchCpuLoadSucceeded,
  fetchCpuLoadFailed,
  calculateHeavyCpuLoad,
  clearCpuLoad,
  addLoad,
  addLoads,
} = slice.actions;

export default slice.reducer;
