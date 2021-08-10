import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../components/context/alertas/alertaContext';
import AuthContext from '../context/autenticacion/authContext';
import Swal from "sweetalert2";

const NuevaCuenta = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, registrarUsuario } = authContext;


    // Evaluamos los casos de autenticación, registro o registro duplicado
    useEffect(() => {
        if(autenticado) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro Exitoso!',
                text: 'redirecting...',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                props.history.push('/contactos');
            }, 2000);    
        };

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        };

    }, [mensaje, autenticado, props.history])

    // State para registrarse
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        confirm: ''
    });

    // Extraer de usuario
    const { nombre, apellido, email, password, confirm } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    // Submit - Crear Cuenta
    const onSubmit = e => {
        e.preventDefault();

        // validación de campos vacíos
        if(nombre.trim() === '' || apellido.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        };

        // Longitud de password
        if(password.length < 6) {
            mostrarAlerta('Password: mínimo 6 caracteres', 'alerta-error');
            return;
        };
        // Ambos passwords iguales
        if(password !== confirm) {
            mostrarAlerta('Ambos passwords deben ser iguales', 'alerta-error');
            return;
        };

        // Mandar al action
        registrarUsuario({
            nombre,
            apellido,
            email,
            password
        });

    }

    return (

        <Fragment>
            <div className="vw-100 vh-100 bg-grey-1 bg-gradient">
                <div className="container m-auto">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-8 m-auto">
                            <div className="card m-auto w-50 shadow-lg p-3 bg-body rounded mt-5">
                                
                                <form 
                                    className="container m-auto my-5"
                                    onSubmit={onSubmit}
                                >
                                    <div className="text-center mb-4">
                                        <img className="w-50 rounded-circle grow" src="../avatar.png" alt=""/>
                                        <h2 className="mt-4">Obtener Cuenta</h2>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="nombre"
                                            name="nombre"
                                            value={nombre}
                                            onChange={onChange}
                                            autoComplete="off"
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="apellido" className="form-label">Apellido</label>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            id="apellido"
                                            name="apellido"
                                            value={apellido}
                                            onChange={onChange}
                                            autoComplete="off"
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                                        <input 
                                            type="email" 
                                            className="form-control" 
                                            id="email"
                                            name="email"
                                            value={email}
                                            aria-describedby="emailHelp"
                                            onChange={onChange}
                                            autoComplete="off"
                                        ></input>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Contraseña</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="password"
                                            value={password}
                                            name="password"
                                            onChange={onChange}
                                            autoComplete="off"
                                        ></input>
                                        <div className="form-text">La contraseña debe contener al menos seis caracteres.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="repeat-password" className="form-label">Vuelve a escribir la contraseña</label>
                                        <input 
                                            type="password" 
                                            className="form-control" 
                                            id="confirm"
                                            value={confirm}
                                            name="confirm"
                                            onChange={onChange}
                                            autoComplete="off"
                                        ></input>
                                    </div>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
                                    <div className="text-center mt-4">
                                        <input 
                                            type="submit" 
                                            className="btn btn-dark grow" 
                                            value="Crear Cuenta"
                                        ></input>
                                    </div>
                                </form>

                                <Link to={'/login'} className="text-black-50 text-decoration-none">
                                    ¿Ya tienes una cuenta? <span className="text-dark fw-bold">Iniciar sesión</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default NuevaCuenta;