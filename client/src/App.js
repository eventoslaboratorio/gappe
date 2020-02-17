import React from 'react';
import './App.css';
import 'typeface-roboto';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  createMuiTheme,
  responsiveFontSizes,
  MuiThemeProvider
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/pt-br";


import Main from './pages/Main';
import Login from './components/WEB/Login';
import VisualizadorAPP from './components/APP/VisualizadorAPP';

moment.locale("pt-br");


let theme = createMuiTheme({
  fontFamily: [
    'Roboto'
  ],
  palette: {
    primary: {
      main: '#2f9e41',
    },
    secondary: {
      main: '#cd191e',
    },
  },
  status: {
    danger: 'red',
  },
});
theme = responsiveFontSizes(theme);
/*
const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: grey,
  },
  status: {
    danger: 'red',
  },
});*/


export default class App extends React.Component {
  constructor() {
    super();
    this.state = { acao: "Informações", eventos: [] };
    this.state.app=true;
    if(window.cordova) {
      this.state.app=true;

    }
  }


  render() {
    // console.log(this.state);
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">
        <MuiThemeProvider theme={theme}>
          <div
            style={{ height: "100vh", width: "100vw", overflow: "hidden" }}
          >
            {this.state.app?<VisualizadorAPP />:<Main />}
            {/* <Login /> */}
          </div>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }

  // Versão com menu unico 
  renderOld() {
    // console.log(this.state);
    return (
      <MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">
        <MuiThemeProvider theme={theme}>
          <Grid
            wrap='nowrap'
            container
            direction="column"
            style={{ height: "100vh", width: "100vw" }}
          >
            <Grid item>
              <AppBar position="static" >
                <Toolbar>
                  <IconButton edge="start" style={{ color: "white" }} >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h5" style={{ color: "white" }}>
                    GAppE
                  </Typography>
                </Toolbar>
              </AppBar>
            </Grid>
            <Main />
          </Grid>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    );
  }

}