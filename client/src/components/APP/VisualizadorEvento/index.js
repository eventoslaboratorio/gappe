import React, { Component } from 'react';
import {
    Grid,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    BottomNavigation,
    BottomNavigationAction,
    Fab
} from "@material-ui/core/";

import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StarIcon from '@material-ui/icons/Star';
import MapIcon from '@material-ui/icons/Map';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import CardEvento from '../CardEvento';

export default class VisualizadorEvento extends Component {
    constructor() {
        super();
        this.state = { acao: "Informações" }; //{ acao: "Programação" }; //
    }

    carregarEvento = (evento) => {
        this.props.onCarregarEvento(evento.uri,
            (eventoCompleto) => {
                this.setState({ eventoCompleto });
            });
    }
    render() {
        if (this.state.eventoCompleto)
            return (
                <VisualizadorEvento
                    {...this.props}
                    onVoltar={() => this.setState({ eventoCompleto: null })}
                    evento={this.state.eventoCompleto}
                />
            )
        else
            return (
                <Grid
                    wrap='nowrap'
                    container
                    direction="column"
                    style={{
                        height: "100%",
                        width: "100%"
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
                                    {this.props.evento.name}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Grid>

                    <Grid item xs style={{ overflow: "auto" }} >
                        {this.state.acao === "Informações" && <Informacao {...this.props} />}
                        {this.state.acao === "Mapa" &&
                            <img
                                src={this.props.evento.map}
                                alt={this.props.evento.map}
                                style={{
                                    marginTop: "10px",
                                    display: "block",
                                    height: "calc(100% - 10px)",
                                    width: "100%",
                                    objectFit: "contain"
                                }} />
                        }

                        {this.state.acao === "Programação" && this.props.evento.subevents &&
                            Object.values(this.props.evento.subevents).map((subevento) =>
                                <CardEvento
                                    onCarregarEvento={this.carregarEvento}
                                    modo={this.props.evento.subEventDisplay}
                                    evento={subevento} />
                            )
                        }
                    </Grid>
                    <Grid item >
                        <BottomNavigation value={this.state.acao} onChange={(_, acao) => this.setState({ acao })} >
                            <BottomNavigationAction label="Informações" value="Informações" icon={<HomeIcon />} />
                            {this.props.evento.subevents && <BottomNavigationAction label="Programação" value="Programação" icon={<AssignmentIcon />} />}
                            {this.props.evento.subevents && <BottomNavigationAction label="Favoritos" value="Favoritos" icon={<StarIcon />} />}
                            {this.props.evento.map && <BottomNavigationAction label="Mapa" value="Mapa" icon={<MapIcon />} />}
                        </BottomNavigation>
                    </Grid>
                </Grid>
            );
    }

}

class Informacao extends Component {
    render() {
        return (
            <Grid style={{ margin: "10px", height: "calc(100% - 10px)", marginBottom: "0px" }}>
                <div style={{
                    "display": "flex",
                    flex: "auto",
                    flexDirection: "column",
                    height: "100%"
                }}>
                    {(this.props.evento.dateInit || this.props.evento.time) && <div>

                        <Typography style={{ color: "gray" }} variant="h6" >
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                            >
                                <DateRangeIcon color="primary" style={{ margin: "5px" }} />
                                {this.props.evento.dateInit + (this.props.evento.dateEnd ? (" - " + this.props.evento.dateEnd) : "")}
                            </Grid></Typography></div>}
                    <div style={{ overflow: "auto", flexGrow: "1" }}>
                        {this.props.evento.informacaoLogo
                            && this.props.evento.logo
                            && <img
                                src={this.props.evento.logo}
                                alt={this.props.evento.logo}
                                style={{
                                    marginTop: "10px",
                                    display: "block",
                                    height: "calc(100% - 10px)",
                                    width: "100%",
                                    objectFit: "contain"
                                }} />
                        }
                        <div dangerouslySetInnerHTML={{ __html: this.props.evento.description }} />
                    </div>

                    {this.props.evento.adress && <div>
                        <Typography style={{ color: "gray" }} variant="h6" >
                            <Grid
                                container
                                wrap="nowrap"
                                direction="row"
                                alignItems="center"
                                justify="space-between"
                            >
                                <span style={{ width: "90%", textAlign: "center" }}>{this.props.evento.adress}</span>
                                {this.props.evento.location && <Fab
                                    onClick={() => window.open(this.props.evento.location, '_system')}
                                    style={{ margin: "5px" }} color="primary" >
                                    <LocationOnIcon />
                                </Fab>}
                            </Grid>
                        </Typography>
                    </div>}
                </div>
            </Grid>);
    }
}
