import { Typography, AppBar as MaterialAppBar } from "@material-ui/core";
import styled from "styled-components";

const AppBar = styled(MaterialAppBar)`
  ${({ theme }) => theme.breakpoints.up("md")} {
    transition: ${props =>
      props.theme.transitions.create(["margin", "width"], {
        easing: props.theme.transitions.easing.sharp,
        duration: props.theme.transitions.duration.leavingScreen,
      })};

    &.app-bar-shift {
      width: calc(100% - ${({theme}) => theme.custom.drawerWidth}px);
      transition: ${({ theme }) =>
        theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        })};
      margin-right: ${({theme}) => theme.custom.drawerWidth}px;
    }
  }
`;

const AppBarTitle = styled(Typography)`
  flex-grow: 1;
  font-family: "Raleway, Helvetica Neue, sans-serif";
`;

export { AppBar, AppBarTitle };
