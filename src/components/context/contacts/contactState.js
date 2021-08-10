import React, { useReducer } from 'react';

import contactReducer from './contactReducer';
import contactContext from './contactContext';

import {
    CONTACTO_ACTUAL,
    ACTUALIZAR_CONTACTO
} from '../../types';

import clienteAxios from '../../../config/axios';

import Swal from 'sweetalert2';

const ContactState = props => {

    const initialState = {
        contactos: [],
        contactoseleccionado: null
    };

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Seleccionar contacto para su edición
    const guardarContactoActual = contacto => {
        dispatch({
            type: CONTACTO_ACTUAL,
            payload: contacto
        });
    };

    // Edita o modifica un contacto
    const actualizarContacto = async contacto => {
        try {
            const resultado = await clienteAxios.put(`/contactos/${contacto._id}`, contacto);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_CONTACTO,
                payload: contacto
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registro Editado!',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1600);

        } catch (error) {
            console.log(error);
        };
    };


    return (

        <contactContext.Provider
            value={{
                guardarContactoActual,
                contactoseleccionado: state.contactoseleccionado,
                actualizarContacto
            }}
        >
            {props.children}
    
        </contactContext.Provider>
    
    );


};

export default ContactState;