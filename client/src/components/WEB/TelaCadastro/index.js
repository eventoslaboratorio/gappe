import React, { Component } from 'react';
import API from "../../../config/API";

import ListaEventos from '../ListaEventos';
import Carregando from '../Carregando';

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
                <Carregando />
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