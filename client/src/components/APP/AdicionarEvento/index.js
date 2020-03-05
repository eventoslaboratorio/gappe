import React, { Component } from 'react';
import 'typeface-roboto';
import {
    Grid,
    Typography,
    Button,
    Paper
} from "@material-ui/core/";
import API from '../../../config/API';

export default class AdicionarEvento extends Component {
    constructor() {
        super();
        this.state = { modo: "semEventos", eventos: [] };
    }

    async pesquisar() {
        const ret = await API.get("/eventos/ativados");
        console.log(ret);
    }

    render() {
        if (this.state.modo === 'semEventos') {
            return <Grid item xs >

                <Typography variant="h3" align="center"><br /><br />Você não possui nenhum evento cadastrado<br /><br /> </Typography>,
            <Button
                    onClick={this.pesquisar.bind()}
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large">Pesquisar evento</Button>
                <br /><br />
                <Button fullWidth variant="contained" color="primary" size="large">Ler QRCode </Button>
            </Grid>
        }

        if (this.props.modo === 'qrcode')
            return [
                <Grid item xs style={{ overflow: "auto" }} >
                    {this.state.eventos.map(item => <Paper style={{ textAlign: "center" }}>
                        {item.id} - {item.name}<br />
                        <img src={item.logo} alt={item.logo} style={{ width: "90%" }} />
                    </Paper>)}
                </Grid>
            ];
        else
            return <Grid item xs style={{ overflow: "auto" }} >
                aaa
                </Grid>
    }
}