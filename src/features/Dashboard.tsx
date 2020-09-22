import React, { useEffect } from "react";
import CpuLoadIndicator from "./CpuLoadIndicators";
import { useDispatch } from "react-redux";
import CpuLoadTimeline from "./CpuLoadTimeline";
import CpuHeavyLoadList from "./CpuHeavyLoadList";
import { fetchLoad } from "../store/cpuLoadSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLoad());

    const timer = setInterval(() => {
      dispatch(fetchLoad());
    }, 10000);
    return () => clearTimeout(timer);
  }, [dispatch]);
  return (
    <div>
      <CpuLoadIndicator />
      <CpuLoadTimeline />
      <CpuHeavyLoadList />
    </div>
  );
};

export default Dashboard;
