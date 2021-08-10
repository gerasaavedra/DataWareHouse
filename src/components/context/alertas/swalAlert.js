import Swal from 'sweetalert2';

export const swalError = mensaje => {

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${mensaje}`
    });

};


export const swalExito = mensaje => {

    Swal.fire({
        icon: 'success',
        title: 'Operación Exitosa!',
        text: `${mensaje}`
    });

};