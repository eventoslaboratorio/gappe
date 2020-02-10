import React from 'react';
import Paper from '@material-ui/core/Paper';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
import AdicionarEvento from './evento/AdicionarEvento';
import CadastroEventos from './cadastro/DadosEvento';
import TelaCadastro from './cadastro/TelaCadastro';
import TelaEvento from './evento/TelaEvento';
export default class Main extends React.Component {
  constructor(){
    super();
    this.state={tela:TelaCadastro, eventos:null};
    /*
    if(window.cordova)
      alert("cordova");
    else 
      alert("web");*/
  }

  render() {
      return <this.state.tela editar="/events/-LzZWUhuDbZs7RENOAGy" />;
  }
}


