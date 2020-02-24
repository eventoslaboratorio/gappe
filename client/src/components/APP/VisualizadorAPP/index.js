import React, { Component } from 'react';
import API from "../../../config/API";
import {
    Typography,
    IconButton,
    Toolbar,
    Grid,
    CircularProgress,
    AppBar,
    BottomNavigation,
    Button,
    Fab,
    Box
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import CardEvento from '../CardEvento';
import VisualizadorEvento from '../VisualizadorEvento';
import storage from '../../../config/Storage';

export default class VisualizadorAPP extends Component {

    constructor(props) {
        super(props);

        this.state = { carregando: false }
    }

    async componentDidMount() {

        this.carregarEventosPessoais();
    }

    carregarEventosPessoais = async () => {
        const listaEventos = storage.get("eventos");
        if (listaEventos) {
            this.setState({ eventosDisponiveis: null, eventosPessoais: null, carregando: true });
            const query = listaEventos.map(evento => "events[]=" + evento).join("&");
            const retorno = await API.get("/events/?" + query);
            console.log(retorno.data);
            this.setState({ eventosPessoais: retorno.data, carregando: false });
        }
    }

    adicionarEvento = async (evento) => {
        let listaEventos = storage.get("eventos");
        if (!listaEventos)
            listaEventos = [];
        if (!listaEventos.includes(evento.key))
            listaEventos.push(evento.key);

        storage.set("eventos", listaEventos);
        this.carregarEventosPessoais();
    }


    carregarEvento = async (uri, callBack) => {
        const retorno = await API.get(uri);
        callBack(retorno.data);
    }

    selecionarEvento = async (evento) => {
        const retorno = await API.get(evento.uri);
        this.setState({ evento: retorno.data });
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

    listarEventosDisponiveis = async (evento) => {
        this.setState({
            carregando: true,
            eventosDisponiveis: null
        });
        const retorno = await API.get("/events?active=true");
        let eventosDisponiveis = retorno.data;
        let listaEventos = storage.get("eventos");
        if (listaEventos)
            eventosDisponiveis = eventosDisponiveis.filter(evento => !listaEventos.includes(evento.key));
        this.setState({ eventosDisponiveis, carregando: false });
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
                        marginTop: "40%",
                    }}
                >
                    <CircularProgress disableShrink />
                </Grid>
            )
        else if (this.state.evento)
            return <VisualizadorEvento
                onVoltar={() => this.setState({ evento: null })}
                evento={this.state.evento}
                onCarregarEvento={this.carregarEvento}
            />
        else return (
            <Grid
                wrap='nowrap'
                container
                direction="column"
                style={{
                    height: "100vh",
                    width: "100vw"
                }}
            >
                <Grid item>
                    <AppBar position="static" >
                        <Toolbar>
                            {this.props.onVoltar &&
                                <IconButton
                                    onClick={() => this.props.onVoltar()}
                                    edge="start"
                                    style={{ color: "white" }} >
                                    <ArrowBackIcon />
                                </IconButton>}
                            <Typography variant="h5" style={{ color: "white" }}>
                                GappE
                                </Typography>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs style={{ overflow: "auto" }} >
                    {this.state.eventosDisponiveis ? this.state.eventosDisponiveis.map(evento =>
                        <CardEvento
                            onCarregarEvento={this.adicionarEvento}
                            modo={"prog"}
                            evento={evento} />) :

                        [<Grid
                            container
                            direction="row"
                            justify="flex-end"
                            alignItems="flex-end"
                            style={{
                                marginTop: "5%",
                                marginBottom: "5%",
                            }}
                        >
                            <Box marginRight={"5%"}>
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    onClick={this.listarEventosDisponiveis}
                                >
                                    <AddIcon />
                                </Fab>
                            </Box>
                        </Grid>
                            ,
                        this.state.eventosPessoais && this.state.eventosPessoais.map(evento =>
                            <CardEvento
                                onCarregarEvento={this.selecionarEvento}
                                modo={"img3"}
                                evento={evento} />)]}

                </Grid>
            </Grid>
        );

    }
}

{/* <Button onClick={this.listarEventosDisponiveis}>Adicionar Evento</Button> */ }