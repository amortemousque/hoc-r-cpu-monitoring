import { Drawer, IconButton } from "@material-ui/core";
import styled from "styled-components";

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(0, 1)}px;
  min-height: 56px;
  justify-content: flex-start;
  @media (min-width: 0px) and (orientation: landscape) {
    min-height: 48px;
  }
  @media (min-width: 600px) {
    min-height: 64px;
  }
`;

const DrawerButton = styled(IconButton)`
  margin-right: ${({ theme }) => theme.spacing(2)};
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: "none";
  }
`;

const LaptopDrawer = styled(Drawer)`
  ${({ theme }) => theme.breakpoints.up("md")} {
    width: ${({theme}) => theme.custom.drawerWidth}px;
    flex-shrink: 0;
    && {
      .MuiPaper-root {
        width: ${({theme}) => theme.custom.drawerWidth}px;
      }
    }
  }
`;

const MobileDrawer = styled(Drawer)`
  width: ${({theme}) => theme.custom.drawerWidth}px;
  flex-shrink: 0;
  && {
    .MuiPaper-root {
      width: ${({theme}) => theme.custom.drawerWidth}px;
    }
  }
  ${({ theme }) => theme.breakpoints.up("md")} {
    display: none;
  }
`;


export {
    DrawerHeader,
    DrawerButton,
    LaptopDrawer,
    MobileDrawer
  };
  