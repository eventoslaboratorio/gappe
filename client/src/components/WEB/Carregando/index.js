import React from 'react';
import {
    Grid,
    TextField,
    Button,
    CircularProgress
} from '@material-ui/core/';


export default function Carregando() {
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
                marginTop: "25%",
                marginBottom: "80%"
            }}
        >
            <CircularProgress disableShrink />
        </Grid>
    );
}
