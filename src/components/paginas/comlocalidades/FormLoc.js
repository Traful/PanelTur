import React, { Component } from "react";

/*
    Parámetros:
    id: Id de la Ciudad (Localidad)
    error: Función para el manejo de errores (tiene que poder manejar un string o un array)
    ok: Función para el manejo de ok (tiene que manejar registro)
    cancel: Función para el manejo de cancel
*/

class FormLoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: true,
            combo_departamentos: [{
                id: 0,
                nombre: "Cargando..."
            }],
            registro: {
                id: 0,
                idprovincia: 1,
                iddepartamento: 0,
                nombre: "",
                caracteristica: "",
                cp: "",
                latitud: 0,
                longitud: 0,
                descripcion: ""
            }
        };
        this.setData = this.setData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        //this.handleFormError = this.handleFormError.bind(this);
    }

    handleSave() {
        this.props.ok(JSON.stringify(this.state.registro));
    }

    handleCancel() {
        this.props.cancel();
    }

    setData() {
        fetch(`${process.env.REACT_APP_API_HOST}/departamentos`, {
            method: 'GET',
            headers: {
                "Authorization": "asdssffsdff",
                //"Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then((result) => {
            if(!result.err) {
                this.setState({
                    combo_departamentos: result.data.registros
                }, () => {
                    if(this.props.id === 0) {
                        this.setState({
                            registro: {
                                id: 0,
                                idprovincia: 1,
                                iddepartamento: this.state.combo_departamentos[0].id,
                                nombre: "",
                                caracteristica: "",
                                cp: "",
                                latitud: 0,
                                longitud: 0,
                                descripcion: ""
                            }
                        });
                    } else {
                        fetch(`${process.env.REACT_APP_API_HOST}/ciudad/${this.props.id}`, {
                            method: 'GET',
                            headers: {
                                "Authorization": "asdssffsdff",
                                //"Content-Type": "application/json"
                            }
                        })
                        .then(res => res.json())
                        .then((result) => {
                            if(!result.err) {
                                this.setState({registro: result.data.registros[0]});
                            } else {
                                this.props.error(result.errMsg);
                            }
                        }, (error) => { //???
                            this.props.error(error);
                        });
                    }

                });
            } else {
                this.props.error(result.errMsg);
            }
        }, (error) => { //???
            this.props.error(error);
        });
        
    }

    componentDidMount() {
        this.setData();
    }

    componentDidUpdate(prevProps) {
        if(this.props.id !== prevProps.id) {
            this.setData();
        }
    }

    render() {
        const departamentos = this.state.combo_departamentos.map((d) => {
            return (<option key={`departamento-opt-${d.id}`} value={d.id}>{d.nombre}</option>);
        });
        const FormOptions = (props) => {
            if(props.id === 0) {
                return(
                    <div className="col">
                        <button className="btn btn-primary float-right" onClick={this.handleSave}>Guardar</button>
                        <button className="btn btn-dark float-right" onClick={this.handleCancel}>Cancelar</button>
                    </div>
                )
            } else {
                return(
                    <div className="col">
                        <button className="btn btn-primary float-right" onClick={this.handleSave}>Guardar</button>
                    </div>
                )
            }
        }
        return(
            <React.Fragment>
            {
                this.state.isLoaded
                ?
                <div className="col-sm-12 col-md-6">
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="iddepartamento">Departamento</label>
                                <select name="iddepartamento" id="iddepartamento" className="form-control" value={this.state.registro.iddepartamento} onChange={(e) => this.setState({registro: {...this.state.registro, iddepartamento: e.target.value}})}>
                                    {departamentos}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="nombre">Localidad</label>
                                <input type="text" name="nombre" id="nombre" className="form-control" value={this.state.registro.nombre} onChange={(e) => this.setState({registro: {...this.state.registro, nombre: e.target.value}})} maxLength="50" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="caracteristica">Característica</label>
                                <input type="text" name="caracteristica" id="caracteristica" className="form-control" value={this.state.registro.caracteristica} onChange={(e) => this.setState({registro: {...this.state.registro, caracteristica: e.target.value}})} maxLength="15" autoComplete="off" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="cp">Código Postal</label>
                                <input type="text" name="cp" id="cp" className="form-control" value={this.state.registro.cp} onChange={(e) => this.setState({registro: {...this.state.registro, cp: e.target.value}})} maxLength="10" autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="latitud">Latitud</label>
                                <input type="text" name="latitud" id="latitud" className="form-control" value={this.state.registro.latitud} onChange={(e) => this.setState({registro: {...this.state.registro, latitud: e.target.value}})} autoComplete="off" />
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="longitud">Longitud</label>
                                <input type="text" name="longitud" id="longitud" className="form-control" value={this.state.registro.longitud} onChange={(e) => this.setState({registro: {...this.state.registro, longitud: e.target.value}})} autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group">
                                <label htmlFor="descripcion">Descripción</label>
                                <textarea rows="5" name="descripcion" id="descripcion" className="form-control" value={this.state.registro.descripcion} onChange={(e) => this.setState({registro: {...this.state.registro, descripcion: e.target.value}})} autoComplete="off" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <FormOptions id={this.state.registro.id} />
                    </div>
                </div>
                :
                <h1>Cargando...</h1>
            }
            </React.Fragment>
        );
    }
}

export default FormLoc;