import React from 'react';

import {
  Dialog,
  Slide,
  IconButton,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Grid,
  Fab,
  ListItemText,
  ListItemSecondaryAction,
  ListItem
} from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import Cadastro from './Cadastro';

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
      <div >
        {this.props.modo ?
          <div style={{ width: "50%" }}>
            {this.props.eventos &&
              this.props.eventos.map((subevento) =>
                <div >
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
                </div>
              )}
          </div> :
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            style={{ marginTop: 20, overflow: "auto" }}
          >
            {this.props.eventos &&
              this.props.eventos.map(evento =>
                <Card key={evento.name} style={{ width: 300, height: 300, margin: 10 }}>
                  <CardMedia
                    component="img"
                    style={{ height: 150, width: 300 }}
                    image={evento.logo}
                  />
                  <CardContent>
                    <Typography component="h5">
                      {evento.name}
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <IconButton onClick={() => this.setState({ dialogoSubevento: true, editar: evento.uri })} edge="end">
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => this.props.onDelete(evento)} edge="end">
                      <DeleteIcon color="error" />
                    </IconButton>
                  </CardActions>
                </Card >
              )}
          </Grid>
        }
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <Box marginRight={10}>
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => this.setState({ dialogoSubevento: true, editar: null })}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Grid>
        {this.state.dialogoSubevento &&
          <Dialog
            fullScreen
            open
            TransitionComponent={Transition}>
            <Cadastro
              subeventos
              editar={this.state.editar}
              pai={this.props.pai}
              onClose={() => {
                this.setState({ dialogoSubevento: false });
                this.props.onChange();
              }}
            />
          </Dialog>
        }
      </div>
    );
  }
}


