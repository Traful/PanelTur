import React, { Component } from "react";
//import Heditor from "../../utiles/Heditor";
import Msg from "../../utiles/Msg";

class Zona extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            id: 0, //Id de registro
            zona: {
                id: 0,
                nombre: "Cargando...",
                descripcion: "Cargando...",
                mapa: "default.jpg",
                activo: true
            },
            ciudades: [],
            combo_ciudades: {
                selected: 0,
                data: [{id: 0, nombre: "Cargando..."}]
            },
            MsgVisible: false
        };
        this.updateComponent = this.updateComponent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCiudadChange = this.handleCiudadChange.bind(this);
        this.findZonaCiudades = this.findZonaCiudades.bind(this);
        this.handleAddCiudad = this.handleAddCiudad.bind(this);
        this.handleDeleteCity = this.handleDeleteCity.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleImgChange = this.handleImgChange.bind(this);
    }

    handleSave = () => {
        const data = new FormData();
        data.append("idzona", this.state.zona.id);
        data.append("nombre", this.state.zona.nombre);
        data.append("descripcion", this.state.zona.descripcion);
        data.append("mapa", this.state.zona.mapa);
        data.append("activo", this.state.zona.activo);
        var mapa = document.getElementById("uploadImage-" + this.state.zona.id).files[0];
		if(mapa) {
			data.append("imgmapa", mapa, mapa.name);
		}
        fetch(`${process.env.REACT_APP_API_HOST}/zona/${this.state.id}`, {
            method: "POST",
            headers: {
                "Authorization": "asdssffsdff",
                //"Content-Type": "multipart/form-data"
            },
            body: data
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                zona: {
                    ...this.state.zona,
                    mapa: result.mapa
                },
                MsgVisible: true
            });
        }, (error) => { //???
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    handleImgChange = (event) => {
        var reader = new FileReader();
        let idx = "mapa-" + this.state.zona.id;
        reader.onload = function(e) {
            let mapa = document.getElementById(idx);
            mapa.setAttribute('src', e.target.result);
        }
        
        reader.readAsDataURL(event.target.files[0]);
    }

    handleDeleteCity = (id) => {
        fetch(`${process.env.REACT_APP_API_HOST}/zona/delete/ciudad/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "asdssffsdff",
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((result) => {
            this.findZonaCiudades(this.state.idZona);
        }, (error) => { //???
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    handleAddCiudad = (event) => {
        fetch(`${process.env.REACT_APP_API_HOST}/zona/${this.state.zona.id}/add/ciudad`, {
            method: "POST",
            headers: {
                "Authorization": "asdssffsdff",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({idciudad: this.state.combo_ciudades.selected})
        })
        .then(res => res.json())
        .then((result) => {
            this.findZonaCiudades(this.state.zona.id);
        }, (error) => { //???
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    handleChange = (event) => {
        this.setState({
            zona: {
                ...this.state.zona,
                [event.target.name]: event.target.value
            }
        });
    }

    handleCiudadChange = (event) => {
        this.setState({
            combo_ciudades: {
                ...this.state.combo_ciudades,
                selected: event.target.value
            }
        });
    }

    findZonaCiudades = (idzona) => {
        fetch(`${process.env.REACT_APP_API_HOST}/zona/${idzona}/ciudades`, {
            type: "GET"
        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
                ciudades: result.data.registros
            });
        }, (error) => { //???
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    updateComponent = () => {
        this.setState({
            isLoaded: false,
        }, () => {
            fetch(`${process.env.REACT_APP_API_HOST}/ciudades`, {
                type: "GET"
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    combo_ciudades: {
                        data: result.data.registros,
                        selected: result.data.registros[0].id
                    }
                });
            }, (error) => { //???
                this.setState({
                    isLoaded: true,
                    error
                });
            });

            fetch(`${process.env.REACT_APP_API_HOST}/zona/${this.state.id}`, {
                type: "GET"
            })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    zona: result.data.registros[0]
                }, () => {
                    this.findZonaCiudades(result.data.registros[0].id);
                });
            }, (error) => { //???
                this.setState({
                    isLoaded: true,
                    error
                });
            });
        });
    }

    componentDidMount() {
        this.setState({id: this.props.id}, () => {
            this.updateComponent();
        });
    }

    render() {
        const ciudades = this.state.combo_ciudades.data.map((ciu) => {
            return (<option key={`opt-${ciu.id}`} value={ciu.id}>{ciu.nombre}</option>);
        });
        const ciudades_zona = this.state.ciudades.map((c, index) => {
            return (
                <li key={`lista-${c.id}`} className="list-group-item">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <i className="fas fa-hashtag"></i> <strong>{index + 1} <i className="fas fa-arrows-alt-h"></i> {c.ciudad} ({c.departamento})</strong>
                        </div>
                        <div>
                            <button className="btn btn-danger btn-sm" onClick={(e) => {this.handleDeleteCity(c.id, e)}}><i className="fas fa-trash"></i></button>
                        </div>
                    </div>
                </li>
            );
        });
        return (
            <React.Fragment>
                {
                    this.state.isLoaded ?
                    <div className="row mb-3">
                        <div className="col">
                            <button className="btn btn-block" style={{backgroundColor: "#" + this.state.zona.color, color: "#fff"}} type="button" data-toggle="collapse" data-target={`#collapse-${this.state.zona.id}`} aria-expanded="false" aria-controls={`collapse-${this.state.zona.id}`}>
                            {this.state.zona.nombre}
                            </button>
                            <div className="collapse" id={`collapse-${this.state.zona.id}`}>
                                <div className="card card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="nombre">Nombre</label>
                                                        <input type="text" name="nombre" id="nombre" className="form-control" value={this.state.zona.nombre} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="descripcion">Descripción</label>
                                                        <textarea rows="15" name="descripcion" id="descripcion" className="form-control" value={this.state.zona.descripcion} onChange={this.handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="mapa">Mapa</label>
                                                <input id={`uploadImage-${this.state.zona.id}`} name={`uploadImage-${this.state.zona.id}`} type="file" className="d-none" accept="image/*" onChange={this.handleImgChange} />
                                                <img name={`mapa-${this.state.zona.id}`} id={`mapa-${this.state.zona.id}`} onClick={(e) => {document.getElementById("uploadImage-" + this.state.zona.id).click()}} src={`${process.env.REACT_APP_API_HOST}/${process.env.REACT_APP_API_DIRECTORY_MAPAS}/${this.state.zona.mapa}`} className="img-fluid rounded" alt="Mapa" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <button type="button" name="btn_ok" id="btn_ok" className="btn btn-success btn-block" onClick={this.handleSave}>Guardar Cambios</button>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="form-group">
                                                <label htmlFor="ciudad">Localidad</label>
                                                <select name="ciudad" id="ciudad" className="form-control" value={this.state.combo_ciudades.selected} onChange={this.handleCiudadChange}>
                                                    { ciudades }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-dark btn-block btn-mt" onClick={this.handleAddCiudad}><i className="fas fa-arrow-down"></i></button>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-12">
                                            Localidades de la Zona
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <ul className="list-group">
                                                { ciudades_zona }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <h1>Cargando...</h1>
                }
                <Msg visible={this.state.MsgVisible} okClose={() => this.setState({MsgVisible: false})}>
                    Los dato se actualizaron correctamente.
                </Msg>
                <style jsx="true">{`
                    #mapa {
                        border: 1px solid #ced4da;
                        border-radius: .25rem;
                    }
                    .btn-mt {
                        margin-top: 32px;
                    }
                `}</style>
            </React.Fragment>
        );
    }
}

export default Zona;
