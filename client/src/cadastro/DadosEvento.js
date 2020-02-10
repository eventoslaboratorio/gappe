import React from 'react';

import TextField from '@material-ui/core/TextField';
import 'tinymce/tinymce';

import 'tinymce/themes/silver';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/table';
import './pt_BR';

import { Editor } from '@tinymce/tinymce-react';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import { ImagePicker } from 'react-file-picker'
import { Button, Typography, FormControlLabel, Switch } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default class DadosEvento extends React.Component {

  static eventoBase() {
    return {
      name: "",
      description: "",
      adress: "",
      dateEnd: null,
      dateInit: null,
      logo: "",
      localization: "",
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
      <div>
        <TextField required label="Nome" style={{ width: "400px" }} value={this.value("name")} onChange={this.onChange("name")} />
        <br />
        <br />
        <TextField label="Orador" style={{ width: "400px" }} value={this.value("speaker")} onChange={this.onChange("speaker")} />
        <br />
        <br />
        <label>Descrição:</label> <br /><br />
        <Editor
          value={this.value("description")}
          onChange={this.onChange("description")}
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
        <br />
        <TextField required label="Inicio" value={this.value("dateInit")} onChange={this.onChange("dateInit")} />
        <br /><br />
        <TextField required label="Termino" value={this.value("dateEnd")} onChange={this.onChange("dateEnd")} />
        <br /><br />

        <TextField
          label="Hora"
          value={this.value("time")}
          onChange={this.onChange("time")}
        />
        <br /><br />

        <FormControl style={{ minWidth: "200px" }}>
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


        <br /><br />
        <ImagePicker
          extensions={['jpg', 'jpeg', 'png']}
          maxSize="10"
          dims={{ minWidth: 1, maxWidth: 2000, minHeight: 1, maxHeight: 2000 }}
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
            {this.state.erroLogo && <Typography color="error">{this.state.erroLogo}<br /><br /></Typography>}
            {this.state.logo ? <img style={{ border: "1px solid gray", width: "400px" }} src={this.state.logo} /> :
              <Button variant="contained" color="primary">
                Logo do evento
    </Button>}
          </div>
        </ImagePicker>

        <br />
        <FormControlLabel
          control={
            <Switch
              checked={this.value("informacaoLogo")}
              onChange={(event) => this.onChange("informacaoLogo")(event.target.checked)}
              color="primary"
            />
          }
          label="Exibir logo nas informações"
        />
        <br />
        <TextField required label="Endereço" style={{ width: "400px" }} value={this.value("adress")} onChange={this.onChange("adress")} />
        <br /><br />
        <TextField required label="Link da localização" style={{ width: "400px" }} value={this.value("location")} onChange={this.onChange("location")} />
        <br /><br />
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
          <div>
            {this.state.erroMap && <Typography color="error">{this.state.erroMap}<br /><br /></Typography>}
            {this.props.map ? <img style={{ border: "1px solid gray", width: "400px" }}
              src={this.props.map} /> :
              <Button variant="contained" color="primary">
                Mapa do evento
                </Button>}
          </div>
        </ImagePicker>


      </div>
    );
  }
}
