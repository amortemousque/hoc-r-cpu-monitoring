import styled from "styled-components";

const StyledApp = styled.div`
  display: flex;
`;

const StyledAppContent = styled.main`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)}px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    transition: ${({ theme }) =>
      theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      })};
    margin-right: -${({theme}) => theme.custom.drawerWidth}px;

    &.content-shift {
      transition: ${({ theme }) =>
        theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })};
      margin-right: 0;
    }
  }
`;

export { StyledApp, StyledAppContent };
