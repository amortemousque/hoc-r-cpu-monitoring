import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import {
  getHeavyCpuLoadHistory,
  getHeavyCpuLoadHistory as getHeavyLoadHistory,
} from "../store/selectors";
import LensIcon from "@material-ui/icons/Lens";
import styled from "styled-components";
import { CpuLoadState } from "../store/cpuLoadSlice";

const StyledList = styled.div`
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  margin-top: ${props => props.theme.spacing(2)}px;
  gap: ${props => props.theme.spacing(2)}px;

  .table {
    flex: 1 0 50%;
  }

  .indicators {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    gap: ${props => props.theme.spacing(2)}px;
  }
`;

const StyledIndicator = styled(Paper)`
  text-align: center;
  min-width: 200px;
  flex: 1;
  padding: ${props => props.theme.spacing(2)}px;
  h3 {
    margin-top: 0;
    font-weight: 400;
  }
`;

interface Props {
  heavyLoadHistory: any[];
}

export const CpuHeavyLoadList = (props: Props) => {
  const { heavyLoadHistory } = props;
  const heavyLoadCount = heavyLoadHistory.length;
  const recoveries = heavyLoadHistory.filter(l => l.endedAt).length;

  return (
    <StyledList>
      <div className="indicators">
        <StyledIndicator>
          <Typography variant="h2" color="error">
            {heavyLoadCount}
          </Typography>
          <h3>HEAVY CPU LOADS</h3>
        </StyledIndicator>
        <StyledIndicator>
          <Typography variant="h2">
            <Box color="success.main">{recoveries}</Box>
          </Typography>
          <h3>RECOVERIES</h3>
        </StyledIndicator>
      </div>
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Heavy CPU load history</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {heavyLoadHistory.map((heavyLoad: any, i) => (
              <React.Fragment key={i}>
                {heavyLoad.endedAt && (
                  <TableRow>
                    <TableCell component="th" scope="row">
                      <Box color="success.main">
                        <LensIcon></LensIcon>
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      Recovered from heavy average load
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {new Date(heavyLoad.endedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell component="th" scope="row">
                    <Box color="error.main">
                      <LensIcon></LensIcon>
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Under heavy average load
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {new Date(heavyLoad.startedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledList>
  );
};

const mapStateToProps = (state: { cpuLoads: CpuLoadState }) => ({
  heavyLoadHistory: getHeavyCpuLoadHistory(state),
});

export default connect(mapStateToProps)(CpuHeavyLoadList);
