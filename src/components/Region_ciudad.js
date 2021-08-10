import React, { Fragment, useState, useEffect, useContext } from 'react';
import clienteAxios from '../config/axios';
import Navbar from './layout/Navbar';
import AuthContext from '../components/context/autenticacion/authContext';

import Swal from 'sweetalert2';

const RegionCiudad = (props) => {


    // Extrae la información de autenticación
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    // Agregar nueva región
    const nuevaRegion = async () => {

        try {
            const { value: region } = await Swal.fire({
                title: 'Nueva Región',
                input: 'text',
                inputLabel: 'Nombre:',
                inputPlaceholder: 'Ingresa nombre de la Región'
            });
      
            if (region) {
                await clienteAxios.post('/region_ciudad', { region: region });
                Swal.fire(`Se agregó la región: "${region}"`);
            };

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        };

    };

    // Agregar País
    const addCountry = async (id) => {

        try {
            const { value: pais } = await Swal.fire({
                title: 'Añadir País',
                input: 'text',
                inputLabel: 'Nombre:',
                inputPlaceholder: 'Ingresa nombre del País'
            });
      
            if (pais) {
                await clienteAxios.put(`/region_ciudad/${id}`, {"pais": pais} );
                Swal.fire(`Se agregó el país: "${pais}"`);
            };

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        };
    };

    // Editar País
    const editCountry = async (pais, id) => {

        try {
            const { value: newCountry } = await Swal.fire({
                title: 'Editar País',
                input: 'text',
                inputValue: '',
                inputLabel: `Nombre: ${pais}`,
                inputPlaceholder: 'Nuevo Valor'
            });

            const data = { "valorActual": pais , "nuevoValor": newCountry };
            const resultado = await clienteAxios.put(`/region_ciudad/editarPais/${id}`, data);
            Swal.fire("Registro editado correctamente!");

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        };
    };

    // Eliminar País
    const deleteCountry = (pais, id) => {
        
        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Eliminar ${pais} del listado?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#000',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteAxios.put(`/region_ciudad/eliminarPais/${id}`, { "pais": pais } )
                    Swal.fire(
                        'Deleted!',
                        'Registro eliminado correctamente!',
                        'success'
                    )

                    setTimeout(() => {
                        // eslint-disable-next-line
                        location.reload();
                    }, 1500);
                };
            });

        } catch (error) {
            console.log(error);
        };
    };

    // Añadir ciudad
    const addCity = async (id, pais) => {

        try {
            const { value: city } = await Swal.fire({
                title: 'Añadir Ciudad',
                input: 'text',
                inputValue: '',
                inputLabel: 'Nombre de la Ciudad',
                inputPlaceholder: 'Nombre'
            });

            const data = { "referent_country": pais, "nuevaCiudad": city };
            const resultado = await clienteAxios.put(`/region_ciudad/newCity/${id}`, data);
            Swal.fire(`Se agregó la ciudad: "${city}"`);

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        };

    };

    //Editar Ciudad
    const editCity = async (id, ciudad) => {

        try {
            const { value: city } = await Swal.fire({
                title: 'Editar Ciudad',
                input: 'text',
                inputValue: '',
                inputLabel: `Nombre: ${ciudad}`,
                inputPlaceholder: 'Nuevo Valor'
            });

            const data = { "ciudad": ciudad, "nuevoValor": city };
            const resultado = await clienteAxios.put(`/region_ciudad/updateCity/${id}`, data);
            Swal.fire("Registro editado correctamente!");

            setTimeout(() => {
                // eslint-disable-next-line
                location.reload();
            }, 1500);

        } catch (error) {
            console.log(error);
        };
    };

    // Eliminar Ciudad
    const deleteCity = async (id, ciudad) => {

        try {
            Swal.fire({
                title: 'Estas seguro?',
                text: `Eliminar "${ciudad}" del listado?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#000',
                confirmButtonText: 'Eliminar'
            }).then((result) => {
                if (result.isConfirmed) {
                    clienteAxios.put(`/region_ciudad/deleteCity/${id}`, { "ciudad": ciudad } )
                    Swal.fire(
                        'Deleted!',
                        'Registro eliminado correctamente!',
                        'success'
                    )
                    setTimeout(() => {
                        // eslint-disable-next-line
                        location.reload();
                    }, 1500);
                };
            });

        } catch (error) {
            console.log(error);
        };

    };

    return (

        <Fragment>

            <Navbar />
            
            <div className="container">
                <div className="w-100 d-flex flex-row-reverse">
                    <button
                        type="button"
                        className="btn btn-lg btn-purple my-5"
                        onClick={nuevaRegion}
                    ><i className="far fa-plus-square m-2"></i>Agregar Región</button>
                </div>

                <div>
                    {props.paises.map(data => (
                        
                        <Fragment key={data.region}>
                            <div className="ctn-1200 m-auto d-flex justify-content-between my-5">
                                <h3 className="border rounded-pill p-3 bg-light shadow-lg bg-body rounded text-capitalize"><i className="fas fa-globe-americas me-3 text-secondary"></i>{data.region}</h3>
                                <button
                                    id={data._id}
                                    type="button"
                                    className="btn btn-primary m-3"
                                    onClick={() => addCountry(data._id)}
                                >Add Country</button>
                            </div>
                            <div className="ctn-800 m-auto mb-5" id="pais">
                                { data.paises ?
                                
                                    data.paises.map(pais => (
                                        <Fragment key={pais.pais}>
                                            <div className="d-flex align-items-start mt-5">
                                                <h4 className="mx-5 text-capitalize">{pais.pais}</h4>
                                                <button
                                                    type="button"
                                                    className="btn btn-editar mx-2 p-2"
                                                    onClick={() => editCountry(pais.pais, data._id)}
                                                ><i className="far fa-edit me-2"></i>Edit</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-eliminar mx-2 p-2"
                                                    onClick={() => deleteCountry(pais.pais, data._id)}
                                                ><i className="fas fa-trash-alt me-2"></i>Delete</button>
                                                <button
                                                    type="button"
                                                    className="btn btn-agregar-ciudad p-2"
                                                    onClick={() => addCity(data._id, pais.pais)}
                                                >+ City </button>
                                            </div>
                                            <div className="ctn-600 m-auto">
                                                <ul className="mt-5">
                                                    {pais.ciudades.map(ciudad => (
                                                        <li key={ciudad} className="pais sombra bg-white grow">
                                                        <p className="m-0 text-capitalize">{ciudad}</p>
                                                        <button
                                                            type="button"
                                                            className="btn btn-editar mx-2"
                                                            onClick={() => editCity(data._id, ciudad)}
                                                        ><i className="far fa-edit me-2"></i>Edit</button>
                                                        <button
                                                            type="button"
                                                            className="btn btn-eliminar"
                                                            onClick={() => deleteCity(data._id, ciudad)}
                                                        ><i className="fas fa-trash-alt me-2"></i>Delete</button>
                                                    </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </Fragment>
                                )) : null}
                            </div>
                        </Fragment>

                    ))}
                    
                </div>
            </div>

        </Fragment>

    );
};
 
export default RegionCiudad;