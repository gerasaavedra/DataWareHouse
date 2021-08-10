import {
    FORMULARIO_COMPANY,
    OBTENER_COMPANIES,
    VALIDAR_FORMULARIO,
    AGREGAR_COMPANIA,
    ELIMINAR_COMPANIA,
    COMPANY_SELECCIONADA,
    ACTUALIZAR_COMPANY
} from '../../types';

export default (state, action) => {
    switch (action.type) {
        case FORMULARIO_COMPANY:
            return {
                ...state,
                formulario: true,
            }
        case OBTENER_COMPANIES:
            return {
                ...state,
                companies: action.payload
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                error: true
            }
        case AGREGAR_COMPANIA:
            return {
                ...state,
                companies: [...state.companies, action.payload],
                formulario: false,
                error: false
            }
        case ELIMINAR_COMPANIA:
            return {
                ...state,
                companies: state.companies.filter(company => company.id !== action.payload)
            }
        case COMPANY_SELECCIONADA:
            return {
                ...state,
                companyselected: action.payload
            }
        case ACTUALIZAR_COMPANY:
            return {
                ...state,
                companies: state.companies.filter(company => company.id !== action.payload),
                companyselected: null
            }

        default:
            return state;
    };
};