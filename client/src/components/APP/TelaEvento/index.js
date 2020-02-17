import React, { Component } from 'react';
import VisualizadorEvento from '../VisualizadorEvento';
import API from "../../../config/API";

export default class TelaEvento extends Component {

    constructor(props) {
        super(props);
        this.state = { carregando: true, evento: {} }
    }

    async componentDidMount() {
        const retorno = await API.get("/events/-LzZWUhuDbZs7RENOAGy", this.state.evento);
        console.log(retorno);
        this.setState({ evento: retorno.data, carregando: false });
    }

    async salvar() {
        const retorno = await API.post("/events/", this.state.evento);
        console.log(retorno);
        this.setState({ evento: retorno.data });
    }

    render() {
        console.log(this.state);
        if (this.state.carregando)
            return <div>Carregando ... </div>;
        return <VisualizadorEvento simulador evento={this.state.evento} />
    }
}