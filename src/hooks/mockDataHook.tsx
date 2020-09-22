import { useState } from "react";
import { useSelector } from "react-redux";
import { CpuLoad } from "../store/model/CpuLoad";
import { getCpuLoads } from "../store/selectors";

class MockDataGenerator {
  threshold: number = 0;
  refreshInterval: number = 0;
  storedData: CpuLoad[] = [];

  init(threshold: number, refreshInterval: number, storedData: CpuLoad[] = []) {
    this.threshold = threshold;
    this.refreshInterval = refreshInterval;
    this.storedData = storedData;
  }

  _generate(type: "recovery" | "heavyCpu") {
    const duration = this.threshold + 30000;
    const now = Date.now();
    let startedAt = now - duration;
    const data: CpuLoad[] = [];

    while (startedAt <= now) {
      startedAt += this.refreshInterval;
      data.push({
        recordedAt: startedAt,
        value:
          Math.round(
            (Math.random() + (type === "heavyCpu" ? 1 : 0) + Number.EPSILON) *
              100
          ) / 100,
      });
    }
    return data;
  }

  _shiftStoredData(time: number): CpuLoad[] {
    return this.storedData.map((l) => ({
      ...l,
      recordedAt: l.recordedAt - time,
    }));
  }

  getRandomValue() {
    const now = Date.now();
    const data = this._shiftStoredData(this.refreshInterval);
    data.push({
      recordedAt: now,
      value: Math.round((Math.random() * 2 + Number.EPSILON) * 100) / 100,
    });
    return data;
  }

  getRecoveryData() {
    const data = this._generate("recovery");
    const shiftedData = this._shiftStoredData(
      this.threshold - this.refreshInterval
    );
    return shiftedData.concat(data);
  }

  getHeavyLoadData() {
    const data = this._generate("heavyCpu");
    const shiftedData = this._shiftStoredData(
      this.threshold - this.refreshInterval
    );
    return shiftedData.concat(data);
  }
}

export const mockDataGenerator = new MockDataGenerator();

function useMockData() {
  const [refreshInterval] = useState(10000);
  const [threshold] = useState(120000);
  const loads = useSelector(getCpuLoads);
  mockDataGenerator.init(threshold, refreshInterval, loads);

  return mockDataGenerator;
}

export default useMockData;
