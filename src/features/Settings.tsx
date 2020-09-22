import React from "react";
import { Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { clearCpuLoad, addLoads } from "../store/cpuLoadSlice";
import useMockData from "../hooks/mockDataHook";
import styled from "styled-components";

const StyledSettings = styled.div`
  padding: 0 ${props => props.theme.spacing(2)}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  && {
    h6 {
      margin-top: ${props => props.theme.spacing(2)}px;
      margin-bottom: ${props => props.theme.spacing(1)}px;
    }
    button {
      margin-bottom: ${props => props.theme.spacing(1)}px;
    }
  }
`


const Settings = () => {
  const dispatch = useDispatch();
  const mockData = useMockData();

  const clear = () => {
    dispatch(clearCpuLoad());
  };

  const insertData = (data: any) => {
    dispatch(clearCpuLoad());
    dispatch(addLoads(data));
  };

  const addRandomValue = () => {
    const data = mockData.getRandomValue();
    insertData(data);
  };

  const emulateHeavyCpuLoad = () => {
    const data = mockData.getHeavyLoadData();
    insertData(data);
  };

  const emulateRecovery = () => {
    const data = mockData.getRecoveryData();
    insertData(data);
  };

  return (
    <StyledSettings>
      <Button onClick={clear} color="secondary">
        Clear monitoring
      </Button>
      <Typography variant="subtitle1">Emulate processor</Typography>
      <Button onClick={addRandomValue} color="secondary">Add random value</Button>
      <Button onClick={emulateHeavyCpuLoad} color="secondary">Emulate heavy CPU load</Button>
      <Button onClick={emulateRecovery} color="secondary">Emulate recovery</Button>
    </StyledSettings>
  );
};

export default Settings;
