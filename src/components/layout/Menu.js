import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div className="">
            <ul className="d-flex flex-direction-row justify-content-center h-menu">
                <li><Link to="/">Zonas</Link></li>
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Localidades</a>
                    <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/localidades">Registros</Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to="/atractivos">Atractivos</Link>
                        <Link className="dropdown-item" to="/fest">Fiestas/Eventos</Link>
                    </div>
                </li>
                {/*
                <li><a href="#">Alojamientos</a></li>
                <li><a href="#">Gastronomía</a></li>
                <li><a href="#">Notas</a></li>
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Servicios</a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Agencias de Viaje</a>
                        <a className="dropdown-item" href="#">Guías de Turismo</a>
                        <a className="dropdown-item" href="#">Turismo Estudiantíl</a>
                        <a className="dropdown-item" href="#">Oficinas de Informes</a>
                        <a className="dropdown-item" href="#">Terminales de Omnibus</a>
                        <a className="dropdown-item" href="#">Horarios de Colectivos</a>
                        <a className="dropdown-item" href="#">Cajeros Automáticos</a>
                        <a className="dropdown-item" href="#">Estaciones de GNC</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Separated link</a>
                    </div>
                </li>
                */}
            </ul>
            <style jsx="true">{`
                .dropdown-toggle {
                    cursor: pointer;
                }
                .h-menu {
                    list-style-type: none;
                }

                .h-menu > li {
                    display: inline-block;
                    position: relative;
                    padding-bottom: 3px;
                    margin-right: 20px;
                }

                .h-menu > li:last-child {
                    margin-right: 0;
                }

                .h-menu > li:after {
                    content: '';
                    display: block;
                    margin: auto;
                    height: 3px;
                    width: 0px;
                    background: transparent;
                    transition: width .5s ease, background-color .5s ease;
                }

                .h-menu > li:hover:after {
                    width: 100%;
                    background: #007bff;
                }

                .h-menu > li > a {
                    display: block;
                    line-height: 50px;
                    text-align: center;
                    text-decoration: none;
                    color: #343a40;
                    font-size: 1.2rem;
                }
            `}</style>
        </div>
    );
}

export default Menu;
