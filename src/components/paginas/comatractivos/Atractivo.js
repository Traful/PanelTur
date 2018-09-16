import React, { Component } from "react";
//import Msg from "../../utiles/Msg";
import Galeria from "./Galeria";

class Atractivo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            errMsg: "",
            atractivo: {
                id: 0,
                nombre: "",
                descripcion: "",
                latitud: 0,
                longitud: 0,
                imperdible: false
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        this.setState({
            atractivo: {
                ...this.state.atractivo,
                [target]: value
            }
        });

    }

    componentDidMount() {
        //Obtener los datos del Atractivo
        fetch(`${process.env.REACT_APP_API_HOST}/atractivo/${this.props.idAtractivo}`, {
            method: "GET",
            headers: {
                "Authorization": "asdssffsdff",
                //"Content-Type": "multipart/form-data"
            }
        })
        .then(res => res.json())
        .then((result) => {
            if(!result.err) {
                this.setState({
                    atractivo: result.data.registros[0],
                    loading: false
                });
            } else {
                this.setState({
                    loading: false,
                    error: true,
                    errMsg: result.errMsg
                });
            }
        }, (error) => { //???
            this.setState({
                loading: false,
                error: true,
                errMsg: error
            });
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target={`#collapse-activo-${this.state.atractivo.id}`} aria-expanded="false" aria-controls={`collapse-activo-${this.state.atractivo.id}`}>
                            {this.state.atractivo.nombre}
                        </button>
                        <div className="collapse" id={`collapse-activo-${this.state.atractivo.id}`}>
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="nombre">Nombre</label>
                                            <input type="text" name="nombre" id="nombre" className="form-control" value={this.state.atractivo.nombre} onChange={this.handleChange} autoComplete="off" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="descripcion">Descripción</label>
                                            <textarea rows="5" type="text" name="descripcion" id="descripcion" className="form-control" value={this.state.atractivo.descripcion} onChange={this.handleChange} autoComplete="off" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="latitud">Latitud</label>
                                            <input type="text" name="latitud" id="latitud" className="form-control" value={this.state.atractivo.latitud} onChange={this.handleChange} autoComplete="off" />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-md-4">
                                        <div className="form-group">
                                            <label htmlFor="longitud">Longitud</label>
                                            <input type="text" name="longitud" id="longitud" className="form-control" value={this.state.atractivo.longitud} onChange={this.handleChange} autoComplete="off" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        Imágenes
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12 col-md-12">
                                        <Galeria idAtractivo={this.state.atractivo.id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <style jsx="true">{`
                    
                `}</style>
            </React.Fragment>
        );
    }
}

export default Atractivo;
