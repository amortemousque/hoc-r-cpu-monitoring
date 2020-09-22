import React from "react";
import styled from "styled-components";

const StyledStatus = styled.div`
  display: block;
  margin: 0 auto;
  width: 110px;
  padding-bottom: 5px;
  && {

    .app-status-svg.success {
      fill: ${(props) => props.theme.palette.success.main};
      stroke: ${(props) => props.theme.palette.success.main};
    }
    .app-status-svg.error {
      fill: ${(props) => props.theme.palette.error.main};
      stroke: ${(props) => props.theme.palette.error.main};
    }
    .app-status-svg {
      display: block;
      margin: 0 auto 0;
    }
    
    .app-status {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
    }
    
    .app-status-circle {
      -webkit-animation: dash 0.9s ease-in-out;
      animation: dash 0.9s ease-in-out;
    }
    
    .app-status-line {
      -webkit-animation: dash 0.9s 0.35s ease-in-out forwards;
      animation: dash 0.9s 0.35s ease-in-out forwards;
    
      stroke-dashoffset: 1000;
    }

    .app-status-.check {
      -webkit-animation: dash-check 0.9s 0.35s ease-in-out forwards;
      animation: dash-check 0.9s 0.35s ease-in-out forwards;
    
      stroke-dashoffset: -100;
    }
    
    @-webkit-keyframes dash {
      0% {
        stroke-dashoffset: 1000;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    @keyframes dash {
      0% {
        stroke-dashoffset: 1000;
      }
      100% {
        stroke-dashoffset: 0;
      }
    }
    
    @-webkit-keyframes dash-check {
      0% {
        stroke-dashoffset: -100;
      }
      100% {
        stroke-dashoffset: 900;
      }
    }
    
    @keyframes dash-check {
      0% {
        stroke-dashoffset: -100;
      }
      100% {
        stroke-dashoffset: 900;
      }
    }
  }
`;

const Status = ({ checked = false }) => {
  const success = (
    <svg
      className="app-status-svg success"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <circle
        className="app-status-path app-status-circle"
        fill="none"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <polyline
        className="app-status-path app-status-check"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        points="100.2,40.2 51.5,88.8 29.8,67.5 "
      />
    </svg>
  );

  const error = (
    <svg
      className="app-status-svg error"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 130.2 130.2"
    >
      <circle
        className="app-status-path app-status-circle"
        fill="none"
        strokeWidth="6"
        strokeMiterlimit="10"
        cx="65.1"
        cy="65.1"
        r="62.1"
      />
      <line
        className="app-status-path app-status-line"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="34.4"
        y1="37.9"
        x2="95.8"
        y2="92.3"
      />
      <line
        className="app-status-path app-status-line"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeMiterlimit="10"
        x1="95.8"
        y1="38"
        x2="34.4"
        y2="92.2"
      />
    </svg>
  );

  return <StyledStatus>{checked ? success : error}</StyledStatus>;
};

export default Status;
