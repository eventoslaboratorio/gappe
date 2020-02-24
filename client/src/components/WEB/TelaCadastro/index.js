import React, { Component } from 'react';
import API from "../../../config/API";

import {
    CircularProgress,
    Grid
} from '@material-ui/core';
import ListaEventos from '../ListaEventos';

export default class TelaCadastro extends Component {

    constructor(props) {
        super(props);
        this.state = { carregando: true }
    }

    componentDidMount() {
        this.carregar();
    }

    carregar = async () => {
        const retorno = await API.get("/events/");
        console.log(retorno.data);
        this.setState({ eventos: retorno.data, carregando: false });
    }

    delete = async (evento) => {
        if (window.confirm("Remover evento ?")) {
            await API.delete(evento.uri);
            this.carregar();
        }
    }

    render() {
        if (this.state.carregando)
            return (
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        marginTop: "50%",
                        marginBottom: "80%"
                    }}
                >
                    <CircularProgress disableShrink />
                </Grid>
            )

        return (
            <ListaEventos
                eventos={this.state.eventos}
                onDelete={this.delete}
                onChange={this.carregar}
            />
        )
    }
}