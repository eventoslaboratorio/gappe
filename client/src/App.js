import React from 'react';
import './App.css';
import 'typeface-roboto';
import axios from 'axios';
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider, responsiveFontSizes  } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Main from './Main';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from "moment";
import "moment/locale/pt-br";
moment.locale("pt-br"); 


let theme = createMuiTheme({
  fontFamily: [
    'Roboto'],

  palette: {
    primary:  {
      main: '#2f9e41',
    },
    secondary:  {
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
  constructor(){
    super();
    this.state={acao:"Informações", eventos:[]};
  }
  
 
  render() {
    console.log(this.state);
  return (
<MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">

    <ThemeProvider theme={theme}>
    <div
    style={{ height:"100vh", width:"100vw", overflow:"hidden" }}
  >
    <Main />
    </div>
  </ThemeProvider>
  </MuiPickersUtilsProvider>
  );
}

  // Versão com menu unico 
  renderOld() {
    console.log(this.state);
  return (
<MuiPickersUtilsProvider utils={MomentUtils} locale="pt-br">

    <ThemeProvider theme={theme}>
    <Grid
    wrap='nowrap'
    container
    direction="column"
    style={{ height:"100vh", width:"100vw" }}
  >
    <Grid item>
    <AppBar position="static" >
        <Toolbar>
          <IconButton edge="start" style={{color:"white"}} >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5"  style={{color:"white"}}>
            GAppE
          </Typography>
        </Toolbar>
      </AppBar>
    </Grid>
    <Main />
  </Grid>
  </ThemeProvider>
  </MuiPickersUtilsProvider>
  );
}

}