import React, { useReducer } from 'react';

import companyContext from './companyContext';
import companyReducer from './companyReducer';
import { 
    FORMULARIO_COMPANY, 
    OBTENER_COMPANIES, 
    VALIDAR_FORMULARIO, 
    AGREGAR_COMPANIA,
    ELIMINAR_COMPANIA,
    COMPANY_SELECCIONADA,
    ACTUALIZAR_COMPANY
} from '../../types';

import clienteAxios from '../../../config/axios';
import { swalExito, swalError } from '../alertas/swalAlert';

const CompanyState = props => {

    const initialState = {
        companies: [],
        formulario: false,
        companyselected: null
    };

    // Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(companyReducer, initialState);

    // Serie de funciones para el CRUD
    const mostrarFormulario = () => {
        dispatch({
            type: FORMULARIO_COMPANY
        })
    };

    // Obtener listado de compañías
    const obtenerCompanies = async () => {
        
        try {
            const resultado = await clienteAxios.get('/companies');
            dispatch({
                type: OBTENER_COMPANIES,
                payload: resultado.data
            })
        } catch (error) {
            swalError('Se produjo un error al cargar el servidor.');
            console.log(error);
        };
    };

    // Agregar nueva compañía
    const agregarCompany = async company => {
        //company.id = company.nombre
        try {
            const resultado = await clienteAxios.post('/companies', company);
            //console.log(resultado);

            swalExito('Registro agregado correctamente');

            // Insertar la compañía en el state
            dispatch({
                type: AGREGAR_COMPANIA,
                payload: resultado.data
            });
        } catch (error) {
            swalError('Hubo un error, intenta nuevamente.');
            console.log(error);
        };
        
    };

    // Validar formulario
    const mostrarError = () => {
        
        dispatch({
            type: VALIDAR_FORMULARIO
        })
        
    };

    // Eliminar compañía por su id
    const eliminarCompany = async id => {
        // console.log(id);
        try {

            await clienteAxios.delete(`/companies/${id}`);

            swalExito('Registro Eliminado!');

            dispatch({
                type: ELIMINAR_COMPANIA,
                payload: id
            })
        } catch (error) {
            swalError('Hubo un error, intenta nuevamente.');
            console.log(error);
        };
    };


    // Extrae una compañia para su edición
    const saveCompanySelected = company => {
        dispatch({
            type: COMPANY_SELECCIONADA,
            payload: company
        });
    };

    // Editar compañía
    const actualizarCompany = async company => {
        try {
            const resultado = await clienteAxios.put(`/companies/${company._id}`, company);
            console.log(resultado);
            dispatch({
                type: ACTUALIZAR_COMPANY,
                payload: company
            });
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <companyContext.Provider
            value={{
                companies: state.companies,
                formulario: state.formulario,
                mostrarFormulario,
                error: state.error,
                companyselected: state.companyselected,
                mostrarError,
                obtenerCompanies,
                agregarCompany,
                eliminarCompany,
                saveCompanySelected,
                actualizarCompany
            }}
        >
            {props.children}
        </companyContext.Provider>
    )
}


export default CompanyState;