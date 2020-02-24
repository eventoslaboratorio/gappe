import React, { Component } from 'react';
import {
    Grid,
    TextField,
    Button,
    CircularProgress
} from '@material-ui/core/';

import API from '../../../config/API'
import storage from '../../../config/Storage';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = this.initialState()
    }

    initialState = () => {
        return {
            email: "",
            password: "",
            error: "",
            token: ""
        }
    }

    handleClick = async e => {
        e.preventDefault()

        this.setState({
            token: "",
            error: "",
        })

        const user = {
            email: this.state.email,
            password: this.state.password,
        }

        try {
            const response = await API.post('/user/login', user)
            this.setState(response.data)
            if (!this.state.error) {
                this.props.logado(this.state.token)
                storage.set('token', this.state.token)
                API.defaults.headers.common['token'] = this.state.token;
            }
        } catch (error) {
            console.log(error);
        }
    }

    validaToken = async token => {
        try {
            const response = await API.get('/user/token', {
                headers: { token }
            })
            this.setState(response.data)
            if (!this.state.error) {
                this.props.logado(this.state.token)
            }
        } catch (error) {
            console.log(error);
            storage.delete('token')
        }
        this.setState(this.initialState())
    }

    componentDidMount = () => {
        this.setState(this.initialState())
        const token = storage.get('token')
        if (token) {
            this.validaToken(token)
            this.setState({ token })
        }
    }

    render() {
        return (
            <>
                {this.state.token ?
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
                    :
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
                            type='submit'
                            variant='contained'
                            style={{ marginRight: 20 }}
                            disabled={
                                !this.state.email ||
                                !this.state.password
                            }
                            onClick={this.handleClick}
                        >Entrar</Button>
                    </Grid >
                }
            </>
        );
    }
}
