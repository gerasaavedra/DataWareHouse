import React, { Fragment, useState, useContext, useEffect, useReducer } from 'react';
import companyContext from '../context/companys/companyContext';
import EditCompany from './EditCompany';

const NewCompany = () => {

    // Obtener el state del formulario
    const companysContext = useContext(companyContext);
    const { formulario, mostrarFormulario, error, mostrarError, agregarCompany, companyselected } = companysContext;

    
    // State para compañias
    const [company, nuevaCompany] = useState({
        nombre: '',
        direccion: '',
        email: '',
        tel: '',
        ciudad: '',
        pais: ''
    });

    
    // Extraer los datos de cada compañía
    const { nombre, direccion, email, tel, ciudad, pais } = company;

    // Lee los contenidos de cada input
    const addCompany = e => {
        nuevaCompany({
            ...company,
            [e.target.name] : e.target.value
        });
    };



    // Cuando el usuario agregar una nueva compañía
    const onSubmitCompany = e => {
        e.preventDefault();

        // Validar Campos
        if( nombre.trim() === '' || direccion.trim() === '' || email.trim() === '' || 
        tel.trim() === ''|| ciudad.trim() === '' || pais.trim() === '' ) {
            mostrarError();
            return;
        };

        // agregar al state
        agregarCompany(company);

        // reiniciar el form
        nuevaCompany({
            nombre: '',
            direccion: '',
            email: '',
            tel: '',
            ciudad: '',
            pais: ''
        });

    };


    return (  
        <Fragment>

            <button
                type="button"
                className="btn-company btn-block btn-company-primary"
                onClick={() => mostrarFormulario()}
            ><i className="fas fa-plus-circle m-2"></i>Nueva</button>

            { formulario ?
                (
                    <form autoComplete="new-password"
                        className="form-new-company d-grid"
                        onSubmit={onSubmitCompany}
                    >
                        <input
                            type="text"
                            className="input-text mb-4"
                            placeholder="Nombre*"
                            name="nombre"
                            onChange={addCompany}
                            autoComplete="none"
                        ></input>
                        <input
                            type="text"
                            className="input-text mb-4"
                            placeholder="Dirección*"
                            name="direccion"
                            onChange={addCompany}
                            autoComplete="none"
                        ></input>
                        <input
                            type="email"
                            className="input-text mb-4"
                            placeholder="Email*"
                            name="email"
                            onChange={addCompany}
                            autoComplete="none"
                        ></input>
                        <input
                            type="tel"
                            className="input-text mb-4"
                            placeholder="Teléfono*"
                            name="tel"
                            onChange={addCompany}
                            autoComplete="none"
                        ></input>
                        <input
                            type="text"
                            className="input-text mb-4"
                            placeholder="Ciudad*"
                            name="ciudad"
                            onChange={addCompany}
                            autoComplete="none"
                        ></input>
                        <input
                            type="text"
                            className="input-text mb-4"
                            placeholder="País*"
                            name="pais"
                            onChange={addCompany}
                            autoComplete="on"
                        ></input>

                        <div className="d-flex">
                            <input
                                type="submit"
                                className="btn-company btn-block btn-submit btn-company-primary"
                                value="Agregar"
                            ></input>
                        </div>
                    </form>
                ) : null }
            { error ? <p className="mensaje error">Todos los campos son obligatorios</p> : null }

            { companyselected ? <EditCompany /> : null }

        </Fragment>
    );
}
 
export default NewCompany;