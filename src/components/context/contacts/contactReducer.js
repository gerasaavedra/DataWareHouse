import {
    CONTACTO_ACTUAL,
    ACTUALIZAR_CONTACTO
} from '../../types';


export default (state, action) => {

    switch (action.type) {
        case CONTACTO_ACTUAL:
            return {
                ...state,
                contactoseleccionado: action.payload
            }
        case ACTUALIZAR_CONTACTO:
            return {
                ...state,
                contactos: state.contactos.map(contacto => contacto._id === action.payload._id ? action.payload : contacto),
                contactoseleccionado: null
            }
        default:
            return state;
    };

};