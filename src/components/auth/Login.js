import React, { Fragment, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AlertaContext from '../../components/context/alertas/alertaContext';
import AuthContext from '../context/autenticacion/authContext';
import Swal from 'sweetalert2';

const Login = (props) => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    
    // Evalua si los datos ingresados son correctos o no
    useEffect(() => {
        if(autenticado) {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Login Exitoso!',
                text: 'redirecting...',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(() => {
                props.history.push('/contactos');
            }, 2000);    
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        };

    }, [mensaje, autenticado, props.history])

    // State para iniciar sesión
    const [usuario, guardarUsuario] = useState({
        email: '',
        password: ''
    });

    // Extraer de usuario
    const { email, password } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    // Submit - inicio de sesión
    const onSubmit = e => {
        e.preventDefault();

        // validación de campos
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        // action login
        iniciarSesion({email, password});

    }

    return ( 

        <Fragment>

            <div className="bg-dark bg-gradient vh-100">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-8 m-auto">
                            <div className="card m-auto w-50 shadow-lg p-3 bg-body rounded mt-5">
                                <form 
                                    className="container m-auto my-5"
                                    onSubmit={onSubmit}
                                >
                                    <div className="text-center mb-4">
                                        <img className="w-50 rounded-circle grow" src="../avatar.png" alt=""/>
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
                                        <div id="emailHelp" className="form-text">Núnca compartiremos tus datos con alguien más.</div>
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
                                    </div>
                                    { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div> ) : null }
                                    <div className="text-center mt-4">
                                        <input 
                                            type="submit" 
                                            className="btn btn-dark grow" 
                                            value="Sing In"
                                        ></input>
                                    </div>
                                </form>

                                <label htmlFor="new" className="form-label text-center text-black-50">Eres nuevo?</label>
                                <button
                                    className="btn bg-grey-4"
                                
                                ><Link to={'/nueva-cuenta'} className="text-decoration-none text-dark fw-bold">
                                Obtener tu Cuenta ahora!</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>



    );
};
 
export default Login;