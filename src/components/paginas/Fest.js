import React from "react";
import { Consumer } from "../../context";

const Fest = () => {
    return (
        <Consumer>
            {value => {
                //console.log(value);
                return (
                    <React.Fragment>
                        <h4 className="bg-info text-white p-3 mb-3 rounded animated bounceInLeft delay-2s"><i className="fas fa-city"></i> Fiestas / Eventos</h4>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">Fiestas o Eventos (Fijos!)</div>
                                <ul>
                                    <li>Nombre</li>
                                    <li>Descripción</li>
                                    <li>Geo</li>
                                    <li>Fotos Varias</li>
                                    <li>Calendario con los días en los que la fiesta o evento transcurre</li>
                                </ul>
                            </div>
                        </div>
                    </React.Fragment>
                )
            }}
        </Consumer>
    );
}

export default Fest;
