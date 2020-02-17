import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import 'tinymce/tinymce';

import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import '../../../config/pt_BR';

import { Editor } from '@tinymce/tinymce-react';
// import { DatePicker, TimePicker } from '@material-ui/pickers';
import { ImagePicker } from 'react-file-picker'
import {
    Button,
    Typography,
    FormControlLabel,
    Switch,
    Grid,
    InputLabel,
    MenuItem,
    FormControl,
    Select
} from '@material-ui/core';

export default class DadosEvento extends Component {

    static eventoBase() {
        return {
            name: "",
            description: "",
            adress: "",
            dateEnd: null,
            dateInit: null,
            logo: "",
            localization: "",
            published: false,
            map: "",
            date: "",
            local: "",
            speaker: "",
            subEventDisplay: "",
            time: ""
        };
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (campo) => {
        return (event) => {
            this.props.onChange({
                ...this.props.value,
                [campo]: event && event.target ? (
                    event.target.getContent ?
                        event.target.getContent() :
                        event.target.value) : event
            });
        }
    };

    value(campo) {
        return this.props.value[campo];
    }

    render() {
        return (
            <div style={{ margin: 15 }}>
                {/* publicar evento */}
                {this.props.chave ?
                    <FormControlLabel style={{ marginTop: 30 }}
                        control={
                            <Switch
                                checked={this.value("published")}
                                onChange={(event) => this.onChange("published")(event.target.checked)}
                                color="primary"
                            />
                        }
                        label="Publicar o evento"
                    /> : ""}
                <div style={{ marginTop: 15 }} >
                    <TextField
                        required
                        error={!this.value("name")}
                        helperText="O nome do evento é obrigatório."
                        label="Nome"
                        style={{ width: 450 }}
                        value={this.value("name")}
                        onChange={this.onChange("name")} />
                </div>
                <div style={{ marginTop: 30 }} >
                    <TextField
                        label="Orador"
                        style={{ width: 450 }}
                        value={this.value("speaker")}
                        onChange={this.onChange("speaker")} />
                </div>

                <div style={{ marginTop: 30 }} >
                    <label>Descrição:</label>
                    <div style={{ marginTop: 15 }} >
                        <Editor
                            value={this.value("description")}
                            // onChange={this.onChange("description")}
                            onEditorChange={this.onChange("description")}
                            init={{
                                statusbar: false,
                                language: "pt_BR",
                                height: 200,
                                menubar: false,
                                skin_url: `${process.env.PUBLIC_URL}/skinsMCE/ui/oxide`,
                                plugins: [
                                    'lists link image ',
                                    'table paste '
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat'
                            }}
                        />
                    </div>
                </div>

                <Grid
                    style={{ marginTop: 30 }}
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <TextField
                        required
                        label="Inicio"
                        style={{ marginRight: 30 }}
                        value={this.value("dateInit")}
                        onChange={this.onChange("dateInit")}
                        error={!this.value("dateInit")}
                        helperText="A data de início do evento é obrigatório."
                    />
                    <TextField
                        required
                        label="Termino"
                        style={{ marginRight: 30 }}
                        value={this.value("dateEnd")}
                        onChange={this.onChange("dateEnd")}
                        error={!this.value("dateEnd")}
                        helperText="A data de término do evento é obrigatório."
                    />
                    <TextField
                        label="Hora"
                        style={{ marginTop: 20 }}
                        value={this.value("time")}
                        onChange={this.onChange("time")}
                    />
                </Grid>
                <div style={{ marginBottom: 20 }}>
                    <FormControl style={{ minWidth: "200px", marginTop: 30 }}>
                        <InputLabel >Visualizar sub evento</InputLabel>
                        <Select
                            displayEmpty
                            value={this.value("subEventDisplay")}
                            onChange={this.onChange("subEventDisplay")}
                        >
                            <MenuItem value={"name"}>Somente o nome</MenuItem>
                            <MenuItem value={"prog"}>Programação</MenuItem>
                            <MenuItem value={"img1"}>Imagem pequena</MenuItem>
                            <MenuItem value={"img2"}>Imagem media</MenuItem>
                            <MenuItem value={"img3"}>Imagem grande</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <ImagePicker
                    extensions={['jpg', 'jpeg', 'png']}
                    maxSize="10"
                    dims={{ minWidth: 1, maxWidth: 1000, minHeight: 1, maxHeight: 1000 }}
                    onChange={(logo) => {
                        this.onChange("logo")(logo);
                        this.setState({ erroLogo: null });
                    }
                    }
                    onError={erroLogo => {
                        this.setState({ erroLogo });
                        this.onChange("logo")(null);
                    }}
                >
                    <div>
                        <div>{this.state.erroLogo && <Typography color="error">{this.state.erroLogo}</Typography>}</div>
                        <div style={{ marginTop: 10 }}>
                            {this.state.logo ? <img style={{ border: "1px solid gray", width: "400px" }} src={this.state.logo} alt={this.state.logo} /> :
                                <Button variant="contained" color="primary">
                                    Logo do evento
              </Button>
                            }
                        </div>
                    </div>
                </ImagePicker>
                <FormControlLabel style={{ marginTop: 30 }}
                    control={
                        <Switch
                            checked={this.value("informacaoLogo")}
                            onChange={(event) => this.onChange("informacaoLogo")(event.target.checked)}
                            color="primary"
                        />
                    }
                    label="Exibir logo nas informações"
                />
                <div style={{ marginTop: 30 }} >
                    <TextField
                        required
                        label="Endereço"
                        style={{ width: "400px" }}
                        value={this.value("adress")}
                        onChange={this.onChange("adress")}
                        error={!this.value("adress")}
                        helperText="O endereço do evento é obrigatório."
                    />
                </div>
                <div style={{ marginTop: 30 }} >
                    <TextField
                        required
                        label="Link da localização"
                        style={{ width: "400px" }}
                        value={this.value("location")}
                        onChange={this.onChange("location")}
                        error={!this.value("location")}
                        helperText="A localização do evento é obrigatório."
                    />
                </div>
                <div style={{ marginTop: 20, marginBottom: "50px" }}>
                    <ImagePicker
                        extensions={['jpg', 'jpeg', 'png']}
                        maxSize="10"
                        dims={{ minWidth: 1, maxWidth: 2000, minHeight: 1, maxHeight: 2000 }}
                        onChange={(map) => {
                            this.onChange("map")(map);
                            this.setState({ erroMap: null });
                        }
                        }
                        onError={erroMap => {
                            this.setState({ erroMap });
                            this.onChange("map")(null);
                        }}
                    >
                        <div >
                            <div>{this.state.erroMap && <Typography color="error">{this.state.erroMap}</Typography>}</div>
                            {this.props.map ? <img alt={this.props.map} style={{ border: "1px solid gray", width: "400px" }}
                                src={this.props.map} /> :
                                <Button variant="contained" color="primary">
                                    Mapa do evento
                </Button>}
                        </div>
                    </ImagePicker>
                </div>
            </div>
        );
    }
}
