import React, { Component } from "react";
import { Consumer } from "../../context";
import LocSelect from "../utiles/LocSelect";
import Atractivo from "./comatractivos/Atractivo";

class Atractivos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            localidadSelect: 0,
            atractivos: [],
            cantidad: 0
        }
        this.handleFClick = this.handleFClick.bind(this);
    }

    handleFClick(localidad) {
        if(localidad) {
            this.setState({
                localidadSelect: localidad
            }, () => {
                //Buscar los atractivos si es que tiene cargado alguno
                fetch(`${process.env.REACT_APP_API_HOST}/ciudad/${this.state.localidadSelect.id}/atractivos`, {
                    method: 'GET',
                    headers: {
                        "Authorization": "asdssffsdff",
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then((result) => {
                    if(!result.err) {
                        this.setState({
                            cantidad: result.data.count,
                            atractivos: result.data.registros
                        });
                    } else {
                        console.log(result.errMsg);
                    }
                }, (error) => { //???
                    console.log(error);
                });

            });
        } else {
            this.setState({
                localidadSelect: 0
            });
        }
    }

    render() {
        var atractivos = null;
        if(this.state.cantidad > 0) {
            atractivos = this.state.atractivos.map((atractivo) => {
                return(
                    <Atractivo key={`atractivo-${atractivo.id}`} idAtractivo={atractivo.id} />
                );
            });
        } else {
            atractivos = <div className="alert alert-primary" role="alert">No se encontraron atractivos cargados.</div>;
        }
        return (
            <Consumer>
                {value => {
                    //console.log(value);
                    return (
                        <React.Fragment>
                            <h4 className="bg-info text-white p-3 mb-3 rounded animated bounceInLeft delay-2s"><i className="fas fa-city"></i> Atractivos</h4>
                            <div className="row mb-5">
                                <div className="col-sm-12 col-md-4">
                                    <LocSelect handleFiltroClick={this.handleFClick} />
                                </div>
                                <div className="col-sm-12 col-md-8">
                                    <div className="d-flex flex-row justify-content-between align-items-center mb-4" style={{width: "100%"}}>
                                        {
                                            (this.state.localidadSelect !== 0)
                                            ?
                                            <React.Fragment>
                                                <div>{this.state.localidadSelect.departamento} <i className="fas fa-arrows-alt-h"></i> {this.state.localidadSelect.nombre}</div>
                                                <button className="btn btn-dark">Nuevo Atractivo</button>
                                            </React.Fragment>
                                            :
                                            ""
                                        }
                                    </div>
                                    <div className="mb-3">Atractivos Turísticos de la Localidad</div>
                                    {
                                        atractivos
                                    }
                                </div>
                            </div>
                        </React.Fragment>
                    )
                }}
            </Consumer>
        );
    }
}

export default Atractivos;
