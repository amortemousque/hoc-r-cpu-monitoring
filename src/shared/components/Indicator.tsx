import styled from "styled-components";

export const Indicator = styled.article`
  display: flex;
  flex-direction: column;
  min-width: 200px;
  flex: 1;
  background: #fff;
  border: 1px solid ${(props) => props.theme.palette.grey[300]};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  padding: ${(props) => props.theme.spacing(2)}px;
`;

export const IndicatorFooter = styled.footer`
  display: block;
  margin: auto -${(props) => props.theme.spacing(2)}px -${(props) => props.theme.spacing(2)}px;
  padding: ${(props) => props.theme.spacing(2)}px;
  border-width: 1px !important;
  border-top: ${(props) => props.theme.palette.divider};
  border-top-style: solid;
`;

export const IndicatorValue = styled.div`
  margin-right: 10px;
  font-size: ${(props) => props.theme.typography.h3};
`;

export const IndicatorFigure = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  align-self: center;
  max-width: 250px;
  padding: ${(props) => props.theme.spacing(1)}px;
`;

export const IndicatorTitle = styled.h2`
  margin-block-start: 0;
  margin-block-end: 0;
  color: ${(props) => props.theme.palette.text.secondary};
  ${(props) => props.theme.typography.subtitle1}
`;
