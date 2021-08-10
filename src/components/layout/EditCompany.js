import React, { Fragment, useState, useEffect, useContext, useReducer } from 'react';
import companyContext from '../context/companys/companyContext';
import Swal from 'sweetalert2';

const EditCompany = () => {

    const companysContext = useContext(companyContext);
    const { error, mostrarError, companyselected, actualizarCompany } = companysContext;


    useEffect(() => {
        if(companyselected !== null) {
            editedCompany(companyselected);
        } else {
            editedCompany({
                nombre: '',
                direccion: '',
                email: '',
                tel: '',
                ciudad: '',
                pais: ''
            });
        };
    }, [companyselected])
    
    // State para compañias
    const [pickedCompany, editedCompany] = useState({
        nombre: '',
        direccion: '',
        email: '',
        tel: '',
        ciudad: '',
        pais: ''
    });

    // Extraer los datos de cada compañía
    const { nombre, direccion, email, tel, ciudad, pais } = pickedCompany;

    // Lee los contenidos de cada input
    const addCompany = e => {
        editedCompany({
            ...pickedCompany,
            [e.target.name] : e.target.value
        });
    };

    // Actualiza compañía seleccionada
    const onSubmitEdition = e => {
        e.preventDefault();

        if( nombre.trim() === '' || direccion.trim() === '' || email.trim() === '' || 
        tel.trim() === ''|| ciudad.trim() === '' || pais.trim() === '' ) {
            // Alerta Error
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Todos los campos son obligatorios!',
                showConfirmButton: false,
                timer: 1500
            });
            return;
        };

        // Actualiza el registro
        actualizarCompany(pickedCompany)

        // Reinicia el form
        editedCompany({
            nombre: '',
            direccion: '',
            email: '',
            tel: '',
            ciudad: '',
            pais: ''
        });

        // Alerta Success
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro editado!',
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            // eslint-disable-next-line
            location.reload();
        }, 2000);
      
    };

    return (  

        <Fragment>
 
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Editar Compañía</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form autoComplete="new-password"
                            className="d-grid"
                            onSubmit={onSubmitEdition}
                        >
                            <label className="form-label fw-bold" htmlFor="nombre">Nombre</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder="Nombre*"
                                name="nombre"
                                onChange={addCompany}
                                value={nombre}
                                autoComplete="none"
                            ></input>
                            <label className="form-label fw-bold" htmlFor="direccion">Dirección</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder="Dirección*"
                                name="direccion"
                                onChange={addCompany}
                                value={direccion}
                                autoComplete="none"
                            ></input>
                            <label className="form-label fw-bold" htmlFor="email">Email</label>
                            <input
                                type="email"
                                className="form-control mb-4"
                                placeholder="Email*"
                                name="email"
                                onChange={addCompany}
                                value={email}
                                autoComplete="none"
                            ></input>
                            <label className="form-label fw-bold" htmlFor="tel">Tel</label>
                            <input
                                type="tel"
                                className="form-control mb-4"
                                placeholder="Teléfono*"
                                name="tel"
                                onChange={addCompany}
                                value={tel}
                                autoComplete="none"
                            ></input>
                            <label className="form-label fw-bold" htmlFor="ciudad">Ciudad</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder="Ciudad*"
                                name="ciudad"
                                onChange={addCompany}
                                value={ciudad}
                                autoComplete="none"
                            ></input>
                            <label className="form-label fw-bold" htmlFor="pais">País</label>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder="País*"
                                name="pais"
                                onChange={addCompany}
                                value={pais}
                                autoComplete="on"
                            ></input>

                            <div className="d-flex">
                                <input
                                    type="submit"
                                    className="btn-company btn-block btn-submit btn-company-primary"
                                    value="Guardar Cambios"
                                ></input>
                            </div>
                        </form>
                        { error ? <p className="mensaje error">Todos los campos son obligatorios</p>  : null }
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar &times;</button>
                    </div>
                    
                </div>
                </div>
            </div>

        </Fragment>
    );
}
 
export default EditCompany;