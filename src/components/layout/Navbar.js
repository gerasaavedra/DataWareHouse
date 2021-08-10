import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../components/context/autenticacion/authContext';

function Navbar() {

    // Extrae la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, [] );

    return (

        <header className="py-3 bg-grey-3">
                <nav className="container d-flex align-items-center justify-content-between">
                    <Link className="nav-link text-light fw-bold d-flex" to="/contactos"><img src="logo192.png"></img>
                    {usuario ? <p className="text-white m-3">Hola <span className="nombre-usuario-span">{usuario.nombre}</span></p> : null}
                    </Link>
                    
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link text-light fw-bold" aria-current="page" to="/contactos">Contactos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light fw-bold" to="/companies">Compañías</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light fw-bold" to="/usuarios">Usuarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-light fw-bold" to="/region_ciudad" tabIndex="-1" aria-disabled="true">Región / Ciudad</Link>
                        </li>
                        <li className="nav-item">
                            <button 
                                className="nav-link text-light fw-bold bg-transparent border-0" 
                                to="/" 
                                tabIndex="-1" 
                                aria-disabled="true"
                                onClick={ () => cerrarSesion() }
                            >Cerrar Sesión</button>
                        </li>
                    </ul>        
                </nav>
        </header>

    )
};

export default Navbar;
