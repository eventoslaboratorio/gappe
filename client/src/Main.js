import React from 'react';

import 'typeface-roboto';
import TelaCadastro from './cadastro/TelaCadastro';
// import AdicionarEvento from './evento/AdicionarEvento';
// import CadastroEventos from './cadastro/DadosEvento';
// import TelaEvento from './evento/TelaEvento';

export default class Main extends React.Component {
  constructor() {
    super();
    this.state = { tela: TelaCadastro, eventos: null };
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


