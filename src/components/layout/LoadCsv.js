import React from "react";
import CSVReader from "react-csv-reader";

import clienteAxios from "../../config/axios";

import Swal from 'sweetalert2';
import { swalExito, swalError } from '../context/alertas/swalAlert';

const LoadCsv = () => {

    const handleForce = async (data, fileInfo) => {

        console.log(data, fileInfo);

        try {
            const response = await clienteAxios.post('/insertar_contactos', data);
            console.log(response);
            Swal.fire({
                title: 'Contactos Agendados!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    // eslint-disable-next-line
                    location.reload();
                };
            });
        } catch (error) {
            console.log(error);
            swalError(`Error! Intenta nuevamente`);
        };

    }; 

    const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
    };

    return  (

        <div className="container fw-bold" data-toggle="tooltip" title="Importar contactos">
            <CSVReader
                cssClass="react-csv-input"
                label="&Delta;"
                onFileLoaded={handleForce}
                parserOptions={papaparseOptions}
            />
        </div>
    );  

};

export default LoadCsv;