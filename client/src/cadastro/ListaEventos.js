import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Cadastro from './Cadastro';
import { Paper } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default class ListaEventos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    console.log(this.props);
    return (
      <div style={{ width: "50%" }}>
        <List>
          {this.props.eventos &&
            this.props.eventos.map((subevento) =>
              <ListItem>
                <ListItemText
                  primary={subevento.name}
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.setState({ dialogoSubevento: true, editar: subevento.uri })} edge="end">
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton onClick={() => this.props.onDelete(subevento)} edge="end">
                    <DeleteIcon color="error" />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>

            )
          }
        </List>
        <Button variant="outlined" color="primary" onClick={() => this.setState({ dialogoSubevento: true, editar: null })}>
          Adicionar Evento
      </Button>
        {this.state.dialogoSubevento && <Dialog fullScreen open
          TransitionComponent={Transition}>
          <Cadastro
            subeventos
            editar={this.state.editar}
            pai={this.props.pai}
            onClose={() => {
              this.setState({ dialogoSubevento: false });
              this.props.onChange();
            }
            }
          />
        </Dialog>}
      </div>
    );
  }
} 