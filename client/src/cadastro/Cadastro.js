import React from 'react';

import CadastroEvento from './DadosEvento';
import VisualizadorEvento from '../evento/VisualizadorEvento';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import API from "../API";
import ListaEventos from './ListaEventos';
import CloseIcon from '@material-ui/icons/Close';

export default class TelaCadastro extends React.Component {

  constructor(props) {
    super(props);
    this.state = { carregando: true, evento: CadastroEvento.eventoBase() }
  }

  async componentDidMount() {
    if (this.props.editar) {
      this.recarregar(this.props.editar);
    }
    else
      this.setState({ carregando: false });
  }

  carregarEvento = async (uri, callBack) => {
    const retorno = await API.get(uri);
    callBack(retorno.data);
  }

  async salvar() {
    let uri = "/events/";
    if (this.props.pai) {
      console.log(this.props.pai);
      uri = "/" + this.props.pai.uri + "/subevents/";
    }
    const retorno = await API.post(uri, this.state.evento);
    console.log(retorno);
    this.recarregar(retorno.data.uri);
  }

  async recarregar(uri = null) {
    const retorno = await API.get(uri ? uri : this.state.evento.uri);
    this.setState({ evento: retorno.data, carregando: false });
  }

  render() {
    console.log(this.state);
    if (this.state.carregando)
      return <div>Carregando ... </div>;
    return <div>
      <div style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        width: "50vw",
        display: "flex",
        flexDirection: "column"
      }}>
        <div style={{
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          minHeight: "0"
        }}>
          <div>
            <CloseIcon color="error" style={{ margin: "5px" }} onClick={() => this.props.onClose && this.props.onClose()} />
            <Button
              onClick={() => this.salvar()}
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
            > Salvar</Button>

            {this.state.evento.key &&
              <Button
                onClick={() => this.setState(
                  {
                    modo: this.state.modo == "subeventos" ? "edição" : "subeventos"
                  })}
                variant="contained"
                color="primary"
                size="large"
              >{this.state.modo == "subeventos" ? "Edição" : "Sub Eventos"}</Button>
            }

          </div>
          <div style={{
            flexGrow: "1",
            overflow: "auto"

          }}>
            {
              this.state.modo == "subeventos" ?
                <ListaEventos
                  pai={this.state.evento}
                  eventos={this.state.evento && this.state.evento.subevents}
                  onChange={() => this.recarregar()}
                /> :
                <CadastroEvento value={this.state.evento} onChange={(evento) => this.setState({ evento })} />}
          </div>
        </div>
      </div>



      <div style={{
        border: "2px solid gray",
        borderTop: "0px",
        position: "fixed", height: "calc(100vh - 3px)", width: "calc(50vw - 4px)", top: "1px", right: "0px"
      }}>
        <VisualizadorEvento
          simulador
          evento={this.state.evento}
          onCarregarEvento={this.carregarEvento}
        />
      </div>
    </div>
  }
}