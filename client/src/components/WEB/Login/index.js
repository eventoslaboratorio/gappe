import React, { Component } from 'react';
import {
    Grid,
    TextField,
    Button,
} from '@material-ui/core/';

import API from '../../../config/API'

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState()
    }

    initialState = () => {
        return {
            email: "",
            password: "",
            error: ""
        }
    }

    handleClick = async () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        try {
            const response = await API.post('/user/login', user)
            this.setState(this.initialState())
            this.setState(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{
                    marginTop: "20%",
                    marginBottom: "80%"
                }}
            >
                {this.state.error ? <div style={{ color: "red" }}>{this.state.error}</div> : ""}
                <TextField
                    required
                    color='primary'
                    error={!this.state.email}
                    helperText="O email é obrigatório."
                    label="Email"
                    style={{ width: 450 }}
                    value={this.state.email}
                    onChange={(e) => this.setState({
                        email: e.target.value
                    })}
                />

                <TextField
                    required
                    color='primary'
                    error={!this.state.password}
                    helperText="A senha é obrigatória."
                    label="Password"
                    type="password"
                    style={{ width: 450, marginTop: 20 }}
                    value={this.state.password}
                    onChange={(e) => this.setState({
                        password: e.target.value
                    })}
                />
                <Button
                    title='Entrar'
                    color='primary'
                    variant='contained'
                    style={{ marginRight: 20 }}
                    disabled={
                        !this.state.email ||
                        !this.state.password
                    }
                    onClick={this.handleClick}
                >Entrar</Button>
            </Grid >
        );
    }
}
