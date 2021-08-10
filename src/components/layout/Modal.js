import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';

const Modal = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        clienteAxios.get('/region_ciudad')
            .then(response => setData(response.data))
    }, []);


    // Generar state para nuevo contacto
    const [contacto, nuevoContacto] = useState({
        name: '',
        lastname: '',
        address: '',
        mail: '',
        user_account: '',
        city: '',
        country: '',
        region: '',
        company: '',
        charge: '',
        interes: '',
        contact_channel: ''
    });


    // Leer los datos del formulario
    const actualizarState = e => {
        nuevoContacto({
            ...contacto,
            [e.target.name]  :  e.target.value
        });
    };

    // Enviar petición a la API para crear nuevo contacto
    const crearNuevoContacto = e => {
        e.preventDefault();

        // Validar formulario
        const {name, lastname, charge, mail, company} = contacto;
        
        if( name.trim() === '' || lastname.trim() === '' || charge.trim() === '' || 
        mail.trim() === ''|| company.trim() === '' ) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Faltan campos obligatorios!',
            });
            return;
        } else {
            clienteAxios.post('/contactos', contacto)
            .then(respuesta => {
                console.log(respuesta);

                // Alerta de confirmación
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Contacto guardado!',
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    // eslint-disable-next-line
                    location.reload(); 
                }, 3500);
            });
        };

    };

    return (  
        <Fragment>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Agregar contacto</button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-grey-2">
                            <h5 className="modal-title text-light fw-bold mb-5" id="exampleModalLabel">Nuevo Contacto</h5>
                            <button type="button" className="btn-close mb-5 bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form action="" method="post" onSubmit={crearNuevoContacto}>
                            <div className="border border-5 rounded border-dark mx-3 mb-5 margin-negative bg-light">
                                <div className="modal-body col-12 my-5">
                                    <div className="container-fluid">
                                        <div className="row">
                                            <div className="col">
                                                <label htmlFor="name" className="col-sm">Nombre<span className="text-danger fw-bold">*</span></label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    name="name"
                                                    onChange={actualizarState}
                                                    autoComplete="none"
                                                ></input>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="last-name" className="col-sm">Apellido<span className="text-danger fw-bold">*</span></label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastname"
                                                    onChange={actualizarState}
                                                    autoComplete="none"
                                                ></input>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="charge" className="col-sm">Cargo<span className="text-danger fw-bold">*</span></label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="charge"
                                                    name="charge"
                                                    onChange={actualizarState}
                                                    autoComplete="none"
                                                ></input>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="email" className="col-sm">Email<span className="text-danger fw-bold">*</span></label>
                                                <input 
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="mail"
                                                    onChange={actualizarState}
                                                    autoComplete="none"
                                                ></input>
                                            </div>
                                            <div className="col">
                                                <label htmlFor="company" className="col-sm">Compañía<span className="text-danger fw-bold">*</span></label>
                                                <input 
                                                    type="text"
                                                    className="form-control"
                                                    id="company"
                                                    name="company"
                                                    placeholder="Nombre de la compañía"
                                                    onChange={actualizarState}
                                                    autoComplete="none"
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid mb-5">
                                <div className="row px-4">
                                    <div className="col">
                                        <label htmlFor="region" className="col-sm">Región</label>
                                        <select defaultValue="Seleccionar Región" id="region" className="form-select" name="region" aria-label=".form-select-sm example" onChange={actualizarState}>
                                            <option disabled hidden>Seleccionar Región</option>
                                        {data.map(region => (
                                            <option key={region.region} value={region.region} className="text-capitalize">{region.region}</option>
                                        ))}
                                        </select>      
                                    </div>
                                    <div className="col">
                                        <label htmlFor="pais" className="col-sm">País</label>
                                        <select defaultValue="Seleccionar País" id="pais-select" className="form-select bg-light" name="country" aria-label=".form-select-sm example" onChange={actualizarState}>
                                            <option disabled hidden>Seleccionar País</option>
                                            {data.map(paises => (
                                                <Fragment>
                                                    {paises.paises.map(pais => (
                                                        <option key={pais.pais} value={pais.pais} className="text-capitalize">{pais.pais}</option>
                                                    ))}
                                                </Fragment>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="ciudad" className="col-sm">Ciudad</label>
                                        <select defaultValue="Seleccionar Ciudad" className="form-select bg-light" aria-label=".form-select-sm example" name="city" onChange={actualizarState}>
                                            <option disabled hidden>Seleccionar ciudad</option>
                                            {data.map(paises => (
                                                <Fragment>
                                                    {paises.paises.map(ciudad => (
                                                        <Fragment>
                                                        {ciudad.ciudades.map(cityByOne => (
                                                            <option value={cityByOne} className="text-capitalize">{cityByOne}</option>
                                                        ))}
                                                        </Fragment>
                                                    ))}
                                                </Fragment>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="direccion" className="col-sm">Dirección</label>
                                        <input 
                                            type="text"
                                            className="form-control bg-light"
                                            id="direccion"
                                            name="address"
                                            placeholder="Ingresa una dirección"
                                            onChange={actualizarState}
                                            autoComplete="none"
                                        ></input>
                                    </div>
                                    <div className="col pt-4">
                                        <label htmlFor="porcentaje" className="col-sm me-2">Interés</label>
                                        <select className="mdb-select border border-3 rounded p-2" aria-label=".form-select-sm example" name="interes" value={contacto.interes} onChange={actualizarState}>
                                            <option default disabled></option>
                                            <option value="0">0%</option>
                                            <option value="25">25%</option>
                                            <option value="50">50%</option>
                                            <option value="75">75%</option>
                                            <option value="100">100%</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="container-fluid mb-5">
                                <div className="row px-4">
                                    <div className="col">
                                        <label htmlFor="contacto" className="col-sm">Canal de contacto</label>
                                        <select className="form-select" defaultValue="Seleccionar canal" aria-label=".form-select-sm example" name="contact_channel" onChange={actualizarState}>
                                            <option disabled hidden>Seleccionar canal</option>
                                            <option value="Whatsapp">Whatsapp</option>
                                            <option value="Instagram">Instagram</option>
                                            <option value="Facebook">Facebook</option>
                                            <option value="Twitter">Twitter</option>
                                            <option value="Email">Email</option>
                                            <option value="Phone">Phone</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="cuenta de usuario" className="col-sm">Cuenta de usuario</label>
                                        <input 
                                            type="text"
                                            className="form-control bg-light"
                                            id="user_account"
                                            name="user_account"
                                            placeholder="@ejemplo"
                                            onChange={actualizarState}
                                            autoComplete="none"
                                        ></input>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="preferencias" className="col-sm">Preferencias</label>
                                        <select className="form-select bg-light" defaultValue="Sin preferencias" aria-label=".form-select-sm example">
                                            <option disabled hidden>Sin preferencias</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        

                            <div className="modal-footer">
                                <input 
                                    type="submit"
                                    className="btn btn-success my-4"
                                    value="Guardar Contacto"
                                ></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
 
export default withRouter(Modal);