import React, { Fragment, useState, useEffect, useContext } from 'react';
import Navbar from './layout/Navbar';
import AuthContext from '../components/context/autenticacion/authContext';
import AlertaContext from '../components/context/alertas/alertaContext';
import Swal from "sweetalert2";
import clienteAxios from '../config/axios';

const Usuarios = () => {

    // Extrae la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado, mensaje, autenticado, registrarUsuario } = authContext;

    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    // State para registrarse
    const [usuario, guardarUsuario] = useState({
        nombre: '',
        apellido: '',
        email: '',
        perfil: '',
        password: '',
        confirm: ''
    });


    // Extraer de usuario
    const { nombre, apellido, email, perfil, password, confirm } = usuario;

    const onChange = e => {
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        });
    };

    // Submit - Crear Cuenta
    const onSubmit = async e => {
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

        try {
            const nuevoUsuario = await clienteAxios.post('/nueva_cuenta', usuario)
            .then( () => {

                guardarUsuario({
                    nombre: '',
                    apellido: '',
                    email: '',
                    perfil: '',
                    password: '',
                    confirm: ''
                });

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registro Exitoso!',
                    text: 'Cuenta creada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
        } catch (error) {
            console.log(error.response.data);
            mostrarAlerta(`${error.response.data.msg}`, 'alerta-error');
            
        };

    }

    return (

        
        
        <Fragment>

            <Navbar / >
        
            <div className="vw-100 vh-100 bg-gradiente-aqua">
                <div className="container m-auto">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-8 m-auto d-flex">
                            <p className="text-center text-light fw-bold fs-4 m-auto"><i className="fas fa-user-lock text-dark p-4"></i><br/>
                            Crea cuentas para los<span className="text-primary"> usuarios</span><br/>
                            de tu equipo de trabajo.<br/>
                            Permite <span className="text-primary">operar y gestionar</span> la información.</p>
                            <div className="card m-auto w-50 shadow-lg p-3 bg-body rounded mt-5">
                                
                                <form 
                                    className="container m-auto my-5"
                                    onSubmit={onSubmit}
                                >
                                    <div className="text-center mb-4">                                        
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
                                        <label htmlFor="perfil" className="form-label">Perfil</label>
                                        <select className="form-control form-select" id="perfil" name="perfil" value={perfil} onChange={onChange} autoComplete="off">
                                            <option value="selected">-- Tipo de Perfil --</option>
                                            <option value="basico">Básico</option>
                                            <option value="admin">Admin</option>
                                        </select>
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </Fragment>

    );
}

export default Usuarios;