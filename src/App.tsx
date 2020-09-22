import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { ThemeProvider } from "styled-components";
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import {
  Toolbar,
  IconButton,
  Typography,
  useTheme,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

import { Provider } from "react-redux";
import store from "./store/store";
import Dashboard from "./features/Dashboard";
import Settings from "./features/Settings";
import {
  StyledApp,
  StyledAppContent
} from "./App.style";

import Hidden from "@material-ui/core/Hidden";
import { AppBar, AppBarTitle } from "./shared/components/AppBar";
import { DrawerButton, DrawerHeader, LaptopDrawer, MobileDrawer } from "./shared/components/Drawer";

export const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#6a50a7",
    },
    secondary: {
      main: "#e0c341",
    },
    error: {
      main: "#bf263c",
    },
    success: {
      main: "#7db1b1",
    },
  },
  typography: {
    fontFamily: '"Roboto Condensed"',
  },
  props: {
    MuiCard: {
      elevation: 0,
    },
    MuiButton: {
      disableElevation: true,
      variant: "contained",
    }
  },
  custom: {
    drawerWidth: 280
  }
} as any);

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

function App(props: Props) {
  const { window } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [laptopOpen, setLaptopOpen] = React.useState(true);

  useEffect(() => {
    if (!isMobile) setMobileOpen(false);
    else setLaptopOpen(true);
  }, [isMobile]);

  const handleDrawerToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setLaptopOpen(!laptopOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <MuiThemeProvider theme={customTheme}>
      <ThemeProvider theme={customTheme}>
        <Provider store={store}>
          <StyledApp>
            <CssBaseline />
            <AppBar position="fixed" className={laptopOpen ? "app-bar-shift" : ""}>
              <Container maxWidth="md">
                <Toolbar>
                  <AppBarTitle variant="h6" noWrap>
                    CPU LOAD MONITORING
                  </AppBarTitle>
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerToggle}
                  >
                    <SettingsIcon />
                  </IconButton>
                </Toolbar>
              </Container>
            </AppBar>
            <StyledAppContent className={laptopOpen ? "content-shift" : ""}>
              {
                <>
                  <DrawerHeader></DrawerHeader>
                  <Container maxWidth="md">
                    <Dashboard></Dashboard>
                  </Container>
                </>
              }
            </StyledAppContent>
            <nav>
              <Hidden mdUp implementation="css">
                <MobileDrawer
                  container={container}
                  variant="temporary"
                  open={mobileOpen && isMobile}
                  anchor="right"
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <DrawerHeader>
                    <DrawerButton onClick={handleDrawerToggle}>
                      {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </DrawerButton>
                    <Typography variant="h6">Settings</Typography>
                  </DrawerHeader>
                  <Settings></Settings>
                </MobileDrawer>
              </Hidden>
              <Hidden smDown implementation="css">
                <LaptopDrawer variant="persistent" anchor="right" open={laptopOpen}>
                  <DrawerHeader>
                    <DrawerButton onClick={handleDrawerToggle}>
                      {theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </DrawerButton>
                    <Typography variant="h6">Settings</Typography>
                  </DrawerHeader>
                  <Settings></Settings>
                </LaptopDrawer>
              </Hidden>
            </nav>
          </StyledApp>
        </Provider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

export default App;
