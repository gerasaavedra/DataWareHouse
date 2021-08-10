import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import clienteAxios from '../../config/axios';

import SearchResults from './SearchResults';
import { swalExito, swalError } from '../context/alertas/swalAlert';


const SearchBar = () => {

    // Filtros de búsqueda
    const [filtros, nuevosFiltros] = useState({
        contactName: '',
        contactCharge: '',
        country: '',
        company: '',
        channel: '',
        interes: ''
    });

    const handleFilters = e => {
        nuevosFiltros({
            ...filtros,
            [e.target.name]  :  e.target.value
        });
    };


    const hideDropDown = () => {
        // Oculta el dropdown
        const searchDropDown = document.querySelector('#collapseExample');
        searchDropDown.classList.remove('show');
    };

    
    const buscarContacto = async e => {
        e.preventDefault();

        const { contactName, contactCharge, country, company, channel, interes } = filtros;

        // creamos los parámetros de búsqueda
        let params = new URLSearchParams();
        
        // Añadimos cada parámetro según las acciones del usuario
        if(filtros.contactName.length > 0) {
            params.append("name", filtros.contactName);
        };
        
        if(filtros.contactCharge.length > 0) {
            params.append("charge", filtros.contactCharge);
        };
        
        if(filtros.country.length > 0) {
            params.append("country", filtros.country);
        };
        
        if(filtros.company.length > 0) {
            params.append("company", filtros.company);
        };

        if(filtros.channel.length > 0) {
            params.append("contact_channel", filtros.channel);
        };

        if(filtros.interes.length >= 2) {
            params.append("interes", filtros.interes);
        };
        
        
        let request = {
            params: params
        };
 
        const query = params.toString();

        try {
            const data = await clienteAxios.get(`/contacto?${query}`);
            const resultado = data.data;
            //console.log(resultado);

            if(resultado.length <= 0) {
                swalError('No hay resultados que coincidan con la búsqueda');
            } else {
                
                hideDropDown();
                showResults(resultado);

            };

        } catch (error) {
            console.log(error);
            swalError('Se produjo un error, intenta nuevamete');
        };
    };

    const showResults = (data) => {

        const resultsTable = document.querySelector('#results-table');
        let result = '';
        data.forEach((data) => {

            result +=
            
                `<tr>
                    <th scope="row">#</th>
                    <td class="text-capitalize">${data.name} ${data.lastname}<p class="text-black-50 text-lowercase">${data.mail}</p></td>
                    <td class="text-capitalize">${data.country}<p class="text-black-50">${data.region}</p></td>
                    <td class="text-capitalize">${data.company}</td>
                    <td class="text-capitalize">${data.charge}</td>
                    <td><button type="button" class="btn border-0 rounded fw-bold btn-channel">${data.contact_channel}</button></td>
                    <td>${data.interes}</td>
                </tr>`;

            if(resultsTable) {
                resultsTable.innerHTML = result;
            };

        });

    };

        
    return (

        <Fragment>

            <div className="dropdown dropdown-menu-center w-50">
                <div className="btn d-flex" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false">
                    <input 
                        className="form-control dropdown-toggle me-3"
                        id="show-dropdown"
                        type="text"
                        aria-label="Search"
                    ></input>
                    <button className="btn btn-dark bg-white text-dark" type="button"><i className="fas fa-search"></i></button>
                </div>

                <ul className="dropdown-menu w-100" id="collapseExample" aria-labelledby="dropdownMenuButton1">
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="contactName" className="col">Nombre del contacto</label>
                        <input 
                            className="col border-top-0 border-end-0 border-start-0 border-1 w-50" 
                            type="text"
                            name="contactName"
                            onChange={handleFilters}
                            placeholder="Introduce el nombre del contacto"
                        ></input>
                    </li>
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="contactCharge" className="col">Cargo</label>
                        <input 
                            className="col border-top-0 border-end-0 border-start-0 border-1 w-50" 
                            type="text"
                            name="contactCharge"
                            onChange={handleFilters}
                            placeholder="Introduce el cargo del contacto"
                        ></input>
                    </li>
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="country" className="col">País/Región</label>
                        <select className="col rounded mx-5" style={{height: "40px"}} name="country" onChange={handleFilters}>
                            <option value="Todos">Todos</option>
                            <option value="America Latina">América</option>
                            <option value="Africa">Africa</option>
                            <option value="Europa">Europa</option>
                            <option value="Asia">Asia</option>
                            <option value="Oceania">Oceanía</option>
                        </select>
                    </li>
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="company" className="col">Compañía</label>
                        <select className="col rounded mx-5" style={{height: "40px"}} name="company" onChange={handleFilters}>
                            <option value="Todos">Todos</option>
                            <option value="America Latina">América</option>
                            <option value="Africa">Africa</option>
                            <option value="Europa">Europa</option>
                            <option value="Asia">Asia</option>
                            <option value="Oceania">Oceanía</option>
                        </select>
                    </li>
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="channel" className="col">Canal favorito</label>
                        <select className="col rounded mx-5" style={{height: "40px"}} name="channel" onChange={handleFilters}>
                            <option value="Cualquiera">Cualquiera</option>
                            <option value="Whatsapp">Whatsapp</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Twitter">Twitter</option>
                            <option value="Email">Email</option>
                            <option value="Phone">Phone</option>
                        </select>
                    </li>
                    <li className="row justify-content-evenly my-5 mx-3">
                        <label htmlFor="interes" className="col">Interés</label>
                        <select className="col rounded mx-5" style={{height: "40px"}} name="interes" onChange={handleFilters}>
                            <option value="Cualquiera">Cualquiera</option>
                            <option value="25">25%</option>
                            <option value="50">50%</option>
                            <option value="75">75%</option>
                            <option value="100">100%</option>
                        </select>
                    </li>
                    <button
                        type="button"
                        className="btn bg-grey-2 text-white d-inherit mx-auto mb-4 w-50"
                        onClick={buscarContacto}
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModalResults"
                    >Buscar</button>
                </ul>
            </div>

            <SearchResults />

        </Fragment>

    );
}



export default withRouter(SearchBar);