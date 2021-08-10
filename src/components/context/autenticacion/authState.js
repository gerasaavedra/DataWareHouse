import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../../config/axios';
import tokenAuth from '../../../config/tokenAuth';

import Swal from 'sweetalert2';

import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registrarUsuario = async datos => {
        try {
            const respuesta = await clienteAxios.post('/nueva_cuenta', datos);
            //console.log(respuesta);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            });

            // Obtener el usuario
            usuarioAutenticado();

        } catch (error) {
            // accedo al objeto de axios
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            });
        };
    };


    // Retorna el usuario autenticado
    const usuarioAutenticado = async() => {
        const token = localStorage.getItem('token');
        if(token) {
            tokenAuth(token);
        };

        try {
            const respuesta = await clienteAxios.get('/auth');
            //console.log(respuesta);
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            });
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            });
        };
    };


    // Cuando el usuario incia sesión desde /login
    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/login', datos);
            
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data
            });

            // Obtenemos el usuario
            usuarioAutenticado();
        } catch (error) {
            // accedo al objeto de axios
            //console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            });
        };
    };

    // Cerrar sesión del usuario
    const cerrarSesion = () => {

        Swal.fire({
            title: 'Cerrar Sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'rgb(85, 0, 255)',
            cancelButtonColor: '#212529',
            confirmButtonText: 'Si, cerrar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: CERRAR_SESION
                });
            };
        });
    };

    return (

        <AuthContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >{props.children}

        </AuthContext.Provider>
    )

};

export default AuthState;