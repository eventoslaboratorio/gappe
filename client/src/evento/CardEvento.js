import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper, IconButton } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const TamanhoModo = {
    "name": "100px",
    "img1": "15vh",
    "img2": "20vh",
    "img3": "30vh",
    "prog": "25vh"
};
export default class CardEvento extends React.Component {
    render() {
        console.log(this.props);
        return (
            <Paper style={{ margin: "10px", marginBottom: "15px", height: TamanhoModo[this.props.modo] }} elevation={2}>
                {this.props.modo == "prog" &&
                    <ButtonBase
                        onClick={() => this.props.onCarregarEvento(this.props.evento)}
                        style={{ display: "block", padding: "5px", alignItems: "center", width: "100%", height: "100%", justifyContent: "center" }}>
                        <div style={{
                            display: "flex",
                            height: "100%",
                            justifyContent: "space-around",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h5">{
                                this.props.evento.name
                            }</Typography>
                            <span style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexFlow: "row nowrap",
                                flexDirection: "row"
                            }}>
                                <span style={{ fontWeight: "bold" }}>
                                    {this.props.evento.dateInit}{(this.props.evento.dateEnd ? (" - " + this.props.evento.dateEnd) : "")}
                                </span>
                                <label>{this.props.evento.adress}</label>
                                <IconButton size="medium" onClick={(event) => event.stopPropagation()} color="primary">
                                    <StarBorderIcon fontSize="large" />
                                </IconButton>

                            </span>
                        </div></ButtonBase>}



                {this.props.modo == "name" &&
                    <ButtonBase
                        onClick={() => this.props.onCarregarEvento(this.props.evento)}
                        style={{ display: "flex", padding: "5px", alignItems: "center", width: "100%", height: "100%", justifyContent: "center" }}>
                        <div>
                            <Typography variant="h4" color="primary">{
                                this.props.evento.name
                            }</Typography></div></ButtonBase>}

                {this.props.modo.startsWith("img") &&
                    <ButtonBase
                        onClick={() => this.props.onCarregarEvento(this.props.evento)}
                        style={{ display: "flex", padding: "5px", alignItems: "center", width: "100%", height: "100%", justifyContent: "center" }}>
                        <img src={this.props.evento.logo}
                            style={{
                                display: "block",
                                height: "100%",
                                width: "100%",
                                objectFit: "contain"
                            }} />
                    </ButtonBase>}
            </Paper>


        );
    }
}

/*

            <Card  variant="outlined" style={{margin:"10px", height:"25vh"}} >
                {this.props.evento.logo&&"logo aqui"}
                    {this.props.evento.logo&&<img
                        src={this.props.evento.logo}
                        width="100%"
                    />}
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {this.props.evento.name}
          </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                        <div dangerouslySetInnerHTML={{ __html: this.props.evento.description }} />
          </Typography>
                    </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                    <StarBorderIcon  />
        </Button>
                    <Button size="small" color="primary">
                        Learn More
        </Button>
                </CardActions>
            </Card>
*/