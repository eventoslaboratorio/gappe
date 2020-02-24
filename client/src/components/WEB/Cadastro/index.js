import React, { Component } from 'react';
import API from "../../../config/API";

import VisualizadorEvento from '../../APP/VisualizadorEvento';
import {
    Button,
    Grid,
    CircularProgress
} from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';

import ListaEventos from '../ListaEventos';
import CadastroEvento from '../DadosEvento';

export default class TelaCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = { carregando: true, evento: CadastroEvento.eventoBase() }
    }

    async componentDidMount() {
        if (this.props.editar) {
            this.recarregar(this.props.editar);
        }
        else {
            this.setState({ carregando: false });
        }
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
        // console.log(retorno);
        this.recarregar(retorno.data.uri);
    }

    async recarregar(uri = null) {
        const retorno = await API.get(uri ? uri : this.state.evento.uri);
        this.setState({ evento: retorno.data, carregando: false });
    }

    delete = async (evento) => {
        if (window.confirm("Remover evento ?")) {
            await API.delete(evento.uri);
            this.recarregar();
        }
    }

    render() {
        console.log(this.state);
        if (this.state.carregando)
            return (
                // <Grid
                //     container
                //     direction="row"
                //     justify="center"
                //     alignItems="center"
                //     style={{
                //         marginTop: "25%",
                //         marginBottom: "80%"
                //     }}
                // >
                //     <CircularProgress disableShrink />
                // </Grid>
                <></>
            )

        return (
            <div>
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
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start"
                            style={{ margin: 10 }}
                        >
                            <CloseIcon color="error" style={{ margin: "5px" }} onClick={() => this.props.onClose && this.props.onClose()} />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-start"
                            style={{ marginRight: 10, marginBottom: 25 }}
                        >
                            <Button
                                onClick={() => this.salvar()}
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={
                                    !this.state.evento.name ||
                                    !this.state.evento.dateInit ||
                                    !this.state.evento.dateEnd ||
                                    !this.state.evento.adress
                                }
                                startIcon={<SaveIcon />}
                                style={{ marginRight: 10 }}
                            > Salvar</Button>

                            {this.state.evento.key &&
                                <Button
                                    onClick={() => this.setState({
                                        modo: this.state.modo === "subeventos" ? "edição" : "subeventos"
                                    })}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    style={{ marginRight: 10, marginBottom: 25 }}
                                >{this.state.modo === "subeventos" ? "Edição" : "Sub Eventos"}</Button>
                            }
                        </Grid>
                        <div style={{
                            flexGrow: "1",
                            overflow: "auto"
                        }}>
                            {
                                this.state.modo === "subeventos" ?
                                    <ListaEventos
                                        pai={this.state.evento}
                                        eventos={this.state.evento && this.state.evento.subevents}
                                        onChange={() => this.recarregar()}
                                        onDelete={this.delete}
                                        modo={true}
                                        subeventos={true}
                                    /> :
                                    <CadastroEvento chave={this.state.evento.key} value={this.state.evento} onChange={(evento) => this.setState({ evento })} />
                            }
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
        )
    }
}