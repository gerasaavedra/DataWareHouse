import React, { Fragment, Router, useState, useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import contactContext from './context/contacts/contactContext';
import Navbar from './layout/Navbar';
import SearchBar from './layout/Searchbar';
import Modal from './layout/Modal';
import clienteAxios from '../config/axios';
import AuthContext from '../components/context/autenticacion/authContext';
import ExportCSV from './layout/CsvExportContacts';
import ExportAll from './layout/CsvExportAll';
import LoadCsv from './layout/LoadCsv';


import Swal from 'sweetalert2';
import { swalExito, swalError } from '../components/context/alertas/swalAlert';


const Contactos = (props) => {

    // Extrae la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    // Obtener las funciones del context de contactos
    const contactosContext = useContext(contactContext);
    const {contactoseleccionado, guardarContactoActual, actualizarContacto } = contactosContext;
    


    useEffect(() => {
        usuarioAutenticado();
    }, []);
    
    // Eliminar uno o mas contactos
    const contactsToDelete = () => {
        
        const arrayOfInputs = [];

        const checkboxes = document.querySelectorAll('input:checked');
        arrayOfInputs.push(checkboxes);

        const arrayOfInputsIds = [];
        checkboxes.forEach(checkbox => {
            arrayOfInputsIds.push(checkbox.id);
        });

        //console.log(arrayOfInputsIds);

        
        // Modifica el DOM
        const selectedInpunts = document.querySelector('#selected-inputs');
        
        selectedInpunts.innerHTML = `
            <div class="btn btn-channel fw-bold">${arrayOfInputsIds.length} seleccionados</div>
            <button 
                type="button" 
                class="btn text-primary fw-bold" 
                id="deleteBtn"
            ><i class="fas fa-trash me-2"></i>Eliminar contactos</button>
        `;
    

        // Función al boton de eliminar contacto/s
        const deleteBtn = document.querySelector('#deleteBtn');
        deleteBtn.onclick = () => {

            Swal.fire({
                    title: 'Eliminar contactos?',
                    text: "No podrás revertir esta operación!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: 'rgb(85, 0, 255)',
                    cancelButtonColor: 'rgb(33, 37, 41)',
                    confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(arrayOfInputsIds)
                    clienteAxios.delete('/contactos', { data: {_id: arrayOfInputsIds} })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            swalError('Hubo un error, intenta nuevamente.');
                            console.log(error);
                        })
                    Swal.fire(
                        'Deleted!',
                        'Contacto eliminado.',
                        'success'
                    );

                    setTimeout(() => {
                        // eslint-disable-next-line
                        location.reload();
                    }, 2500);
                };

            });
        };

        // Mostrar u ocultar boton de eliminar contactos
        if(arrayOfInputsIds.length <= 0) {
            selectedInpunts.classList.add('d-none');
        } else {
            selectedInpunts.classList.remove('d-none');
        };

    };

    
    // Exportar contacto/s por su _id 
    const exportarContactos = async () => {

        const arrayOfInputs = [];

        const checkboxes = document.querySelectorAll('input:checked');
        arrayOfInputs.push(checkboxes);

        const arrayOfInputsIds = [];
        checkboxes.forEach(checkbox => {
            arrayOfInputsIds.push(checkbox.id);
        });

    
        let params = new URLSearchParams();
        let i;
        for(i = 0; i < arrayOfInputsIds.length; i++) {
            params.append("_id", arrayOfInputsIds[i]);
        };

        let request = {
            params: params
        };

        // Enviar el request a la DB
        try {
            return await clienteAxios.get('/exportar_contactos/', request)
                .then(res => res.data);
        } catch (error) {  
            console.log(error);
        };

    };

    const checkAll = () => {

        let isChecked = document.getElementById('toggleCheck').checked;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = true;
        };

        if(isChecked === false) {
            for (let i = 0; i < checkboxes.length; i++) {
                checkboxes[i].checked = false
            };
        };

    };

    // Agregar un contacto actual cuando el usuario desea editarlo
    const editarContacto = contacto => {
        guardarContactoActual(contacto);
    };

    
    // State para ediar contacto
    const [contactoActual, editado] = useState({
        name: '',
        lastname: '',
        mail: '',
        region: '',
        country: '',
        company: '',
        contact_channel: '',
        interes: ''
    });

    const {name, lastname, mail, region, country, company, contact_channel, interes} = contactoActual;

    useEffect(() => {
        if(contactoseleccionado !== null) {
            editado(contactoseleccionado);
        } else {
            editado({
                name: '',
                lastname: '',
                mail: '',
                region: '',
                country: '',
                company: '',
                contact_channel: '',
                interes: ''
            });
        };
    }, [contactoseleccionado]);
    
    // Leer los datos del formulario
    const actualizarState = e => {
        editado({
            ...contactoActual,
            [e.target.name]  :  e.target.value
        });

    };

    // Actualiza el contacto seleccionado
    const onSubmitContacto = e => {
        e.preventDefault();

        actualizarContacto(contactoActual);
    };
    
    const revisarInteres = (interes) => {
        
        let clase;

        if(interes == '100') {
            clase = 'progress-bar bg-success';
        } else if(interes == '75') {
            clase = 'progress-bar bg-orange';
        } else if(interes == '50') {
            clase = 'progress-bar bg-warning';
        } else if(interes == '25') {
            clase = 'progress-bar bg-info';
        } else {
            clase = 'progress-bar';
        };

        return clase;
    };


    return ( 

        <Fragment>

            <Navbar />

            <div className="container">
                <h1 className="my-5 fs-1">Contactos</h1>
                <div className="my-3">
                    <div className="navbar navbar-light">
                        <div className="container-fluid">
                            <SearchBar />                            
                            <div className="dropdown">
                                <div className="btn btn-dark bg-white text-dark me-2">
                                    <LoadCsv />
                                </div>
                                <button className="btn btn-dark bg-white text-dark dropdown-toggle me-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Exportar contactos</button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li className="dropdown-item link-dark" id="csv-data" onClick={exportarContactos}>
                                        <ExportCSV />
                                    </li>
                                    <li className="dropdown-item link-dark">
                                        <ExportAll />
                                    </li>
                                </ul>

                                <Modal />
         
                            </div>
                        </div>
                    </div>
                    <div id="selected-inputs" className="container d-flex justify-content-between mt-4"></div>
                </div>
                <div className="col-12 bg-white mb-5">
                    <table className="table table-hover border border-1 mt-2 shadow-lg table-striped">
                        <thead className="th-padding">
                            <tr>
                              <th className="text-center" scope="col"><input type="checkbox" id="toggleCheck" onClick={checkAll}></input></th>
                              <th scope="col">Contacto</th>
                              <th scope="col">País/Región</th>
                              <th scope="col">Compañía</th>
                              <th scope="col">Cargo</th>
                              <th scope="col">Canal preferido</th>
                              <th scope="col">Interés</th>
                              <th className="text-center" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {props.contactos.map(contacto => (
                                <tr key={contacto._id} onClick={contactsToDelete}>
                                    <th className="text-center" scope="row"><input id={contacto._id} type="checkbox"></input></th>
                                    <td className="text-capitalize">{contacto.name} {contacto.lastname}<p className="text-black-50 text-lowercase">{contacto.mail}</p></td> 
                                    <td className="text-capitalize">{contacto.country}<p className="text-black-50">{contacto.region}</p></td>
                                    <td className="text-capitalize">{contacto.company}</td>
                                    <td className="text-capitalize">{contacto.charge}</td>
                                    <td><button type="button" className="btn border-0 rounded fw-bold btn-channel">{contacto.contact_channel}</button></td>
                                    <td>
                                        <p id="interes">{contacto.interes}%</p>                     
                                        <div className="progress">
                                            <div className={revisarInteres(contacto.interes)} id="interes-bar" role="progressbar" style={{width: `${contacto.interes}%`}} aria-valuenow={`${contacto.interes}%`} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </td>
                                    <td className="text-center"><button className="border-0 bg-transparent" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-ellipsis-h"></i></button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton2">
                                            <li onClick={() => editarContacto(contacto)}><a className="dropdown-item" href="#sidebar" data-bs-toggle="offcanvas" role="button" aria-controls="sidebar">Editar</a></li>
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                   </table>
                </div>
            </div>
            
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="sidebar" aria-labelledby="sidebar-label">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title fw-bold my-3">Editar Contacto</h5>
                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form autoComplete="new-password"
                    className="d-grid"
                    onSubmit={onSubmitContacto}
                >
                    <label className="form-label fw-bold" htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Nombre"
                        name="name"
                        onChange={actualizarState}
                        value={name}
                        autoComplete="none"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="lastname">Apellido</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Apellido"
                        name="lastname"
                        onChange={actualizarState}
                        value={lastname}
                        autoComplete="none"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control mb-4"
                        placeholder="Email"
                        name="mail"
                        onChange={actualizarState}
                        value={mail}
                        autoComplete="none"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="region">Región</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Región"
                        name="region"
                        onChange={actualizarState}
                        value={region}
                        autoComplete="none"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="pais">País</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="País"
                        name="country"
                        onChange={actualizarState}
                        value={country}
                        autoComplete="none"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="compañia">Compañía</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Compañía"
                        name="company"
                        onChange={actualizarState}
                        value={company}
                        autoComplete="on"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="channel">Canal preferido</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Canal preferido"
                        name="contact_channel"
                        onChange={actualizarState}
                        value={contact_channel}
                        autoComplete="on"
                    ></input>
                    <label className="form-label fw-bold" htmlFor="interes">Interés</label>
                    <input
                        type="text"
                        className="form-control mb-4"
                        placeholder="Interés"
                        name="interes"
                        onChange={actualizarState}
                        value={interes}
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
            </div>
        </div>




        </Fragment>

    );
};


export default withRouter(Contactos);